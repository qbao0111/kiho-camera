import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { SiteSettings } from "@/types/database";
import { validateSiteSettingsInput } from "@/lib/security/validation";

async function fetchSiteSettingsFromSupabase(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
    if (!supabase) return MOCK_SITE_SETTINGS;

    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !data) {
      return MOCK_SITE_SETTINGS;
    }

    const validation = validateSiteSettingsInput(data);
    if (!validation.success) {
      console.error("[Settings] Ignoring invalid site settings row.");
      return MOCK_SITE_SETTINGS;
    }
    return { ...MOCK_SITE_SETTINGS, ...validation.data, id: 1 };
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return MOCK_SITE_SETTINGS;
  }
}

// 1. Next.js Data Cache (persisted across requests, invalidated via tag 'site-settings', TTL 300s)
const getCachedSiteSettings = unstable_cache(
  fetchSiteSettingsFromSupabase,
  ["site-settings"],
  {
    tags: ["site-settings"],
    revalidate: 300,
  }
);

// 2. React per-request deduplication (deduplicates calls within the same request lifecycle)
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return getCachedSiteSettings();
});

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; warning?: string; error?: string }> {
  try {
    const validation = validateSiteSettingsInput(settings);
    if (!validation.success) return validation;

    const supabase = await createServerClient();
    if (!supabase) {
      return { success: false, error: "Chưa cấu hình Supabase" };
    }

    // Attempt standard upsert with all fields
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...validation.data, updated_at: new Date().toISOString() });

    if (error) {
      // If error is specifically because maps_embed_url column is not yet in Supabase schema cache
      const isMapsEmbedColumnError =
        error.message?.includes("maps_embed_url") ||
        error.details?.includes("maps_embed_url") ||
        error.hint?.includes("maps_embed_url") ||
        error.code === "PGRST204" ||
        error.code === "42703";

      if (isMapsEmbedColumnError) {
        // Fallback: strip maps_embed_url and save all other fields so user is never blocked
        const { maps_embed_url, ...remainingSettings } = validation.data;
        const retry = await supabase
          .from("site_settings")
          .upsert({ id: 1, ...remainingSettings, updated_at: new Date().toISOString() });

        if (!retry.error) {
          return {
            success: true,
            warning:
              "Đã lưu các thông tin khác thành công. Riêng cột 'maps_embed_url' chưa được tạo trong database Supabase. Vui lòng mở Supabase Dashboard → SQL Editor và chạy câu lệnh: ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS maps_embed_url TEXT DEFAULT '';",
          };
        }
      }

      console.error("[Settings] Supabase update failed:", error.message);
      return { success: false, error: "Không thể lưu cài đặt website." };
    }

    return { success: true };
  } catch (err) {
    console.error("[Settings] Update failed:", err instanceof Error ? err.message : "Unknown error");
    return { success: false, error: "Không thể lưu cài đặt website." };
  }
}

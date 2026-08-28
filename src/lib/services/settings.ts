import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { SiteSettings } from "@/types/database";

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

    return data as SiteSettings;
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

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();
    if (!supabase) {
      return { success: false, error: "Chưa cấu hình Supabase" };
    }

    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...settings, updated_at: new Date().toISOString() });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Lỗi cập nhật cấu hình" };
  }
}

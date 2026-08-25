import { createClient } from "@/lib/supabase/server";
import { MOCK_SITE_SETTINGS } from "@/lib/mock-data";
import { SiteSettings } from "@/types/database";

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
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

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
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

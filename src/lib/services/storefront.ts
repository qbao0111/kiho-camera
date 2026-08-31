import { cache } from "react";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { StorefrontImage } from "@/types/database";

/**
 * Raw database query for storefront images.
 * Ordered by: is_cover DESC, sort_order ASC, created_at DESC
 */
async function fetchStorefrontImagesFromSupabase(): Promise<StorefrontImage[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return [];
    }

    const { data, error } = await supabase
      .from("storefront_images")
      .select("*")
      .order("is_cover", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      // If table doesn't exist yet in Supabase cache, fail gracefully without breaking SSR
      console.warn("[Storefront] Query warning (table may not be created yet):", error.message);
      return [];
    }

    return (data as StorefrontImage[]) || [];
  } catch (err) {
    console.error("[Storefront] Error fetching storefront images:", err);
    return [];
  }
}

// 1. Next.js Data Cache (persisted across requests, invalidated via tag 'storefront-images', TTL 300s)
const getCachedStorefrontImages = unstable_cache(
  fetchStorefrontImagesFromSupabase,
  ["storefront-images"],
  {
    tags: ["storefront-images"],
    revalidate: 300,
  }
);

// 2. React per-request deduplication
export const getStorefrontImages = cache(
  async (options: { onlyActive?: boolean } = { onlyActive: true }): Promise<StorefrontImage[]> => {
    const allImages = await getCachedStorefrontImages();
    if (options.onlyActive) {
      return allImages.filter((img) => img.is_active);
    }
    return allImages;
  }
);

/**
 * Revalidate all public and admin pages that render storefront images
 */
export function revalidateStorefrontData() {
  try {
    revalidateTag("storefront-images");
    revalidatePath("/", "page");
    revalidatePath("/gioi-thieu", "page");
    revalidatePath("/lien-he", "page");
    revalidatePath("/admin/settings", "page");
  } catch (err) {
    console.error("[Storefront] Revalidation error:", err);
  }
}

/**
 * Admin: Add a new storefront image
 */
export async function createStorefrontImage(data: {
  image_url: string;
  alt_text?: string | null;
  caption?: string | null;
  sort_order?: number;
  is_cover?: boolean;
  is_active?: boolean;
}): Promise<{ success: boolean; data?: StorefrontImage; error?: string }> {
  try {
    const supabase = await createServerClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    // If setting as cover, un-cover others first
    if (data.is_cover) {
      await supabase
        .from("storefront_images")
        .update({ is_cover: false })
        .neq("id", "00000000-0000-0000-0000-000000000000");
    }

    const { data: inserted, error } = await supabase
      .from("storefront_images")
      .insert({
        image_url: data.image_url,
        alt_text: data.alt_text || null,
        caption: data.caption || null,
        sort_order: data.sort_order ?? 0,
        is_cover: data.is_cover ?? false,
        is_active: data.is_active ?? true,
      })
      .select()
      .single();

    if (error) throw error;

    revalidateStorefrontData();
    return { success: true, data: inserted as StorefrontImage };
  } catch (err: any) {
    return { success: false, error: err.message || "Lỗi tạo ảnh cửa hàng" };
  }
}

/**
 * Admin: Update storefront image details
 */
export async function updateStorefrontImage(
  id: string,
  data: Partial<{
    alt_text: string | null;
    caption: string | null;
    sort_order: number;
    is_cover: boolean;
    is_active: boolean;
  }>
): Promise<{ success: boolean; data?: StorefrontImage; error?: string }> {
  try {
    const supabase = await createServerClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    if (data.is_cover) {
      await supabase
        .from("storefront_images")
        .update({ is_cover: false })
        .neq("id", id);
    }

    const { data: updated, error } = await supabase
      .from("storefront_images")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    revalidateStorefrontData();
    return { success: true, data: updated as StorefrontImage };
  } catch (err: any) {
    return { success: false, error: err.message || "Lỗi cập nhật ảnh cửa hàng" };
  }
}

/**
 * Admin: Delete a storefront image
 */
export async function deleteStorefrontImage(
  id: string,
  imageUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    // 1. Delete record from database
    const { error: dbError } = await supabase
      .from("storefront_images")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    // 2. Safely remove storage file if it belongs to storefront/ folder in equipment-images
    if (imageUrl && imageUrl.includes("/equipment-images/storefront/")) {
      try {
        const parts = imageUrl.split("/equipment-images/");
        if (parts.length > 1) {
          const storagePath = decodeURIComponent(parts[1].split("?")[0]);
          if (storagePath.startsWith("storefront/")) {
            await supabase.storage.from("equipment-images").remove([storagePath]);
          }
        }
      } catch (storageErr) {
        console.warn("[Storefront] Storage file deletion warning:", storageErr);
      }
    }

    revalidateStorefrontData();
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Lỗi xóa ảnh cửa hàng" };
  }
}

import "server-only";

import { cache } from "react";
import { unstable_cache, revalidateTag, revalidatePath } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { StorefrontImage } from "@/types/database";
import { optionalText, isSafeImageUrl, isSafeStoragePath, isUuid } from "@/lib/security/validation";

export const STOREFRONT_MIGRATION_SQL = `-- Chạy câu lệnh này trong Supabase Dashboard -> SQL Editor để tạo bảng storefront_images
CREATE TABLE IF NOT EXISTS public.storefront_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_cover BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.storefront_images ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = pg_catalog, public
AS $$
  SELECT COALESCE((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;

DROP POLICY IF EXISTS "Public can view active storefront images" ON public.storefront_images;
CREATE POLICY "Public can view active storefront images"
    ON public.storefront_images
    FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

DROP POLICY IF EXISTS "Admin full access storefront images" ON public.storefront_images;
DROP POLICY IF EXISTS "Authenticated admin full access to storefront images" ON public.storefront_images;
CREATE POLICY "Admin full access storefront images"
    ON public.storefront_images
    FOR ALL TO authenticated
    USING ((select public.is_admin()))
    WITH CHECK ((select public.is_admin()));
`;

function isTableMissingError(errorMessage: string): boolean {
  const msg = (errorMessage || "").toLowerCase();
  return (
    msg.includes("storefront_images") ||
    msg.includes("schema cache") ||
    msg.includes("does not exist") ||
    msg.includes("relation") ||
    msg.includes("pgrst204") ||
    msg.includes("42p01")
  );
}

/**
 * Get write-capable Supabase client: prefer Admin Client (Service Role) first,
 * then Server Client with session cookies.
 */
async function getWriteClient() {
  try {
    const admin = createAdminClient();
    if (admin) return admin;
  } catch {}
  return await createServerClient();
}

function validateStorefrontImageInput(data: Partial<StorefrontImage>): string | null {
  if (data.image_url !== undefined && !isSafeImageUrl(data.image_url)) return "URL ảnh không hợp lệ.";
  if (data.alt_text !== undefined && optionalText(data.alt_text, 255) === undefined) return "Alt text không hợp lệ.";
  if (data.caption !== undefined && optionalText(data.caption, 1000) === undefined) return "Chú thích ảnh không hợp lệ.";
  if (data.sort_order !== undefined && (!Number.isInteger(data.sort_order) || data.sort_order < 0 || data.sort_order > 10000)) return "Thứ tự ảnh không hợp lệ.";
  if (data.is_cover !== undefined && typeof data.is_cover !== "boolean") return "Trạng thái ảnh không hợp lệ.";
  if (data.is_active !== undefined && typeof data.is_active !== "boolean") return "Trạng thái ảnh không hợp lệ.";
  return null;
}

/**
 * Raw database query for storefront images.
 * Ordered by: is_cover DESC, sort_order ASC, created_at DESC
 */
async function fetchStorefrontImagesFromSupabase(clientOverride?: Awaited<ReturnType<typeof getWriteClient>>): Promise<StorefrontImage[]> {
  try {
    const supabase = clientOverride || createPublicClient() || (await getWriteClient());
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
      console.warn("[Storefront] Query warning (table may not be created yet):", error.message);
      return [];
    }

    return ((data as StorefrontImage[]) || []).filter((image) => isSafeImageUrl(image.image_url));
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
    // Admin management needs inactive rows; use the authenticated server
    // client for that path instead of the anonymous cached reader.
    const allImages = options.onlyActive === false
      ? await fetchStorefrontImagesFromSupabase(await getWriteClient())
      : await getCachedStorefrontImages();
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
}): Promise<{ success: boolean; data?: StorefrontImage; error?: string; sqlRequired?: boolean; sql?: string }> {
  try {
    const validationError = validateStorefrontImageInput(data);
    if (validationError) return { success: false, error: validationError };

    const supabase = await getWriteClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    // If setting as cover, un-cover others first
    if (data.is_cover) {
      try {
        await supabase
          .from("storefront_images")
          .update({ is_cover: false })
          .neq("id", "00000000-0000-0000-0000-000000000000");
      } catch {}
    }

    const { data: inserted, error } = await supabase
      .from("storefront_images")
      .insert({
        image_url: data.image_url,
        alt_text: optionalText(data.alt_text, 255),
        caption: optionalText(data.caption, 1000),
        sort_order: data.sort_order ?? 0,
        is_cover: data.is_cover ?? false,
        is_active: data.is_active ?? true,
      })
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error.message)) {
        return {
          success: false,
          error: "Bảng database 'storefront_images' chưa được tạo trong Supabase. Vui lòng mở Supabase SQL Editor và chạy câu lệnh SQL bên dưới.",
          sqlRequired: true,
          sql: STOREFRONT_MIGRATION_SQL,
        };
      }
      throw error;
    }

    revalidateStorefrontData();
    return { success: true, data: inserted as StorefrontImage };
  } catch (err: any) {
    const errorMsg = err.message || "Lỗi tạo ảnh cửa hàng";
    if (isTableMissingError(errorMsg)) {
      return {
        success: false,
        error: "Bảng database 'storefront_images' chưa được tạo trong Supabase. Vui lòng mở Supabase SQL Editor và chạy câu lệnh SQL bên dưới.",
        sqlRequired: true,
        sql: STOREFRONT_MIGRATION_SQL,
      };
    }
    return { success: false, error: errorMsg };
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
): Promise<{ success: boolean; data?: StorefrontImage; error?: string; sqlRequired?: boolean; sql?: string }> {
  try {
    if (!isUuid(id)) return { success: false, error: "ID ảnh không hợp lệ." };
    const validationError = validateStorefrontImageInput(data);
    if (validationError) return { success: false, error: validationError };

    const updatePayload: Record<string, unknown> = {};
    if ("alt_text" in data) updatePayload.alt_text = optionalText(data.alt_text, 255);
    if ("caption" in data) updatePayload.caption = optionalText(data.caption, 1000);
    if ("sort_order" in data) updatePayload.sort_order = data.sort_order;
    if ("is_cover" in data) updatePayload.is_cover = data.is_cover;
    if ("is_active" in data) updatePayload.is_active = data.is_active;

    const supabase = await getWriteClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    if (data.is_cover) {
      try {
        await supabase
          .from("storefront_images")
          .update({ is_cover: false })
          .neq("id", id);
      } catch {}
    }

    const { data: updated, error } = await supabase
      .from("storefront_images")
      .update({
        ...updatePayload,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (isTableMissingError(error.message)) {
        return {
          success: false,
          error: "Bảng database 'storefront_images' chưa được tạo trong Supabase.",
          sqlRequired: true,
          sql: STOREFRONT_MIGRATION_SQL,
        };
      }
      throw error;
    }

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
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isUuid(id)) return { success: false, error: "ID ảnh không hợp lệ." };
    const supabase = await getWriteClient();
    if (!supabase) return { success: false, error: "Chưa cấu hình Supabase" };

    const { data: existing, error: lookupError } = await supabase
      .from("storefront_images")
      .select("image_url")
      .eq("id", id)
      .maybeSingle();
    if (lookupError) throw lookupError;

    // 1. Delete record from database. The storage path is read from the row,
    // never trusted from a client query parameter.
    const { error: dbError } = await supabase
      .from("storefront_images")
      .delete()
      .eq("id", id);

    if (dbError) throw dbError;

    // 2. Safely remove storage file if it belongs to storefront/ folder in equipment-images
    const imageUrl = existing?.image_url;
    if (imageUrl && imageUrl.includes("/equipment-images/storefront/")) {
      try {
        const parts = imageUrl.split("/equipment-images/");
        if (parts.length > 1) {
          const storagePath = decodeURIComponent(parts[1].split("?")[0]);
          if (isSafeStoragePath(storagePath, ["storefront"])) {
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

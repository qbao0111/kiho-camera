import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getLocalEquipment, saveLocalEquipment } from "@/lib/local-storage";
import { Equipment } from "@/types/database";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";
import { validateEquipmentSaveInput } from "@/lib/security/validation";
import { isSameOriginRequest, InvalidRequestBodyError, RequestBodyLimitError, readJsonBody } from "@/lib/security/request";

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!isSameOriginRequest(req)) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const rawBody = await readJsonBody<unknown>(req, 256 * 1024);
    const validation = validateEquipmentSaveInput(rawBody);
    if (!validation.success) return NextResponse.json({ success: false, error: validation.error }, { status: 400 });
    const { id, payload, productImages, samplePhotos } = validation.data;

    // 1. Try Supabase if configured
    try {
      const supabase = await createClient();
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        let equipmentId = id;

        if (equipmentId) {
          const { error } = await supabase.from("equipment").update(payload).eq("id", equipmentId);
          if (error) throw error;

          await supabase.from("equipment_images").delete().eq("equipment_id", equipmentId);
          await supabase.from("equipment_sample_images").delete().eq("equipment_id", equipmentId);
        } else {
          const { data: newEquip, error } = await supabase.from("equipment").insert(payload).select().single();
          if (error) throw error;
          equipmentId = newEquip.id;
        }

        if (equipmentId && productImages && productImages.length > 0) {
          const imagePayloads = productImages.map((img: any, idx: number) => ({
            equipment_id: equipmentId,
            image_url: img.url,
            is_cover: img.isCover,
            sort_order: idx + 1,
          }));
          const { error: imageError } = await supabase.from("equipment_images").insert(imagePayloads);
          if (imageError) throw imageError;
        }

        if (equipmentId && samplePhotos && samplePhotos.length > 0) {
          const samplePayloads = samplePhotos.map((s: any, idx: number) => ({
            equipment_id: equipmentId,
            image_url: s.image_url,
            caption: s.caption || null,
            sort_order: idx + 1,
            is_active: s.is_active,
          }));
          const { error: sampleError } = await supabase.from("equipment_sample_images").insert(samplePayloads);
          if (sampleError) throw sampleError;
        }

        // Invalidate equipment caches
        try {
          revalidateTag("equipment");
          if (payload.slug) {
            revalidateTag(`equipment:${payload.slug}`);
            revalidatePath(`/thiet-bi/${payload.slug}`);
          }
          revalidatePath("/thiet-bi");
          revalidatePath("/");
        } catch (cacheErr) {
          console.warn("Equipment revalidation warning:", cacheErr);
        }

        return NextResponse.json({ success: true, id: equipmentId }, { headers: { "Cache-Control": "no-store" } });
      }
    } catch (supabaseErr) {
      console.warn("Supabase not available, using local JSON store:", supabaseErr);
    }

    if (!isLocalDataFallbackEnabled()) {
      return NextResponse.json(
        { success: false, error: "Supabase storage is unavailable." },
        { status: 503 }
      );
    }

    // 2. Explicit development-only local fallback
    const list = await getLocalEquipment();
    const equipmentId = id || `e${Date.now()}`;

    const formattedImages = (productImages || []).map((img: any, idx: number) => ({
      id: `img-${equipmentId}-${idx + 1}`,
      equipment_id: equipmentId,
      image_url: img.url,
      alt_text: String(payload.name),
      is_cover: img.isCover,
      sort_order: idx + 1,
    }));

    const formattedSamples = (samplePhotos || []).map((s: any, idx: number) => ({
      id: s.id || `s-${equipmentId}-${idx + 1}`,
      equipment_id: equipmentId,
      image_url: s.image_url,
      caption: s.caption || null,
      alt_text: `Ảnh chụp thực tế từ ${payload.name}`,
      sort_order: idx + 1,
      is_active: s.is_active !== undefined ? s.is_active : true,
    }));

    const newOrUpdatedEquipment = {
      id: equipmentId,
      ...payload,
      images: formattedImages,
      sample_images: formattedSamples,
    } as unknown as Equipment;

    const existingIndex = list.findIndex((e) => e.id === equipmentId || e.slug === payload.slug);

    if (existingIndex >= 0) {
      list[existingIndex] = newOrUpdatedEquipment;
    } else {
      list.push(newOrUpdatedEquipment);
    }

    await saveLocalEquipment(list);

    // Invalidate equipment caches
    try {
      revalidateTag("equipment");
      if (payload.slug) {
        revalidateTag(`equipment:${payload.slug}`);
        revalidatePath(`/thiet-bi/${payload.slug}`);
      }
      revalidatePath("/thiet-bi");
      revalidatePath("/");
    } catch (cacheErr) {
      console.warn("Equipment revalidation warning:", cacheErr);
    }

    return NextResponse.json({ success: true, id: equipmentId }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof RequestBodyLimitError) {
      return NextResponse.json({ success: false, error: "Dữ liệu gửi lên quá lớn." }, { status: 413 });
    }
    if (error instanceof InvalidRequestBodyError) {
      return NextResponse.json({ success: false, error: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
    }
    console.error(
      "Save equipment API error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { success: false, error: "Failed to save equipment." },
      { status: 500 }
    );
  }
}

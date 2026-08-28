import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLocalEquipment, saveLocalEquipment } from "@/lib/local-storage";
import { Equipment } from "@/types/database";
import { getAuthenticatedAdmin } from "@/lib/auth/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";

export async function POST(req: NextRequest) {
  if (!(await getAuthenticatedAdmin())) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, payload, productImages, samplePhotos } = body;

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
          await supabase.from("equipment_images").insert(imagePayloads);
        }

        if (equipmentId && samplePhotos && samplePhotos.length > 0) {
          const samplePayloads = samplePhotos.map((s: any, idx: number) => ({
            equipment_id: equipmentId,
            image_url: s.image_url,
            caption: s.caption || null,
            sort_order: idx + 1,
            is_active: s.is_active,
          }));
          await supabase.from("equipment_sample_images").insert(samplePayloads);
        }

        return NextResponse.json({ success: true, id: equipmentId });
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
      alt_text: payload.name,
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

    const newOrUpdatedEquipment: Equipment = {
      id: equipmentId,
      ...payload,
      images: formattedImages,
      sample_images: formattedSamples,
    };

    const existingIndex = list.findIndex((e) => e.id === equipmentId || e.slug === payload.slug);

    if (existingIndex >= 0) {
      list[existingIndex] = newOrUpdatedEquipment;
    } else {
      list.push(newOrUpdatedEquipment);
    }

    await saveLocalEquipment(list);

    return NextResponse.json({ success: true, id: equipmentId });
  } catch (error) {
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

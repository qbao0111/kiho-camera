import type { Equipment } from "@/types/database";

export const EQUIPMENT_IMAGE_FALLBACK = "/images/cameras/canon-r50.jpg";

export function getEquipmentCoverImage(equipment: Pick<Equipment, "images">) {
  return (
    equipment.images?.find((image) => image.is_cover)?.image_url ||
    equipment.images?.[0]?.image_url ||
    EQUIPMENT_IMAGE_FALLBACK
  );
}

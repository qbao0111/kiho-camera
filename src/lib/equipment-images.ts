import type { Equipment } from "@/types/database";
import { isSafeImageUrl } from "@/lib/security/validation";

export const EQUIPMENT_IMAGE_FALLBACK = "/images/cameras/canon-r50.jpg";

export function getEquipmentCoverImage(equipment: Pick<Equipment, "images">) {
  return (
    equipment.images?.find((image) => image.is_cover && isSafeImageUrl(image.image_url))?.image_url ||
    equipment.images?.find((image) => isSafeImageUrl(image.image_url))?.image_url ||
    EQUIPMENT_IMAGE_FALLBACK
  );
}

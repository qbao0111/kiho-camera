import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";
import { isLocalDataFallbackEnabled } from "@/lib/environment";
import {
  getLocalEquipment,
  saveLocalRentalRequest,
  type RentalRequestLead,
} from "@/lib/local-storage";

export interface RentalRequestInput {
  customerName: string;
  phone: string;
  equipmentId: string | null;
  equipmentName: string;
  equipmentBrand: string | null;
  rentalDate: string;
  returnDate: string;
  note: string;
  source: string;
}

export async function getActiveEquipmentForRental(equipmentId: string) {
  const supabase = createAdminClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("equipment")
      .select("id, name, brand, is_active")
      .eq("id", equipmentId)
      .eq("is_active", true)
      .maybeSingle();

    if (error?.code === "22P02") return null;
    if (error) throw new Error("Unable to validate equipment in Supabase.");
    return data;
  }

  if (isLocalDataFallbackEnabled()) {
    const equipment = (await getLocalEquipment()).find(
      (item) => item.id === equipmentId && item.is_active
    );
    return equipment
      ? {
          id: equipment.id,
          name: equipment.name,
          brand: equipment.brand,
          is_active: equipment.is_active,
        }
      : null;
  }

  throw new Error("Supabase rental storage is not configured.");
}

export async function saveRentalRequest(input: RentalRequestInput) {
  const supabase = createAdminClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("rental_requests")
      .insert({
        customer_name: input.customerName,
        phone: input.phone,
        equipment_id: input.equipmentId,
        equipment_name: input.equipmentName,
        equipment_brand: input.equipmentBrand,
        rental_date: input.rentalDate,
        return_date: input.returnDate,
        note: input.note || null,
        source: input.source,
        status: "new",
        integration_status: "pending",
      })
      .select("id, submitted_at")
      .single();

    if (error || !data) {
      throw new Error("Unable to persist rental request in Supabase.");
    }
    return { id: data.id as string, submittedAt: data.submitted_at as string };
  }

  if (isLocalDataFallbackEnabled()) {
    const submittedAt = new Date().toISOString();
    const lead: RentalRequestLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      customerName: input.customerName,
      phone: input.phone,
      equipmentId: input.equipmentId || undefined,
      equipmentName: input.equipmentName,
      rentalDate: input.rentalDate,
      returnDate: input.returnDate,
      note: input.note,
      source: input.source,
      submittedAt,
      status: "new",
    };
    await saveLocalRentalRequest(lead);
    return { id: lead.id, submittedAt };
  }

  throw new Error("Supabase rental storage is not configured.");
}

export async function updateRentalIntegrationStatus(
  id: string,
  status: "sent" | "failed" | "disabled",
  errorMessage?: string
) {
  const supabase = createAdminClient();
  if (!supabase) return;

  const { error } = await supabase
    .from("rental_requests")
    .update({
      integration_status: status,
      integration_error: errorMessage ? errorMessage.slice(0, 500) : null,
      integration_sent_at: status === "sent" ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error("Unable to update integration delivery status.");
}

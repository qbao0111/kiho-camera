import "server-only";

import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { getLocalEquipment } from "@/lib/local-storage";
import { MOCK_EQUIPMENT } from "@/lib/mock-data";
import { getEquipmentCoverImage } from "@/lib/equipment-images";
import { Equipment, PricingEquipmentDTO, RentalFormEquipmentDTO } from "@/types/database";
import { isLocalDataFallbackEnabled } from "@/lib/environment";
import { isSafeImageUrl } from "@/lib/security/validation";

function sanitizeEquipment(equipment: Equipment): Equipment {
  return {
    ...equipment,
    price_poster_url:
      equipment.price_poster_url && isSafeImageUrl(equipment.price_poster_url)
        ? equipment.price_poster_url
        : null,
    images: equipment.images?.filter((image) => isSafeImageUrl(image.image_url)),
    sample_images: equipment.sample_images?.filter((image) => isSafeImageUrl(image.image_url)),
  };
}


export interface EquipmentFilterOptions {
  categorySlug?: string;
  brand?: string;
  useCase?: string;
  searchQuery?: string;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "newest" | "featured";
  onlyActive?: boolean;
}

/**
 * Raw database query for full equipment list with related relations.
 */
async function fetchRawEquipmentList(): Promise<Equipment[]> {
  try {
    const supabase = createPublicClient();

    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (!isLocalDataFallbackEnabled()) return [];
      const list = await getLocalEquipment();
      return (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
    }

    const { data, error } = await supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*), sample_images:equipment_sample_images(*)")
      .order("sort_order", { ascending: true });

    if (error) {
      if (!isLocalDataFallbackEnabled()) {
        console.error("Supabase equipment query error:", error);
        throw new Error(`Database error fetching equipment: ${error.message}`);
      }
      const list = await getLocalEquipment();
      return (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
    }

    if (!data || data.length === 0) {
      if (!isLocalDataFallbackEnabled()) return [];
      const list = await getLocalEquipment();
      return (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
    }

    return (data as Equipment[]).map(sanitizeEquipment);
  } catch (err) {
    console.error("Error fetching equipment list from Supabase:", err);
    if (!isLocalDataFallbackEnabled()) {
      throw err;
    }
    try {
      const list = await getLocalEquipment();
      return (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
    } catch (_) {
      return MOCK_EQUIPMENT.map(sanitizeEquipment);
    }
  }
}

/**
 * Raw database query for single equipment by slug.
 */
async function fetchRawEquipmentBySlug(slug: string): Promise<Equipment | null> {
  try {
    const supabase = createPublicClient();

    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (!isLocalDataFallbackEnabled()) return null;
      const list = await getLocalEquipment();
      const all = (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
      return all.find((e) => e.slug === slug || e.id === slug) || null;
    }

    const { data, error } = await supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*), sample_images:equipment_sample_images(*)")
      .eq("slug", slug)
      .single();

    if (error) {
      // PGRST116 means 0 rows returned, which is a legitimate 404
      if (error.code === "PGRST116") {
        if (!isLocalDataFallbackEnabled()) return null;
        const list = await getLocalEquipment();
        const all = (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
        return all.find((e) => e.slug === slug || e.id === slug) || null;
      }

      if (!isLocalDataFallbackEnabled()) {
        console.error(`Database error fetching equipment slug "${slug}":`, error);
        throw new Error(`Database error fetching equipment "${slug}": ${error.message}`);
      }
      const list = await getLocalEquipment();
      const all = (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
      return all.find((e) => e.slug === slug || e.id === slug) || null;
    }

    if (!data) {
      return null;
    }

    return sanitizeEquipment(data as Equipment);
  } catch (err) {
    console.error(`Error fetching equipment slug "${slug}":`, err);
    if (!isLocalDataFallbackEnabled()) {
      throw err;
    }
    try {
      const list = await getLocalEquipment();
      const all = (list && list.length > 0 ? list : MOCK_EQUIPMENT).map(sanitizeEquipment);
      return all.find((e) => e.slug === slug || e.id === slug) || null;
    } catch (_) {
      return MOCK_EQUIPMENT.map(sanitizeEquipment).find((e) => e.slug === slug || e.id === slug) || null;
    }
  }
}

// 1. Next.js Data Cache (persisted across requests, invalidated via tag 'equipment', TTL 300s)
const getCachedEquipmentList = unstable_cache(
  fetchRawEquipmentList,
  ["equipment-list-all"],
  {
    tags: ["equipment"],
    revalidate: 300,
  }
);

const getCachedEquipmentBySlug = (slug: string) =>
  unstable_cache(
    () => fetchRawEquipmentBySlug(slug),
    ["equipment-by-slug", slug],
    {
      tags: ["equipment", `equipment:${slug}`],
      revalidate: 300,
    }
  )();

/**
 * Public cached & filtered equipment query.
 */
export async function getEquipmentList(options?: EquipmentFilterOptions): Promise<Equipment[]> {
  let list = await getCachedEquipmentList();

  if (options?.onlyActive !== false) {
    list = list.filter((e) => e.is_active);
  }

  if (options?.brand && options.brand !== "all") {
    const b = options.brand.toLowerCase();
    list = list.filter((e) => e.brand.toLowerCase() === b);
  }

  if (options?.useCase) {
    const uc = options.useCase.toLowerCase();
    list = list.filter((e) =>
      e.use_cases?.some((u) => u.toLowerCase() === uc)
    );
  }

  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase().trim();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.brand.toLowerCase().includes(q) ||
        e.short_description?.toLowerCase().includes(q) ||
        e.badges?.some((b) => b.toLowerCase().includes(q))
    );
  }

  if (options?.sortBy === "price_asc") {
    list = [...list].sort((a, b) => a.price_per_day - b.price_per_day);
  } else if (options?.sortBy === "price_desc") {
    list = [...list].sort((a, b) => b.price_per_day - a.price_per_day);
  } else if (options?.sortBy === "name_asc") {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list = [...list].sort((a, b) => a.sort_order - b.sort_order);
  }

  return list;
}

export const getFeaturedEquipment = cache(async (): Promise<Equipment[]> => {
  const all = await getEquipmentList({ onlyActive: true });
  return all.filter((e) => e.is_featured);
});

// React per-request memoization for equipment by slug (deduplicates generateMetadata + Page)
export const getEquipmentBySlug = cache(async (slug: string): Promise<Equipment | null> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 255) return null;
  return getCachedEquipmentBySlug(slug);
});

export const getRelatedEquipment = cache(
  async (currentSlug: string, brand?: string, limit: number = 4): Promise<Equipment[]> => {
    const all = await getEquipmentList({ onlyActive: true });
    return all
      .filter((e) => e.slug !== currentSlug && (brand ? e.brand.toLowerCase() === brand.toLowerCase() : true))
      .slice(0, limit);
  }
);

export function toPricingEquipmentDTO(e: Equipment): PricingEquipmentDTO {
  return {
    id: e.id,
    slug: e.slug,
    name: e.name,
    brand: e.brand,
    price_session: e.price_session,
    price_per_day: e.price_per_day,
    price_three_days: e.price_three_days,
    short_description: e.short_description,
    use_cases: e.use_cases || [],
    is_featured: e.is_featured,
    cover_image: getEquipmentCoverImage(e),
  };
}

export function toRentalFormEquipmentDTO(e: Equipment): RentalFormEquipmentDTO {
  return {
    id: e.id,
    slug: e.slug,
    name: e.name,
    brand: e.brand,
  };
}


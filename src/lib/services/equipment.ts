import { createClient } from "@/lib/supabase/server";
import { getLocalEquipment } from "@/lib/local-storage";
import { Equipment } from "@/types/database";

export interface EquipmentFilterOptions {
  categorySlug?: string;
  brand?: string;
  useCase?: string;
  searchQuery?: string;
  sortBy?: "price_asc" | "price_desc" | "name_asc" | "newest" | "featured";
  onlyActive?: boolean;
}

export async function getEquipmentList(options?: EquipmentFilterOptions): Promise<Equipment[]> {
  try {
    const supabase = await createClient();

    // Fallback or Local Development Mode
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      let list = await getLocalEquipment();

      if (options?.onlyActive !== false) {
        list = list.filter((e) => e.is_active);
      }

      if (options?.brand && options.brand !== "all") {
        list = list.filter((e) => e.brand.toLowerCase() === options.brand?.toLowerCase());
      }

      if (options?.useCase) {
        list = list.filter((e) =>
          e.use_cases.some(
            (u) => u.toLowerCase() === options.useCase?.toLowerCase()
          )
        );
      }

      if (options?.searchQuery) {
        const q = options.searchQuery.toLowerCase().trim();
        list = list.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.brand.toLowerCase().includes(q) ||
            e.short_description?.toLowerCase().includes(q) ||
            e.badges.some((b) => b.toLowerCase().includes(q))
        );
      }

      if (options?.sortBy === "price_asc") {
        list.sort((a, b) => a.price_per_day - b.price_per_day);
      } else if (options?.sortBy === "price_desc") {
        list.sort((a, b) => b.price_per_day - a.price_per_day);
      } else if (options?.sortBy === "name_asc") {
        list.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        list.sort((a, b) => a.sort_order - b.sort_order);
      }

      return list;
    }

    let query = supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*), sample_images:equipment_sample_images(*)")
      .order("sort_order", { ascending: true });

    if (options?.onlyActive !== false) {
      query = query.eq("is_active", true);
    }

    if (options?.brand && options.brand !== "all") {
      query = query.ilike("brand", options.brand);
    }

    if (options?.sortBy === "price_asc") {
      query = query.order("price_per_day", { ascending: true });
    } else if (options?.sortBy === "price_desc") {
      query = query.order("price_per_day", { ascending: false });
    } else if (options?.sortBy === "name_asc") {
      query = query.order("name", { ascending: true });
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getEquipmentList({ ...options });
    }

    let results = data as Equipment[];

    if (options?.useCase) {
      results = results.filter((item) =>
        item.use_cases?.some((u) => u.toLowerCase() === options.useCase?.toLowerCase())
      );
    }

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase().trim();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.short_description?.toLowerCase().includes(q)
      );
    }

    return results;
  } catch (err) {
    console.error("Error fetching equipment:", err);
    return getLocalEquipment();
  }
}

export async function getFeaturedEquipment(): Promise<Equipment[]> {
  const all = await getEquipmentList({ onlyActive: true });
  return all.filter((e) => e.is_featured);
}

export async function getEquipmentBySlug(slug: string): Promise<Equipment | null> {
  try {
    const supabase = await createClient();
    if (!supabase || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const list = await getLocalEquipment();
      return list.find((e) => e.slug === slug || e.id === slug) || null;
    }

    const { data, error } = await supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*), sample_images:equipment_sample_images(*)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const list = await getLocalEquipment();
      return list.find((e) => e.slug === slug || e.id === slug) || null;
    }

    return data as Equipment;
  } catch (err) {
    const list = await getLocalEquipment();
    return list.find((e) => e.slug === slug || e.id === slug) || null;
  }
}

export async function getRelatedEquipment(currentSlug: string, brand?: string, limit: number = 4): Promise<Equipment[]> {
  const all = await getEquipmentList({ onlyActive: true });
  return all
    .filter((e) => e.slug !== currentSlug && (brand ? e.brand.toLowerCase() === brand.toLowerCase() : true))
    .slice(0, limit);
}

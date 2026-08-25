import { createClient } from "@/lib/supabase/server";
import { MOCK_EQUIPMENT } from "@/lib/mock-data";
import { Equipment } from "@/types/database";

export interface EquipmentFilterOptions {
  categorySlug?: string;
  useCase?: string;
  searchQuery?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "featured";
  onlyActive?: boolean;
}

export async function getEquipmentList(options?: EquipmentFilterOptions): Promise<Equipment[]> {
  try {
    const supabase = await createClient();
    
    // Nếu chưa có supabase config, filter trên mock data
    if (!supabase) {
      let list = [...MOCK_EQUIPMENT];

      if (options?.onlyActive !== false) {
        list = list.filter((e) => e.is_active);
      }

      if (options?.categorySlug) {
        // category slug check
        if (options.categorySlug === "may-anh") {
          list = list.filter((e) => e.category_id?.includes("c1111111"));
        } else if (options.categorySlug === "lens") {
          list = list.filter((e) => e.category_id?.includes("c2222222"));
        } else if (options.categorySlug === "may-quay") {
          list = list.filter((e) => e.category_id?.includes("c3333333"));
        } else if (options.categorySlug === "gimbal") {
          list = list.filter((e) => e.category_id?.includes("c4444444"));
        } else if (options.categorySlug === "phu-kien") {
          list = list.filter((e) => e.category_id?.includes("c5555555"));
        }
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
            e.short_description?.toLowerCase().includes(q) ||
            e.badges.some((b) => b.toLowerCase().includes(q))
        );
      }

      if (options?.sortBy === "price_asc") {
        list.sort((a, b) => a.price_per_day - b.price_per_day);
      } else if (options?.sortBy === "price_desc") {
        list.sort((a, b) => b.price_per_day - a.price_per_day);
      } else {
        list.sort((a, b) => a.sort_order - b.sort_order);
      }

      return list;
    }

    let query = supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*)")
      .order("sort_order", { ascending: true });

    if (options?.onlyActive !== false) {
      query = query.eq("is_active", true);
    }

    if (options?.sortBy === "price_asc") {
      query = query.order("price_per_day", { ascending: true });
    } else if (options?.sortBy === "price_desc") {
      query = query.order("price_per_day", { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getEquipmentList({ ...options });
    }

    let results = data as Equipment[];

    if (options?.categorySlug) {
      results = results.filter((item) => item.category?.slug === options.categorySlug);
    }

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
          item.short_description?.toLowerCase().includes(q)
      );
    }

    return results;
  } catch (err) {
    console.error("Error fetching equipment:", err);
    return MOCK_EQUIPMENT;
  }
}

export async function getFeaturedEquipment(): Promise<Equipment[]> {
  const all = await getEquipmentList({ onlyActive: true });
  return all.filter((e) => e.is_featured);
}

export async function getEquipmentBySlug(slug: string): Promise<Equipment | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return MOCK_EQUIPMENT.find((e) => e.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("equipment")
      .select("*, category:categories(*), images:equipment_images(*)")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return MOCK_EQUIPMENT.find((e) => e.slug === slug) || null;
    }

    return data as Equipment;
  } catch (err) {
    return MOCK_EQUIPMENT.find((e) => e.slug === slug) || null;
  }
}

export async function getRelatedEquipment(currentSlug: string, categoryId?: string | null, limit: number = 4): Promise<Equipment[]> {
  const all = await getEquipmentList({ onlyActive: true });
  return all
    .filter((e) => e.slug !== currentSlug && (categoryId ? e.category_id === categoryId : true))
    .slice(0, limit);
}

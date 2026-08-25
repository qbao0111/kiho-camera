import { createClient } from "@/lib/supabase/server";
import { MOCK_CATEGORIES } from "@/lib/mock-data";
import { Category } from "@/types/database";

export async function getCategories(onlyActive: boolean = true): Promise<Category[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return onlyActive ? MOCK_CATEGORIES.filter((c) => c.is_active) : MOCK_CATEGORIES;
    }

    let query = supabase.from("categories").select("*").order("sort_order", { ascending: true });
    if (onlyActive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return onlyActive ? MOCK_CATEGORIES.filter((c) => c.is_active) : MOCK_CATEGORIES;
    }

    return data as Category[];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return onlyActive ? MOCK_CATEGORIES.filter((c) => c.is_active) : MOCK_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
    }

    return data as Category;
  } catch (err) {
    return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
  }
}

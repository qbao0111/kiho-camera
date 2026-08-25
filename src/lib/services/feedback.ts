import { createClient } from "@/lib/supabase/server";
import { MOCK_FEEDBACK } from "@/lib/mock-data";
import { Feedback } from "@/types/database";

export async function getFeedbackList(onlyActive: boolean = true): Promise<Feedback[]> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return onlyActive ? MOCK_FEEDBACK.filter((f) => f.is_active) : MOCK_FEEDBACK;
    }

    let query = supabase
      .from("feedback")
      .select("*, equipment:equipment(*)")
      .order("sort_order", { ascending: true })
      .order("feedback_date", { ascending: false });

    if (onlyActive) {
      query = query.eq("is_active", true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return onlyActive ? MOCK_FEEDBACK.filter((f) => f.is_active) : MOCK_FEEDBACK;
    }

    return data as Feedback[];
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return onlyActive ? MOCK_FEEDBACK.filter((f) => f.is_active) : MOCK_FEEDBACK;
  }
}

export async function getFeaturedFeedback(): Promise<Feedback[]> {
  const all = await getFeedbackList(true);
  return all.filter((f) => f.is_featured);
}

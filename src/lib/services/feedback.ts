import { cache } from "react";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { MOCK_FEEDBACK } from "@/lib/mock-data";
import { Feedback } from "@/types/database";

async function fetchRawFeedbackList(): Promise<Feedback[]> {
  try {
    const supabase = createPublicClient();
    if (!supabase) {
      return MOCK_FEEDBACK;
    }

    const { data, error } = await supabase
      .from("feedback")
      .select("*, equipment:equipment(*)")
      .order("sort_order", { ascending: true })
      .order("feedback_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return MOCK_FEEDBACK;
    }

    return data as Feedback[];
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return MOCK_FEEDBACK;
  }
}

const getCachedFeedbackList = unstable_cache(
  fetchRawFeedbackList,
  ["feedback-list-all"],
  {
    tags: ["feedback"],
    revalidate: 300,
  }
);

export const getFeedbackList = cache(async (onlyActive: boolean = true): Promise<Feedback[]> => {
  const all = await getCachedFeedbackList();
  return onlyActive ? all.filter((f) => f.is_active) : all;
});

export const getFeaturedFeedback = cache(async (): Promise<Feedback[]> => {
  const all = await getFeedbackList(true);
  return all.filter((f) => f.is_featured);
});

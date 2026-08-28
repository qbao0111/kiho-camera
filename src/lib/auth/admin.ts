import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getAuthenticatedAdmin() {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return error ? null : user;
}

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth/roles";

export async function getAuthenticatedAdmin() {
  try {
    const supabase = await createClient();
    if (!supabase) return null;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    return error || !isAdminUser(user) ? null : user;
  } catch {
    return null;
  }
}

import type { User } from "@supabase/supabase-js";

/**
 * Authorization is based on the server-controlled app_metadata claim.
 * Never use user_metadata here: users can edit that field themselves.
 */
export function isAdminUser(user: Pick<User, "app_metadata"> | null | undefined): boolean {
  return user?.app_metadata?.role === "admin";
}

import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    supabaseUrl.includes("your-project-id") ||
    serviceRoleKey.includes("your-service-role-key")
  ) {
    if (isProduction) {
      throw new Error(
        "Supabase server configuration is missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
      );
    }
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

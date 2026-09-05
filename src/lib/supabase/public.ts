import { createClient as createSupabaseClient } from "@supabase/supabase-js";

let publicSupabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * Lightweight, static-friendly Supabase client for public read-only queries.
 * Does not read cookies() from next/headers, making it 100% compatible with
 * Next.js unstable_cache, ISR, and static page generation.
 */
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes("your-project-id") ||
    supabaseAnonKey.includes("your-anon-public-key")
  ) {
    return null;
  }

  if (!publicSupabaseInstance) {
    publicSupabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return publicSupabaseInstance;
}

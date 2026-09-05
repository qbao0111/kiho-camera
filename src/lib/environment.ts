export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return Boolean(
    url &&
      anonKey &&
      !url.includes("your-project-id") &&
      !anonKey.includes("your-anon-public-key")
  );
}

export function isLocalDataFallbackEnabled(): boolean {
  // Local JSON is a development convenience only. A missing/invalid flag must
  // never silently enable it in a production deployment.
  if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
    return false;
  }
  return process.env.ALLOW_LOCAL_DATA_FALLBACK === "true";
}

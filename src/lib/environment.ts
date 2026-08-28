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
  if (process.env.ALLOW_LOCAL_DATA_FALLBACK === "false") {
    return false;
  }
  return true;
}

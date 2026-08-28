/** @type {import('next').RemotePattern[]} */
const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
];

try {
  const supabaseHostname = new URL(
    process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  ).hostname;
  if (supabaseHostname.endsWith('.supabase.co')) {
    remotePatterns.push({
      protocol: 'https',
      hostname: supabaseHostname,
      pathname: '/storage/v1/object/public/**',
    });
  }
} catch {
  // Supabase URL is validated by server-side configuration at runtime.
}

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;

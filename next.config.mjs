/** @type {import('next').RemotePattern[]} */
const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
  {
    protocol: 'https',
    hostname: 'images.pexels.com',
  },
  {
    protocol: 'https',
    hostname: '**.googleusercontent.com',
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

const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data: https: https://images.unsplash.com *.supabase.co https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://va.vercel-scripts.com https://vitals.vercel-insights.com https://script.google.com https://script.googleusercontent.com",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps/",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: cspDirectives,
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { remotePatterns },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default nextConfig;

// Only provider preview hosts may carry provider-generated noindex headers.
// A site's main *.netlify.app address is not treated as a draft deployment.
export function isStaticPreviewOrigin(origin) {
  const hostname = new URL(origin).hostname;
  return hostname.endsWith('.pages.dev') || /^[a-f0-9]{24}--[a-z0-9-]+\.netlify\.app$/.test(hostname) ||
    (process.env.KIHO_VERCEL_PREVIEW === '1' && hostname.endsWith('.vercel.app'));
}

import worker from './.open-next/worker.js';

export * from './.open-next/worker.js';

const PUBLIC_PATHS = new Set(['/', '/thiet-bi', '/gioi-thieu', '/lien-he', '/huong-dan-thue', '/chinh-sach-thue', '/feedback', '/photobooth', '/gia-thue-may-anh-dong-hoi', '/thue-may-anh-phong-nha', '/robots.txt', '/sitemap.xml']);
const VARIANT_HEADERS = ['accept', 'accept-language', 'accept-encoding', 'user-agent', 'rsc', 'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch', 'next-url'];

function canCache(request, pathname) {
  if (request.method !== 'GET' || request.headers.has('authorization') || request.headers.has('next-action') || request.headers.has('range')) return false;
  if (/no-cache|no-store/i.test(request.headers.get('cache-control') || '')) return false;
  // Unknown cookies and every authentication/session cookie bypass by default.
  const cookies = (request.headers.get('cookie') || '').split(';').map(c => c.trim()).filter(Boolean);
  if (cookies.some(cookie => !/^(_ga(?:_[^=]+)?|_gid|_gat(?:_[^=]+)?|_gcl_au)=/.test(cookie))) return false;
  return PUBLIC_PATHS.has(pathname) || /^\/thiet-bi\/[a-z0-9-]+$/.test(pathname) || /^\/so-sanh\/[a-z0-9-]+$/.test(pathname);
}

async function cacheKey(request, env) {
  const url = new URL(request.url);
  url.searchParams.delete('_rsc'); // Opaque Next cache-buster; tree/prefetch headers remain in key.
  const input = JSON.stringify([url.href, ...VARIANT_HEADERS.map(name => request.headers.get(name) || '')]);
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  const digest = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
  return new Request(`${url.origin}/__kiho_public_cache/${env.CF_VERSION_METADATA?.id || 'local'}/${digest}`);
}

function marked(response, status) {
  const result = new Response(response.body, response);
  result.headers.set('X-Kiho-Public-Cache', status);
  return result;
}

export default {
  ...worker,
  async fetch(request, env, ctx) {
    // OpenNext exposes its image handler independently of Next's unoptimized flag.
    // Source assets are already optimized; keep this unused proxy closed.
    const pathname = new URL(request.url).pathname;
    if (/^\/_next\/image(?:\/|$)/.test(pathname) || pathname.startsWith('/cdn-cgi/image/')) {
      return new Response('Not found', {
        status: 404,
        headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
      });
    }
    if (!canCache(request, pathname)) return worker.fetch(request, env, ctx);
    const key = await cacheKey(request, env);
    try {
      const hit = await caches.default.match(key);
      if (hit) return marked(hit, 'HIT');
    } catch { /* Cache outages must not prevent ordinary rendering. */ }
    const response = await worker.fetch(request, env, ctx);
    const type = response.headers.get('content-type') || '';
    const variesOnEverything = (response.headers.get('vary') || '').split(',').some(name => name.trim() === '*');
    if (response.status !== 200 || response.headers.has('set-cookie') || variesOnEverything || !/text\/html|text\/x-component|application\/xml|text\/xml|text\/plain/.test(type)) return response;
    const cached = new Response(response.clone().body, response);
    cached.headers.set('Cache-Control', 'public, max-age=0, s-maxage=120');
    ctx.waitUntil(caches.default.put(key, cached).catch(() => {}));
    // Browsers keep Next's original cache policy. Only the edge copy has a 120s TTL.
    return marked(response, 'MISS');
  },
};

import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';

let calls = 0;
const storage = new Map();
let responseHeaders = { 'content-type': 'text/html', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' };
let responseStatus = 200;
const worker = { fetch: async () => { calls++; return new Response(`render-${calls}`, { status: responseStatus, headers: responseHeaders }); } };
const source = fs.readFileSync('cloudflare-worker.mjs', 'utf8')
  .replace(/^import worker.*$/m, '').replace(/^export \*.*$/m, '').replace('export default', 'globalThis.entry =');
const context = vm.createContext({ worker, Request, Response, URL, TextEncoder, Uint8Array, crypto: webcrypto, caches: { default: {
  match: async request => storage.get(request.url)?.clone(),
  put: async (request, response) => { storage.set(request.url, response.clone()); },
} } });
vm.runInContext(source, context);
const env = { CF_VERSION_METADATA: { id: 'version-1' } };
const pending = [];
const ctx = { waitUntil: p => pending.push(p) };
async function get(path, headers = {}, init = {}) {
  const response = await context.entry.fetch(new Request('https://example.workers.dev' + path, { headers, ...init }), env, ctx);
  await Promise.all(pending.splice(0));
  return response;
}
assert.equal((await get('/')).headers.get('X-Kiho-Public-Cache'), 'MISS');
const first = calls;
assert.equal((await get('/')).headers.get('X-Kiho-Public-Cache'), 'HIT');
assert.equal(calls, first);
assert.equal((await get('/')).headers.get('X-Content-Type-Options'), 'nosniff');
assert.equal((await get('/', { rsc: '1', 'next-router-state-tree': 'tree-A' })).headers.get('X-Kiho-Public-Cache'), 'MISS');
assert.equal((await get('/', { rsc: '1', 'next-router-state-tree': 'tree-B' })).headers.get('X-Kiho-Public-Cache'), 'MISS');
assert.equal((await get('/?_rsc=a', { rsc: '1', 'next-router-state-tree': 'tree-A' })).headers.get('X-Kiho-Public-Cache'), 'HIT');
assert.equal((await get('/?category=camera')).headers.get('X-Kiho-Public-Cache'), 'MISS');
assert.equal((await get('/', { cookie: '_ga=tracking' })).headers.get('X-Kiho-Public-Cache'), 'HIT');
for (const headers of [{ cookie: 'sb-project-auth-token.0=session' }, { cookie: 'unknown=session' }, { authorization: 'Bearer test' }, { 'next-action': 'test' }, { 'cache-control': 'no-cache' }]) {
  assert.equal((await get('/', headers)).headers.get('X-Kiho-Public-Cache'), null);
}
for (const path of ['/admin', '/api/rental-request', '/api/upload', '/unlisted']) assert.equal((await get(path)).headers.get('X-Kiho-Public-Cache'), null);
assert.equal((await get('/', {}, { method: 'POST' })).headers.get('X-Kiho-Public-Cache'), null);
env.CF_VERSION_METADATA.id = 'version-2';
assert.equal((await get('/')).headers.get('X-Kiho-Public-Cache'), 'MISS');
responseHeaders = { 'content-type': 'text/html', 'set-cookie': 'session=secret' };
assert.equal((await get('/gioi-thieu')).headers.get('X-Kiho-Public-Cache'), null);
responseHeaders = { 'content-type': 'text/html', vary: 'Accept-Encoding, *' };
assert.equal((await get('/lien-he')).headers.get('X-Kiho-Public-Cache'), null);
responseStatus = 500;
responseHeaders = { 'content-type': 'text/html' };
assert.equal((await get('/feedback')).headers.get('X-Kiho-Public-Cache'), null);
const before = calls;
for (const path of ['/_next/image?url=x', '/_next/image/', '/cdn-cgi/image/width=100/x']) assert.equal((await get(path)).status, 404);
assert.equal(calls, before);
console.log('Worker cache self-check passed: public hits, RSC/tree/query separation, cookie/auth/API/action bypass, version invalidation, no caching errors/Set-Cookie, image proxy rejection. Cache API mocked; live CPU separately measured.');

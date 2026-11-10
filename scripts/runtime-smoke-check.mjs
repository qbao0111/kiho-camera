import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://127.0.0.1:8787';
const get = path => fetch(base + path, { redirect: 'manual' });
for (const path of ['/', '/thiet-bi', '/gioi-thieu', '/lien-he', '/huong-dan-thue', '/gia-thue-may-anh-dong-hoi', '/thue-may-anh-phong-nha', '/so-sanh/canon-r50-vs-canon-g7x-mark-iii', '/so-sanh/fujifilm-x100v-vs-x100vi']) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes('<title>') && html.includes('https://kihocamera.com'), path);
  assert.ok(!html.includes('/_next/image'), path);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), path);
  console.log(path, response.status);
}
const robots = await get('/robots.txt');
assert.equal(robots.status, 200);
const rules = await robots.text();
assert.ok(rules.includes('Allow: /') && rules.includes('https://kihocamera.com/sitemap.xml'));
assert.ok(!rules.includes('Disallow: /images') && !rules.includes('Disallow: /image-variants'));
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.ok(xml.includes('https://kihocamera.com/thue-may-anh-phong-nha'));
const login = await get('/admin');
assert.ok([302, 303, 307, 308].includes(login.status));
assert.ok(login.headers.get('location').includes('/admin/login'));
for (const path of ['/api/admin/settings', '/api/upload', '/api/equipment']) assert.equal((await fetch(base + path, { method: 'POST', body: '{}' })).status, 401, path);
const post = (body, origin = 'https://kihocamera.com') => fetch(base + '/api/rental-request', { method: 'POST', headers: { 'content-type': 'application/json', origin }, body: JSON.stringify(body) });
assert.equal((await post({ hp_website: 'spam' })).status, 200);
assert.equal((await post({})).status, 400);
assert.equal((await post({ hp_website: 'spam' }, 'https://evil.example')).status, 403);
const image = await fetch(base + '/images/landing/hero-quang-binh.webp', { headers: { 'user-agent': 'Googlebot-Image/1.0' } });
assert.equal(image.status, 200);
assert.ok(image.headers.get('content-type').includes('image/'));
for (const path of ['/_next/image?url=%2Fimages%2Fcameras%2Fcanon-r50.jpg&w=640&q=75', '/_next/image/', '/cdn-cgi/image/width=640/images/cameras/canon-r50.jpg']) {
  assert.equal((await get(path)).status, 404, `Unused image proxy must be closed: ${path}`);
}
console.log('Runtime HTTP/SEO/image/anonymous authorization/honeypot/validation smoke passed. Successful DB bookings and real authenticated sessions are not exercised.');

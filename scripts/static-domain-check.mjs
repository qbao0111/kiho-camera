import assert from 'node:assert/strict';
import fs from 'node:fs';

// Uses ordinary DNS and certificate validation. Never bypass TLS verification.
const origin = 'https://kihocamera.com';
const suffix = '/thiet-bi/canon-eos-r50?utm_source=cutover&ref=kiho';
const cases = [
  { url: origin, status: 200, final: origin + '/' },
  { url: 'http://kihocamera.com' + suffix, status: 301, final: origin + suffix },
  { url: 'https://www.kihocamera.com' + suffix, status: 301, final: origin + suffix },
  { url: 'http://www.kihocamera.com' + suffix, status: 301, final: origin + suffix },
];
const checks = [];
for (const test of cases) {
  let url = new URL(test.url).href;
  const hops = [];
  for (let attempt = 0; attempt < 5; attempt++) {
    const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    const location = response.headers.get('location');
    hops.push({ url, status: response.status, location, server: response.headers.get('server') });
    if (attempt === 0) assert.equal(response.status, test.status, test.url);
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel();
      const next = new URL(location, url);
      assert.ok(['kihocamera.com', 'www.kihocamera.com'].includes(next.hostname), 'Unexpected redirect host');
      assert.equal(response.status, 301, 'Permanent domain/HTTPS redirect must be 301');
      url = next.href;
      continue;
    }
    assert.equal(response.status, 200, 'Final public page must load');
    assert.equal(url, test.final, 'Redirect must retain path and query');
    assert.ok(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), 'Production noindex header');
    await response.body?.cancel();
    break;
  }
  assert.equal(hops.at(-1)?.status, 200, 'Redirect loop or too many redirects');
  checks.push({ requested: test.url, hops, final: url });
}
fs.mkdirSync('scratch', { recursive: true });
fs.writeFileSync('scratch/static-domain-report.json', JSON.stringify({ capturedAt: new Date().toISOString(), tlsValidated: true, ordinarySystemDns: true, checks }, null, 2));
console.log('Production domain checks passed: valid HTTPS, apex 200, HTTP/www 301, exact path/query preservation, no production noindex header.');

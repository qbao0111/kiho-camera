import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE_JSON || import.meta.url);
const { chromium } = require('playwright');
const origin = process.argv[2];
assert.ok(origin?.startsWith('http'), 'Provide an authorized staging/local URL');
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failures = [], requested = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('request', request => requested.push(request.url()));
  page.on('response', response => {
    if (['image', 'script'].includes(response.request().resourceType()) && response.status() >= 400) failures.push(`Asset HTTP ${response.status()}: ${response.url()}`);
  });
  assert.equal((await page.goto(origin, { waitUntil: 'networkidle' })).status(), 200);
  await page.getByRole('button', { name: /Xem trọn bộ \d+ ảnh/ }).click();
  const photos = page.getByRole('button', { name: /^Xem ảnh chụp từ / });
  const count = await photos.count();
  assert.ok(count > 10, 'Expansion renders more than initial ten samples');
  for (let i = 0; i < count; i++) {
    await photos.nth(i).evaluate(el => { const figure = el.closest('figure'); figure.parentElement.scrollLeft = figure.offsetLeft - figure.parentElement.offsetLeft; });
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(1000);
  const loaded = await photos.evaluateAll(elements => elements.map(el => {
    const image = el.querySelector('img');
    return { complete: image.complete, width: image.naturalWidth, src: image.currentSrc };
  }));
  assert.ok(loaded.every(i=>i.complete && i.width > 0 && i.src.includes('/image-variants/')), 'All expanded samples decode responsive variants');
  await photos.first().click();
  assert.equal(await page.locator('[role="dialog"]').count(), 1);
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('[role="dialog"]').count(), 0);
  await page.locator('a[href="/thiet-bi"]').filter({ hasText: 'Xem 12 dòng máy' }).click();
  await page.waitForURL('**/thiet-bi');
  await page.waitForLoadState('networkidle');
  await page.locator('a[href="/thiet-bi/canon-eos-r50"]').first().click();
  await page.waitForURL('**/thiet-bi/canon-eos-r50');
  await page.waitForLoadState('networkidle');
  assert.match(await page.locator('h1').innerText(), /canon/i, 'Product heading renders after client navigation');
  assert.deepEqual(failures, []);
  assert.ok(requested.every(u=>!u.includes('/_next/image') && !u.includes('/_vercel/insights/')), 'No runtime optimizer or unsupported Vercel analytics request');
  console.log(`Browser navigation passed: ${count} expanded responsive samples, lightbox/arrows/Escape, client home→catalog→product navigation, no optimizer/analytics/asset/page errors. Authenticated admin not exercised.`);
} finally { await browser.close(); }

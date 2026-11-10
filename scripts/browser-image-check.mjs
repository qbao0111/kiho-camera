import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

// Use an installed Playwright package, or a bundled runtime passed by its package.json path.
const require = createRequire(process.env.PLAYWRIGHT_PACKAGE_JSON || import.meta.url);
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://127.0.0.1:3000';
const output = process.argv[3] || 'scratch/browser-images.json';
fs.mkdirSync(path.dirname(output), { recursive: true });
const browser = await chromium.launch({ headless: true, channel: process.env.BROWSER_CHANNEL || 'chrome' });
const report = [];
const routes = process.argv.includes('--without-database')
  ? ['/', '/thiet-bi', '/photobooth', '/thue-may-anh-phong-nha']
  : ['/', '/thiet-bi', '/thiet-bi/canon-eos-r50', '/photobooth', '/thue-may-anh-phong-nha'];
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
      await page.addInitScript(() => {
        window.imageMetrics = { lcp: null, cls: 0 };
        new PerformanceObserver(list => { for (const e of list.getEntries()) window.imageMetrics.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.imageMetrics.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      });
      const requests = [];
      const payloads = [];
      const errors = [];
      page.on('request', r => { if (r.url().includes('/_next/image')) errors.push('Optimizer request: ' + r.url()); });
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => {
        if (r.request().resourceType() === 'image') {
          const entry = { url: r.url(), status: r.status(), bytes: null };
          requests.push(entry);
          payloads.push(r.body().then(body => { entry.bytes = body.length; }).catch(() => {}));
        }
      });
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      const initial = await page.evaluate(() => ({ ...window.imageMetrics, resources: performance.getEntriesByType('resource').filter(e => e.initiatorType === 'img').map(e => ({ url: e.name, bytes: e.transferSize })), canonical: document.querySelector('link[rel="canonical"]')?.href, robots: document.querySelector('meta[name="robots"]')?.content, og: document.querySelector('meta[property="og:image"]')?.content, title: document.title, jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent)) }));
      for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 700) {
        await page.evaluate(y => window.scrollTo(0, y), y);
        await page.waitForTimeout(120);
      }
      if (route === '/thiet-bi/canon-eos-r50' && response.status() === 200) {
        await page.locator('button[aria-label="Phóng to ảnh"]').click();
        await page.waitForTimeout(300);
        assert.ok(await page.locator('[role="dialog"]').count(), 'Product lightbox opens');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('[role="dialog"]').count(), 0, 'Lightbox closes');
      }
      await page.waitForTimeout(1500);
      const images = await page.evaluate(() => [...document.images].filter(i => i.getBoundingClientRect().width > 0).map(i => ({ src: i.currentSrc, naturalWidth: i.naturalWidth, complete: i.complete })));
      await Promise.all(payloads);
      const result = { viewport, route, status: response.status(), initial, requests, images, errors };
      report.push(result);
      assert.equal(response.status(), 200, route);
      assert.deepEqual(errors, [], route);
      // Off-screen horizontal rail images intentionally remain lazy/unrequested.
      assert.ok(images.every(i => !i.complete || i.naturalWidth > 0), 'Broken image on ' + route);
      assert.ok(requests.every(i => i.status >= 200 && i.status < 400), 'Image HTTP failure on ' + route);
      assert.ok(initial.canonical?.startsWith('https://kihocamera.com'), 'Canonical domain');
      if (route !== '/photobooth') assert.ok(!initial.robots?.includes('noindex'), route);
      if (route === '/' && viewport.width === 390) await page.screenshot({ path: path.join(path.dirname(output), 'homepage-mobile.png'), fullPage: true });
      await page.close();
    }
  }
  // Exercise the actual browser encoder, independent of an authenticated upload.
  const page = await browser.newPage();
  await page.goto(base);
  const code = ts.transpileModule(fs.readFileSync('src/lib/prepare-image-upload.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const upload = await page.evaluate(async code => {
    const exports = {};
    new Function('exports', code)(exports);
    const canvas = document.createElement('canvas'); canvas.width = 3200; canvas.height = 2400;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
    const png = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const file = await exports.prepareImageUpload(new File([png], 'photo.png', { type: 'image/png' }), 'product');
    const bitmap = await createImageBitmap(file);
    const result = { type: file.type, bytes: file.size, width: bitmap.width, height: bitmap.height };
    bitmap.close();
    const gif = new File(['GIF89a'], 'animation.gif', { type: 'image/gif' });
    result.gifPreserved = (await exports.prepareImageUpload(gif, 'product')) === gif;
    try { await exports.prepareImageUpload(new File(['bad'], 'bad.svg', { type: 'image/svg+xml' }), 'product'); } catch { result.svgRejected = true; }
    return result;
  }, code);
  assert.deepEqual({ type: upload.type, width: upload.width, height: upload.height }, { type: 'image/webp', width: 1600, height: 1200 });
  assert.ok(upload.bytes <= 2 * 1024 * 1024 && upload.gifPreserved && upload.svgRejected);
  console.log('Browser encoder passed:', upload);
} finally {
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log('Browser image/SEO checks passed:', report.map(r => ({ route: r.route, width: r.viewport.width, lcpMs: r.initial.lcp, cls: r.initial.cls, requests: r.requests.length, imagePayloadBytes: r.requests.reduce((sum, r) => sum + (r.bytes || 0), 0) })));

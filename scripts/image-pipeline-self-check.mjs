import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import config from '../next.config.mjs';

const require = createRequire(import.meta.url);
const manifest = JSON.parse(fs.readFileSync('src/data/image-variants.json', 'utf8'));
const remoteSources = JSON.parse(fs.readFileSync('scripts/remote-image-sources.json', 'utf8'));
assert.equal(config.images.unoptimized, true);
assert.equal(config.poweredByHeader, false);
assert.ok(config.images.remotePatterns.some(p => p.hostname === 'images.unsplash.com'));
assert.ok((await config.headers())[0].headers.some(h => h.key === 'Content-Security-Policy-Report-Only'));
const source = fs.readFileSync('src/components/ui/source-image.tsx', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
const context = { exports: {}, require: name => name === '@/data/image-variants.json' ? manifest : require(name) };
vm.runInNewContext(compiled, context);
const Image = context.exports.default;
for (const src of ['/images/cameras/canon-r50.jpg', '/images/landing/cutouts/fujifilm-x100v.png', 'https://example.supabase.co/storage/v1/object/public/equipment-images/product/test.webp', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', 'https://images.pexels.com/photos/1/test.jpeg', 'https://lh3.googleusercontent.com/example', 'blob:test', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7']) {
  for (const priority of [false, true]) {
    const html = renderToStaticMarkup(React.createElement(Image, { src, alt: 'Camera detail', fill: true, sizes: '300px', priority }));
    assert.ok(!html.includes('/_next/image'), html);
    assert.ok(html.includes('alt="Camera detail"'));
    if (manifest[src]) {
      assert.ok(html.includes('<source'));
      assert.ok(html.includes('position:absolute;inset:0'), 'Fill picture must retain a positioned parent');
      assert.ok(html.includes('srcSet=') || html.includes('srcset='));
      assert.ok(!html.includes('rel="preload"'));
      assert.ok(html.includes(`loading="${priority ? 'eager' : 'lazy'}"`));
    }
  }
}
for (const [src, entry] of Object.entries(manifest)) {
  if (src.startsWith('https://')) {
    assert.ok(remoteSources.some(s => s.url === src && s.bytes === entry.originalBytes));
    const html = renderToStaticMarkup(React.createElement(Image, { src, alt: 'Public source snapshot', fill: true, sizes: '300px' }));
    assert.ok(html.includes('/image-variants/') && html.includes('<source') && !html.includes('/_next/image'));
  } else assert.ok(fs.existsSync(path.join('public', src)), src);
  assert.ok(entry.variants.length > 0);
  let width = 0;
  for (const variant of entry.variants) {
    const bytes = fs.readFileSync(path.join('public', variant.src));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.equal(bytes.length, variant.bytes);
    assert.ok(variant.width > width && variant.width <= entry.width);
    assert.ok(Math.max(variant.width, variant.height) <= 1600);
    assert.ok(Math.abs(variant.height - entry.height * variant.width / entry.width) <= 1);
    width = variant.width;
  }
}
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (/\.[jt]sx?$/.test(file)) {
      const text = fs.readFileSync(file, 'utf8');
      assert.ok(!text.includes('/_next/image'), file);
      assert.ok(!/unoptimized\s*=\s*\{false\}|\bloader\s*=\s*\{/.test(text), file);
      if (text.includes('from "next/image"')) assert.equal(file.replaceAll('\\', '/'), 'src/components/ui/source-image.tsx');
    }
  }
}
scan('src');
console.log(`Image self-check passed: ${Object.keys(manifest).length} source mappings, responsive files, reviewed remote snapshots and remote/blob/data rendering, lazy/priority behavior, no optimizer paths.`);

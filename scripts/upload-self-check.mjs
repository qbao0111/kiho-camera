import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const next = require('next/server');
const transpile = file => ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText;
const helpers = { exports: {}, require: name => name === 'server-only' ? {} : require(name), process, Buffer, TextEncoder, TextDecoder, URL };
vm.runInNewContext(transpile('src/lib/security/request.ts'), helpers);
let admin = true, uploads = 0;
const client = { storage: { from: bucket => {
  assert.equal(bucket, 'equipment-images');
  return {
    upload: async (name, bytes, options) => { uploads++; assert.ok(bytes.length <= 2 * 1024 * 1024); assert.equal(options.upsert, false); return { data: { path: name }, error: null }; },
    getPublicUrl: object => ({ data: { publicUrl: 'https://test.supabase.co/storage/v1/object/public/equipment-images/' + object } }),
  };
} } };
const dependencies = {
  '@/lib/supabase/server': { createClient: async () => client },
  '@/lib/supabase/admin': { createAdminClient: () => client },
  '@/lib/auth/admin': { getAuthenticatedAdmin: async () => admin ? { id: 'test-admin' } : null },
  '@/lib/environment': { isLocalDataFallbackEnabled: () => false },
  '@/lib/security/request': helpers.exports,
  '@/lib/security/validation': { isSafeStoragePath: () => false },
};
const context = { exports: {}, require: name => dependencies[name] || require(name), process, Buffer, console };
vm.runInNewContext(transpile('src/app/api/upload/route.ts'), context);
const before = process.env.NEXT_PUBLIC_SUPABASE_URL;
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
try {
  const submit = async (bytes, type = 'image/jpeg', origin = 'https://kihocamera.com', declaredLength) => {
    const body = new FormData(); body.set('file', new File([bytes], 'test.jpg', { type })); body.set('folder', 'product');
    return context.exports.POST(new next.NextRequest('https://kihocamera.com/api/upload', { method: 'POST', headers: { origin, ...(declaredLength ? { 'content-length': String(declaredLength) } : {}) }, body }));
  };
  const jpeg = new Uint8Array([255, 216, 255, 0]);
  admin = false; assert.equal((await submit(jpeg)).status, 401);
  admin = true; assert.equal((await submit(jpeg, 'image/jpeg', 'https://evil.example')).status, 403);
  assert.equal((await submit(jpeg, 'image/svg+xml')).status, 400);
  assert.equal((await submit(new Uint8Array([1,2,3]), 'image/jpeg')).status, 400);
  assert.equal((await submit(new Uint8Array(2 * 1024 * 1024 + 1))).status, 400);
  assert.equal((await submit(jpeg, 'image/jpeg', 'https://kihocamera.com', 3 * 1024 * 1024)).status, 413);
  assert.equal(uploads, 0);
  const response = await submit(jpeg);
  assert.equal(response.status, 200); assert.equal(uploads, 1);
  assert.ok((await response.json()).url.includes('/storage/v1/object/public/equipment-images/product/'));
  console.log('Upload self-check passed: auth/origin/type/signature/2 MiB limits and public Storage URL contract. Storage/auth mocked; no objects uploaded or deleted.');
} finally {
  if (before === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL; else process.env.NEXT_PUBLIC_SUPABASE_URL = before;
}

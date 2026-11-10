import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { exports, require: name => name === 'server-only' ? {} : dependencies[name] || require(name), process, Buffer, TextEncoder, TextDecoder, URL, Intl, Date, console, AbortSignal, ...globals });
  return exports;
}
const requestHelpers = load('src/lib/security/request.ts');
const roles = load('src/lib/auth/roles.ts');
assert.equal(roles.isAdminUser({ app_metadata: { role: 'admin' } }), true);
assert.equal(roles.isAdminUser({ user_metadata: { role: 'admin' } }), false);
assert.equal(roles.isAdminUser(null), false);
let saved = [], statuses = [], rateCalls = 0, webhookCalls = 0;
let allowed = true, saveFails = false, deliveryFails = false, active = true;
const handler = load('src/app/api/rental-request/route.ts', {
  '@/lib/security/request': requestHelpers,
  '@/lib/rate-limit': { checkRentalRequestRateLimit: async () => { rateCalls++; return allowed; } },
  '@/lib/services/rental-requests': {
    getActiveEquipmentForRental: async () => active ? { name: 'Canon R50', brand: 'Canon' } : null,
    saveRentalRequest: async data => { if (saveFails) throw new Error('simulated persistence failure'); saved.push(data); return { id: 'test-lead', submittedAt: new Date().toISOString() }; },
    updateRentalIntegrationStatus: async (...args) => statuses.push(args),
  },
  '@/lib/services/integrations': {
    getIntegrationSettings: async () => ({ enabled: true, apps_script_url: 'https://script.google.com/test', notification_email: 'test@example.com' }),
    getDecryptedWebhookSecret: async () => 'fake-test-secret',
  },
}, { fetch: async (_url, options) => {
  assert.ok(saved.length > 0, 'Persist before notifying');
  const body = JSON.parse(options.body);
  assert.equal(body.secret, 'fake-test-secret');
  assert.equal(body.equipmentName, 'Canon R50');
  webhookCalls++;
  return { ok: !deliveryFails, status: deliveryFails ? 500 : 200, json: async () => ({ success: !deliveryFails }) };
} });
const next = require('next/server');
const future = days => new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
const valid = { customerName: 'Test customer', phone: '0325500399', rentalDate: future(10), returnDate: future(11), equipmentId: 'test-camera', source: 'test' };
const submit = (body, origin = 'https://kihocamera.com') => handler.POST(new next.NextRequest('https://kihocamera.com/api/rental-request', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) }));
assert.equal((await submit(valid, 'https://evil.example')).status, 403);
assert.equal((await submit({ hp_website: 'spam' })).status, 200);
assert.equal(rateCalls, 0); assert.equal(saved.length, 0);
for (const patch of [{ phone: 'bad' }, { customerName: '=' }, { rentalDate: '2026-02-30' }, { rentalDate: '2020-01-01' }, { returnDate: future(9) }, { note: 'x'.repeat(501) }]) assert.equal((await submit({ ...valid, ...patch })).status, 400);
assert.equal((await submit({ ...valid, note: 'x'.repeat(33000) })).status, 413);
allowed = false; assert.equal((await submit(valid)).status, 429); assert.equal(saved.length, 0);
allowed = true; active = false; assert.equal((await submit(valid)).status, 400); assert.equal(saved.length, 0);
active = true; assert.equal((await submit(valid)).status, 200); assert.equal(saved.length, 1); assert.equal(statuses.at(-1)[1], 'sent');
deliveryFails = true; assert.equal((await submit(valid)).status, 200); assert.equal(saved.length, 2); assert.equal(statuses.at(-1)[1], 'failed');
saveFails = true; assert.equal((await submit(valid)).status, 503); assert.equal(webhookCalls, 2);
const before = process.env.STAGING_ORIGIN;
process.env.STAGING_ORIGIN = 'https://kiho-camera-staging.example.workers.dev';
assert.equal(requestHelpers.isSameOriginRequest(new Request('https://kiho-camera-staging.example.workers.dev/api/rental-request', { headers: { origin: process.env.STAGING_ORIGIN } })), true);
if (before === undefined) delete process.env.STAGING_ORIGIN; else process.env.STAGING_ORIGIN = before;
console.log('Booking self-check passed: origin, size/field/date validation, honeypot, rate-limit rejection, equipment validation, save-before-notify, delivery failure, save failure and trusted admin role. DB/Auth/network are mocked.');

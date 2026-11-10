import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';

const config = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
assert.equal(config.name, 'kiho-camera-staging');
assert.equal(config.workers_dev, true);
assert.equal(config.main, 'cloudflare-worker.mjs');
assert.equal(config.version_metadata.binding, 'CF_VERSION_METADATA');
// Free enforces 10 ms itself; custom CPU limits target the Standard usage model.
assert.ok(!config.limits, 'Do not add a custom CPU/paid usage override to the Free config');
for (const binding of ['routes', 'route', 'r2_buckets', 'images', 'kv_namespaces', 'queues', 'd1_databases', 'durable_objects', 'services', 'env']) assert.ok(!config[binding], `Unexpected binding/domain: ${binding}`);
assert.ok(fs.existsSync('.open-next/dry-run/cloudflare-worker.js'), 'Run cf:build and cf:dry-run first');
const size = gzipSync(fs.readFileSync('.open-next/dry-run/cloudflare-worker.js')).length;
const bundleBytes = fs.readdirSync('.open-next/dry-run', { recursive: true })
  .map(file => path.join('.open-next/dry-run', file))
  .filter(file => fs.statSync(file).isFile() && !file.endsWith('.map'))
  .reduce((total, file) => total + fs.statSync(file).size, 0);
assert.ok(bundleBytes <= 64 * 1024 * 1024, 'Worker modules exceed current 64 MiB uncompressed limit');
// Conservative guard also fits the older documented 3 MiB Free limit.
assert.ok(size <= 3 * 1024 * 1024, `Compressed worker ${size} bytes exceeds conservative Free gate`);
if (process.argv.includes('--check')) {
  console.log(`Staging config guard passed (${size} compressed entry bytes, ${bundleBytes} uncompressed module bytes); no production routes or paid bindings. Account plan, secrets and live CPU still require verification.`);
} else {
  assert.equal(process.env.CLOUDFLARE_FREE_PLAN_CONFIRMED, 'true', 'Confirm Workers Free in the dashboard, then set CLOUDFLARE_FREE_PLAN_CONFIRMED=true. This flag does not prove CPU feasibility.');
  const cli = path.resolve('node_modules/@opennextjs/cloudflare/dist/cli/index.js');
  const result = spawnSync(process.execPath, [cli, 'deploy'], { stdio: 'inherit', env: process.env });
  process.exitCode = result.status ?? 1;
}

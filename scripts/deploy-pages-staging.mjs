import assert from 'node:assert/strict';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import './check-static-export.mjs';
const project='kiho-camera-static-staging';
const branch='static-recovery';
if(process.argv.includes('--check')) console.log(`Pages staging deploy guard passed: project=${project}, branch=${branch}; no functions/domain/DNS/paid bindings.`);
else {
  // User explicitly requires Pages Free and no Workers execution; opt out of CLI delegation.
  const args=['pages','deploy',path.resolve('.static-site/out'),'--project-name',project,'--branch',branch,'--commit-dirty=true','--force'];
  const result=spawnSync(process.execPath,[path.resolve('node_modules/wrangler/bin/wrangler.js'),...args],{cwd:path.resolve('.static-site'),env:process.env,stdio:'inherit'});
  assert.equal(result.status,0,'Pages staging deployment failed');
}

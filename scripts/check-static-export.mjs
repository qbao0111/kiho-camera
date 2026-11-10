import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const root = '.static-site/out';
const data = JSON.parse(fs.readFileSync('static-site/data/public-catalog.json','utf8'));
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
const routes = ['/', '/thiet-bi','/gioi-thieu','/lien-he','/huong-dan-thue','/chinh-sach-thue','/feedback','/photobooth','/gia-thue-may-anh-dong-hoi','/thue-may-anh-phong-nha','/so-sanh/canon-r50-vs-canon-g7x-mark-iii','/so-sanh/fujifilm-x100v-vs-x100vi', ...data.equipment.map(e=>'/thiet-bi/'+e.slug)];
const files = walk(root);
assert.ok(files.length <= 20000);
assert.ok(files.every(f=>fs.statSync(f).size<=25*1024*1024));
for (const entry of ['_worker.js','functions','api','admin']) assert.ok(!fs.existsSync(path.join(root,entry)),`Unexpected runtime/route ${entry}`);
for (const f of files.filter(f=>/\.(html|js|txt|xml|json)$/.test(f))) {
  const text = fs.readFileSync(f,'utf8');
  for (const forbidden of ['/_next/image?', '/api/rental-request', '/api/contact-click', '/rest/v1/', '/auth/v1/', 'INTEGRATION_ENCRYPTION_KEY', 'SUPABASE_SERVICE_ROLE_KEY','encrypted_webhook_secret','script.google.com/macros/']) assert.ok(!text.includes(forbidden),`Runtime/private reference ${forbidden} in ${f}`);
  assert.ok(!/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/.test(text),`JWT credential in ${f}`);
  assert.ok(!/https?:[^"\s<>]*\.supabase\.co/.test(text),`Supabase runtime URL in ${f}`);
}
for (const route of routes) {
  const file = path.join(root,route==='/'?'index.html':route+'.html');
  assert.ok(fs.existsSync(file),route);
  const html=fs.readFileSync(file,'utf8');
  assert.ok(html.includes('https://kihocamera.com'),route+' canonical');
  if(!['/photobooth','/feedback'].includes(route)) assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html),route+' noindex');
  if(route.startsWith('/thiet-bi/')) assert.ok(html.includes('&quot;Product&quot;')||html.includes('"@type":"Product"'),route+' schema');
  if(route==='/thiet-bi') for(const e of data.equipment) assert.ok(html.includes(e.slug),'Catalog product missing pre-rendered HTML: '+e.slug);
}
assert.ok(fs.existsSync(root+'/404.html'));
const sitemap=fs.readFileSync(root+'/sitemap.xml','utf8');
for(const e of data.equipment) assert.ok(sitemap.includes('https://kihocamera.com/thiet-bi/'+e.slug));
assert.ok(fs.readFileSync(root+'/robots.txt','utf8').includes('Sitemap: https://kihocamera.com/sitemap.xml'));
for(const src of JSON.parse(fs.readFileSync('scripts/remote-image-sources.json','utf8'))) {
  const bytes=fs.readFileSync(root+'/image-originals/'+src.sha256+'.jpg');
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),src.sha256);
}
for(const camera of data.equipment) {
  assert.equal(camera.is_active,true);
  assert.ok(/^[a-z0-9-]+$/.test(camera.slug));
  for(const p of ['price_session','price_per_day','price_three_days']) assert.ok(Number.isFinite(camera[p])&&camera[p]>=0);
  assert.ok(Object.values(camera.specifications).every(v=>typeof v==='string'));
}
for(const image of JSON.parse(fs.readFileSync('static-site/data/static-image-variants.json','utf8')))for(const v of image.variants){
  assert.ok(fs.existsSync(root+v.src),'Missing critical responsive asset '+v.src);
  if(fs.existsSync('static-site/public'+v.src))assert.ok(path.basename(v.src).startsWith(crypto.createHash('sha256').update(fs.readFileSync(root+v.src)).digest('hex').slice(0,16)),'Critical asset hash mismatch');
}
const report={publicRoutes:routes.length,products:data.equipment.length,files:files.length,totalBytes:files.reduce((s,f)=>s+fs.statSync(f).size,0),largest:files.map(f=>({file:f.replaceAll('\\','/'),bytes:fs.statSync(f).size})).sort((a,b)=>b.bytes-a.bytes).slice(0,5),runtimeFunctions:0};
fs.mkdirSync('scratch',{recursive:true});fs.writeFileSync('scratch/static-export-report.json',JSON.stringify(report,null,2));
console.log('Static export guard passed:',JSON.stringify(report));
export { routes };

import assert from 'node:assert/strict';
import fs from 'node:fs';
import {isStaticPreviewOrigin} from './static-preview-origin.mjs';
const origin=process.argv[2];
assert.ok(origin?.startsWith('http'));
const data=JSON.parse(fs.readFileSync('static-site/data/public-catalog.json','utf8'));
const paths=['/','/thiet-bi','/gioi-thieu','/lien-he','/huong-dan-thue','/chinh-sach-thue','/feedback','/photobooth','/gia-thue-may-anh-dong-hoi','/thue-may-anh-phong-nha','/so-sanh/canon-r50-vs-canon-g7x-mark-iii','/so-sanh/fujifilm-x100v-vs-x100vi',...data.equipment.map(e=>'/thiet-bi/'+e.slug)];
const results=[];
for(const p of paths) {
  const r=await fetch(origin+p);
  const html=await r.text();
  assert.equal(r.status,200,p);
  assert.ok(html.includes(`href="https://kihocamera.com${p==='/'?'':p}"`)||html.includes(`href="https://kihocamera.com${p==='/'?'/':p}"`),p+' canonical');
  assert.ok(!html.includes('/_next/image?')&&!html.includes('/rest/v1/')&&!html.includes('/api/rental-request'),p);
  assert.equal(r.headers.get('x-content-type-options'),'nosniff');
  assert.ok(/max-age=0/.test(r.headers.get('cache-control')||'') && /must-revalidate/.test(r.headers.get('cache-control')||''),p+' HTML cache must revalidate');
  if(!['/photobooth','/feedback'].includes(p)) assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html),p);
  const robotsHeader=r.headers.get('x-robots-tag');
  if(!isStaticPreviewOrigin(origin) && !['/photobooth','/feedback'].includes(p)) assert.ok(!/noindex/i.test(robotsHeader||''),p+' production must be indexable');
  results.push({path:p,status:r.status,robotsHeader});
}
for(const p of ['/robots.txt','/sitemap.xml']) { const r=await fetch(origin+p);const text=await r.text();assert.equal(r.status,200);assert.ok(text.includes('https://kihocamera.com')); }
for(const p of ['/admin','/admin/login','/api/rental-request','/_next/image?url=x','/definitely-missing-kiho-page']) assert.equal((await fetch(origin+p,{redirect:'manual'})).status,404,p+' must not SPA-fallback');
const og=await fetch(origin+'/images/landing/hero-quang-binh.webp',{headers:{'user-agent':'Googlebot-Image/1.0'}});assert.equal(og.status,200);assert.ok(og.headers.get('content-type')?.startsWith('image/'));
const chunks=fs.readdirSync('.static-site/out/_next/static/chunks').find(f=>f.endsWith('.js'));
const image=JSON.parse(fs.readFileSync('static-site/data/static-image-variants.json','utf8'))[0].variants[0].src;
for(const p of ['/_next/static/chunks/'+chunks,image]){const r=await fetch(origin+p,{method:'HEAD'});assert.equal(r.status,200);assert.ok(/max-age=31536000/.test(r.headers.get('cache-control')||'')&&/immutable/.test(r.headers.get('cache-control')||''),p+' fingerprinted cache');}
fs.writeFileSync('scratch/static-runtime-report.json',JSON.stringify({origin,public:results,missingRoutes404:true,seo:true,cachePolicies:true},null,2));
console.log(`Static HTTP checks passed: ${paths.length} public routes, canonicals/headers/indexability, sitemap/robots/Googlebot OG, admin/API/optimizer/unknown 404.`);

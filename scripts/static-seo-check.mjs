import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {routes} from './check-static-export.mjs';
import {isStaticPreviewOrigin} from './static-preview-origin.mjs';
const require=createRequire(process.env.PLAYWRIGHT_PACKAGE_JSON||import.meta.url);
const {chromium}=require('playwright');
const origin=process.argv[2];
assert.ok(origin?.startsWith('https://') || new URL(origin).hostname === '127.0.0.1');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
const report={origin,pages:[],assets:[],internalLinks:0,previewNoindex:[],problems:[]};
const assetPaths=new Set();
try {
 for(const route of routes){
  const response=await fetch(origin+route);assert.equal(response.status,200,route);
  assert.equal(new URL(response.url).hostname,new URL(origin).hostname,'Unexpected redirect host');
  const html=await response.text();
  const parsed=await page.evaluate(text=>{
   const d=new DOMParser().parseFromString(text,'text/html');
   return {title:d.title,description:d.querySelector('meta[name="description"]')?.content,canonical:d.querySelector('link[rel="canonical"]')?.getAttribute('href'),robots:[...d.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map(e=>e.content),og:d.querySelector('meta[property="og:image"]')?.content,links:[...d.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')),images:[...d.querySelectorAll('img')].map(i=>({src:i.getAttribute('src'),hasAlt:i.hasAttribute('alt')})),ids:[...d.querySelectorAll('[id]')].map(e=>e.id),schema:[...d.querySelectorAll('script[type="application/ld+json"]')].map(e=>JSON.parse(e.textContent)),blockingStylesheets:d.querySelectorAll('link[rel="stylesheet"]').length};
  },html);
  assert.ok(parsed.title?.trim()&&parsed.description?.trim(),route+' metadata');
  assert.equal(parsed.canonical,'https://kihocamera.com'+(route==='/'?'':route),route+' canonical');
  if(!['/feedback','/photobooth'].includes(route))assert.ok(parsed.robots.every(r=>!/noindex/i.test(r)),route+' application noindex');
  const header=response.headers.get('x-robots-tag');if(/noindex/i.test(header||''))report.previewNoindex.push(route);
  assert.ok(parsed.schema.length>=2,route+' global structured data');
  if(route.startsWith('/thiet-bi/')){
   const product=parsed.schema.find(s=>s['@type']==='Product');assert.ok(product?.name&&product.image&&product.offers,route+' product schema');
  }
  for(const i of parsed.images){assert.ok(i.hasAlt,route+' missing image alt attribute');if(i.src&&!/^(data:|blob:)/.test(i.src))assetPaths.add(new URL(i.src,'https://kihocamera.com'+route).pathname)}
  if(parsed.og){const u=new URL(parsed.og);assert.equal(u.hostname,'kihocamera.com',route+' OG host');assetPaths.add(u.pathname)}
  if(process.argv[3])assert.equal(parsed.blockingStylesheets,0,route+' inline CSS missing');
  for(const href of parsed.links){
   assert.ok(!/\.pages\.dev|\.workers\.dev|\.netlify\.app/.test(href),route+' staging link');
   if(/^(tel:|mailto:|https?:\/\/(?!kihocamera\.com(?:\/|$)))/.test(href))continue;
   const u=new URL(href,'https://kihocamera.com'+route);if(u.hostname!=='kihocamera.com')continue;
   const target=u.pathname==='/'?'index.html':u.pathname.replace(/^\//,'')+'.html';
   assert.ok(routes.includes(u.pathname)||fs.existsSync(path.join('.static-site/out',u.pathname)),route+' broken internal path '+href);
   if(u.hash){const local=fs.readFileSync(path.join('.static-site/out',target),'utf8');const id=decodeURIComponent(u.hash.slice(1));assert.ok(local.includes('id="'+id+'"'),route+' missing anchor '+href)}
   report.internalLinks++;
  }
  report.pages.push({route,title:parsed.title,description:parsed.description,canonical:parsed.canonical,schemaTypes:parsed.schema.map(s=>s['@type']),images:parsed.images.length});
 }
 const urls=[...assetPaths];
 for(let i=0;i<urls.length;i+=8)await Promise.all(urls.slice(i,i+8).map(async p=>{const r=await fetch(origin+p,{method:'HEAD',headers:{'user-agent':'Googlebot-Image/1.0'}});assert.equal(r.status,200,p);assert.ok(r.headers.get('content-type')?.startsWith('image/'),p+' image MIME');report.assets.push({path:p,status:r.status})}));
 const sitemap=await(await fetch(origin+'/sitemap.xml')).text();const robots=await(await fetch(origin+'/robots.txt')).text();
 assert.ok(!/pages\.dev|workers\.dev|netlify\.app/.test(sitemap+robots));assert.ok(robots.includes('Sitemap: https://kihocamera.com/sitemap.xml'));assert.ok(!/Disallow:\s*\/\s*(?:\r?\n|$)/.test(robots));
 assert.ok(await page.evaluate(text=>!new DOMParser().parseFromString(text,'application/xml').querySelector('parsererror'),sitemap),'Sitemap XML parse');
 const sitemapUrls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);for(const u of sitemapUrls){assert.equal(new URL(u).origin,'https://kihocamera.com');assert.ok(routes.includes(new URL(u).pathname),'Unknown sitemap path '+u)}
 assert.equal(new Set(sitemapUrls).size,22,'Expected 22 indexable sitemap URLs');
 report.sitemapUrls=sitemapUrls.length;
 if(process.argv[3]){const before=JSON.parse(fs.readFileSync(process.argv[3]));assert.deepEqual(report.pages.map(({route,title,description,canonical})=>({route,title,description,canonical})),before.pages.map(({route,title,description,canonical})=>({route,title,description,canonical})),'SEO metadata changed');report.metadataMatchesBaseline=true;}
 if(!isStaticPreviewOrigin(origin))assert.ok(report.previewNoindex.every(p=>['/feedback','/photobooth'].includes(p)),'Production public noindex header');
 console.log(JSON.stringify({pages:report.pages.length,images:report.assets.length,internalLinks:report.internalLinks,sitemapUrls:report.sitemapUrls,previewNoindex:report.previewNoindex.length,metadataMatchesBaseline:report.metadataMatchesBaseline}));
}finally{await browser.close();fs.mkdirSync('scratch',{recursive:true});fs.writeFileSync('scratch/static-seo-'+(process.argv[3]?'after':'before')+'.json',JSON.stringify(report,null,2))}

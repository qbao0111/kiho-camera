import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const root = process.cwd();
const target = path.resolve('.static-site');
assert.equal(target, path.join(root,'.static-site'));
assert.ok(fs.existsSync('static-site/data/public-catalog.json'), 'Export reviewed public data first');
// Delete only our generated checkout; never source or original full-stack output.
fs.rmSync(target,{recursive:true,force:true});
fs.mkdirSync(path.join(target,'src/app'),{recursive:true});
for (const f of ['package.json','tsconfig.json','next-env.d.ts','tailwind.config.ts','postcss.config.mjs','.eslintrc.json']) if (fs.existsSync(f)) fs.copyFileSync(f,path.join(target,f));
for (const f of ['layout.tsx','globals.css','robots.ts','sitemap.ts']) fs.copyFileSync('src/app/'+f,path.join(target,'src/app',f));
fs.cpSync('src/app/(public)',path.join(target,'src/app/(public)'),{recursive:true});
for (const dir of ['components/public','components/ui','components/analytics','lib','types','data']) fs.cpSync('src/'+dir,path.join(target,'src',dir),{recursive:true});
fs.rmSync(path.join(target,'src/lib/supabase'),{recursive:true,force:true});
// Only the generated target receives pure file-backed readers.
let equipment = fs.readFileSync('src/lib/services/equipment.ts','utf8').replace(/\r\n/g,'\n');
assert.ok(equipment.includes('/**\n * Raw database query'), 'Equipment source boundary changed; review static adapter');
equipment = `import { cache } from "react";\nimport data from "@/data/public-catalog.json";\nimport { Equipment, PricingEquipmentDTO, RentalFormEquipmentDTO } from "@/types/database";\nimport { getEquipmentCoverImage } from "@/lib/equipment-images";\n` + equipment.slice(equipment.indexOf('export interface EquipmentFilterOptions'),equipment.indexOf('/**\n * Raw database query'));
const original = fs.readFileSync('src/lib/services/equipment.ts','utf8').replace(/\r\n/g,'\n');
equipment += `const getCachedEquipmentList = async (): Promise<Equipment[]> => data.equipment as unknown as Equipment[];\nconst getCachedEquipmentBySlug = async (slug: string): Promise<Equipment|null> => (data.equipment as unknown as Equipment[]).find(e=>e.slug===slug) || null;\n` + original.slice(original.indexOf('export async function getEquipmentList'));
fs.rmSync(path.join(target,'src/lib/services'),{recursive:true,force:true});
fs.mkdirSync(path.join(target,'src/lib/services'));
fs.writeFileSync(path.join(target,'src/lib/services/equipment.ts'),equipment);
const services = fs.readFileSync('static-site/overrides/services.ts');
for (const name of ['settings','storefront','feedback','categories']) fs.writeFileSync(path.join(target,`src/lib/services/${name}.ts`),services);
fs.copyFileSync('static-site/data/public-catalog.json',path.join(target,'src/data/public-catalog.json'));
fs.copyFileSync('static-site/overrides/rental-request-form.tsx',path.join(target,'src/components/public/rental-request-form.tsx'));
let analytics = fs.readFileSync('src/lib/analytics.ts','utf8');
const start = analytics.indexOf('export function sendContactClickNotification');
const end = analytics.indexOf('/**',start);
analytics = analytics.slice(0,start)+`export function sendContactClickNotification(_params: { channel: "messenger" | "zalo"; placement: string; cameraSlug?: string; cameraName?: string }): void {}\n\n`+analytics.slice(end);
fs.writeFileSync(path.join(target,'src/lib/analytics.ts'),analytics);
function walk(dir) { return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]); }
for (const file of walk(path.join(target,'src/app')).filter(f=>/\.tsx?$/.test(f))) {
  let code = fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n').replace(/export const (?:revalidate|dynamic) = [^;]+;\n/g,'');
  if (file.endsWith('robots.ts') || file.endsWith('sitemap.ts')) code += '\nexport const dynamic = "force-static";\n';
  if (file.endsWith(path.join('[slug]','page.tsx'))) code += `\nexport const dynamicParams = false;\nexport async function generateStaticParams() { const { getEquipmentList } = await import("@/lib/services/equipment"); return (await getEquipmentList()).map(e=>({slug:e.slug})); }\n`;
  if (file.endsWith(path.join('thiet-bi','page.tsx'))) {
    code = code.replace('export default async function EquipmentListPage({ searchParams: pendingSearchParams }: EquipmentPageProps) {\n  const searchParams = await pendingSearchParams;', 'export default function EquipmentListPage() {\n  const searchParams = useSearchParams();');
    // Preserve original catalog UI while moving query-dependent filtering to browser.
    code = code.replace(/interface EquipmentPageProps[\s\S]*?export default/, 'export default');
    code = code.replace(/searchParams\.(brand|useCase|search|sort)/g,(_,key)=>`searchParams.get("${key}") || undefined`);
    code = code.replace('const allEquipment = await getEquipmentList({ onlyActive: true });','const allEquipment = data.equipment as unknown as Equipment[];');
    code = '"use client";\nimport { useSearchParams } from "next/navigation";\nimport { Suspense, useState, useEffect } from "react";\nimport data from "@/data/public-catalog.json";\nimport type { Equipment } from "@/types/database";\n'+code;
    code = code.replace('const searchParams = useSearchParams();','const [query, setQuery] = useState("");\n  const searchParams = new URLSearchParams(query);');
    code = code.replace('<div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">','<div className="bg-[#faf8f5] min-h-screen py-10 sm:py-16">\n      <Suspense><CatalogQuery onChange={setQuery} /></Suspense>');
    code = code.replace('<CatalogFilterBar','<Suspense><CatalogFilterBar').replace('brands={brands}\n        />','brands={brands}\n        /></Suspense>');
    assert.ok(!code.includes('pendingSearchParams') && code.includes('</Suspense>'), 'Catalog source changed; review static adapter');
    code += '\nfunction CatalogQuery({ onChange }: { onChange: (value: string) => void }) { const params = useSearchParams(); const query = params.toString(); useEffect(() => onChange(query), [query, onChange]); return null; }\n';
    const metaStart = code.indexOf('export const metadata:');
    const metaEnd = code.indexOf('\nexport default',metaStart);
    const metadata = code.slice(metaStart,metaEnd);
    code = code.slice(0,metaStart)+code.slice(metaEnd);
    fs.mkdirSync(path.join(target,'src/components/static'),{recursive:true});
    fs.writeFileSync(path.join(target,'src/components/static/catalog.tsx'),code);
    code = `import { Suspense } from "react";\nimport type { Metadata } from "next";\nimport { buildPageMetadata } from "@/lib/seo/metadata";\nimport Catalog from "@/components/static/catalog";\n${metadata}\nexport default function CatalogPage() { return <Suspense><Catalog /></Suspense>; }\n`;
  }
  code = code.replace('Để lại lịch trình và số điện thoại, Kiho sẽ tư vấn', 'Nhắn lịch trình qua Messenger hoặc Zalo, Kiho sẽ tư vấn');
  fs.writeFileSync(file,code);
}
const section = path.join(target,'src/components/public/rental-request-section.tsx');
fs.writeFileSync(section,fs.readFileSync(section,'utf8').replace('Để lại lịch trình và số điện thoại, Kiho sẽ tư vấn','Nhắn lịch trình qua Messenger hoặc Zalo, Kiho sẽ tư vấn'));
fs.cpSync('public',path.join(target,'public'),{recursive:true});
fs.cpSync('static-site/public/image-variants',path.join(target,'public/image-variants'),{recursive:true});
const header=path.join(target,'src/components/public/header.tsx');
fs.writeFileSync(header,fs.readFileSync(header,'utf8').replace('src="/brand/kiho-logo-header-transparent.png"','src="/brand/kiho-logo-header-transparent.png" priority sizes="(max-width: 639px) 50px, 60px"'));
const hero=path.join(target,'src/components/public/hero-camera-showcase.tsx');
fs.writeFileSync(hero,fs.readFileSync(hero,'utf8').replace('sizes="360px"','sizes={isCenter ? "(max-width: 639px) calc(72vw - 23.04px), 360px" : "(max-width: 639px) calc(38vw - 12.16px), 190px"}'));
// Mirror reviewed public Storage originals locally, including zoom; no remote runtime.
const manifest = JSON.parse(fs.readFileSync('src/data/image-variants.json','utf8'));
for(const image of JSON.parse(fs.readFileSync('static-site/data/static-image-variants.json','utf8')))manifest[image.source]={width:image.width,height:image.height,variants:image.variants};
const snapshot = JSON.parse(fs.readFileSync('static-site/data/public-catalog.json','utf8'));
let serialized = JSON.stringify(snapshot);
fs.mkdirSync(path.join(target,'public/image-originals'),{recursive:true});
for (const source of JSON.parse(fs.readFileSync('scripts/remote-image-sources.json','utf8'))) {
  const local = `/image-originals/${source.sha256}.jpg`;
  const original = path.join('static-site/public/image-originals',source.sha256+'.jpg');
  assert.ok(fs.existsSync(original),'Missing committed public original');
  fs.copyFileSync(original,path.join(target,'public',local));
  serialized = serialized.split(source.url).join(local);
  manifest[local] = manifest[source.url];
  delete manifest[source.url];
}
fs.writeFileSync(path.join(target,'src/data/public-catalog.json'),serialized+'\n');
fs.writeFileSync(path.join(target,'src/data/image-variants.json'),JSON.stringify(manifest)+'\n');
let config = fs.readFileSync('next.config.mjs','utf8');
// Trace confirms two render-blocking stylesheet requests delay first paint and hero rendering.
// Supported by the installed Next 15 schema; only this static target inlines CSS.
config = config.replace('export default nextConfig;', 'const { headers, ...staticConfig } = nextConfig;\nexport default { ...staticConfig, output: "export", trailingSlash: false, experimental: { ...staticConfig.experimental, inlineCss: true } };');
fs.writeFileSync(path.join(target,'next.config.mjs'),config);
// No runtime-only modules should survive even in unused generated source.
for (const name of ['auth','local-storage.ts','rate-limit.ts','encryption.ts','environment.ts']) fs.rmSync(path.join(target,'src/lib',name),{recursive:true,force:true});
const tsconfig = JSON.parse(fs.readFileSync(path.join(target,'tsconfig.json'),'utf8'));
tsconfig.exclude = ['node_modules'];
fs.writeFileSync(path.join(target,'tsconfig.json'),JSON.stringify(tsconfig,null,2));
// Explicit safe environment only: do not inherit production Supabase/service keys.
const env = Object.fromEntries(Object.entries(process.env).filter(([key])=>!/(SUPABASE|ENCRYPTION|WEBHOOK|SECRET|TOKEN|VERCEL|NEXT_PUBLIC_)/i.test(key)));
Object.assign(env,{ NODE_ENV:'production',NEXT_PUBLIC_SITE_URL:'https://kihocamera.com', NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.STATIC_GA_MEASUREMENT_ID || '' });
const result = spawnSync(process.execPath,[path.join(root,'node_modules/next/dist/bin/next'),'build'],{cwd:target,env,stdio:'inherit'});
assert.equal(result.status,0,'Static Next build failed');
assert.ok(!fs.existsSync(path.join(target,'out/_worker.js')) && !fs.existsSync(path.join(target,'out/functions')));
console.log('Static export complete: .static-site/out. No API/admin/middleware/Workers runtime deployed.');

import fs from 'node:fs';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=createRequire(require.resolve('next/package.json'))('sharp');
const manifest=JSON.parse(fs.readFileSync('src/data/image-variants.json','utf8'));
const entries=[];
fs.mkdirSync('static-site/public/image-variants',{recursive:true});
for(const {source,widths,quality} of [
 {source:'/brand/kiho-logo-header-transparent.png',widths:[80,160],quality:85},
 ...['canon-r50','fujifilm-x100v','canon-g7x-mark3'].map(name=>({source:`/images/landing/cutouts/${name}.png`,widths:[480],quality:86})),
]){
 const variants=[];
 for(const width of widths){
  const {data,info}=await sharp('public'+source).rotate().resize({width,withoutEnlargement:true}).webp({quality,alphaQuality:100}).toBuffer({resolveWithObject:true});
  const src=`/image-variants/${crypto.createHash('sha256').update(data).digest('hex').slice(0,16)}-${width}.webp`;
  fs.writeFileSync('static-site/public'+src,data);variants.push({src,width:info.width,height:info.height});
 }
 const existing=manifest[source];
 entries.push({source,...existing,variants:[...variants,...existing.variants].sort((a,b)=>a.width-b.width)});
}
fs.writeFileSync('static-site/data/static-image-variants.json',JSON.stringify(entries,null,2)+'\n');
console.log('Prepared five content-hashed transparent WebPs for the header and responsive hero; source photography retained.');

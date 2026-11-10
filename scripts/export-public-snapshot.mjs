import fs from 'node:fs';
import assert from 'node:assert/strict';
// Only anonymous public reads and explicitly listed fields. Never reads service-role.
const env = { ...process.env };
if (fs.existsSync('.env.production.local')) for (const line of fs.readFileSync('.env.production.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^(NEXT_PUBLIC_SUPABASE_URL|NEXT_PUBLIC_SUPABASE_ANON_KEY)=(.*)$/);
  if (m) env[m[1]] = m[2].startsWith('"') ? JSON.parse(m[2]) : m[2];
}
const fields = {
  equipment: 'id,category_id,brand,name,slug,short_description,description,price_session,price_per_day,price_three_days,price_poster_url,deposit_note,specifications,included_items,use_cases,badges,is_featured,is_active,sort_order,seo_title,seo_description,updated_at',
  categories: 'id,name,slug,description,icon,sort_order,is_active',
  equipment_images: 'id,equipment_id,image_url,alt_text,is_cover,sort_order',
  equipment_sample_images: 'id,equipment_id,image_url,caption,alt_text,sort_order,is_active',
  storefront_images: 'id,image_url,alt_text,caption,sort_order,is_cover,is_active',
  site_settings: 'id,shop_name,tagline,address,phone,facebook_url,messenger_url,tiktok_url,instagram_url,maps_url,maps_embed_url,opening_hours,hero_title,hero_subtitle,hero_image,about_text,footer_text',
};
assert.ok(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY, 'Provide existing public anonymous configuration privately');
const data = {};
for (const [table, select] of Object.entries(fields)) {
  const url = new URL('/rest/v1/' + table, env.NEXT_PUBLIC_SUPABASE_URL);
  url.searchParams.set('select', select);
  if (['equipment','categories','equipment_sample_images','storefront_images'].includes(table)) url.searchParams.set('is_active','eq.true');
  url.searchParams.set('limit','1000');
  const r = await fetch(url, { headers: { apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY, authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` } });
  assert.equal(r.status,200, `Anonymous public read failed for ${table}; do not fall back to privileged export`);
  data[table] = await r.json();
  assert.ok(data[table].length < 1000, 'Review pagination before exporting larger inventory');
}
const equipment = data.equipment.sort((a,b)=>a.sort_order-b.sort_order).map(e=>({ ...e,
  category: data.categories.find(c=>c.id===e.category_id) || null,
  images: data.equipment_images.filter(i=>i.equipment_id===e.id).sort((a,b)=>a.sort_order-b.sort_order),
  sample_images: data.equipment_sample_images.filter(i=>i.equipment_id===e.id).sort((a,b)=>a.sort_order-b.sort_order),
}));
assert.equal(equipment.length,12,'Review unexpected public catalog change');
const snapshot = { exportedAt: new Date().toISOString(), equipment, categories: data.categories, settings: data.site_settings[0], storefront: data.storefront_images.sort((a,b)=>Number(b.is_cover)-Number(a.is_cover)||a.sort_order-b.sort_order), feedback: [] };
assert.ok(snapshot.settings?.phone && snapshot.settings?.messenger_url);
fs.mkdirSync('static-site/data',{recursive:true});
fs.writeFileSync('static-site/data/public-catalog.json',JSON.stringify(snapshot,null,2)+'\n');
console.log(`Exported ${equipment.length} public cameras, ${equipment.reduce((n,e)=>n+e.sample_images.length,0)} samples, ${snapshot.storefront.length} storefront images. No customer/booking/auth/integration/admin records exported; feedback excluded.`);

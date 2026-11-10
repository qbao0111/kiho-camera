import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(process.env.PLAYWRIGHT_PACKAGE_JSON||import.meta.url);
const {chromium}=require('playwright');
const origin=process.argv[2];
const data=JSON.parse(fs.readFileSync('static-site/data/public-catalog.json','utf8'));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const report=[];
const requestLog=[];
fs.mkdirSync('scratch',{recursive:true});
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:900}});
    const failures=[],requests=[];
    page.on('pageerror',e=>failures.push(e.message));
    page.on('request',r=>{const u=r.url();requests.push(u);requestLog.push({width,event:'request',url:u,type:r.resourceType()});if(/\/_next\/image|\/api\/|\.supabase\.co|script\.google\.com/.test(u))failures.push('Forbidden runtime request '+u);});
    page.on('response',r=>{const type=r.request().resourceType();if(type==='image')requestLog.push({width,event:'response',url:r.url(),type,status:r.status(),mime:r.headers()['content-type']});if(['image','script','stylesheet'].includes(type)&&r.status()>=400)failures.push('Asset '+r.status()+' '+r.url());});
    page.on('requestfailed',r=>{if(r.resourceType()==='image'){const error=r.failure()?.errorText;requestLog.push({width,event:'failed',url:r.url(),type:'image',error});if(error!=='net::ERR_ABORTED')failures.push('Image request failed '+r.url()+' '+error);}});
    await page.addInitScript(()=>{
      window.imageMetrics={lcp:null,cls:0};window.gtag=(...args)=>{window.staticGaEvents=(window.staticGaEvents||[]).concat([args]);};
      new PerformanceObserver(list=>{for(const e of list.getEntries())window.imageMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
      new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.imageMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
    });
    await page.goto(origin,{waitUntil:'networkidle'});
    const homeMetrics=await page.evaluate(()=>({...window.imageMetrics}));
    const logo=page.locator('header img[alt="Kiho Camera"]');
    assert.equal(await logo.getAttribute('loading'),'eager','Visible header logo must not be lazy-loaded');
    assert.ok((await logo.evaluate(i=>i.currentSrc)).endsWith('-80.webp'),'Logo uses small responsive asset at DPR 1');
    assert.equal(await page.locator('link[rel="stylesheet"]').count(),0,'Initial static CSS is inline');
    await page.getByRole('button',{name:/Xem trọn bộ \d+ ảnh/}).click();
    const photos=page.getByRole('button',{name:/^Xem ảnh chụp từ /});assert.equal(await photos.count(),31);
    const lastPhoto=photos.last();await lastPhoto.scrollIntoViewIfNeeded();
    const lazyImage=lastPhoto.locator('img[loading="lazy"]');
    await lazyImage.evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw new Error('Lazy image failed to load');});
    await photos.first().click();const dialog=page.getByRole('dialog');await dialog.waitFor();
    const lightbox=dialog.locator('img').first();const firstSrc=await lightbox.getAttribute('src');
    await page.keyboard.press('ArrowRight');await page.waitForFunction(src=>document.querySelector('[role="dialog"] img')?.getAttribute('src')!==src,firstSrc);
    await lightbox.evaluate(img=>img.decode());await page.keyboard.press('Escape');
    const contact=page.locator('[data-static-contact]').first();
    const links=await contact.locator('a').evaluateAll(as=>as.map(a=>({href:a.href,text:a.textContent})));
    assert.equal(links.length,3);assert.ok(links[0].href.startsWith('https://m.me/'));assert.ok(links[1].href.startsWith('https://zalo.me/'));assert.ok(links[2].href.startsWith('tel:'));
    await contact.locator('a').first().evaluate(a=>a.addEventListener('click',e=>e.preventDefault()));
    await contact.locator('a').first().click();
    assert.ok(await page.evaluate(()=>window.staticGaEvents.some(e=>e[0]==='event'&&e[1]==='contact_messenger')),'GA contact event fires without backend');
    await page.goto(origin+'/thiet-bi',{waitUntil:'networkidle'});
    await page.getByRole('link',{name:/Fujifilm \(/}).click();
    await page.waitForTimeout(500);
    const rendered=await page.locator('a[href^="/thiet-bi/"]').evaluateAll(as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
    assert.deepEqual(rendered.sort(),data.equipment.filter(e=>e.brand.toLowerCase()==='fujifilm').map(e=>'/thiet-bi/'+e.slug).sort());
    await page.goto(origin+'/thiet-bi?search=R50',{waitUntil:'networkidle'});
    assert.ok(await page.locator('a[href="/thiet-bi/canon-eos-r50"]').count());
    await page.locator('a[href="/thiet-bi/canon-eos-r50"]').first().click();await page.waitForURL('**/thiet-bi/canon-eos-r50');
    await page.getByRole('button',{name:'Phóng to ảnh',exact:true}).click();await page.keyboard.press('Escape');
    // Trigger contact drawer without submitting any lead or opening an external app.
    const buttons=page.getByRole('button',{name:/giữ máy|đặt lịch|yêu cầu thuê/i});
    if(await buttons.count()) {await buttons.first().click();assert.ok(await page.locator('[role="dialog"] [data-static-contact]').count());await page.keyboard.press('Escape');}
    for(const slug of ['canon-eos-r50','fujifilm-x100v']) {
      const url=origin+'/thiet-bi/'+slug;
      assert.equal((await page.goto(url,{waitUntil:'networkidle'})).status(),200);
      assert.equal((await page.reload({waitUntil:'networkidle'})).status(),200);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://kihocamera.com/thiet-bi/'+slug);
    }
    for(const route of ['/feedback','/photobooth','/thue-may-anh-phong-nha','/gioi-thieu']) {assert.equal((await page.goto(origin+route,{waitUntil:'networkidle'})).status(),200);await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(500);assert.ok(await page.evaluate(()=>[...document.images].every(i=>!i.complete||i.naturalWidth>0)));}
    const webp=requestLog.find(e=>e.width===width&&e.event==='response'&&e.url.includes('/image-variants/')&&e.status===200&&e.mime==='image/webp');
    assert.ok(webp,'Responsive WebP must load directly with image/webp');
    assert.deepEqual(failures,[]);
    report.push({width,homeMetrics,contactLinks:links,requests:requests.length,optimizerRequests:requests.filter(url=>new URL(url).pathname==='/_next/image').length,brokenImages:0,webp,noBackendRequests:true});
    await page.close();
  }
  const noJs=await browser.newContext({javaScriptEnabled:false});const page=await noJs.newPage();await page.goto(origin+'/thiet-bi');assert.ok((await page.content()).includes('canon-eos-r50'));await noJs.close();
} finally {await browser.close();fs.writeFileSync('scratch/static-browser-report.json',JSON.stringify(report,null,2));fs.writeFileSync('scratch/static-browser-requests.json',JSON.stringify({origin,requestLog},null,2));}
console.log('Static browser passed:',JSON.stringify(report));

// Reproducible standalone runner. The 2026-10-25 run used Cloud Chrome's
// Playwright locator API because Chromium download was unavailable locally.
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const base=process.env.BASE_URL||'http://127.0.0.1:8765';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
const sizes=[[390,844],[844,390],[768,1024],[1024,768],[1440,1000]],results=[];
mkdirSync(path.join(root,'reports/screenshots'),{recursive:true});
try{
 for(const [width,height]of sizes){
 const context=await browser.newContext({viewport:{width,height}}),page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.locator('.roadmap-step').first().waitFor();
 const nav=width<=930?'#mobileNav':'#desktopNav';
 for(const tab of ['learn','library','practice','review']){
  await page.locator(`${nav} [data-nav="${tab}"]`).click();
  const geometry=await page.evaluate(()=>({client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert.equal(geometry.client,geometry.scroll);
 }
 await page.locator(`${nav} [data-nav="library"]`).click();assert.equal(await page.locator('.source-option').count(),38);
 await page.locator('.source-option[data-id="creator-guide"]').click();assert.ok(await page.locator('.library-main').evaluate(x=>x.getBoundingClientRect().top)<30);
 await page.screenshot({path:path.join(root,`reports/screenshots/library-${width}.png`),fullPage:false});
 await page.locator(`${nav} [data-nav="practice"]`).click();await page.getByRole('button',{name:'전략 비교',exact:true}).click();assert.equal(await page.locator('[data-action="choose-comparison"]').count(),5);
 await page.getByRole('button',{name:'자료 분석',exact:true}).click();assert.equal(await page.locator('[data-action="choose-case"]').count(),8);
 for(let i=0;i<8;i++){await page.locator('[data-action="choose-case"]').nth(i).click();await page.getByRole('button',{name:'해설 보기',exact:true}).click();assert.equal(await page.locator('.decision-study details').count(),4);await page.getByRole('button',{name:'해설 접기',exact:true}).click()}
 await page.locator(`${nav} [data-nav="review"]`).click();const keys=[1,1,2,1,1,1,1,1,1,1,1,1];for(let i=0;i<12;i++)await page.locator(`#question-${i} .option`).nth(keys[i]).click();assert.equal(await page.locator('.feedback').count(),12);assert.equal(errors.length,0);
 results.push({width,height,status:'PASS'});await context.close();
 }
 writeFileSync(path.join(root,'reports/standalone-browser-result.json'),JSON.stringify({base,results},null,2));console.log(results);
}finally{await browser.close()}

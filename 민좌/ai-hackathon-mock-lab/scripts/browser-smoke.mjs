import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, join, extname } from 'node:path';
import { chromium } from 'playwright';

const root=resolve(import.meta.dirname,'..');
const version=JSON.parse(readFileSync(join(root,'dist/bank-version.json'),'utf8'));
assert.equal(version.questions,64);
assert.equal(version.practiceTasks,8);
assert.equal(version.conceptLessons,26);

const server=createServer((req,res)=>{
  const target=(req.url||'/').split('?')[0]==='/bank-version.json'?'bank-version.json':'index.html';
  res.setHeader('content-type',target.endsWith('.json')?'application/json; charset=utf-8':'text/html; charset=utf-8');
  res.end(readFileSync(join(root,'dist',target)));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port+'/';
const browser=await chromium.launch({headless:true});
const out=[];
try{
  for(const viewport of [{width:768,height:1024},{width:390,height:844}]){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',error=>errors.push(String(error)));
    await page.goto(url,{waitUntil:'load'});
    await page.locator('#homeStats').waitFor();
    assert.match(await page.locator('body').innerText(),/64문항 · 26개념/);
    const sizes=await page.evaluate(()=>({
      questions:JSON.parse(document.getElementById('bankData').textContent).questions.length,
      concepts:JSON.parse(document.getElementById('conceptData').textContent).length,
      tasks:JSON.parse(document.getElementById('tasksData').textContent).length
    }));
    assert.deepEqual(sizes,{questions:64,concepts:26,tasks:8});
    await page.locator('nav button[data-view="concepts"]').click();
    assert.equal(await page.locator('#concepts').isVisible(),true);
    await page.locator('#conceptSearch').fill('Temperature');
    assert.ok(await page.locator('#conceptList button').count()>=1);
    await page.locator('#conceptList button').filter({hasText:'Temperature'}).first().click();
    assert.match(await page.locator('#conceptPanel').innerText(),/Temperature/);
    await page.locator('#conceptSearch').fill('토큰');
    assert.ok(await page.locator('#conceptList button').count()>=1);
    assert.match(await page.locator('#conceptPanel').innerText(),/토큰/);
    await page.locator('#conceptSearch').fill('');
    await page.locator('nav button[data-view="quiz"]').click();
    assert.equal(await page.locator('#quiz').isVisible(),true);
    assert.ok(await page.locator('#numbers button').count()>=64);
    assert.deepEqual(errors,[]);
    out.push({viewport,...sizes,conceptSearch:'PASS',quizNavigation:'PASS',runtimeErrors:errors.length});
    await page.close();
  }
  console.log('Browser smoke PASS',JSON.stringify(out));
}finally{
  await browser.close();
  await new Promise(resolve=>server.close(resolve));
}

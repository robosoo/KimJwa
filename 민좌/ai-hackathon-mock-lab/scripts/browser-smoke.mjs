import assert from 'node:assert/strict';
import { readFileSync, mkdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, join, extname } from 'node:path';
import { chromium, webkit } from 'playwright';

const root=resolve(import.meta.dirname,'..');
const version=JSON.parse(readFileSync(join(root,'dist/bank-version.json'),'utf8'));
assert.equal(version.questions,64);
assert.equal(version.practiceTasks,8);
assert.equal(version.conceptLessons,26);
assert.equal(version.wikiArticles,26);
assert.equal(version.fourPDrills,6);
assert.equal(version.fourPTransferChecks,6);

const server=createServer((req,res)=>{
  const target=(req.url||'/').split('?')[0]==='/bank-version.json'?'bank-version.json':'index.html';
  res.setHeader('content-type',target.endsWith('.json')?'application/json; charset=utf-8':'text/html; charset=utf-8');
  res.end(readFileSync(join(root,'dist',target)));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url='http://127.0.0.1:'+server.address().port+'/';
const out=[];
try{
 for(const [engineName,engine] of [['chromium',chromium],['webkit',webkit]]){
  const browser=await engine.launch({headless:true});
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
    await page.locator('nav button[data-view="fourp"]').click();
    assert.equal(await page.locator('#fourp').isVisible(),true);
    assert.equal(await page.locator('#fourTheory .four-card').count(),4);
    assert.match(await page.locator('#fourTheory .four-card').first().innerText(),/정의/);
    assert.match(await page.locator('#fourTheory .four-card').first().innerText(),/일상 예시/);
    assert.equal(await page.locator('#fourQuick .four-quick-item').count(),8);
    await page.locator('[data-quick="QC01"][data-quickchoice="Plan"]').click();
    assert.match(await page.locator('#fourQuick').innerText(),/맞았어요/);
    assert.equal(await page.locator('#fourCases [data-fourcase]').count(),6);
    assert.equal(await page.locator('[data-fourstage="1"]').isVisible(),false,'Prompt must unlock after Plan review');
    await page.locator('#fourAnswer0').fill('목표는 행 기준의 명목 불량 비율과 웨이퍼 단위 확정 불량률을 구분하는 것이다.');
    await page.locator('[data-fourreview="0"]').click();
    assert.equal(await page.locator('#fourReview0').isVisible(),true);
    assert.equal(await page.locator('[data-fourstage="1"]').isVisible(),true,'Prompt must unlock after Plan');
    assert.equal(await page.locator('#fourNext').isDisabled(),true,'next case blocked until all four stages');
    await page.reload();
    await page.locator('nav button[data-view="fourp"]').click();
    assert.ok((await page.locator('#fourAnswer0').inputValue()).length>=20);
    assert.equal(await page.locator('#fourReview0').isVisible(),true);
    assert.match(await page.locator('#fourQuick').innerText(),/맞았어요/);
    
    // Finish all four stages and verify that the new drill blocks completion.
    await page.locator('#fourCases [data-fourcase="FP01"]').click();
    await page.locator('#fourAnswer0').fill('문제는 8천 개의 로그행과 7천 개의 고유 웨이퍼를 구별해 정확한 분석 분모를 정의해야 한다.');
    await page.locator('[data-fourreview="0"]').click();
    for (const stage of [1,2,3]) {
      await page.locator('#fourAnswer'+stage).fill('이 단계는 원자료의 제약과 누락된 근거를 구분하고 AI의 수치를 직접 확인해야 한다.');
      await page.locator('[data-fourreview="'+stage+'"]').click();
    }
    assert.equal(await page.locator('#fourDrill').isVisible(),true);
    assert.match(await page.locator('#fourDrill').innerText(),/가상 AI 오답 탐지/);
    assert.equal(await page.locator('#fourNext').isDisabled(),true);
    await page.locator('#fourDrill input[name="fourDrillChoice"][value="1"]').check();
    await page.locator('#fourDrillRevision').fill('단위가 로그 행인지 웨이퍼인지 구분하고 검산과 전일 자료 부재를 표시하도록 다시 요청한다.');
    await page.locator('#fourDrillSubmit').click();
    assert.match(await page.locator('#fourDrill').innerText(),/오류 탐지 객관식 정답/);
    await page.locator('#fourDrill input[name="fourTransferChoice"][value="1"]').check();
    await page.locator('#fourTransferSubmit').click();
    assert.match(await page.locator('#fourDrill').innerText(),/변형 과제 정답/);
    assert.equal(await page.locator('#fourNext').isEnabled(),true);
    await page.reload();
    await page.locator('nav button[data-view="fourp"]').click();
    assert.match(await page.locator('#fourProgress').innerText(),/1\/6사례/);
    await page.locator('#fourCases [data-fourcase="FP02"]').click();
    assert.match(await page.locator('#fourExercise').innerText(),/VDDQ/);
    await page.locator('nav button[data-view="concepts"]').click();
    assert.equal(await page.locator('#concepts').isVisible(),true);
    await page.locator('#conceptSearch').fill('Temperature');
    assert.ok(await page.locator('#conceptList button').count()>=1);
    await page.locator('#conceptList button').filter({hasText:'Temperature'}).first().click();
    assert.match(await page.locator('#conceptPanel').innerText(),/Temperature/);
    assert.match(await page.locator('#conceptPanel').innerText(),/작동 원리/);
    assert.match(await page.locator('#conceptPanel').innerText(),/개념의 경계와 한계/);
    await page.locator('#conceptSearch').fill('토큰');
    assert.ok(await page.locator('#conceptList button').count()>=1);
    assert.match(await page.locator('#conceptPanel').innerText(),/토큰/);
    await page.locator('#conceptSearch').fill('');
    await page.locator('nav button[data-view="quiz"]').click();
    assert.equal(await page.locator('#quiz').isVisible(),true);
    assert.ok(await page.locator('#numbers button').count()>=64);
    await page.locator('#reveal').click();
    assert.equal(await page.locator('#questionPanel .review').count(),await page.locator('#questionPanel [data-choice]').count());
    assert.match(await page.locator('#questionPanel').innerText(),/보기별 해설/);
    await page.locator('#reveal').click();
    await page.locator('#questionPanel [data-choice="0"]').click();
    assert.ok(await page.locator('#questionPanel .answerbox').count()===1);
    await page.reload();
    await page.locator('nav button[data-view="quiz"]').click();
    assert.ok((await page.locator('#answerStatus').innerText()).length>0,'answer state should survive reload');
    assert.deepEqual(errors,[]);
    out.push({engineName,viewport,...sizes,fourPTraining:'PASS',conceptSearch:'PASS',quizNavigation:'PASS',instantExplanation:'PASS',answerPersistence:'PASS',runtimeErrors:errors.length});
    await page.close();
  }
  }finally{await browser.close();}
 }
  console.log('Browser smoke PASS',JSON.stringify(out));
}finally{
  await new Promise(resolve=>server.close(resolve));
}

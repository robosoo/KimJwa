import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const json=f=>JSON.parse(readFileSync(path.join(root,f),'utf8'));
const htmlText=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const records=[];
function check(name,fn){fn();records.push({name,status:'PASS'})}
for(const [f,sha]of Object.entries({'cofa-chapters.json':'a35a50f9efa83e515ca9c21b33b45b762036b3a0','portal-content.json':'ff4c79003ca3564b037b77ac52728b0c3234fedc'}))check('Byte-exact original backup: '+f,()=>assert.equal(createHash('sha1').update(readFileSync(path.join(root,f))).digest('hex'),sha));
const files=['content.json','luka-deep.json','cofa-chapters.json','portal-content.json','source-manifest.json','learning-guide.json','beginner-guide.json','learning-path.json','deep-analysis.json'];
const data=Object.fromEntries(files.map(f=>['/'+f,json(f)]));
const listeners={},storage=new Map(),nodes=new Map();
function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},focus(){},scrollIntoView(){}});return nodes.get(id)}
const document={querySelector:sel=>sel.startsWith('#')?node(sel):null,querySelectorAll:()=>[],addEventListener:(type,fn)=>listeners[type]=fn};
const location={pathname:'/',search:'',hash:'#start',reload(){}};
const history={pushState(a,b,url){const h=url.indexOf('#');location.hash=h<0?'':url.slice(h);location.search=''},replaceState(a,b,url){this.pushState(a,b,url)}};
const ctx={document,location,history,URL,URLSearchParams,console,Date,Set,Map,localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},fetch:async url=>({ok:!!data[url],status:data[url]?200:404,json:async()=>data[url]}),window:{scrollTo(){},matchMedia:()=>({matches:false}),addEventListener(){}},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){}};
let source=readFileSync(path.join(root,'app.js'),'utf8');
check('JavaScript syntax',()=>new vm.Script(source));
source=source.replace('init();\n})();',"globalThis.test={state,route,routeFromUrl,syncUrl,render,displayItems,sessionTick,sessionTime,renderArticle,renderPractice,renderReview,renderComparisons,quizQuestions,renderGuided,guidedLimit};globalThis.ready=init();\n})();");
vm.createContext(ctx);vm.runInContext(source,ctx);await ctx.ready;
const {state}=ctx.test;
function click(action,values={}){listeners.click({target:{closest:()=>({dataset:{action,...values},classList:{toggle(){}},textContent:''})}})}
check('Complete live inventory: 39 distinct articles',()=>{assert.equal(state.items.length,39);assert.equal(new Set(state.items.map(x=>x.id)).size,39)});
check('All 19 original source references retained',()=>{for(const r of data['/source-manifest.json'].sourceRecords)assert.ok(state.items.some(x=>x.source===r.url),r.id)});
check('Four canonical menus and direct URL routes',()=>{for(const [tab,hash]of [['learn','#start'],['library','#learn/probe-basics'],['practice','#practice/guided'],['review','#quiz']]){ctx.test.route(tab);assert.equal(location.hash,hash);assert.ok(node('#screen').innerHTML.length>100)}});
check('Legacy hash and query URL compatibility',()=>{location.hash='#learn/luka';ctx.test.routeFromUrl();assert.equal(state.selected,'luka-depth');location.hash='';location.search='?tab=library&id=old-official';ctx.test.routeFromUrl();assert.equal(state.selected,'old-official');assert.equal(state.tab,'library');location.search=''});
check('Malformed route does not crash',()=>{location.hash='#learn/%ZZ';ctx.test.routeFromUrl();assert.equal(state.tab,'learn')});
check('Every article renders without missing placeholders',()=>{for(const x of state.items){const html=ctx.test.renderArticle(x);assert.ok(html.length>500,x.id);assert.ok(!html.includes('undefined'),x.id);assert.ok(html.includes('원문 확인'),x.id)}});
check('Three strategy comparisons restored',()=>{state.practiceMode='compare';for(const c of state.portal.compare){state.compareId=c.id;assert.ok(ctx.test.renderPractice().includes(htmlText(c.title)))}});
check('Eight case selectors, raw files and solution toggles',()=>{state.practiceMode='cases';for(const c of state.portal.cases){click('choose-case',{id:c.id});assert.equal(state.reveal,false);assert.ok(ctx.test.renderPractice().includes(htmlText(c.title)));click('reveal-solution');assert.ok(state.reveal);assert.ok(ctx.test.renderPractice().includes(htmlText(c.solution)))}});
check('Lot correction distinguishes source error and inference',()=>{state.caseId='lot';const html=ctx.test.renderPractice();assert.ok(html.includes('고유 Lot 5개'));assert.ok(html.includes('완전한 교란은 확인되지'))});
check('Fictional stakeholder questions preserve both personas',()=>{state.practiceMode='stakeholders';for(const id of ['fde','olive']){click('choose-persona',{id});click('toggle-question',{index:'0'});assert.ok(ctx.test.renderPractice().includes('[가상]'))}});
check('12 questions grade correct and incorrect choices',()=>{for(let i=0;i<12;i++){const q=ctx.test.quizQuestions()[i];state.answers={};click('answer',{index:String(i),option:String(q[2])});assert.ok(ctx.test.renderReview().includes('정답입니다.'));state.answers={};click('answer',{index:String(i),option:String((q[2]+1)%q[1].length)});assert.ok(ctx.test.renderReview().includes('option wrong'))}});
check('Quiz answer is immutable until explicit reset',()=>{state.answers={0:1};click('answer',{index:'0',option:'0'});assert.equal(state.answers[0],1);click('reset-quiz');assert.equal(Object.keys(state.answers).length,0)});
check('Read progress persists and stays within inventory',()=>{click('toggle-done',{id:'video-1'});assert.ok(state.done.has('video-1'));assert.ok(storage.get('cofa-study-v3:done').includes('video-1'))});
check('Article selection keeps active source filter and search',()=>{state.search='Luka';state.sourceFilter='people';click('open-source',{id:'luka-depth'});assert.equal(state.search,'Luka');assert.equal(state.sourceFilter,'people')});
check('3-minute speaking timer start/pause/reset',()=>{click('timer-start');assert.ok(state.clockActive);click('timer-pause');assert.equal(state.clockActive,false);click('timer-reset');assert.equal(state.threeMinutes,180)});
check('4-hour timer persists start/pause/reset and expiry',()=>{click('session-start');assert.ok(state.sessionUntil>Date.now());click('session-pause');assert.equal(state.sessionUntil,0);click('session-reset');assert.equal(state.sessionRemain,14400);state.sessionUntil=Date.now()-2000;ctx.test.sessionTick();assert.equal(state.sessionRemain,0);assert.equal(state.sessionUntil,0)});
check('No fake AI chat or answer inputs',()=>{for(const tab of ['learn','library','practice','review']){ctx.test.route(tab);const html=node('#screen').innerHTML;assert.ok(!/<textarea|contenteditable|type="text"/.test(html));if(tab==='library')assert.ok(html.includes('type="search"'))}});
check('Source URL safety and inventory uniqueness',()=>{const m=data['/source-manifest.json'];assert.equal(new Set(m.sourceRecords.map(x=>x.id)).size,19);for(const x of m.sourceRecords)assert.equal(new URL(x.url).protocol,'https:')});
check('Beginner learning reflects nondeveloper work without implying live AI',()=>{const x=state.items.find(x=>x.id==='probe-basics'),html=ctx.test.renderArticle(x);assert.ok(html.includes('문서'));assert.ok(html.includes('AI 미연결'));assert.ok(html.includes('Sourcer'));assert.ok(html.includes('HW 경험'));assert.ok(html.includes('무료'))});
check('Preparation route distinguishes plans from completed execution',()=>{location.hash='#practice/preparation';ctx.test.routeFromUrl();assert.equal(state.practiceMode,'preparation');const html=ctx.test.renderPractice();assert.ok(html.includes('미준비'));assert.ok(html.includes('실행 기록 없음'));assert.ok(html.includes('비개발자에게 맞춘 준비 순서'))});
check('External kit review preserves test scope',()=>{const html=ctx.test.renderArticle(state.items.find(x=>x.id==='kit-review'));assert.ok(html.includes('13개'));assert.ok(html.includes('샘플'));assert.ok(html.includes('아직 입증되지 않음'));assert.ok(html.includes('실제 앱'))});
check('Legacy pages route into the unified center',()=>{for(const f of ['cofa-luka.html','cofa-luka-deep.html','cofa-probe.html','cofa-sim.html']){assert.ok(readFileSync(path.join(root,f),'utf8').includes('location.replace("/#'))}});

check('Guided route and original source rows are readable without coding',()=>{location.hash='#practice/guided';ctx.test.routeFromUrl();assert.equal(state.practiceMode,'guided');const html=ctx.test.renderGuided();assert.equal((html.match(/<tr>/g)||[]).length,7);assert.ok(html.includes('미기재'));assert.ok(html.includes('완성 예시'));assert.ok(html.includes('실제 기출'))});
check('Wrong guided choice cannot unlock later steps',()=>{click('guided-reset');click('guided-answer',{option:'0'});assert.equal(state.guided.answers[0],0);assert.ok(ctx.test.renderGuided().includes('다시 확인할 지점'));click('guided-next');assert.equal(state.guided.step,0);click('guided-jump',{index:'7'});assert.equal(state.guided.step,0);click('guided-retry');assert.equal(state.guided.answers[0],undefined)});
check('Eight decisions complete, preserve proof and transfer to another problem',()=>{for(let i=0;i<state.path.steps.length;i++){click('guided-answer',{option:String(state.path.steps[i].correct)});assert.ok(ctx.test.renderGuided().includes('남길 근거'));if(i<7)click('guided-next')}const html=ctx.test.renderGuided();assert.equal(state.guided.step,7);assert.ok(html.includes('같은 자료로 작성한 보고 예시'));assert.ok(html.includes('고정된 해설 예시'));assert.ok(storage.get('cofa-study-v3:guided-v1').includes('answers'))});
check('Guided restart preserves unrelated read and quiz state',()=>{state.answers={0:1};const before=state.done.size;click('guided-reset');assert.equal(state.done.size,before);assert.equal(state.answers[0],1);assert.equal(state.guided.step,0);assert.equal(Object.keys(state.guided.answers).length,0)});
check('Quiz supports isolated retry and unresolved-wrong filtering',()=>{click('reset-quiz');state.answers={0:1};click('answer',{index:'4',option:'0'});click('review-filter',{filter:'wrong'});let html=ctx.test.renderReview();assert.ok(html.includes('question-4'));assert.ok(!html.includes('id="question-0"'));click('retry-answer',{index:'4'});assert.equal(state.answers[0],1);assert.equal(state.answers[4],undefined);assert.ok(state.reviewWrong.has(4));click('answer',{index:'4',option:'1'});assert.ok(!state.reviewWrong.has(4));assert.ok(ctx.test.renderReview().includes('남아 있는 오답이 없습니다.'));click('review-filter',{filter:'all'});click('reset-quiz')});
check('Invalid answer or guided navigation does not corrupt learning records',()=>{click('answer',{index:'-1',option:'0'});click('answer',{index:'0',option:'999'});click('guided-jump',{index:'-1'});assert.equal(Object.keys(state.answers).length,0);assert.equal(state.guided.step,0)});
check('Deep analysis maps every supplied section to reasoning and counterexamples',()=>{const d=state.deep;assert.equal(d.claims.length,15);assert.equal(d.layers.length,6);for(const c of d.claims){for(const k of ['claim','reasoning','action','concepts','limit','question'])assert.ok(c[k]);assert.ok(c.sources.length)}const html=ctx.test.renderArticle(state.items.find(x=>x.id==='reasoning-foundations'));for(const term of ['Haiku','조정석','UNESCO','인지 부채','정합성'])assert.ok(html.includes(term))});
check('Reading labels do not claim mastery',()=>{const html=ctx.test.renderArticle(state.items[0]);assert.ok(html.includes('읽음으로 표시'));assert.ok(html.includes('이해 여부는 직접 설명'));assert.ok(!html.includes('학습 완료 ✓'))});
check('Manifest counts and source references agree with rendered inventory',()=>assert.equal(state.manifest.activeArticleCount,state.items.length));

// A fresh VM shares browser storage but no previous in-memory state.
click('guided-reset');click('guided-answer',{option:'1'});click('guided-next');click('guided-answer',{option:'0'});location.hash='#practice/guided';
const restored={...ctx};delete restored.test;delete restored.ready;vm.createContext(restored);vm.runInContext(source,restored);await restored.ready;
check('Fresh page restores guided progress including a wrong choice',()=>{assert.equal(restored.test.state.practiceMode,'guided');assert.equal(restored.test.state.guided.step,1);assert.equal(restored.test.state.guided.answers[0],1);assert.equal(restored.test.state.guided.answers[1],0);assert.equal(restored.test.guidedLimit(),1)});
storage.set('cofa-study-v3:guided-v1',JSON.stringify({step:999,answers:{0:999,7:1}}));const damaged={...ctx};delete damaged.test;delete damaged.ready;vm.createContext(damaged);vm.runInContext(source,damaged);await damaged.ready;
check('Corrupt stored progression cannot unlock unlearned steps',()=>{assert.equal(damaged.test.state.guided.step,0);assert.equal(Object.keys(damaged.test.state.guided.answers).length,0)});
const report={date:'2026-10-25',kind:'Node VM functional checks; not a visual-browser test',passed:records.length,checks:records};
writeFileSync(path.join(root,'reports/validation.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:records.length,failed:0,scope:report.kind}));

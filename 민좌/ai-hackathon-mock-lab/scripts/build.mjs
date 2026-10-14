import {readFileSync,writeFileSync,mkdirSync,copyFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {validateBank} from './validate.mjs';
const root=resolve(import.meta.dirname,'..');const report=validateBank(root);
let html=readFileSync(join(root,'src/index.html'),'utf8');
// Keep editorial provenance, QA status, and duplicated analysis in GitHub source data, not in learner-facing HTML.
const stripEditorial=q=>{const {analysis,sourceScope,sourceType,QAStatus,provenance,editorialReview,...learnerQuestion}=q;return learnerQuestion;};
for(const [token,file] of [['__BANK__','round1-question-bank.json'],['__TASKS__','round1-practice.json'],['__LINKS__','learning-links.json'],['__LESSONS__','concept-lessons.json'],['__FOURP__','four-p-guide.json']]){
 const input=JSON.parse(readFileSync(join(root,'data',file),'utf8'));
 if(token==='__BANK__'){
  input.questions=input.questions.map(stripEditorial);
  delete input.disclaimer;delete input.editorialPolicy;delete input.updatedAt;
 }
 if(token==='__TASKS__')for(const task of input)delete task.sourceType;
 if(token==='__LESSONS__')for(const lesson of input)for(const source of lesson.sources)delete source.scope;
 html=html.replace(token,JSON.stringify(input).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029'));
}
for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)){const check=spawnSync(process.execPath,['--check','-'],{input:script,encoding:'utf8'});if(check.status!==0)throw Error(check.stderr);}
mkdirSync(join(root,'dist'),{recursive:true});mkdirSync(join(root,'reports'),{recursive:true});
writeFileSync(join(root,'dist/index.html'),html);writeFileSync(join(root,'dist/bank-version.json'),JSON.stringify({version:report.version,questions:report.questions,practiceTasks:report.practiceTasks,conceptLessons:report.conceptLessons,wikiArticles:report.wikiArticles,fourPCases:report.fourPCases,fourPDrills:report.fourPDrills,fourPTransferChecks:report.fourPTransferChecks,fourPIndependentChecks:report.fourPIndependentChecks,fourPDeepTheory:report.fourPDeepTheory,fourPStages:report.fourPStages,fourPChecks:report.fourPChecks})+'\n');
writeFileSync(join(root,'reports/audit.generated.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const session=JSON.parse(readFileSync(join(root,'data/food-cosmetics-session.json'),'utf8'));
const guideLessons=JSON.parse(readFileSync(join(root,'data/food-cosmetics-lessons.json'),'utf8'));
const guideScript=readFileSync(join(root,'src/food-cosmetics-guide.js'),'utf8').replace('__GUIDE_LESSONS__',safeJSON(guideLessons));
const guideCheck=spawnSync(process.execPath,['--check','-'],{input:guideScript,encoding:'utf8'});
if(guideCheck.status!==0)throw Error(guideCheck.stderr);
const guideHTML=readFileSync(join(root,'src/food-cosmetics-guide.html'),'utf8').replace('__SESSION__',safeJSON(session)).replace('__GUIDE_JS__',guideScript);
writeFileSync(join(root,'dist/food-cosmetics-guide.html'),guideHTML);
mkdirSync(join(root,'dist/resources'),{recursive:true});
copyFileSync(join(root,'resources/Programmers_AI_Assessment_Practical_Textbook_KR.pdf'),join(root,'dist/resources/Programmers_AI_Assessment_Practical_Textbook_KR.pdf'));
const practicalData=JSON.parse(readFileSync(join(root,'data/practical-sessions.json'),'utf8'));
const practicalScript=readFileSync(join(root,'src/human-practice-guide.js'),'utf8');
const practicalCheck=spawnSync(process.execPath,['--check','-'],{input:practicalScript,encoding:'utf8'});
if(practicalCheck.status!==0)throw Error(practicalCheck.stderr);
const practicalHTML=readFileSync(join(root,'src/human-practice-guide.html'),'utf8').replace('__PRACTICAL_DATA__',safeJSON(practicalData)).replace('__PRACTICAL_JS__',practicalScript);
writeFileSync(join(root,'dist/human-practice-guide.html'),practicalHTML);

// Bundle both walkthroughs into the main page, preserving isolated styles/IDs.
function embeddedMarkup(input,human=false){
 const styles=[...input.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m=>m[1]).join('\n').replace(/:root/g,':host').replace(/\bbody\b/g,'.embedded-guide');
 let body=input.match(/<body[^>]*>([\s\S]*?)<\/body>/)[1];
 body=body.replace(/<header[\s\S]*?<\/header>/,human?'<div class="row embed-font"><button class="btn" id="fontToggle" aria-pressed="false">글자 크게</button></div>':'');
 body=body.replace(/<footer[\s\S]*?<\/footer>/,'').replace(/<script(?![^>]*type="application\/json")[^>]*>[\s\S]*?<\/script>/g,'').replace(/<main\b/g,'<div').replace(/<\/main>/g,'</div>');
 const overrides=':host{display:block;min-width:0}.embedded-guide{background:transparent}.wrap{max-width:none;padding:0 0 30px;margin:0}#caseButtons{display:none}.embed-font{margin:0 0 14px}.tabs,.casebar{top:var(--preview-toolbar-height,100px);z-index:4}.round-nav,.token-cart{top:calc(var(--preview-toolbar-height,100px) + 95px)}section[id],article[id],.guide-view,#roundContent,.round-part{scroll-margin-top:calc(var(--preview-toolbar-height,100px) + 160px)}';
 return '<style>'+styles+'\n'+overrides+'</style><div class="embedded-guide">'+body+'</div>';
}
const previewBundle={food:embeddedMarkup(guideHTML),human:embeddedMarkup(practicalHTML,true)};
const embeddedFoodScript=guideScript.replace("window.addEventListener('hashchange',readHash);",'').replace('initializeAnswers();readHash();',"initializeAnswers();setTab('start',false);");
const embeddedHumanScript=practicalScript.replace(/const initial=[\s\S]*?renderCase\(initial\);\s*$/,"renderCase('snack');");
const publicScript=readFileSync(join(root,'src/public-preview.js'),'utf8').replace('__EMBED_FOOD_JS__',embeddedFoodScript).replace('__EMBED_HUMAN_JS__',embeddedHumanScript);
const publicCheck=spawnSync(process.execPath,['--check','-'],{input:publicScript,encoding:'utf8'});
if(publicCheck.status!==0)throw Error(publicCheck.stderr);
html=html.replace('__PUBLIC_PREVIEW_DATA__',safeJSON(previewBundle)).replace('__PUBLIC_PREVIEW_JS__',publicScript);
writeFileSync(join(root,'dist/index.html'),html);
// Old bookmarks resolve to the unified learning menu on the same home page.
function legacyRedirect(defaultCase){return '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>공개체험 풀이로 이동</title><meta http-equiv="refresh" content="0;url=/?preview='+defaultCase+'"></head><body><p><a href="/?preview='+defaultCase+'">학습홈의 공개체험 풀이 열기</a></p><script>const allowed=["snack","subscription","literacy","api"];const requested=new URLSearchParams(location.search).get("task");const task='+JSON.stringify(defaultCase)+';location.replace("/?preview="+(allowed.includes(requested)?requested:task)+location.hash);</script></body></html>';}
writeFileSync(join(root,'dist/food-cosmetics-guide.html'),legacyRedirect('food'));
writeFileSync(join(root,'dist/human-practice-guide.html'),legacyRedirect('snack'));

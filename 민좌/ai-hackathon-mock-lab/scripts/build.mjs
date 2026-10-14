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

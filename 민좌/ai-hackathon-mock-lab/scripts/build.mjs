import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {validateBank} from './validate.mjs';
const root=resolve(import.meta.dirname,'..');const report=validateBank(root);
let html=readFileSync(join(root,'src/index.html'),'utf8');
for(const [token,file] of [['__BANK__','round1-question-bank.json'],['__TASKS__','round1-practice.json'],['__LINKS__','learning-links.json'],['__LESSONS__','concept-lessons.json'],['__FOURP__','four-p-guide.json']])html=html.replace(token,JSON.stringify(JSON.parse(readFileSync(join(root,'data',file),'utf8'))).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029'));
for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)){const check=spawnSync(process.execPath,['--check','-'],{input:script,encoding:'utf8'});if(check.status!==0)throw Error(check.stderr);}
mkdirSync(join(root,'dist'),{recursive:true});mkdirSync(join(root,'reports'),{recursive:true});
writeFileSync(join(root,'dist/index.html'),html);writeFileSync(join(root,'dist/bank-version.json'),JSON.stringify({version:report.version,questions:report.questions,practiceTasks:report.practiceTasks,conceptLessons:report.conceptLessons,fourPCases:report.fourPCases,fourPStages:report.fourPStages,fourPChecks:report.fourPChecks})+'\n');
writeFileSync(join(root,'reports/audit.generated.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));

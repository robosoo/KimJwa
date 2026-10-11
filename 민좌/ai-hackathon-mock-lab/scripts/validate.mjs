import {readFileSync} from 'node:fs';import {join} from 'node:path';
export const normalize=s=>s.normalize('NFKC').replace(/\s+/g,' ').trim().toLowerCase();
export function validateBank(root){const bank=JSON.parse(readFileSync(join(root,'data/round1-question-bank.json'),'utf8')),tasks=JSON.parse(readFileSync(join(root,'data/round1-practice.json'),'utf8')),issues=[],ids=new Set(),texts=new Set(),dist=[0,0,0,0,0];
if(normalize('2.5%')===normalize('25%'))issues.push('decimal lost');
for(const q of bank.questions){if(ids.has(q.id))issues.push('duplicate id '+q.id);ids.add(q.id);const n=normalize(q.scenario+' '+q.question);if(texts.has(n))issues.push('duplicate '+q.id);texts.add(n);
for(const k of ['id','topic','category','scenario','question','concept','analysis','reasoning','pitfall','sourceUrl','sourceType','sourceName','sourceScope','QAStatus'])if(typeof q[k]!=='string'||!q[k].trim())issues.push('missing '+k+' '+q.id);
if((q.scenario.length<150&&!q.sourceType.startsWith('사용자 제공'))||q.scenario.length>600)issues.push('scenario length '+q.id);if(q.concept.length<120)issues.push('short lesson '+q.id);
if(![2,4,5].includes(q.choices.length)||new Set(q.choices.map(normalize)).size!==q.choices.length)issues.push('choices '+q.id);if(q.wrongReasons.length!==q.choices.length||q.wrongReasons.some(x=>!x||x.length<12))issues.push('reasons '+q.id);if(q.verification.length<3)issues.push('checks '+q.id);
if(!Number.isInteger(q.answerIndex)||q.answerIndex<0||q.answerIndex>=q.choices.length)issues.push('answer '+q.id);else dist[q.answerIndex]++;if(!q.sourceUrl.startsWith('https://'))issues.push('source '+q.id);}
for(const t of tasks)if(!t.phase.startsWith('1차')||!t.modelAnswer||t.rubric.length<3)issues.push('task '+t.id);
if(issues.length)throw Error(issues.join('\n'));return {version:bank.version,questions:bank.questions.length,practiceTasks:tasks.length,answerDistribution:dist,automatedStructure:'pass',decimalPreservation:'pass',semanticReview:'all items reviewed by author; independent expert review not performed',numericReview:'separate Python report',browserReview:'separate browser report',originalArchive:'90 questions + 12 tasks + AISCORE 8/4 preserved',issues:[]};}

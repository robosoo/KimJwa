import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const json=path=>JSON.parse(readFileSync(join(root,'data',path),'utf8'));
const bank=json('round1-question-bank.json'),lessons=json('concept-lessons.json'),four=json('four-p-guide.json');
const html=readFileSync(join(root,'dist/index.html'),'utf8');
const labels={
 C01:'Predictive AI·Generative AI',C02:'Hallucination',C03:'Prompt Engineering',C04:'Few-shot Prompting',
 C05:'RAG',C06:'Citation',C07:'OCR·Multimodal',C08:'Data Cleaning',C09:'Accuracy·Precision·Recall',
 C10:'Correlation vs. Causation',C11:'Generalization·Overfitting',C12:'LLM-as-a-Judge',
 C13:'Responsible AI',C14:'Bias·Fairness',C15:'Prompt Injection',C16:'Structured Output',
 C17:'Token·Tokenizer',C18:'Context Window',C19:'Message Roles',C20:'Temperature',
 C21:'Zero-shot·Few-shot Prompting',C22:'XML Tags·Delimiters',
 C23:'Model Selection',C24:'Multimodal AI',C25:'Task Decomposition',C26:'RAG vs. Fine-tuning'
};
assert.equal(lessons.length,26,'AI wiki article count changed');
for(const entry of lessons){
 assert.ok(entry.title.startsWith(labels[entry.id]),'Canonical English name missing for '+entry.id);
 assert.ok(entry.wiki?.definition&&entry.wiki?.mechanism&&entry.wiki?.boundary,'Wiki lacks definition/mechanism/limitations '+entry.id);
}
assert.equal(bank.questions.length,64);
for(const q of bank.questions){
 assert.deepEqual(q.sections.map(s=>s.text).join('\n\n'),q.scenario,'Scenario and visible sections diverged: '+q.id);
 assert.ok(!/(?:이 문제는|이 문항은)/.test(q.sections[2].text),'Authoring meta in learner scenario: '+q.id);
}
assert.equal(four.dimensions.length,4);
assert.equal(four.quickChecks.length,8);
assert.ok(!html.includes('"QAStatus":'),'Internal QA annotations leaked into learner bundle');
assert.ok(!html.includes('"sourceScope":'),'Detailed editorial provenance leaked into learner bundle');
assert.ok(!html.includes('"editorialReview":'),'Internal editorial notes leaked into learner bundle');
assert.ok(!html.includes('<h3>지문 분석</h3>'),'Duplicated explanation section returned');
assert.ok(!html.includes('독립 작성한 설명과 사례입니다.'),'Repeated editorial disclaimer returned');
assert.ok(html.includes('공식 개념 자료')&&html.includes('개념 참고용 링크입니다.'),'Source scope disclosure missing');
assert.ok(html.includes('"id":"C26"')&&html.includes('"id":"R1-064"'),'Content truncated in release bundle');
console.log(JSON.stringify({editorialQA:'PASS',canonicalEnglishTitles:lessons.length,questions:bank.questions.length,privateMetaExcluded:true,duplicatedAnalysisHidden:true,fourPConcepts:4,fourPRecall:8}));

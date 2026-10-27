(()=>{'use strict';
const root=document.getElementById('step6');if(!root)return;
const one=s=>root.querySelector(s),many=s=>[...root.querySelectorAll(s)];
const phases=['work','preview','confirm','preparing','ready','writing','done'];
let phase='work',idx=0,finished=0,retries=0;
const prompts=[
'모의 프로젝트에서 가장 중요한 요구사항을 어떻게 확인했나요?',
'모의 프로젝트의 필수 기능을 어떤 순서로 구현했다고 설명할 수 있나요?',
'업무 담당자에게 무엇을 질문했고 그 답을 어떻게 반영할 건가요?',
'테스트 중 발견한 문제와 수정·재검증 방법을 설명해 보세요.',
'AI가 제안한 방법 중 본인이 선택하거나 거절한 결정은 무엇인가요?',
'끝까지 구현하지 못했거나 확인하지 못한 부분이 있다면 어떻게 설명할 건가요?'
];
function display(p){phase=p;phases.forEach(n=>{const el=one('#s6-phase-'+n);if(el)el.hidden=n!==p});const status=one('#s6-phase-info');status.textContent={'work':'과제 작업 중(모의)','preview':'제출 미리보기(모의)','confirm':'확정 전 마지막 확인(모의)','preparing':'질문 생성 대기(모의)','ready':'서술형 시작 전(모의)','writing':'서술형 답변 중(모의)','done':'연습 완료(모의)'}[p]}
one('#s6-open-preview').addEventListener('click',()=>display('preview'));
one('#s6-back-edit').addEventListener('click',()=>display('work'));
one('#s6-preview-confirm').addEventListener('click',()=>display('confirm'));
one('#s6-confirm-cancel').addEventListener('click',()=>display('preview'));
one('#s6-confirm-yes').addEventListener('click',()=>{retries=0;one('#s6-retries').textContent='재시도 0회';display('preparing')});
one('#s6-retry').addEventListener('click',()=>{retries++;one('#s6-retries').textContent='재시도 '+retries+'회';one('#s6-prepare-message').textContent='[모의] 질문 생성을 다시 시도하고 있어. 실제 안내에서는 최대 10분 예상 표시가 다시 시작될 수 있어.'});
one('#s6-prepared').addEventListener('click',()=>display('ready'));
function showQuestion(){
display('writing');one('#s6-question-number').textContent='문항 '+(idx+1)+' / 6';
one('#s6-question-text').textContent=prompts[idx];
one('#s6-answer').value='';
one('#s6-answer-progress').textContent='문항별 05:00 · 실제 타이머가 아닌 표시 예시';
one('#s6-question-submit').textContent=idx===5?'답안 제출하고 마치기 (모의)':'답안 제출하고 다음 문제 (모의)';
one('#s6-question-feedback').textContent='본인의 말로 직접 입력해 봐. 현재 문항은 확정 전까지만 수정 가능해.';
}
one('#s6-start-questions').addEventListener('click',()=>{idx=0;finished=0;showQuestion()});
const field=one('#s6-answer');
field.addEventListener('paste',event=>{event.preventDefault();one('#s6-question-feedback').textContent='[모의 금지 체험] 복사·붙여넣기는 사용할 수 없어. 본인이 직접 타이핑해 줘.'});
field.addEventListener('drop',event=>{event.preventDefault();one('#s6-question-feedback').textContent='[모의 금지 체험] 텍스트를 끌어놓는 방식 대신 직접 입력해 줘.'});
field.addEventListener('dragover',event=>event.preventDefault());
function advance(isTimeout){
if(!isTimeout&&!field.value.trim()){one('#s6-question-feedback').textContent='직접 제출하려면 현재 문항에 답변을 입력해야 해. 시간이 끝나는 상황은 [시간 만료 시연]으로 확인해.';return}
finished++;field.value=''; // training responses never stored
if(idx>=5){one('#s6-done-count').textContent='6 / 6문항 완료';display('done');return}
idx++;showQuestion();one('#s6-question-feedback').textContent=isTimeout?'[모의] 시간이 끝나 입력 내용이 자동 확정되고 다음 문항이 즉시 시작됐어. 이전 문항은 수정할 수 없어.':'[모의] 이전 답안이 확정됐어. 다음 문항의 5분이 즉시 시작되는 실제 규칙을 기억해.';
}
one('#s6-question-submit').addEventListener('click',()=>advance(false));
one('#s6-timeout').addEventListener('click',()=>advance(true));
one('#s6-restart-sim').addEventListener('click',()=>{idx=0;finished=0;retries=0;one('#s6-prepare-message').textContent='질문을 준비하는 중이야.';one('#s6-retries').textContent='재시도 0회';display('work')});
display('work');
})();
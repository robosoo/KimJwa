(()=>{'use strict';
const root=document.getElementById('step7');if(!root)return;
const one=s=>root.querySelector(s),all=s=>[...root.querySelectorAll(s)];
const reportTemplates={
'접속/로딩':{time:'10:22',step:'작업 화면 접속',before:'작업 화면 전환',message:'로딩 표시가 반복되고 특정 영역이 열리지 않음'},
'터미널':{time:'10:48',step:'터미널 실행',before:'개발 서버 실행 명령 입력',message:'터미널 연결 오류가 반복됨'},
'에디터/파일':{time:'11:17',step:'파일 저장',before:'AI가 수정한 파일을 에디터에서 확인',message:'외부 변경 감지가 표시되고 저장되지 않음'},
'AI 채팅':{time:'11:52',step:'Codex 명령',before:'승인 후 실행을 기다림',message:'모델 API 오류가 반복됨'},
'기타':{time:'13:16',step:'서술형 준비',before:'질문 생성 진행 상태를 확인',message:'재시도 안내가 반복됨 · 예시 문항 번호: 2'}
};
const type=one('#s7-report-type'),report=one('#s7-report-preview'),reportStatus=one('#s7-report-status');
function renderReport(){const v=reportTemplates[type.value]||reportTemplates['기타'];report.textContent='신고 유형: '+type.value+'\n발생 시각: '+v.time+' (가상)\n발생 단계: '+v.step+'\n직전 동작: '+v.before+'\n오류 문구/증상: '+v.message+'\n복구 시도: 해당 영역/장치의 공식 재연결 절차를 확인함\n\n[주의] 실제 접수에는 실제 시각·증상으로 직접 바꾸되 키·토큰·비밀번호를 적지 마세요.';reportStatus.textContent='학습용 예시만 표시돼. 실제 문제 신고가 접수된 것이 아니야.';}
type.addEventListener('change',renderReport);renderReport();
one('#s7-report-copy').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw Error('not supported');await navigator.clipboard.writeText(report.textContent);reportStatus.textContent='예시가 복사됐어. 실제 신고는 시험 화면 상단 “문제 신고”로 접수해.';}catch(e){reportStatus.textContent='이 브라우저는 자동 복사가 어려워. 위 예시를 직접 선택해 복사할 수 있어.'}});

const schedules={
early:{label:'10:00에 과제 시작(가정)',body:'과제 시간을 최대 180분 사용해 13:00에 끝냈다고 가정하면, 질문 준비 약 5분 후 13:05에 6문항 답변을 시작해서 30분을 모두 사용하면 13:35에 마칠 수 있어. 실제 준비 시간은 더 걸릴 수 있어. 14:00까지 기다려야 하는 휴식 규정은 없어.'},
mid:{label:'11:30에 과제 시작(가정)',body:'11:30부터 14:00까지 전체 시간은 150분이야. 180분 과제 풀이를 모두 쓰는 것이 불가능하고, 질문 준비·6문항 답변 시간도 이 안에 들어가야 해. 일찍 제출하고 남은 전체 시간을 확인해.'},
late:{label:'13:00에 과제 시작(가정)',body:'14:00까지 전체 60분이 남아. 질문 준비를 약 5분, 서술형을 최대 30분으로 가정하면 작업에 쓸 수 있는 시간은 약 25분보다 길지 않아. 대기가 길어지면 더 줄어들어. 이는 권장 제출 시각이 아니라 계산 예시야.'}
};
const schedule=one('#s7-schedule'),scheduleOut=one('#s7-schedule-result');
function renderSchedule(){const v=schedules[schedule.value]||schedules.early;scheduleOut.replaceChildren();const title=document.createElement('strong');title.textContent=v.label;const p=document.createElement('p');p.textContent=v.body;scheduleOut.append(title,p)}
schedule.addEventListener('change',renderSchedule);renderSchedule();

const checkboxes=all('#s7-checks input[type=checkbox]'),key='skhynix-r2-stage7-checks-v1';
try{const saved=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(saved))checkboxes.forEach((b,i)=>b.checked=!!saved[i])}catch(e){}
function countCheck(){one('#s7-check-progress').textContent='리허설 점검 '+checkboxes.filter(b=>b.checked).length+' / '+checkboxes.length;try{localStorage.setItem(key,JSON.stringify(checkboxes.map(b=>b.checked)))}catch(e){}}
checkboxes.forEach(b=>b.addEventListener('change',countCheck));countCheck();
})();
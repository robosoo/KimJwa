(()=>{'use strict';
const root=document.getElementById('step7');if(!root)return;
const one=s=>root.querySelector(s),all=s=>[...root.querySelectorAll(s)];
const scenarios=[
{q:'시험 화면의 에디터 영역 한 곳만 멈추고 “이 영역 다시 불러오기”가 보인다.',opts:['전체 페이지 새로고침부터 한다','해당 영역 다시 불러오기를 우선 사용한다','별도 계정을 만든다'],answer:1,why:'한 영역만 멈추면 해당 영역 다시 불러오기를 먼저 이용해. 풀 페이지 새로고침은 다른 상태에 영향을 줄 수 있어.',src:'B 5쪽'},
{q:'웹캠 연결이 끊겼다는 경고가 나왔다.',opts:['감독 연결 → 연결 확인에서 권한·카메라 사용 앱 확인 후 다시 연결','촬영을 중단한 채 계속 과제만 진행','관리 프로세스를 종료해 경고를 숨긴다'],answer:0,why:'브라우저/OS 카메라 권한과 다른 앱 사용을 확인하고 “카메라 다시 연결”로 복구해.',src:'B 5쪽'},
{q:'화면 공유가 끊겼고 모니터가 추가로 연결되어 있다.',opts:['시험 창 하나만 공유한다','전체 공유 없이 진행한다','추가 모니터를 분리하고 “전체 화면 다시 공유” 선택'],answer:2,why:'추가 모니터를 분리한 뒤 전체 화면 공유를 다시 연결해야 해. 창/탭 공유가 아니야.',src:'B 5쪽'},
{q:'휴대폰 Cofa Proctor가 세션에서 끊겼다.',opts:['새 설치 QR을 스마트폰 기본 카메라로 반복 인식','Proctor 앱에서 실제 응시 연결 QR을 다시 스캔하고 촬영 구도 확인','다른 스마트폰 AI를 대신 켠다'],answer:1,why:'연결용 QR을 Proctor 앱에서 스캔해. 설치 QR과 응시 연결 QR은 별개야.',src:'B 5쪽'},
{q:'Codex 출력이 멈춘 듯 보이고 “승인 대기”가 표시된다.',opts:['요청 명령을 확인하고 승인 또는 거절을 결정','항상 5분 이상 기다린다','다른 계정으로 시험을 다시 시작한다'],answer:0,why:'승인 대기·실행 중·완료를 먼저 구분해. 승인 대기 상태는 사용자가 조치를 해야 다음으로 진행돼.',src:'B 2·5쪽'},
{q:'AI가 “실행 중”이며 콘솔 출력이 계속 갱신되고 있다.',opts:['같은 요청을 여러 번 중복 실행','실행 상태를 관찰하고 응답시간을 시간 계획에 반영','곧바로 시스템 관리 서비스를 종료'],answer:1,why:'단순 응답 대기와 모델/API 오류를 구분해. 반복 오류라면 문제 신고를 이용해.',src:'B 3·5쪽'},
{q:'터미널이 연결되지 않는다는 오류가 발생했다.',opts:['단축키로 전체 페이지 재시작부터 한다','내장 터미널의 “다시 연결” 또는 + 버튼으로 새 터미널을 시도','문제를 외부로 복사해 개인 AI에 붙인다'],answer:1,why:'터미널 다시 연결 또는 새 터미널을 먼저 시도하고 해결되지 않으면 신고해.',src:'B 5쪽'},
{q:'Browser가 개발 서버 화면 대신 “응답하는 서버 없음”을 표시한다.',opts:['서버 오류·종료 → 실행 포트 → 0.0.0.0 → 경로 순서로 점검','항상 PORT 3000만 입력한다','시험 브라우저 밖에서 URL을 직접 접속한다'],answer:0,why:'PORT 3000은 예시야. 실제 서버 실행 로그, 포트, 바인딩, URL을 순서대로 확인해.',src:'B 3·5쪽'},
{q:'Codex가 수정한 파일을 에디터가 “외부 변경 감지”로 표시한다.',opts:['무조건 에디터 내용으로 덮어쓴다','에디터·디스크 두 내용을 비교하고 저장할 버전을 선택한다','파일을 외부 저장소로 Push한다'],answer:1,why:'“외부 변경 불러오기”와 “현재 내용으로 저장”은 서로 다른 수정 사항을 보존해. 선택 전 비교해.',src:'B 3·5쪽'},
{q:'응시 탭을 실수로 닫았다.',opts:['본인의 원래 개인 링크로 다시 접속하고 감독 장치 연결을 확인한다','새 계정을 만들고 180분 타이머를 초기화한다','저장되지 않은 변경도 반드시 복구된다고 가정한다'],answer:0,why:'동일한 개인 링크로 재접속 가능하나, 시간은 멈추거나 초기화되지 않고 미저장 수정은 보장되지 않아.',src:'B 5쪽'},
{q:'서술형 질문 준비 또는 답변 전송 중 오류가 반복된다.',opts:['다른 계정·세션으로 임의 재응시한다','원인을 무시하고 다른 기기 AI에 묻는다','화면의 재시도 안내를 따른 뒤 발생 시각·단계·문항 번호를 기록하고 신고'],answer:2,why:'문항 생성·전송 오류는 화면 안내대로 재시도하되, 반복 오류는 시간과 문항 번호를 남겨 신고해.',src:'B 4~5쪽'},
{q:'터미널이 메모리를 지나치게 사용하다 종료됐다.',opts:['CPU/RAM·자신의 프로세스를 확인하고 과도한 작업을 줄인다','운영 관리 서비스를 강제로 종료한다','본인의 OOM도 자동 구제된다고 확정한다'],answer:0,why:'CPU/RAM·프로세스를 점검해. 본인의 과도한 프로세스 사용으로 인한 OOM은 구제 대상이 아니라고 명시돼 있어.',src:'B 5쪽'}
];
let ci=0;const answerState=Array(scenarios.length).fill(null);
function renderCase(){
const c=scenarios[ci],host=one('#s7-case');host.replaceChildren();
const h=document.createElement('div');h.className='s7-question';h.textContent=(ci+1)+' / '+scenarios.length+' · '+c.q;host.append(h);
const buttons=document.createElement('div');buttons.className='s7-actions';
c.opts.forEach((value,i)=>{const b=document.createElement('button');b.type='button';b.className='s7-btn';b.textContent=String.fromCharCode(65+i)+'. '+value;b.setAttribute('aria-pressed',String(answerState[ci]===i));b.addEventListener('click',()=>{answerState[ci]=i;renderCase()});buttons.append(b)});host.append(buttons);
const fb=document.createElement('div');fb.setAttribute('aria-live','polite');fb.className='s7-result';
if(answerState[ci]===null){fb.textContent='가장 먼저 해야 할 조치를 선택해 봐.';}
else {const ok=answerState[ci]===c.answer;fb.className+=' '+(ok?'good':'bad');const title=document.createElement('strong'),desc=document.createElement('p');title.textContent=ok?'맞았어.':'다시 확인해.';desc.textContent=c.why+' [출처 '+c.src+']';fb.append(title,desc)}
host.append(fb);
one('#s7-case-progress').textContent='확인 '+answerState.filter(x=>x!==null).length+' / '+scenarios.length+' · 정답 '+answerState.filter((x,i)=>x===scenarios[i].answer).length+'개';
one('#s7-case-prev').disabled=ci===0;one('#s7-case-next').disabled=ci===scenarios.length-1;
}
one('#s7-case-prev').addEventListener('click',()=>{if(ci>0){ci--;renderCase()}});
one('#s7-case-next').addEventListener('click',()=>{if(ci<scenarios.length-1){ci++;renderCase()}});
one('#s7-case-reset').addEventListener('click',()=>{answerState.fill(null);ci=0;renderCase()});
renderCase();

const warningCases=[
{q:'타인의 구체적인 코드와 풀이 지시를 직접 전달받아 시험 결과물에 반영한 사실이 확인됐다.',kind:'violation',why:'외부 조력을 통한 답안 반영이 직접 확인되면 탈락 처리 대상이야.'},
{q:'촬영용 휴대폰을 반복해서 만졌지만 Proctor 연결을 복구했는지 외부 연락했는지는 확인되지 않았다.',kind:'review',why:'반복 휴대폰 조작은 원인을 추가 확인해야 해. 장애 시각과 복구 사유를 기록해.'},
{q:'동료 응시자와 문제·코드·산출물을 서로 전달하며 공동으로 해결한 사실이 확인됐다.',kind:'violation',why:'응시자 간 답안 교환·공동 풀이가 직접 확인되면 제한 위반이야.'},
{q:'웹캠이 한 차례 끊겼지만 기술 장애인지 고의적인 가림인지 불분명하다.',kind:'review',why:'고의 회피와 기술 장애를 구분해야 해. 연결 문제는 안내대로 복구하고 기록해.'},
{q:'허용되지 않은 외부 AI로 답안 코드를 만든 뒤 시험 환경에 반입한 사실이 확인됐다.',kind:'violation',why:'허용되지 않은 외부 도구를 통한 답안 생성·반입은 제한 위반이야.'},
{q:'혼잣말하는 모습이나 이어폰 착용 정황이 영상에 보인다. 외부 답안 지시 여부는 확인되지 않았다.',kind:'review',why:'혼잣말·이어폰 착용만으로 외부 조력을 단정하지 않아. 상황을 확인하는 대상이야.'},
{q:'다른 사람이 실제 응시자를 대신해 키보드와 마우스를 조작한 사실이 확인됐다.',kind:'violation',why:'타인의 대리 응시·대리 수행은 탈락 처리 대상이야.'},
{q:'응시 PC에 별도 브라우저 창이 떠 있지만 실제 사용 내용은 확인되지 않았다.',kind:'review',why:'창이 실행된 사실과 답안을 전달받아 활용한 행위를 구분해 추가 확인해.'}
];
let wi=0;const warningState=Array(warningCases.length).fill(null);
const warningLabels={violation:'명백한 제한 위반이 확인된 경우',review:'사실관계 추가 확인이 필요한 경우'};
function renderWarning(){
const c=warningCases[wi],host=one('#s7-warning');host.replaceChildren();
const h=document.createElement('div');h.className='s7-question';h.textContent=(wi+1)+' / '+warningCases.length+' · '+c.q;host.append(h);
const buttons=document.createElement('div');buttons.className='s7-actions';
for(const k of ['violation','review']){const b=document.createElement('button');b.className='s7-btn';b.type='button';b.textContent=warningLabels[k];b.setAttribute('aria-pressed',String(warningState[wi]===k));b.addEventListener('click',()=>{warningState[wi]=k;renderWarning()});buttons.append(b)}
host.append(buttons);
const res=document.createElement('div');res.className='s7-result';res.setAttribute('aria-live','polite');
if(warningState[wi]===null)res.textContent='확인된 사실과 의심 정황을 구분해 봐.';
else {const ok=warningState[wi]===c.kind;res.className+=' '+(ok?'good':'bad');res.textContent=(ok?'맞았어. ':'다시 확인해. ')+c.why+' [공식 B 5쪽]'}
host.append(res);
one('#s7-warning-progress').textContent='확인 '+warningState.filter(x=>x!==null).length+' / '+warningCases.length+' · 정답 '+warningState.filter((x,i)=>x===warningCases[i].kind).length+'개';
one('#s7-warning-prev').disabled=wi===0;one('#s7-warning-next').disabled=wi===warningCases.length-1;
}
one('#s7-warning-prev').addEventListener('click',()=>{if(wi>0){wi--;renderWarning()}});
one('#s7-warning-next').addEventListener('click',()=>{if(wi<warningCases.length-1){wi++;renderWarning()}});
one('#s7-warning-reset').addEventListener('click',()=>{warningState.fill(null);wi=0;renderWarning()});renderWarning();

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
/* Cofa Study SPA v3 · Original sources, transparent provenance, no fake AI */
(()=>{'use strict';
const routes=['learn','library','practice','review'];
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const E=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const key='cofa-study-v3';
function readLocal(name,def){try{const x=localStorage.getItem(key+':'+name);return x===null?def:JSON.parse(x)}catch(_){return def}}
function setLocal(name,value){try{localStorage.setItem(key+':'+name,JSON.stringify(value))}catch(_){}}
const state={tab:'learn',selected:'video-1',sourceFilter:'all',search:'',done:new Set(readLocal('done',[])),answers:{},practiceMode:'cases',caseId:'lot',reveal:false,persona:'fde',questions:new Set(),expandedLuka:new Set(),threeMinutes:180,clockActive:false,clockUntil:0,clockHandle:null,content:null,legacy:null,portal:null,luka:null,items:[],loading:true};
function toast(msg){const el=$('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2000)}
function saveDone(){setLocal('done',[...state.done]);renderProgress()}
function renderProgress(){const all=state.items.length||1,pct=Math.round(state.done.size/all*100);const side=$('#sideProgress'),fill=$('#sideProgressFill');if(side)side.textContent=pct+'%';if(fill)fill.style.width=Math.max(0,Math.min(100,pct))+'%'}
function labelFor(tab){return {learn:'학습 로드맵',library:'심층 자료실',practice:'실전 연습',review:'이해도 점검'}[tab]||'학습'}
function syncUrl(){try{const q=new URLSearchParams(location.search);q.set('tab',state.tab);if(state.tab==='library')q.set('id',state.selected);else q.delete('id');history.replaceState(null,'',location.pathname+'?'+q.toString())}catch(_){}}
function route(tab,id,scroll=true){if(!routes.includes(tab))return;state.tab=tab;if(id)state.selected=id;state.search='';state.sourceFilter='all';syncUrl();render();if(scroll)window.scrollTo({top:0,behavior:'instant'})}
function sanitizeUrl(url){try{const u=new URL(String(url));return (u.protocol==='https:'||u.protocol==='http:')?u.href:''}catch(_){return ''}}
function sourceLink(url,label='원문 열기 ↗'){const safe=sanitizeUrl(url);return safe?'<a href="'+E(safe)+'" class="button" target="_blank" rel="noopener noreferrer">'+E(label)+'</a>':''}
function badges(list){return list.filter(Boolean).map(x=>'<span class="pill">'+E(x)+'</span>').join('')}
function hero(title,kicker,description){return '<div class="eyebrow">'+E(kicker)+'</div><h1 class="section-title">'+E(title)+'</h1><p class="section-intro">'+E(description)+'</p>'}
function cardStat(num,label){return '<div class="metric"><strong>'+E(num)+'</strong><span>'+E(label)+'</span></div>'}
function faq(qa){return (qa||[]).map((x,i)=>{const q=Array.isArray(x)?x[0]:x.question,a=Array.isArray(x)?x[1]:x.answer;return '<details class="quiz-disclosure"><summary>'+E(String(i+1)+'. '+q)+'</summary><div class="answer">'+E(a)+'</div></details>'}).join('')}
function factsHtml(arr){return (arr||[]).map((x,i)=>'<div class="article-fact"><b>근거 '+String(i+1).padStart(2,'0')+'</b>'+E(x)+'</div>').join('')}
function logicHtml(arr){return (arr||[]).map((x,i)=>'<div class="article-logic"><div class="number-chip">'+(i+1)+'</div><div><strong>'+E(Array.isArray(x)?x[0]:x.title)+'</strong><p>'+E(Array.isArray(x)?x[1]:x.body)+'</p></div></div>').join('')}
function getGroup(item){if(item.kind==='video')return 'video';if(item.kind==='luka')return 'people';if(item.kind==='extra')return item.data?.kind==='official'?'official':'people';if(/공식|채용|행사|콘솔|출처/.test(item.data?.source||'')||/A ·|공식/.test(item.data?.tier||''))return 'official';return 'people'}
function buildItems(){
  const a=(state.content?.sections||[]).map(c=>({id:'video-'+c.n,kind:'video',title:String(c.n).padStart(2,'0')+' · '+c.title,subtitle:c.deck,data:c,source:state.content.video.url,category:'개발자 인터뷰',minutes:12}));
  a.push({id:'luka-depth',kind:'luka',title:'Luka FDE Top 6 · 정밀 복기',subtitle:'225분 실제 실전, 7단계, 3+1축, Q&A',data:state.luka,source:state.luka?.url,category:'실제 참가자',minutes:50});
  (state.legacy?.chapters||[]).forEach(c=>{if(c.id==='luka')return;a.push({id:'old-'+c.id,kind:'legacy',title:c.title,subtitle:c.source||c.topic||'',data:c,source:c.url,category:c.source||'공개 자료',minutes:c.minutes||15})});
  (state.portal?.newChapters||[]).forEach(c=>a.push({id:'more-'+c.id,kind:'extra',title:c.title,subtitle:c.author||c.level||'',data:c,source:c.url,category:c.level||'참가자 기록',minutes:c.duration||15}));
  state.items=a;
  if(!a.some(x=>x.id===state.selected))state.selected=a[0]?.id||'video-1';
  renderProgress();
}
function navUI(){$$('[data-nav]').forEach(x=>{const yes=x.dataset.nav===state.tab;x.classList.toggle('active',yes);if(yes)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')});const b=$('#crumb');if(b)b.textContent=labelFor(state.tab)}
function render(){
navUI();const out=$('#screen');if(!out)return;
if(state.loading){out.innerHTML='<section class="loading-view"><div class="skeleton title-skeleton"></div><div class="skeleton line-skeleton"></div><div class="skeleton card-skeleton"></div></section>';return}
out.innerHTML=state.tab==='learn'?renderLearn():state.tab==='library'?renderLibrary():state.tab==='practice'?renderPractice():renderReview();
renderProgress();
}
function renderLearn(){
const next=state.items.find(x=>!state.done.has(x.id))||state.items[0];
const videoCount=state.content.sections.length,participantCount=state.items.filter(x=>getGroup(x)==='people').length;
return '<div class="section-margin">'+hero('AI와 일하는 능력을,\n실전으로 익히다.','SK HYNIX · 2차 준비','크래프톤 개발자 인터뷰와 실제 코파톤 참가자의 경험을 한 흐름으로 공부하고, 가상 업무 사례로 직접 판단을 점검합니다.')+'</div>'+
'<section class="surface hero-card section-margin"><div class="tiny-circle"></div><span class="pill teal">오늘의 학습 · 20분</span><h2>문제를 정의하고, AI에 맡기고,<br>결과를 끝까지 설명하기.</h2><p>실제 평가가 보는 것은 프롬프트의 길이보다 목표를 세우고 검증한 흔적입니다. 지금 읽지 않은 자료 한 장부터 시작하세요.</p><div class="inline-actions"><button class="button primary" data-action="open-source" data-id="'+E(next?.id||'video-1')+'">이어서 공부하기 <span aria-hidden="true">→</span></button><button class="button" data-action="navigate" data-tab="practice">실전 사례로 이동</button></div></section>'+
'<div class="metric-grid section-margin">'+cardStat(videoCount+'장','개발자 인터뷰')+cardStat(participantCount+'개','참가자·독립 후기')+cardStat((state.portal?.cases||[]).length+'종','검증 실전 과제')+'</div>'+
'<div class="subhead-row"><h2>학습 순서</h2><span class="pill">아래에서 차례로 진행</span></div><div class="roadmap section-margin">'+
[
{num:'01',title:'Probe의 목적과 AI Native 이해',desc:'일의 목표와 AI의 역할부터 구분하기',id:'video-2'},
{num:'02',title:'문제 정의와 가상 실무자 질문법',desc:'짧은 요구에서 숨은 제약을 발견하는 과정',id:'video-5'},
{num:'03',title:'실제 코파톤 참가자의 수행 복기',desc:'Luka의 225분과 상위권·실패 사례',id:'luka-depth'},
{num:'04',title:'검증 가능한 결과와 사후 Q&A',desc:'Tech / Intent / Cognition 증거를 연결하기',id:'video-7'},
{num:'05',title:'가상 사례 문제로 직접 판단하기',desc:'데이터·예외·안전조건을 체크한 뒤 해설 확인',tab:'practice'},
{num:'06',title:'개념과 함정 12문항 점검',desc:'틀리기 쉬운 경계조건 위주로 회귀 연습',tab:'review'}
].map(c=>'<button class="roadmap-step" data-action="'+(c.tab?'navigate':'open-source')+'" '+(c.tab?'data-tab="'+c.tab+'"':'data-id="'+c.id+'"')+'"><span class="num">'+c.num+'</span><span><strong>'+E(c.title)+'</strong><small>'+E(c.desc)+'</small></span><span class="go">›</span></button>').join('')+'</div>'+
'<div class="subhead-row"><h2>읽기 전에 기억할 두 가지</h2></div><div class="insight-grid"><div class="surface insight-card"><span class="icon-circle">◎</span><h3>과정과 결과를 함께 확인</h3><p>AI가 ‘완료’라고 말해도 실제 코드를 실행한 증거는 아닙니다. 먼저 입력·기대 결과·실행 로그를 확인합니다.</p></div><div class="surface insight-card"><span class="icon-circle">⌘</span><h3>다른 행사의 규칙은 구분</h3><p>7월 코파톤에서 사용한 모델·배점·질문 수를 10월 SK하이닉스 2차의 확정 규정으로 옮기지 않습니다.</p></div></div>'+
'<p class="footer-meta">자료: KRAFTON Cofa 공식 소개, 개발자 인터뷰 영상, 코파톤 공개 참가자 회고, 사용자 제공 정리문. 실제 출제문항과 무관한 학습용 사례는 별도로 표시합니다.</p>';
}
function displayItems(){return state.items.filter(x=>{let group=getGroup(x);if(state.sourceFilter!=='all'&&state.sourceFilter!==group)return false;const q=state.search.trim().toLowerCase();return !q||[x.title,x.subtitle,x.category,x.data?.thesis||'',x.data?.title||''].join(' ').toLowerCase().includes(q)})}
function renderLibrary(){
const count=state.items.length,selected=state.items.find(x=>x.id===state.selected)||state.items[0],filtered=displayItems();
return '<div class="section-margin">'+hero('읽고 이해하는 자료실','원문 근거 · 깊이 읽기','한 번 선택하면 바로 옆에 본문이 열립니다. 15개 인터뷰 주제, 실제 참가자 후기, 공식 설명을 같은 구조로 비교하세요.')+'</div>'+
'<div class="library-shell"><div class="library-nav surface"><h3>자료 목차 <span class="pill">'+count+'개</span></h3><input class="search" id="librarySearch" aria-label="자료 검색" type="search" placeholder="자료·사람·개념 검색" value="'+E(state.search)+'"><div class="filter-row">'+[['all','전체'],['video','개발자 인터뷰'],['people','참가자 후기'],['official','공식·검증']].map(a=>'<button class="filter-btn '+(state.sourceFilter===a[0]?'active':'')+'" data-action="source-filter" data-filter="'+a[0]+'">'+a[1]+'</button>').join('')+'</div><div class="source-items">'+(filtered.length?filtered.map(x=>'<button class="source-option '+(selected?.id===x.id?'active':'')+'" data-action="open-source" data-id="'+E(x.id)+'"><strong>'+E(x.title)+'</strong><span>'+E(x.category)+' · 약 '+E(x.minutes)+'분'+(state.done.has(x.id)?' · 학습 완료':'')+'</span></button>').join(''):'<p class="muted small">일치하는 자료가 없어요.</p>')+'</div></div>'+
'<div class="library-main surface">'+(selected?renderArticle(selected):'<div class="content-card">불러온 자료가 없습니다.</div>')+'</div></div>';
}
function articleHeader(item,summary,kind,caution){
const group=getGroup(item),badge=group==='video'?'개발자 인터뷰':group==='people'?'참가자 공개 경험':'공식 자료';
return '<div class="library-header"><div class="row">'+badges([badge,item.category,'약 '+item.minutes+'분'])+(state.done.has(item.id)?'<span class="pill teal">학습 완료 ✓</span>':'')+'</div><h2>'+E(item.title)+'</h2><p>'+E(summary||item.subtitle)+'</p>'+((caution)?'<div class="source-note warn">'+E(caution)+'</div>':'')+'<div class="inline-actions">'+sourceLink(item.source,'실제 원문 확인 ↗')+'</div></div>';
}
function articleFooter(item){
const i=state.items.findIndex(x=>x.id===item.id),prev=state.items[i-1],next=state.items[i+1];
return '<div class="article-footer"><button class="button '+(state.done.has(item.id)?'soft':'primary')+'" data-action="toggle-done" data-id="'+E(item.id)+'">'+(state.done.has(item.id)?'완료 취소':'이 장 학습 완료 ✓')+'</button><div class="buttons">'+(prev?'<button class="button" data-action="open-source" data-id="'+E(prev.id)+'">‹ 이전</button>':'')+(next?'<button class="button" data-action="open-source" data-id="'+E(next.id)+'">다음 ›</button>':'')+'</div></div>';
}
function articleSection(title,html){return '<h3>'+E(title)+'</h3>'+html}
function renderArticle(item){
if(item.kind==='video')return renderVideo(item);
if(item.kind==='luka')return renderLuka(item);
if(item.kind==='extra')return renderExtra(item);
return renderLegacy(item);
}
function renderVideo(item){
const s=item.data,items=s.points||[],idx=s.n;
const header=articleHeader(item,s.deck,'interview',state.content.video.notice);
const facts=items.map((p,i)=>'<div class="article-fact"><b>'+String(i+1).padStart(2,'0')+'</b><strong>'+E(p[0])+'</strong><p>'+E(p[1])+'</p></div>').join('');
return header+'<div class="article-body"><div class="eyebrow">원문 학습 · '+String(idx).padStart(2,'0')+' / 15</div>'+
articleSection('먼저 확인할 핵심 근거',facts)+articleSection('왜 이 판단이 중요한가','<div class="callout">'+E(s.logic)+'</div>')+
articleSection('스스로 설명해보기','<div class="source-note"><strong>이해 질문</strong><br>'+E(s.check)+'</div>')+
(idx===5?articleSection('실전 참가자의 반례','<p>실제 코파톤 후기에서는 README에 실무 문제와 솔루션이 이미 자세히 서술되어 있어 추가 인터뷰의 한계가 있었다고 회고합니다. 잘 질문하기와 무조건 많이 질문하기는 다릅니다.</p>'):'')+
(idx===7?articleSection('세 평가축을 한 번에 확인','<div class="grid2"><div class="lesson"><h4>Technique</h4><p>작동하는 결과와 테스트</p></div><div class="lesson"><h4>Intent</h4><p>목표·위임·검증 통제</p></div><div class="lesson"><h4>Cognition</h4><p>자기 결과물의 이해·설명</p></div><div class="lesson"><h4>공통</h4><p>주장을 실제 파일·근거에 연결</p></div></div>'):'')+
'<p class="muted small">이 장은 사용자가 제공한 15부 구성의 영상 정리 자료를 교육용으로 재구성한 글입니다. 발언과 적용 전략을 혼동하지 않도록 확인하세요.</p>'+articleFooter(item)+'</div>';
}
function renderLuka(item){
const s=item.data||{},sections=s.sections||[], header=articleHeader(item,s.deck,'participant',s.warning);
return header+'<div class="article-body"><div class="eyebrow">실전 원문 기반 · 11개 심화 단원</div><div class="callout">2026년 7월 30일 KRAFTON FDE 코파톤 · Top 6 · 225분 빌드 → 5문항 사후 확인. 참가자 개인의 실제 회고이며 SK하이닉스 2차 규정은 아닙니다.</div>'+
articleSection('현장의 시간 구조','<div class="grid2"><div class="lesson"><span class="eyebrow">빌드</span><h4>225분</h4><p>11:15~15:00 · 참가자 기록</p></div><div class="lesson"><span class="eyebrow">확인문제</span><h4>5문항</h4><p>각 3분 안내, 15:00~15:20 구간</p></div></div>')+
articleSection('실제 수행과 판단을 따라 읽기','<div class="detail-grid">'+sections.map((c,i)=>'<details class="quiz-disclosure" '+(i<2?'open':'')+'><summary><span class="number-chip" style="display:inline-grid;vertical-align:middle;margin-right:8px">'+(i+1)+'</span>'+E(c.h)+'</summary><div class="qa-answer"><p><strong>실제 후기</strong><br>'+E(c.p)+'</p><p><strong>왜 중요한가</strong><br>'+E(c.why)+'</p><p><strong>적용 한계</strong><br>'+E(c.pitfall)+'</p></div></details>').join('')+'</div>')+
articleSection('사후 Q&A 3단계 답변 구조','<div class="grid2">'+(s.responseFramework||[]).map((a,i)=>'<div class="lesson"><span class="eyebrow">STEP '+(i+1)+'</span><p>'+E(a)+'</p></div>').join('')+'</div>')+
articleSection('스스로 확인할 문제',faq(s.questions))+
articleSection('Luka가 비판한 점','<div class="source-note warn">README가 이미 상세했고 결과물이 비슷해졌으며, 개인별 세부 점수는 확인하지 못했다는 비판도 함께 읽어야 합니다. ‘재사용 가능한 도구’를 많이 만들수록 무조건 유리하다는 결론은 아닙니다.</div>')+
articleFooter(item)+'</div>';
}
function renderLegacy(item){
const c=item.data||{},header=articleHeader(item,c.thesis||c.question,'legacy',c.limit);
return header+'<div class="article-body">'+
articleSection('핵심 질문','<div class="callout">'+E(c.question||'이 자료에서 무엇을 확인할 수 있을까?')+'</div>')+
articleSection('원문에 근거한 확인 사항',factsHtml(c.facts))+
articleSection('판단의 논리',logicHtml(c.reason))+
articleSection('실제 상황에 적용해 보기','<p>'+E(c.example||'')+'</p>')+
articleSection('학습 과제','<div class="source-note">'+E(c.task||'')+'</div>')+
articleSection('확인문제와 해설',faq(c.qa))+
articleFooter(item)+'</div>';
}
function renderExtra(item){
const c=item.data||{},header=articleHeader(item,c.thesis||c.question,'extra',c.risk);
return header+'<div class="article-body">'+
articleSection('생각할 질문','<div class="callout">'+E(c.question||'무엇이 어려웠는가?')+'</div>')+
articleSection('직접 후기·보도에서 확인된 사실',factsHtml(c.facts))+
articleSection('논리와 실무 적용',logicHtml(c.reasoning))+
articleSection('가상 반례로 확장','<p>'+E(c.case||'')+'</p>')+
articleSection('확인문제와 해설',faq(c.qna))+
articleFooter(item)+'</div>';
}
function caseSource(){
let arr=state.portal?.cases||[];return arr.find(x=>x.id===state.caseId)||arr[0]||null}
const persons={
fde:{title:'FDE · 인터뷰 코칭 서비스',intro:'선수가 경기 후 인터뷰를 연습하는 도구. 실제 코파톤의 주제를 참고했지만 아래 답변은 모두 가상입니다.',questions:[
['지금 어떻게 코칭하나요?','[가상] 코치가 경기 후 30분 이내에 질문을 주고 구두로 피드백을 전달합니다.','업무의 시작·종료를 알아야 앱의 최소 경로를 설계할 수 있습니다.'],
['가장 자주 실패하는 상황은?','[가상] 질문의 맥락을 놓치거나 팀 전략과 관련된 발언을 무심코 합니다.','실패 사례가 구체적인 테스트 조건이 됩니다.'],
['성공했다고 판단할 기준은?','[가상] 질문 3개 제시, 선수 답변 저장, 개선 피드백 1개, 재시도입니다.','화려한 추가 기능보다 핵심 경로를 완성하도록 범위를 좁힙니다.'],
['마이크가 없으면 어떻게 하나요?','[가상] 텍스트 입력 대체 경로를 제공합니다. 음성 전사가 잘못됐을 때는 직접 수정할 수 있어야 합니다.','예외를 사용자 여정의 일부로 다룹니다.'],
['무엇은 만들지 않아도 되나요?','[가상] 장기 분석 대시보드와 실명 선수 계정 연동은 제외합니다.','제외 기준도 설계 결정입니다.']
]},
olive:{title:'올리브영 · 웰니스 캠페인',intro:'매장·MD 업무 맥락의 캠페인 자동화. 질문·수치·답변은 교육용 가상 설정입니다.',questions:[
['기존 MD 작업 흐름은?','[가상] 요청 → 트렌드 조회 → SKU 확인 → 카피 초안 → 표현 검사 → 운영 승인 후 게시.','현업의 실제 종료 조건을 확인합니다.'],
['무슨 오류가 큰 비용을 만드나요?','[가상] 재고 0 상품 추천, 확인되지 않은 효능 문구, 승인 전 발행이 큰 위험입니다.','도메인 경험을 검증 가능한 규칙으로 전환합니다.'],
['선정 가능한 SKU의 기준은?','[가상] 단종이거나 재고가 0인 상품은 제외합니다.','LLM의 그럴듯한 설명이 상품 가용성의 증거가 아닙니다.'],
['외부 트렌드 API가 실패하면?','[가상] 최신 정보를 지어내지 말고 외부 조회 실패를 표시합니다.','결측과 장애를 모르는 상태로 유지할 수 있어야 합니다.'],
['승인 조건은 어떻게 되나요?','[가상] DRAFT → REVIEW → APPROVED → PUBLISHED 순서입니다.','승인 전 게시나 고객 반응 저장을 금지할 수 있습니다.']
]}
};
const explainCases=[
{title:'답변이 없는 상태에서 코칭이 생성된다',where:'음성 전사 결과가 빈 문자열이더라도 피드백 생성 함수로 전달되는 조건을 검토합니다.',impact:'없는 답변을 정상 답변처럼 평가해 잘못된 코칭이나 저장 기록이 생길 수 있습니다.',next:'빈 전사 입력을 재현하고, 입력 유효성 검사와 텍스트 재입력 경로를 추가한 후 E2E를 다시 실행합니다.'},
{title:'같은 이벤트 ID로 서로 다른 장치가 충돌한다',where:'저장 중복키가 event_id 하나만 사용되는지 실제 DB 제약과 코드를 확인합니다.',impact:'장치 A와 B의 동일 ID를 같은 이벤트로 보고 정상 데이터를 누락하거나 덮어쓸 수 있습니다.',next:'(device_id,event_id) 복합키 후보를 검증하고 같은 ID·다른 장치 동시 입력 테스트를 수행합니다.'},
{title:'기획전이 승인 전에 노출된다',where:'DRAFT·REVIEW 단계에서 PUBLISHED 전용 조회·반응 API가 호출되는지 확인합니다.',impact:'미검토 문구 또는 미승인 상품이 사용자에게 공개될 수 있습니다.',next:'각 상태에서 조회·반응 요청을 실행해 차단 여부를 검증하고 승인 상태 전이 후 회귀 테스트를 수행합니다.'}
];
function renderPractice(){
const caseData=caseSource();
let body=state.practiceMode==='cases'?renderCasePractice(caseData):state.practiceMode==='stakeholders'?renderStakeholders():renderExplain();
return '<div class="practice-header">'+hero('실전에서 판단하는 힘','가상 과제 · 근거 중심 검증','비공식 과제를 통해 문제 정의, 예외조건, 테스트 증거, 사후 질문에 대응하는 사고를 연습합니다.')+'</div>'+
'<div class="surface pad"><div class="segmented">'+[['cases','자료 분석'],['stakeholders','실무자 질문'],['explain','사후 Q&A']].map(a=>'<button class="segment '+(state.practiceMode===a[0]?'active':'')+'" data-action="practice-mode" data-mode="'+a[0]+'">'+a[1]+'</button>').join('')+'</div><div class="plain-divider"></div>'+body+'</div>';
}
function renderCasePractice(c){
if(!c)return '<p>기존 과제 자료를 불러오지 못했습니다.</p>';
const selected=state.portal.cases.findIndex(x=>x.id===c.id);
return '<div class="eyebrow">실무형 가상 자료 · '+state.portal.cases.length+'개</div><h2 class="subheading" style="margin-top:8px">상황을 읽고, 무엇을 증명할지 결정하세요.</h2><div class="case-selector">'+state.portal.cases.map((x,i)=>'<button class="case-choice '+(c.id===x.id?'active':'')+'" data-action="choose-case" data-id="'+E(x.id)+'"><span class="pill">'+E(x.tag||x.type||'CASE')+'</span><strong>'+E(x.title)+'</strong><small>CASE '+String(i+1).padStart(2,'0')+' / '+state.portal.cases.length+'</small></button>').join('')+'</div><hr class="thin-rule"><span class="eyebrow">현재 과제 · '+String(selected+1).padStart(2,'0')+'</span><h2 class="subheading" style="margin-top:6px">'+E(c.title)+'</h2><p class="mock-brief">'+E(c.brief)+'</p><div class="source-note warn">이 문제의 이름·자료·정답은 교육용 가상 내용이며 SK하이닉스 또는 크래프톤의 실제 기출이 아닙니다.</div>'+
'<h3 class="subheading">01. 제공된 자료 읽기</h3>'+(c.files||[]).map(f=>'<details class="source-file"><summary>'+E(f[0])+' <span class="muted small">내용 보기</span></summary><pre>'+E(f[1])+'</pre></details>').join('')+
'<h3 class="subheading">02. 반드시 검증할 조건</h3><ul class="check-list">'+(c.checks||[]).map(q=>'<li>'+E(q)+'</li>').join('')+'</ul>'+
'<h3 class="subheading">03. 풀이와 검증 기준</h3><button class="button '+(state.reveal?'soft':'primary')+'" data-action="reveal-solution">'+(state.reveal?'해설 접기':'해설 보기')+'</button>'+(state.reveal?'<div class="solution" style="margin-top:12px">'+E(c.reference||c.solution||'')+'</div>':'')+
'<div class="source-note">AI가 “테스트 통과”라고 출력한 것만으로는 실제 시험을 수행한 증거가 아닙니다. 자료의 예상값과 실제 실행을 대응시켜야 합니다.</div>';
}
function renderStakeholders(){
const p=persons[state.persona];
return '<span class="eyebrow">INTERVIEW TRAINING · 사전 작성된 응답</span><h2 class="subheading" style="margin-top:6px">질문을 선택해 요구사항을 발굴하세요.</h2><div class="segmented">'+[['fde','FDE 인터뷰'],['olive','올리브영']].map(x=>'<button class="segment '+(state.persona===x[0]?'active':'')+'" data-action="choose-persona" data-id="'+x[0]+'">'+x[1]+'</button>').join('')+'</div><p>'+E(p.intro)+'</p><div class="source-note warn">실제 AI와 대화하는 화면이 아닙니다. 선택하면 미리 준비된 가상 답변과 학습 해설이 열립니다.</div>'+
p.questions.map((q,i)=>'<div class="practice-question"><button data-action="toggle-question" data-index="'+i+'"><span>'+E(String(i+1)+'. '+q[0])+'</span><span aria-hidden="true">'+(state.questions.has(i)?'−':'+')+'</span></button>'+(state.questions.has(i)?'<div class="practice-answer"><strong>담당자 답변</strong><p>'+E(q[1])+'</p><strong>왜 묻는가?</strong><p>'+E(q[2])+'</p></div>':'')+'</div>').join('');
}
function renderExplain(){
return '<span class="eyebrow">COGNITION · 제출물 기반 설명</span><h2 class="subheading" style="margin-top:6px">3분 안에 자기 설계를 설명하는 법</h2><p>실제 코파톤 참가자가 관찰한 구조는 <strong>약점 위치 → 업무 파급 → 검증·개선 계획</strong>입니다. 아래 문항은 교육용 가상 사례입니다.</p><div class="grid2 section-margin">'+[['01','약점 위치','어느 파일·조건·상태인가'],['02','실패 파급','어떤 입력에서 무엇이 잘못되나'],['03','검증·수정','어떤 테스트로 고침을 증명하나']].map(x=>'<div class="lesson"><div class="eyebrow">'+x[0]+'</div><h4>'+E(x[1])+'</h4><p>'+E(x[2])+'</p></div>').join('')+'</div><div class="row split section-margin"><div><strong>3분 구두 연습</strong><div id="practiceTimer" class="timer">'+timeFormat(state.threeMinutes)+'</div></div><div class="row"><button class="button primary" data-action="timer-start">시작</button><button class="button" data-action="timer-pause">일시정지</button><button class="button" data-action="timer-reset">초기화</button></div></div>'+
explainCases.map((q,i)=>'<details class="quiz-disclosure"><summary>Q'+(i+1)+'. '+E(q.title)+'</summary><div class="answer"><p><strong>① 약점</strong><br>'+E(q.where)+'</p><p><strong>② 파급</strong><br>'+E(q.impact)+'</p><p><strong>③ 다음 검증</strong><br>'+E(q.next)+'</p></div></details>').join('');
}
function quizQuestions(){return state.portal?.drill||[]}
function renderReview(){
const quiz=quizQuestions(),answered=Object.keys(state.answers).length,correct=Object.entries(state.answers).filter(([k,v])=>quiz[Number(k)]&&quiz[Number(k)][2]===v).length;
return '<div class="section-margin">'+hero('실수하는 지점을 찾아내다','확인문제 · 즉시 해설','선택하면 정답과 근거가 바로 나타납니다. 실제 시험 점수가 아닌 학습용 자기 점검입니다.')+'</div>'+
'<div class="review-layout"><div><div class="surface content-card"><div class="row split"><div><span class="eyebrow">검증 드릴</span><h2 class="subheading" style="margin:6px 0">12개 핵심 판단문제</h2></div><div class="row">'+badges([answered+' / '+quiz.length+' 응답',correct+'개 정답'])+'</div></div><p class="muted small">정답을 선택한 후에는 문항별 해설을 읽고, 원문과 다른 행사의 사실이 섞였는지 확인하세요.</p></div>'+
quiz.map((x,i)=>{const choice=state.answers[i],answered=choice!==undefined;return '<div class="quiz-question" id="question-'+i+'"><div class="eyebrow">문항 '+String(i+1).padStart(2,'0')+' / '+quiz.length+'</div><h3>'+E(x[0])+'</h3><div class="options">'+x[1].map((label,j)=>'<button class="option '+(answered?(j===x[2]?'correct':choice===j?'wrong':''):'')+'" data-action="answer" data-index="'+i+'" data-option="'+j+'" '+(answered?'disabled':'')+'>'+String.fromCharCode(65+j)+'. '+E(label)+'</button>').join('')+'</div>'+(answered?'<div class="feedback"><strong>'+(choice===x[2]?'정답입니다.':'정답 확인')+'</strong><p>'+E(x[3])+'</p></div>':'')+'</div>'}).join('')+
'<div class="row section-margin"><button class="button" data-action="reset-quiz">전체 다시 풀기</button><button class="button primary" data-action="navigate" data-tab="learn">학습 로드맵으로</button></div></div>'+
'<aside class="review-help surface pad"><span class="eyebrow">검증 사고 순서</span><h3 style="font-size:16px;margin:7px 0">틀리는 이유를 기록하세요.</h3><p class="small muted">숫자를 잘못 계산했나요? 예외조건을 놓쳤나요? 공식 정보와 참가자 후기를 혼동했나요?</p><hr class="thin-rule"><span class="pill teal">답안 입력 없음</span><p class="small muted">AI가 연결되지 않은 작성칸은 제공하지 않습니다. 버튼을 눌러 선택하고 즉시 해설을 확인할 수 있습니다.</p></aside></div>';
}
function timeFormat(t){let m=Math.floor(t/60),s=t%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function timerDisplay(){const el=$('#practiceTimer');if(el)el.textContent=timeFormat(state.threeMinutes)}
function stopTimer(){if(state.clockHandle){clearInterval(state.clockHandle);state.clockHandle=null}state.clockActive=false}
function tick(){if(!state.clockActive)return;state.threeMinutes=Math.max(0,Math.ceil((state.clockUntil-Date.now())/1000));timerDisplay();if(state.threeMinutes===0){stopTimer();toast('3분이 종료됐어요. 해설을 확인하세요.')}}
async function init(){
 const qs=new URLSearchParams(location.search),qtab=qs.get('tab'),qid=qs.get('id');if(routes.includes(qtab))state.tab=qtab;if(qid)state.selected=qid;
 const urls=['/content.json','/luka-deep.json','/cofa-chapters.json','/portal-content.json'];
 const fetched=await Promise.allSettled(urls.map(async url=>{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status+' '+url);return r.json()}));
 [state.content,state.luka,state.legacy,state.portal]=fetched.map(x=>x.status==='fulfilled'?x.value:null);
 if(!state.content||!state.luka){state.loading=false;const o=$('#screen');if(o)o.innerHTML='<div class="surface content-card"><h2>핵심 자료를 불러오지 못했어요.</h2><p>인터넷 연결을 확인하고 페이지를 다시 열어주세요.</p><button class="button primary" data-action="reload">새로고침</button></div>';return}
 if(!state.portal)state.portal={cases:[],drill:[],newChapters:[]};
 if(!state.legacy)state.legacy={chapters:[]};
 buildItems();state.loading=false;render();syncUrl()
}
document.addEventListener('click',ev=>{
const btn=ev.target.closest('[data-action],[data-nav]');if(!btn)return;
if(btn.dataset.nav){route(btn.dataset.nav);return}
const ac=btn.dataset.action;
if(ac==='navigate'){route(btn.dataset.tab);return}
if(ac==='reload'){location.reload();return}
if(ac==='open-source'){route('library',btn.dataset.id);return}
if(ac==='toggle-done'){state.done.has(btn.dataset.id)?state.done.delete(btn.dataset.id):state.done.add(btn.dataset.id);saveDone();toast(state.done.has(btn.dataset.id)?'학습 완료로 표시했습니다.':'완료 표시를 취소했어요.');render();return}
if(ac==='source-filter'){state.sourceFilter=btn.dataset.filter;render();return}
if(ac==='practice-mode'){state.practiceMode=btn.dataset.mode;render();return}
if(ac==='choose-case'){state.caseId=btn.dataset.id;state.reveal=false;render();return}
if(ac==='reveal-solution'){state.reveal=!state.reveal;render();return}
if(ac==='choose-persona'){state.persona=btn.dataset.id;state.questions.clear();render();return}
if(ac==='toggle-question'){const i=Number(btn.dataset.index);state.questions.has(i)?state.questions.delete(i):state.questions.add(i);render();return}
if(ac==='answer'){const i=Number(btn.dataset.index),j=Number(btn.dataset.option);if(state.answers[i]!==undefined)return;state.answers[i]=j;render();const node=$('#question-'+i);if(node)node.scrollIntoView({block:'nearest',behavior:'instant'});return}
if(ac==='reset-quiz'){state.answers={};render();return}
if(ac==='timer-start'){if(state.clockActive||state.threeMinutes===0)return;state.clockActive=true;state.clockUntil=Date.now()+state.threeMinutes*1000;state.clockHandle=setInterval(tick,400);tick();return}
if(ac==='timer-pause'){tick();stopTimer();return}
if(ac==='timer-reset'){stopTimer();state.threeMinutes=180;timerDisplay();return}
});
document.addEventListener('input',ev=>{
if(ev.target.id!=='librarySearch')return;
const el=ev.target;const cursor=el.selectionStart;state.search=el.value;
const list=$('.source-items');if(!list)return;
const filtered=displayItems(),selected=state.selected;
list.innerHTML=filtered.length?filtered.map(x=>'<button class="source-option '+(selected===x.id?'active':'')+'" data-action="open-source" data-id="'+E(x.id)+'"><strong>'+E(x.title)+'</strong><span>'+E(x.category)+' · 약 '+E(x.minutes)+'분'+(state.done.has(x.id)?' · 학습 완료':'')+'</span></button>').join(''):'<p class="muted small">일치하는 자료가 없어요.</p>';
if(typeof cursor==='number'&&document.activeElement===el)el.setSelectionRange(cursor,cursor);
});
window.addEventListener('popstate',()=>{let q=new URLSearchParams(location.search);if(routes.includes(q.get('tab')))state.tab=q.get('tab');if(q.get('id'))state.selected=q.get('id');render()});
init();
})();

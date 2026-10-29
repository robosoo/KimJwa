/* Cofa Study SPA v3 · Original sources, transparent provenance, no fake AI */
(()=>{'use strict';
const routes=['learn','library','practice','review'];
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const E=s=>String(s??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const key='cofa-study-v3';
const timerKey='session-timer';
function readLocal(name,def){try{const x=localStorage.getItem(key+':'+name);return x===null?def:JSON.parse(x)}catch(_){return def}}
function setLocal(name,value){try{localStorage.setItem(key+':'+name,JSON.stringify(value))}catch(_){}}
const safeDone=readLocal('done',[]);
const safeAnswers=readLocal('answers',{});
const state={tab:'learn',selected:'probe-basics',sourceFilter:'all',search:'',done:new Set(Array.isArray(safeDone)?safeDone:[]),answers:safeAnswers&&typeof safeAnswers==='object'&&!Array.isArray(safeAnswers)?safeAnswers:{},practiceMode:'guided',caseId:'lot',reveal:false,persona:'work',questions:new Set(),expandedLuka:new Set(),threeMinutes:180,clockActive:false,clockUntil:0,clockHandle:null,content:null,legacy:null,portal:null,luka:null,items:[],manifest:null,guide:null,beginner:null,path:null,deep:null,guided:{step:0,answers:{}},reviewFilter:'all',reviewWrong:new Set(),compareId:'harness',sessionRemain:14400,sessionUntil:0,sessionHandle:null,loading:true};
function toast(msg){const el=$('#toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2000)}
function saveDone(){setLocal('done',[...state.done]);renderProgress()}
function renderProgress(){const all=state.items.length||1,pct=Math.round(state.done.size/all*100);const side=$('#sideProgress'),fill=$('#sideProgressFill');if(side)side.textContent=pct+'%';if(fill)fill.style.width=Math.max(0,Math.min(100,pct))+'%'}
function labelFor(tab){return {learn:'시작하기',library:'후기·근거',practice:'전략·실습',review:'이해도 확인'}[tab]||'학습'}
const canonical={learn:'start',library:'learn',practice:'practice',review:'quiz'};
function routeFromUrl(){
 const q=new URLSearchParams(location.search);let parts=[];
 try{parts=decodeURIComponent(location.hash.slice(1)).split('/')}catch(_){parts=[]}
 const map={start:'learn',learn:'library',practice:'practice',quiz:'review'};
 state.tab=map[parts[0]]||(routes.includes(q.get('tab'))?q.get('tab'):'learn');
 const raw=parts[1]||q.get('id')||readLocal('selected','probe-basics');
 const aliases={luka:'luka-depth',official:'old-official',video:'old-video',josh:'old-josh'};
 state.selected=aliases[raw]||raw;
 if(state.tab==='practice'&&q.get('tab')==='practice'&&!parts[1])state.practiceMode='cases';
 if(state.tab==='practice'&&['compare','cases','stakeholders','explain','preparation','guided'].includes(parts[1]))state.practiceMode=parts[1];
}
function syncUrl(push=false){
 const detail=state.tab==='library'?'/'+state.selected:state.tab==='practice'?'/'+state.practiceMode:'';
 const url=location.pathname+'#'+canonical[state.tab]+detail;
 if(location.pathname+location.search+location.hash!==url)history[push?'pushState':'replaceState'](null,'',url);
 setLocal('selected',state.selected);
}
function route(tab,id,scroll=true){
 if(!routes.includes(tab))return;state.tab=tab;if(id)state.selected=id;
 syncUrl(true);render();const selectedOption=$('.source-option.active');if(selectedOption)selectedOption.scrollIntoView({block:'nearest',behavior:'instant'});if(scroll)window.scrollTo({top:0,behavior:'instant'});
 const target=state.tab==='library'?$('.library-main'):$('#screen');
 if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}
}
function sanitizeUrl(url){try{const u=new URL(String(url));return (u.protocol==='https:'||u.protocol==='http:')?u.href:''}catch(_){return ''}}
function sourceLink(url,label='원문 열기 ↗'){const safe=sanitizeUrl(url);return safe?'<a href="'+E(safe)+'" class="button" target="_blank" rel="noopener noreferrer">'+E(label)+'</a>':''}
function badges(list){return list.filter(Boolean).map(x=>'<span class="pill">'+E(x)+'</span>').join('')}
function hero(title,kicker,description){return '<div class="eyebrow">'+E(kicker)+'</div><h1 class="section-title">'+E(title)+'</h1><p class="section-intro">'+E(description)+'</p>'}
function cardStat(num,label){return '<div class="metric"><strong>'+E(num)+'</strong><span>'+E(label)+'</span></div>'}
function faq(qa){return (qa||[]).map((x,i)=>{const q=Array.isArray(x)?x[0]:x.question,a=Array.isArray(x)?x[1]:x.answer;return '<details class="quiz-disclosure"><summary>'+E(String(i+1)+'. '+q)+'</summary><div class="answer">'+E(a)+'</div></details>'}).join('')}
function factsHtml(arr){return (arr||[]).map((x,i)=>'<div class="article-fact"><b>근거 '+String(i+1).padStart(2,'0')+'</b>'+E(x)+'</div>').join('')}
function logicHtml(arr){return (arr||[]).map((x,i)=>'<div class="article-logic"><div class="number-chip">'+(i+1)+'</div><div><strong>'+E(Array.isArray(x)?x[0]:x.title)+'</strong><p>'+E(Array.isArray(x)?x[1]:x.body)+'</p></div></div>').join('')}
function getGroup(item){if(item.kind==='basics')return 'official';if(item.kind==='analysis')return 'video';if(item.kind==='kit')return 'reference';if(item.kind==='video'||item.kind==='synthesis')return 'video';if(['old-gist','old-junho'].includes(item.id))return 'reference';if(item.kind==='luka')return 'people';if(item.kind==='extra')return item.data?.kind==='official'?'official':'people';if(/공식|채용|행사|콘솔|출처/.test(item.data?.source||'')||/A ·|공식/.test(item.data?.tier||''))return 'official';return 'people'}
function buildItems(){
  const a=(state.content?.sections||[]).map(c=>({id:'video-'+c.n,kind:'video',title:String(c.n).padStart(2,'0')+' · '+c.title,subtitle:c.deck,data:c,source:state.content.video.url,category:'개발자 인터뷰',minutes:12}));
  a.unshift({id:'creator-guide',kind:'synthesis',title:state.guide.creatorGuide.title,subtitle:'제품 설계자의 평가 의도와 참가자 경험 연결',data:state.guide.creatorGuide,source:state.content.video.url,category:'개발자 대담 · 핵심 교재',minutes:25});
  a.push({id:'luka-depth',kind:'luka',title:'요구 확인부터 검증·설명까지: 참가자의 실제 수행',subtitle:'과제 문서·합의·검증·인수인계·자기 설명',data:state.luka,source:state.luka?.url,category:'실제 참가자',minutes:50});
  (state.legacy?.chapters||[]).forEach(c=>{a.push({id:'old-'+c.id,kind:'legacy',title:c.title,subtitle:c.source||c.topic||'',data:c,source:c.url,category:c.source||'공개 자료',minutes:c.minutes||15})});
  (state.portal?.newChapters||[]).forEach(c=>a.push({id:'more-'+c.id,kind:'extra',title:c.title,subtitle:c.author||c.level||'',data:c,source:c.url,category:c.level||'참가자 기록',minutes:c.duration||15}));
  a.unshift({id:'probe-basics',kind:'basics',title:state.beginner.title,subtitle:'비개발 직군의 자료 확인·AI 활용·검증·설명 입문',data:state.beginner,source:'https://www.getcofa.com/ko/probe',category:'처음 읽기 · 공식 근거와 학습 해석',minutes:15});
  const topicTitles={'luka-depth':'요구 확인부터 검증·설명까지: 참가자의 실제 수행','old-luka':'상세한 과제 안내를 받은 뒤 무엇을 했을까?','old-seo':'질문하고 작게 완성하며 검증한 접근','old-johnny':'AI 오류가 생긴 단계를 나누어 확인하기','old-choi':'현업 경험을 검증 규칙으로 바꾸기','old-junho':'완성한 범위와 미구현 범위를 구분하기','more-giran':'준비한 도구가 오히려 시간을 소모한 경우','more-honam':'문제 정의와 결과물 이해가 엇갈린 경우','more-jiypark':'환경 오류 뒤 범위를 줄여 회복한 경우','more-junho-post':'실제 구현과 미구현을 정직하게 설명하기'};
  a.forEach(x=>{if(topicTitles[x.id]){x.originalTitle=x.title;x.title=topicTitles[x.id]}});
  a.push({id:'kit-review',kind:'kit',title:state.beginner.kitReview.title,subtitle:'사용자 제공 13개 파일 · 샘플 검사와 실제 제품 구분',data:state.beginner.kitReview,source:state.beginner.kitReview.url,category:'학습용 문서 · 준비물 점검',minutes:10});
  a.splice(2,0,{id:'reasoning-foundations',kind:'analysis',title:state.deep.title,subtitle:'대담 15주제 · 인과관계·정합성·가정·반례',data:state.deep,source:'https://maily.so/josh/posts/x1zg69d3rqg',category:'핵심 개념 · 근거 대조',minutes:35});
  state.items=a;
  if(!a.some(x=>x.id===state.selected))state.selected=a[0]?.id||'video-1';
  renderProgress();
}
function navUI(){$$('[data-nav]').forEach(x=>{const yes=x.dataset.nav===state.tab;x.classList.toggle('active',yes);if(yes)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')});const b=$('#crumb');if(b)b.textContent=labelFor(state.tab)}
function render(){
navUI();
const guide=$('#examGuide'),out=$('#dynamicContent');if(!out)return;
const learningHome=state.tab==='learn';
if(guide)guide.hidden=!learningHome;
out.hidden=learningHome;
if(learningHome){renderProgress();return}
if(state.loading){out.innerHTML='<section class="loading-view"><div class="skeleton title-skeleton"></div><div class="skeleton line-skeleton"></div><div class="skeleton card-skeleton"></div></section>';return}
out.innerHTML=state.tab==='library'?renderLibrary():state.tab==='practice'?renderPractice():renderReview();
renderProgress();
}
function renderLearn(){
const next=state.items.find(x=>x.id===readLocal('selected','probe-basics')&&!state.done.has(x.id))||state.items.find(x=>!state.done.has(x.id))||state.items[0];
return '<div class="section-margin">'+hero('AI와 만든 결과,\n내 판단으로 설명하기.','SK HYNIX · 2차 준비','비개발 직군을 위한 학습센터입니다. 자료를 읽고 AI와 업무 결과물을 만든 뒤, 숫자·출처·예외를 검증하고 선택 이유를 설명하는 연습을 합니다.')+'</div>'+
'<section class="surface content-card section-margin"><h2>처음 오셨나요?</h2><p>Cofa Probe는 AI와 실무 과제를 해결하는 역량을 평가하는 제품입니다. 비개발자는 문서·AI 도구·업무 서비스를 사용하는 환경이 소개돼 있습니다.</p><p class="small muted">10월 29일 공식 안내에서 Chrome, 웹 IDE·Codex 이용, 공개 Skill·Harness 조건부 허용, 10월 31일 10:00~14:00 일정이 확인됐습니다. 실제 과제 내용·필수 산출물 형식·세부 채점 기준은 여전히 미공개입니다.</p><p class="small muted">이곳에서는 자료·해설과 가상 문제로 판단을 연습합니다. 실제 AI 대화·파일 편집·공식 평가는 제공하지 않습니다.</p><button class="button primary" data-action="open-source" data-id="probe-basics">Probe와 공부 방법부터 알아보기 →</button></section>'+
'<section class="resume-line section-margin"><div><span class="eyebrow">이어서 읽을 자료</span><p>'+E(next.title)+'</p></div><button class="button" data-action="open-source" data-id="'+E(next.id)+'">이어서 공부하기 →</button></section>'+renderGuidedResume()+renderStudyPlan()+
'<details class="surface content-card section-margin"><summary>더 깊게 읽기 · 필요한 주제만 선택</summary><div class="roadmap">'+[
{title:'인과관계·정합성·반례로 깊게 이해',desc:'대담 15주제의 주장·한계·필요 개념',id:'reasoning-foundations'},
{title:'평가 설계자의 세 가지 역량',desc:'목표·결과 품질·자기 이해를 각각 증명',id:'creator-guide'},
{title:'공식 제품 설명과 평가 근거',desc:'산출물·작업 기록·사후 설명의 관계',id:'old-official'},
{title:'실제 참가자의 수행 과정',desc:'과제 문서·필요한 질문·합의·검증·인수인계',id:'luka-depth'},
{title:'상반된 전략의 조건 비교',desc:'선택과 기각의 이유, 실패 조건',mode:'compare'},
{title:'준비물과 전체 리허설 계획',desc:'문서 틀·실행 키트·실행 기록을 구분',mode:'preparation'}
].map((x,i)=>'<button class="roadmap-step" data-action="'+(x.id?'open-source':'navigate')+'" '+(x.id?'data-id="'+x.id+'"':'data-tab="practice" data-mode="'+x.mode+'"')+'><span class="num">'+String(i+1).padStart(2,'0')+'</span><span><strong>'+E(x.title)+'</strong><small>'+E(x.desc)+'</small></span><span class="go">›</span></button>').join('')+'</div></details>'+
'<div class="source-note"><strong>시험 규정은 해당 안내로 확인</strong><p>개발자의 제품 설명은 평가 목적의 우선 근거입니다. 과거 코파톤의 225분·모델·배점·질문 수를 이번 시험의 규정으로 옮기지 않습니다. SK하이닉스 공식 안내의 2차 일정은 10월 31일~11월 1일 중 1일이며 개인별 시간과 허용 도구는 개별 안내가 우선합니다.</p><div class="inline-actions">'+sourceLink('https://skhynix-hackathon.com/ai-2026','대회 공식 안내 ↗')+sourceLink('https://talent.skhynix.com/hub/ko/company/story/237','SK하이닉스 공식 설명 ↗')+'</div></div>';
}
function renderGuidedResume(){
const answered=Object.keys(state.guided.answers).length;if(!answered)return '';
const completed=state.path.steps.filter((_,i)=>guidedCorrect(i)).length;
return '<section class="resume-line section-margin"><div><span class="eyebrow">풀이 기록 · '+completed+' / '+state.path.steps.length+' 판단 확인</span><p>'+E(state.path.steps[state.guided.step].title)+'</p></div><button class="button primary" data-action="navigate" data-tab="practice" data-mode="guided">풀이 이어가기 →</button></section>';
}
function renderStudyPlan(){
return '<div class="subhead-row"><h2>가장 적게 읽고, 직접 확인하는 순서</h2></div><p class="muted">전 자료를 먼저 완독할 필요는 없습니다. 한 문제에서 막히는 개념을 찾아 읽고 다시 적용하세요. 아래는 권장 학습법이며 공식 평가 절차가 아닙니다.</p><div class="study-plan section-margin">'+state.beginner.studyPlan.map((x,i)=>'<section class="surface content-card"><span class="eyebrow">'+String(i+1).padStart(2,'0')+'</span><h3>'+E(x.title)+'</h3><p>'+E(x.body)+'</p><p><strong>남길 결과</strong><br>'+E(x.output)+'</p><p class="small muted">점검 · '+E(x.check)+'</p><button class="button" data-action="'+(x.action==='source'?'open-source':'navigate')+'" '+(x.action==='source'?'data-id="'+x.id+'"':'data-tab="'+(x.action==='quiz'?'review':'practice')+'"'+(x.action==='practice'?' data-mode="'+x.id+'"':''))+'>'+E(x.label)+' →</button></section>').join('')+'</div>';
}
function displayItems(){return state.items.filter(x=>{let group=getGroup(x);if(state.sourceFilter!=='all'&&state.sourceFilter!==group)return false;const q=state.search.trim().toLowerCase();return !q||[x.title,x.subtitle,x.category,x.data?.thesis||'',x.data?.title||'',x.data?.author||'',x.originalTitle||'',x.source||''].join(' ').toLowerCase().includes(q)})}
function renderLibrary(){
const sources=[...state.manifest.sourceRecords,...(state.manifest.officialHackathonReferences||[]),...(state.manifest.officialResearchReferences||[]),...(state.manifest.supplementalSourceRecords||[]),...(state.manifest.analysisReferences||[]),...(state.manifest.learningDesignReferences||[]),...(state.manifest.reportIntakeReferences||[])];
const count=state.items.length,selected=state.items.find(x=>x.id===state.selected)||state.items[0],filtered=displayItems();
return '<div class="section-margin">'+hero('읽고 이해하는 자료실','원문 근거 · 깊이 읽기','공식 자료와 실제 후기를 읽고, 관찰·해석·가상 사례를 구분합니다. 모바일에서는 자료를 선택하면 본문으로 이동합니다.')+'</div>'+
'<div class="library-shell"><div class="library-nav surface"><h3>자료 목차 <span class="pill">'+count+'개</span></h3><input class="search" id="librarySearch" aria-label="자료 검색" type="search" placeholder="자료·사람·개념 검색" value="'+E(state.search)+'"><div class="filter-row">'+[['all','전체'],['video','평가 제품 대담'],['people','참가자 후기'],['official','공식·보도'],['reference','보조·학습 예시']].map(a=>'<button class="filter-btn '+(state.sourceFilter===a[0]?'active':'')+'" data-action="source-filter" data-filter="'+a[0]+'">'+a[1]+'</button>').join('')+'</div><div class="source-items">'+(filtered.length?filtered.map(x=>'<button class="source-option '+(selected?.id===x.id?'active':'')+'" data-action="open-source" data-id="'+E(x.id)+'"><strong>'+E(x.title)+'</strong><span>'+E(x.category)+' · 약 '+E(x.minutes)+'분'+(state.done.has(x.id)?' · 읽음':'')+'</span></button>').join(''):'<p class="muted small">일치하는 자료가 없어요.</p>')+'</div></div>'+
'<article class="library-main surface" tabindex="-1" aria-label="학습 본문">'+(selected?renderArticle(selected):'<div class="content-card">불러온 자료가 없습니다.</div>')+'</article></div><details class="source-catalog surface"><summary>전체 원문 출처 · '+sources.length+'개</summary><div class="catalog-grid">'+sources.map(x=>'<div><strong>'+E(x.title)+'</strong><p>'+E(x.study_summary||x.scope||x.use)+'</p>'+sourceLink(x.url)+'</div>').join('')+'</div></details>';
}
function articleHeader(item,summary,kind,caution){
 const record=[...state.manifest.sourceRecords,...(state.manifest.supplementalSourceRecords||[])].find(x=>x.url===item.source);
 const types={official:'공식 발표',firsthand:'참가자 직접 후기','reported-interview':'언론 인터뷰','first-party-interview':'개발자 직접 설명','reported-first-party':'기업 발표 기반 보도','official-access-point':'공식 접속 주소',unverified:'공식성 미확인',profile:'보조 프로필','educational-sample':'학습용 가상 자료'};
 const badge=item.kind==='analysis'?'원문·공식·연구 대조 · 학습 해석':item.kind==='basics'?'공식 근거 · 비개발자 학습 해석':item.kind==='synthesis'?'인터뷰를 바탕으로 한 학습 해설':item.kind==='video'?'영상 정리 · 직접 조회 제한':types[record?.evidence_type]||'출처 확인 필요';
 const metadata=record?'<details class="source-metadata"><summary>출처와 확인 범위</summary><dl><dt>원문 제목</dt><dd>'+E(record.original_title||'정확한 제목 미확인 · 학습 목차 제목과 구분')+'</dd><dt>작성자·기관</dt><dd>'+E(record.author_or_publisher)+'</dd><dt>작성일 / 사건일</dt><dd>'+E(record.published_at||'미확인')+' / '+E(record.event_date||'미확인')+'</dd><dt>확인 상태</dt><dd>'+E(record.verification.status)+' · '+E(record.verification.note)+'</dd></dl></details>':'';
 return '<div class="library-header"><div class="row">'+badges([badge,'약 '+item.minutes+'분'])+(state.done.has(item.id)?'<span class="pill teal">읽음 ✓</span>':'')+'</div><h2>'+E(item.title)+'</h2><p>'+E(summary||item.subtitle)+'</p>'+(caution?'<div class="source-note warn">'+E(caution)+'</div>':'')+metadata+(record?.editorial_note&&item.kind==='legacy'?'<div class="source-note warn">'+E(record.editorial_note)+'</div>':'')+'<div class="inline-actions">'+sourceLink(item.source,'원문 확인 ↗')+'</div></div>';
}
function articleFooter(item){
 const i=state.items.findIndex(x=>x.id===item.id),prev=state.items[i-1],next=state.items[i+1];
 return '<div class="related-lessons"><h3>직접 판단에 적용하기</h3><p class="small muted">읽음 표시는 자료를 읽었다는 기록입니다. 이해 여부는 직접 설명하고 다른 조건에 적용해 확인합니다.</p><button class="button primary" data-action="navigate" data-tab="practice" data-mode="guided">풀이 따라하기 →</button><h3>연결해서 읽기</h3><div class="inline-actions">'+[['reasoning-foundations','개념과 근거의 심층 분석'],['creator-guide','평가 설계자의 관점'],['luka-depth','참가자의 수행 과정'],['video-7','세 평가축 해설']].filter(x=>x[0]!==item.id).map(x=>'<button class="button" data-action="open-source" data-id="'+x[0]+'">'+x[1]+'</button>').join('')+'</div></div><div class="article-footer"><button class="button '+(state.done.has(item.id)?'soft':'primary')+'" data-action="toggle-done" data-id="'+E(item.id)+'">'+(state.done.has(item.id)?'읽음 취소':'이 글 읽음으로 표시')+'</button><div class="buttons">'+(prev?'<button class="button" data-action="open-source" data-id="'+E(prev.id)+'">‹ 이전</button>':'')+(next?'<button class="button" data-action="open-source" data-id="'+E(next.id)+'">다음 ›</button>':'')+'</div></div>';
}
function articleSection(title,html){return '<h3>'+E(title)+'</h3>'+html}
function renderArticle(item){
 let headings=[];
 const html=renderArticleRaw(item).replace(/<h3>(.*?)<\/h3>/g,(_,label)=>{const id='article-part-'+headings.length;headings.push({id,label});return '<h3 id="'+id+'">'+label+'</h3>'});
 const outline='<details class="article-outline"><summary>이 글의 목차 · '+headings.length+'개</summary><div>'+headings.map(h=>'<button data-action="jump-heading" data-id="'+h.id+'">'+h.label+'</button>').join('')+'</div></details>';
 return html.replace('<div class="article-body">','<div class="article-body">'+outline);
}
function renderArticleRaw(item){
if(item.kind==='analysis')return renderDeep(item);
if(item.kind==='kit')return renderKit(item);
if(item.kind==='basics')return renderBasics(item);
if(item.kind==='synthesis')return renderCreator(item);
if(item.kind==='video')return renderVideo(item);
if(item.kind==='luka')return renderLuka(item);
if(item.kind==='extra')return renderExtra(item);
return renderLegacy(item);
}
function renderDeep(item){
const d=state.deep;
return articleHeader(item,d.summary,'analysis',d.boundary)+'<div class="article-body">'+
articleSection('먼저 볼 본질 · 여섯 층의 질문','<p>아래는 대담을 바탕으로 정리한 학습용 분석 틀입니다. 위에서 아래로 한 번 쓰고 끝내는 양식이 아니라, 자료와 실행 결과가 바뀔 때 앞선 판단도 다시 확인하는 기준입니다.</p><div class="depth-grid">'+d.layers.map((x,i)=>'<section class="lesson"><span class="eyebrow">LAYER '+(i+1)+'</span><h4>'+E(x[0])+'</h4><p><strong>'+E(x[1])+'</strong></p><p>'+E(x[2])+'</p></section>').join('')+'</div>')+
articleSection('지켜야 할 가치와 판단 원칙',d.values.map(x=>'<details class="quiz-disclosure"><summary>'+E(x[0])+'</summary><div class="answer">'+E(x[1])+'</div></details>').join(''))+
articleSection('15개 주제를 주장·이유·반례로 읽기','<p>관찰에서 준비 전략으로 넘어가는 논리를 확인하세요. “왜 필요한가?”와 함께 “어떤 조건이면 이 결론이 틀릴까?”를 묻습니다.</p>'+d.claims.map(c=>'<details class="quiz-disclosure" '+(c.n===7?'open':'')+'><summary>'+String(c.n).padStart(2,'0')+'. '+E(c.title)+'</summary><div class="answer"><span class="eyebrow">'+E(c.topic)+'</span><p><strong>출처의 설명 · 관찰</strong><br>'+E(c.claim)+'</p><p><strong>내층의 논리 · 학습 해석</strong><br>'+E(c.reasoning)+'</p><p><strong>해결할 문제와 행동</strong><br>'+E(c.action)+'</p><p><strong>필요 개념</strong><br>'+E(c.concepts)+'</p><div class="source-note"><strong>반례·한계·정정</strong><p>'+E(c.limit)+'</p></div><p><strong>설명할 수 있어야 할 질문</strong><br>'+E(c.question)+'</p><div class="inline-actions">'+c.sources.map(u=>sourceLink(u,'근거 원문 ↗')).join('')+'<button class="button" data-action="open-source" data-id="video-'+c.n+'">기존 대담 정리 읽기 →</button></div></div></details>').join(''))+
articleSection('원문 대조에서 확인한 정정',d.corrections.map(x=>'<section class="axis-study"><h4>'+E(x[0])+'</h4><p>'+E(x[1])+'</p>'+sourceLink(x[2])+'</section>').join(''))+
articleSection('개념과 용어의 최소 정의',d.concepts.map(x=>'<details class="quiz-disclosure"><summary>'+E(x[0])+'</summary><div class="answer">'+E(x[1])+'</div></details>').join(''))+
articleSection('근거의 성격과 적용 범위','<div class="table-scroll"><table><thead><tr><th>자료</th><th>성격</th><th>한계</th></tr></thead><tbody>'+d.sources.map(x=>'<tr><th scope="row">'+sourceLink(x.url,x.title+' ↗')+'</th><td>'+E(x.kind)+'</td><td>'+E(x.scope)+'</td></tr>').join('')+'</tbody></table></div>')+
articleSection('이제 한 문제에 적용하기','<p>용어를 외우는 대신, 같은 자료에서 목표·계산·검증·결론이 어떻게 연결되는지 판단합니다. 다른 숫자에서도 원칙이 유지되는지 확인합니다.</p><button class="button primary" data-action="navigate" data-tab="practice" data-mode="guided">풀이 따라하기 →</button>')+articleFooter(item)+'</div>';
}

function renderBasics(item){
const b=state.beginner;
return articleHeader(item,'무엇을 하는 평가인지부터 이해하고, 자료·AI·검증·설명을 연결하는 공부 방법을 익힙니다.','official','')+'<div class="article-body">'+
articleSection('이 사이트로 무엇을 공부하나요?','<p>'+E(b.purpose)+'</p>')+
articleSection('비개발자 환경은 개발자 IDE와 다릅니다','<p>'+E(b.officialEnvironment)+'</p><div class="source-note">공식 홈페이지에서 Probe의 비개발자 탭을 눌러 확인할 수 있습니다. 예시 화면의 남은 시간·모델명·자료를 실제 시험 조건으로 외우지 마세요.</div>')+
articleSection('비개발자에게 세 역량은 어떻게 드러날까?',b.nondevAxes.map(x=>'<section class="axis-study"><h4>'+E(x[0])+'</h4><p>'+E(x[1])+'</p><p><strong>가상 예</strong> '+E(x[2])+'</p></section>').join(''))+
articleSection('이 학습센터에 구현된 기능과 경계','<div class="table-scroll"><table><thead><tr><th>기능</th><th>Probe 제품 설명</th><th>이 학습센터의 실제 기능</th></tr></thead><tbody>'+b.capabilities.map(x=>'<tr><th scope="row">'+E(x[0])+'</th><td>'+E(x[1])+'</td><td>'+E(x[2])+'</td></tr>').join('')+'</tbody></table></div>')+
articleSection('실무자 역할 AI와 작업 AI는 다릅니다',logicHtml([['업무 담당자에게 묻기',b.roles.stakeholder],['작업 AI에 맡기기',b.roles.coding],['사람이 판단하기',b.roles.human]]))+
articleSection('가상 예제 · 조사 후보를 보고하는 업무',logicHtml(b.workedExample))+
articleSection('HW 경험을 어떻게 활용할까?','<p>'+E(b.fieldTransfer)+'</p>')+
articleSection('과정 기록은 무엇을 뜻하나요?','<p>'+E(b.recording)+'</p>')+
articleSection('공식 사이트에서 골라 읽을 내용',b.officialFindings.map(x=>'<section class="axis-study"><h4>'+E(x[0])+'</h4><p>'+E(x[1])+'</p>'+sourceLink(x[2])+'</section>').join(''))+
articleSection('실전 연습 사이트는 따로 있나요?','<p>'+E(b.practiceAccess)+'</p><div class="inline-actions"><button class="button primary" data-action="navigate" data-tab="practice" data-mode="cases">가상 자료로 판단 연습 →</button><button class="button" data-action="navigate" data-tab="practice" data-mode="preparation">준비물·리허설 계획 →</button></div>')+
articleSection('개발자 화면 설명이 궁금할 때','<p class="small muted">'+E(b.scope)+'</p><details class="quiz-disclosure"><summary>파일 탐색기 · 코드 편집기 · Bash · 대화창의 뜻</summary><div class="answer">'+logicHtml(b.workspace.map(x=>[x.name+' · '+x.location,x.meaning+' 예: '+x.example]))+'</div></details>')+
articleSection('처음 보는 용어',b.glossary.map(x=>'<details class="quiz-disclosure"><summary>'+E(x[0])+'</summary><div class="answer">'+E(x[1])+'</div></details>').join(''))+articleFooter(item)+'</div>';
}
function renderKit(item){
const k=state.beginner.kitReview;
return articleHeader(item,k.summary,'educational',k.position)+'<div class="article-body">'+articleSection('13개 파일에서 무엇을 읽었나?','<div class="table-scroll"><table><thead><tr><th>파일</th><th>역할</th></tr></thead><tbody>'+k.files.map(x=>'<tr><th scope="row">'+E(x[0])+'</th><td>'+E(x[1])+'</td></tr>').join('')+'</tbody></table></div>')+articleSection('재사용할 가치가 있는 부분',logicHtml(k.useful))+articleSection('실행해 확인한 것과 남은 검증',logicHtml(k.audit))+articleSection('비개발자의 공부로 옮기는 방법',logicHtml(k.transfer))+'<div class="inline-actions"><button class="button primary" data-action="navigate" data-tab="practice" data-mode="preparation">준비·리허설 계획 →</button></div>'+articleFooter(item)+'</div>';
}
function renderExamScope(){
const p=state.path,e=p.examScope;
return '<section class="exam-scope"><span class="eyebrow">공개 확인 범위 · '+E(e.checked_at)+'</span><h2>확정된 안내와 아직 모르는 조건</h2><p>'+E(e.confirmed)+'</p><p>'+E(e.boundary)+'</p><details class="quiz-disclosure"><summary>개별 안내에서 확인할 항목</summary><div class="answer"><ul>'+e.unknown.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul><p>질문 준비와 실제 문의·답변 수신은 다릅니다. 이 사이트가 운영팀에 문의를 보냈다는 뜻은 아닙니다.</p>'+sourceLink(e.source,'공식 안내 ↗')+'</div></details><details class="quiz-disclosure"><summary>시험 전 6일 압축 준비안</summary><div class="answer"><p>'+E(p.planBoundary)+'</p>'+logicHtml(p.compressedPlan.map(x=>[x[0]+' · '+x[1],x[2]]))+'</div></details></section>';
}
function renderPreparation(){
const b=state.beginner;
return renderExamScope()+'<span class="eyebrow">제공 준비물 · 실행은 별도</span><h2 class="subheading">준비물과 두 번의 리허설</h2><p>아래는 이 사이트와 연결 자료에서 확인한 준비 상태입니다. 학습자 개인의 준비물을 조사한 것은 아닙니다. 사이트를 읽는 것과 실제 도구로 업무를 끝내는 연습은 구분합니다.</p><button class="button" data-action="open-source" data-id="kit-review">추가 제공된 13개 준비 파일 분석 →</button>'+b.readiness.map(x=>'<section class="axis-study"><h3>'+E(x.item)+'</h3><span class="pill">'+E(x.status)+'</span><p><strong>확인 근거</strong> '+E(x.evidence)+'</p><p><strong>다음 행동</strong> '+E(x.next)+'</p></section>').join('')+'<div class="source-note warn">'+E(b.preparationBoundary)+'</div><h3>비개발자에게 맞춘 준비 순서</h3>'+logicHtml(b.preparationPhases.map(x=>[x[1],x[2]]))+'<h3>리허설 종료 때 확인할 것</h3><ul class="check-list"><li>원자료·지시·가정이 구분된 결과 파일이 실제로 열리는가?</li><li>숫자와 결론을 검증한 기록, 실패·미확인 항목이 있는가?</li><li>AI 없이 약점·영향·다음 검증을 설명할 수 있는가?</li><li>준비물의 설정 시간과 절약 시간을 비교했는가?</li></ul><p class="muted small">이 화면은 계획과 점검 기준을 제공합니다. 실행하지 않은 키트나 리허설을 완료했다고 표시하지 않습니다. 4시간 타이머는 자율 연습용이며 시험 규정이 아닙니다.</p>';
}
function renderVideo(item){
const s=item.data,items=s.points||[],idx=s.n;
const header=articleHeader(item,s.deck,'interview',state.content.video.notice);
const facts=items.map((p,i)=>'<div class="article-fact"><b>'+String(i+1).padStart(2,'0')+'</b><strong>'+E(p[0])+'</strong><p>'+E(p[1])+'</p></div>').join('');
return header+'<div class="article-body"><div class="eyebrow">원문 학습 · '+String(idx).padStart(2,'0')+' / 15</div>'+
([2,6,8,9,10,12,14].includes(idx)?'<div class="source-note">이 주장의 정의·인과관계·적용 범위는 심층 분석에서 원문과 대조했습니다. <button class="button" data-action="open-source" data-id="reasoning-foundations">반례와 정정 함께 읽기 →</button></div>':'')+articleSection('영상 정리문에 담긴 설명',facts)+articleSection('학습 해석 · 적용할 판단','<div class="callout">'+E(s.logic)+'</div>')+
articleSection('스스로 설명해보기','<div class="source-note"><strong>이해 질문</strong><br>'+E(s.check)+'</div>')+
(idx===5?articleSection('실전 참가자의 반례','<p>실제 코파톤 후기에서는 README에 실무 문제와 솔루션이 이미 자세히 서술되어 있어 추가 인터뷰의 한계가 있었다고 회고합니다. 잘 질문하기와 무조건 많이 질문하기는 다릅니다.</p>'):'')+
(idx===7?articleSection('세 평가축을 한 번에 확인','<div class="grid2"><div class="lesson"><h4>Technique</h4><p>작동하는 결과와 테스트</p></div><div class="lesson"><h4>Intent</h4><p>목표·위임·검증 통제</p></div><div class="lesson"><h4>Cognition</h4><p>자기 결과물의 이해·설명</p></div><div class="lesson"><h4>공통</h4><p>주장을 실제 파일·근거에 연결</p></div></div>'):'')+
'<p class="muted small">이 장은 사용자가 제공한 15부 구성의 영상 정리 자료를 교육용으로 재구성한 글입니다. 발언과 적용 전략을 혼동하지 않도록 확인하세요.</p>'+articleFooter(item)+'</div>';
}
function renderLuka(item){
const s=item.data||{},sections=s.sections||[], header=articleHeader(item,s.deck,'participant',s.warning);
return header+'<div class="article-body"><div class="eyebrow">실전 원문 기반 · 11개 심화 단원</div><div class="callout">2026년 7월 30일 KRAFTON FDE 코파톤 · Top 6 · 225분 빌드 → 5문항 사후 확인. 참가자 개인의 실제 회고이며 SK하이닉스 2차 규정은 아닙니다.</div>'+
articleSection('현장의 시간 구조','<div class="grid2"><div class="lesson"><span class="eyebrow">빌드</span><h4>225분</h4><p>11:15~15:00 · 참가자 기록</p></div><div class="lesson"><span class="eyebrow">확인문제</span><h4>5문항</h4><p>각 3분 안내, 15:00~15:20 구간</p></div></div>')+
articleSection('비개발 업무에도 옮길 수 있는 수행 순서',logicHtml(state.beginner.workflow))+
articleSection('참가자 기록 11단원 · 개발 과제의 맥락을 구분','<div class="detail-grid">'+sections.map((c,i)=>'<details class="quiz-disclosure" '+([3,4].includes(i)?'open':'')+'><summary><span class="number-chip" style="display:inline-grid;vertical-align:middle;margin-right:8px">'+(i+1)+'</span>'+E(c.h)+'</summary><div class="qa-answer"><p><strong>참가자의 관찰·회고</strong><br>'+E(c.p)+'</p><p><strong>학습 해석</strong><br>'+E(c.why)+'</p><p><strong>적용 한계</strong><br>'+E(c.pitfall)+'</p></div></details>').join('')+'</div>')+
articleSection('사후 Q&A 3단계 답변 구조','<div class="grid2">'+(s.responseFramework||[]).map((a,i)=>'<div class="lesson"><span class="eyebrow">STEP '+(i+1)+'</span><p>'+E(a)+'</p></div>').join('')+'</div>')+
articleSection('스스로 확인할 문제',faq(s.questions))+
articleSection('참가자가 지적한 평가 방식의 한계','<div class="source-note warn">README가 이미 상세했고 결과물이 비슷해졌으며, 개인별 세부 점수는 확인하지 못했다는 비판도 함께 읽어야 합니다. ‘재사용 가능한 도구’를 많이 만들수록 무조건 유리하다는 결론은 아닙니다.</div>')+
articleFooter(item)+'</div>';
}
function renderLegacy(item){
const c=item.data||{},header=articleHeader(item,c.thesis||c.question,'legacy',c.limit);
return header+'<div class="article-body">'+
articleSection('핵심 질문','<div class="callout">'+E(c.question||'이 자료에서 무엇을 확인할 수 있을까?')+'</div>')+
articleSection('출처의 서술 · 관찰과 회고',factsHtml(item.id==='old-official'?c.facts.slice(0,1):c.facts))+(item.id==='old-official'?articleSection('기존 요약의 학습용 판단 기준',factsHtml(c.facts.slice(1))):'')+
articleSection('학습 해석 · 판단 근거',logicHtml(c.reason))+
articleSection('학습 예시 · 가상 적용','<p>'+E(c.example||'')+'</p>')+
(c.timestamps?articleSection('원본 영상 구간','<div class="inline-actions">'+c.timestamps.map(t=>sourceLink(c.url+'&t='+Number(t[2])+'s',t[0]+' · '+t[1]+' ↗')).join('')+'</div>'):'')+
articleSection('학습 과제','<div class="source-note">'+E(c.task||'')+'</div>')+
articleSection('확인문제와 해설',faq(c.qa))+
articleFooter(item)+'</div>';
}
function renderExtra(item){
const c=item.data||{},header=articleHeader(item,c.thesis||c.question,'extra',c.risk);
return header+'<div class="article-body">'+
articleSection('생각할 질문','<div class="callout">'+E(c.question||'무엇이 어려웠는가?')+'</div>')+
articleSection('후기·보도에 기록된 내용',factsHtml(c.facts))+
articleSection('학습 해석 · 실무 적용',logicHtml(c.reasoning))+
articleSection('가상 반례로 확장','<p>'+E(c.case||'')+'</p>')+
articleSection('확인문제와 해설',faq(c.qna))+
articleFooter(item)+'</div>';
}
function caseSource(){
let arr=state.portal?.cases||[];return arr.find(x=>x.id===state.caseId)||arr[0]||null}
const persons={
work:{title:'자료 분석 · 조사 후보 보고',intro:'검사 자료에서 조사 후보를 추려 담당자에게 보고하는 가상 업무입니다. 실제 반도체 공정 기준이나 출제문제가 아닙니다.',questions:[
['안내문에서 아직 모르는 것은?','[가상] 조사 후보의 기준, 중복 기록의 의미, 분모가 없는 행의 처리, 최종 승인자가 미확인입니다.','이미 적힌 내용을 반복 질문하지 않고 결론을 바꾸는 불확실성을 고릅니다.'],
['같은 Lot 번호가 두 번 있으면요?','[가상] 모든 열이 같은 반복 수신만 한 번 셉니다. 값이 다르면 수정 이력인지 별도 검사인지 확인 전까지 합치지 않습니다.','식별자가 같다는 이유만으로 정상 자료를 지우지 않도록 기준을 확인합니다.'],
['어떤 결과물을 원하나요?','[가상] Lot별 계산표, 조사 후보와 이유, 제외/미확인 목록, 다음 확인 사항을 한 장 메모와 함께 주세요.','완료 조건을 관찰 가능한 파일과 내용으로 바꿉니다.'],
['어디까지 결론을 낼 수 있나요?','[가상] 5% 초과를 조사 후보로 정합니다. 이것만으로 공정 원인을 확정하거나 생산을 자동 승인하지는 않습니다.','후보 선정과 인과 판단·승인 권한을 나눕니다.'],
['검증 자료가 부족하면요?','[가상] 빈 검사 수를 추정해 채우지 말고 제외 이유와 영향을 기록해 담당자 확인을 요청하세요.','모르는 값을 아는 것처럼 쓰지 않고 불확실성이 결론에 미치는 영향을 설명합니다.']
]},
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
{title:'보고서 합계와 원자료 합계가 다르다',where:'계산표의 집계 범위와 중복 제외 목록을 원자료 행과 대조합니다.',impact:'조사 우선순위가 바뀌고 잘못된 Lot에 확인 업무를 배정할 수 있습니다.',next:'일부 행을 별도 계산한 뒤 전체 합계를 재계산하고, 누락·중복·결측 기준을 명시합니다.'},
{title:'승인되지 않은 가정을 확정 사실로 썼다',where:'보고서의 원인 결론 문장에 직접 근거가 있는지, 가정 표기가 빠졌는지 확인합니다.',impact:'아직 확인되지 않은 원인으로 조치를 결정해 비용이나 품질 위험을 만들 수 있습니다.',next:'관측과 추정을 나눠 쓰고, 결론을 바꿀 수 있는 추가 자료와 승인 담당자를 정합니다.'},
{title:'답변이 없는 상태에서 코칭이 생성된다',where:'음성 전사 결과가 빈 문자열이더라도 피드백 생성 함수로 전달되는 조건을 검토합니다.',impact:'없는 답변을 정상 답변처럼 평가해 잘못된 코칭이나 저장 기록이 생길 수 있습니다.',next:'빈 전사 입력을 재현하고, 입력 유효성 검사와 텍스트 재입력 경로를 추가한 후 E2E를 다시 실행합니다.'},
{title:'같은 이벤트 ID로 서로 다른 장치가 충돌한다',where:'저장 중복키가 event_id 하나만 사용되는지 실제 DB 제약과 코드를 확인합니다.',impact:'장치 A와 B의 동일 ID를 같은 이벤트로 보고 정상 데이터를 누락하거나 덮어쓸 수 있습니다.',next:'(device_id,event_id) 복합키 후보를 검증하고 같은 ID·다른 장치 동시 입력 테스트를 수행합니다.'},
{title:'기획전이 승인 전에 노출된다',where:'DRAFT·REVIEW 단계에서 PUBLISHED 전용 조회·반응 API가 호출되는지 확인합니다.',impact:'미검토 문구 또는 미승인 상품이 사용자에게 공개될 수 있습니다.',next:'각 상태에서 조회·반응 요청을 실행해 차단 여부를 검증하고 승인 상태 전이 후 회귀 테스트를 수행합니다.'}
];
function renderComparisons(){
 const all=[...state.portal.compare,...state.guide.additionalComparisons],c=all.find(x=>x.id===state.compareId)||all[0];
 return '<div class="eyebrow">참가자 후기 비교 · 학습 해석</div><h2 class="subheading">어떤 조건에서 다른 선택을 했을까?</h2><div class="comparison-selector">'+all.map(x=>'<button class="case-choice '+(x.id===c.id?'active':'')+'" data-action="choose-comparison" data-id="'+E(x.id)+'"><strong>'+E(x.title)+'</strong><small>'+E(x.participants.join(' · '))+'</small></button>').join('')+'</div><h3>'+E(c.title)+'</h3><p class="mock-brief">'+E(c.thesis)+'</p>'+factsHtml(c.evidence)+'<div class="inline-actions">'+(state.guide.comparisonSources[c.id]||[]).map(id=>{const r=state.manifest.sourceRecords.find(x=>x.id===id);return r?sourceLink(r.url,r.author_or_publisher+' 원문 ↗'):''}).join('')+'</div><h3>학습 해석</h3><div class="callout">'+E(c.logic)+'</div><div class="grid2"><div class="lesson"><h4>적용할 조건</h4><p>'+E(c.when)+'</p></div><div class="lesson"><h4>주의할 조건</h4><p>'+E(c.whenNot)+'</p></div></div><h3>판단해 보기</h3><p>'+E(c.drill)+'</p><h3>상황별 접근</h3>'+state.content.approach.map(x=>'<details class="quiz-disclosure"><summary>'+E(x.question)+'</summary><div class="answer">'+E(x.answer)+'<p class="muted small">학습 해석 · 참고: '+E(x.source)+'</p></div></details>').join('')+'<div class="source-note">여러 후기의 경험을 비교한 학습용 판단입니다. 특정 행동과 점수 사이의 인과관계는 확인되지 않았습니다.</div>';
}
function saveSession(){setLocal(timerKey,{remain:state.sessionRemain,until:state.sessionUntil})}
function sessionTick(){
 if(state.sessionUntil)state.sessionRemain=Math.max(0,Math.ceil((state.sessionUntil-Date.now())/1000));
 if(!state.sessionRemain){state.sessionUntil=0;clearInterval(state.sessionHandle);state.sessionHandle=null;saveSession()}
 const el=$('#sessionTimer');if(el)el.textContent=sessionTime();
}
function sessionTime(){const n=state.sessionRemain;return [Math.floor(n/3600),Math.floor(n%3600/60),n%60].map(x=>String(x).padStart(2,'0')).join(':')}
function sessionPanel(){sessionTick();return '<details class="practice-clock"><summary>4시간 자율 훈련 타이머</summary><p class="muted small">연습용 시간입니다. 공식 제한시간이 아닙니다. 같은 브라우저에서만 저장됩니다.</p><div id="sessionTimer" role="timer" class="timer">'+sessionTime()+'</div><div class="inline-actions"><button class="button primary" data-action="session-start">시작·재개</button><button class="button" data-action="session-pause">일시정지</button><button class="button" data-action="session-reset">초기화</button></div></details>'}
function renderDecision(id){
 const p=state.guide.practicePrompts[id];if(!p)return '';
 return '<section class="decision-study"><h3>결정의 이유까지 설명하기</h3><p class="muted small">아래는 가상 과제의 해설입니다. 실제로 실행한 결과와 예상 결과를 구분하세요.</p>'+[['문제 이해 · 미확인 정보',p.uncertain],['선택과 기각',p.decision],['실제 검증에 필요한 증거',p.proof],['사후 설명 · 취약점',p.explain]].map((x,i)=>'<details class="quiz-disclosure"><summary>'+String(i+1)+'. '+x[0]+'</summary><div class="answer">'+E(x[1])+'</div></details>').join('')+'</section>';
}
function renderCreator(item){
 const g=state.guide.creatorGuide;
 return articleHeader(item,g.position,'synthesis',g.boundary)+'<div class="article-body">'+
 articleSection('이 교재에서 가장 먼저 볼 것','<p>개발자가 설명한 평가 목적을 기준으로 학습합니다. 다만 개발자의 설명만으로 특정 행동의 배점이나 SK하이닉스의 운영 규정을 추정하지 않습니다.</p>')+
 articleSection('핵심 훈련 네 가지와 수행 전략 네 가지','<div class="table-scroll"><table><thead><tr><th>순서</th><th>주제</th><th>준비할 행동</th></tr></thead><tbody>'+g.priorities.map(x=>'<tr><td>'+x[0]+'</td><th scope="row">'+E(x[1])+'<small>'+E(x[3])+'</small></th><td>'+E(x[2])+'</td></tr>').join('')+'</tbody></table></div>')+
 articleSection('같은 가상 Lot 분석에서 세 축을 따로 확인','<p>아래 연결은 학습용 가상 사례입니다. 세 축의 공식 점수식이 아닙니다.</p>'+g.axes.map(x=>'<section class="axis-study"><h4>'+x.name+' · '+E(x.question)+'</h4><p><strong>남길 증거</strong> '+E(x.evidence)+'</p><p><strong>실패 조건</strong> '+E(x.failure)+'</p></section>').join(''))+
 articleSection('평가자의 의도와 참가자의 경험을 나란히 읽기',g.connections.map(x=>'<section class="axis-study"><h4>'+E(x[0])+'</h4><p>'+E(x[1])+'</p><p>'+E(x[2])+'</p><div class="callout">학습 판단 · '+E(x[3])+'</div></section>').join(''))+
 articleSection('Cost Engineering · 단위부터 구분','<p>'+E(g.cost.principle)+'</p><p>'+E(g.cost.example)+'</p><div class="source-note">'+E(g.cost.unit)+'</div>')+
 articleSection('목표와 이해의 간극을 관리하는 메모','<p>인지·의도 부채는 Storey의 소프트웨어 건강 모델에서도 다룹니다. 아래는 개인 훈련을 위한 예이며, 팀의 공유 이해와 목표·선택 이유의 기록이라는 원문의 범위는 심층 분석에서 함께 확인합니다.</p>'+g.debts.map(x=>'<details class="quiz-disclosure"><summary>'+E(x[0])+' · '+E(x[1])+'</summary><div class="answer"><p>가상 상황 · '+E(x[2])+'</p><p>대응 · '+E(x[3])+'</p></div></details>').join(''))+
 articleSection('이 자료에서 확정할 수 없는 것','<ul>'+g.cautions.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul>')+
 articleSection('확인문제와 해설',faq(g.checks))+
 '<div class="inline-actions">'+['josh','official','luka','giran','jiypark'].map(id=>{const r=state.manifest.sourceRecords.find(x=>x.id===id);return sourceLink(r.url,r.author_or_publisher+' 원문 ↗')}).join('')+'</div>'+articleFooter(item)+'</div>';
}
function guidedCorrect(i){return !!state.path.steps[i]&&state.guided.answers[i]===state.path.steps[i].correct}
function guidedLimit(){let i=0;while(i<state.path.steps.length&&guidedCorrect(i))i++;return Math.min(i,state.path.steps.length-1)}
function saveGuided(){setLocal('guided-v1',state.guided)}
function moveGuided(i){if(!Number.isInteger(i)||i<0||i>guidedLimit())return;state.guided.step=i;saveGuided();render();const el=$('#guidedQuestion');if(el){el.focus({preventScroll:true});el.scrollIntoView({block:'start',behavior:'instant'})}}
function guidedTable(){
 const lines=caseSourceById('lot').files[0][1].split('\n'),headers=lines[0].split(','),rows=lines.slice(1).map(x=>x.split(','));
 return '<div class="table-scroll"><table><caption>가상 검사 자료 · 원본 행</caption><thead><tr>'+headers.map(x=>'<th scope="col">'+E(({lot:'Lot',equipment:'장비',recipe:'Recipe',inspected:'검사 수',reject:'불량 수'})[x]||x)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(x=>'<tr>'+x.map(v=>'<td>'+E(v||'미기재')+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function caseSourceById(id){return state.portal.cases.find(x=>x.id===id)}
function renderGuided(){
 const p=state.path,s=state.guided.step,q=p.steps[s],selected=state.guided.answers[s],answered=Number.isInteger(selected),correct=guidedCorrect(s),count=p.steps.filter((_,i)=>guidedCorrect(i)).length,complete=count===p.steps.length,w=p.workedExample;
 return '<div class="guided-intro"><span class="eyebrow">개념 → 예시 → 직접 판단 → 다른 문제</span><h2 class="subheading">'+E(p.title)+'</h2><p>기본 용어와 완성 예시를 본 뒤, 한 번에 한 가지 판단을 연습합니다. 해설을 확인한 단계는 저장돼 다음에 이어갈 수 있습니다.</p><p class="small muted">'+E(p.boundary)+'</p><details class="quiz-disclosure"><summary>배울 목표와 기본 용어</summary><div class="answer"><ul>'+p.objectives.map(x=>'<li>'+E(x)+'</li>').join('')+'</ul>'+p.terms.map(x=>'<p><strong>'+E(x[0])+'</strong> · '+E(x[1])+'</p>').join('')+'</div></details><details class="quiz-disclosure" '+(s===0?'open':'')+'><summary>'+E(w.title)+'</summary><div class="answer"><p>'+E(w.input)+'</p><p><strong>계산</strong> '+E(w.calculation)+'</p><p><strong>이유</strong> '+E(w.reason)+'</p><p><strong>한계</strong> '+E(w.limit)+'</p></div></details></div>'+
 '<details class="source-file" '+([0,1,2,3].includes(s)?'open':'')+'><summary>이번 연습의 원자료 · 6행과 집계 정책</summary>'+guidedTable()+'<p class="small">열 이름: Lot=생산 묶음, 장비=검사 자료의 장치 구분, Recipe=공정 조건 이름, 검사 수=분모, 불량 수=분자.</p><p class="source-note">'+E(caseSourceById('lot').files[1][1])+'</p></details>'+
 '<div class="guided-status" role="status">해설을 확인한 판단 '+count+' / '+p.steps.length+' · 읽음 기록 및 실제 업무 검증과 별도로 저장</div><nav class="guided-steps" aria-label="풀이 단계">'+p.steps.map((x,i)=>'<button class="button '+(i===s?'primary':'')+'" data-action="guided-jump" data-index="'+i+'" '+(i>guidedLimit()?'disabled':'')+(i===s?' aria-current="step"':'')+' aria-label="'+E(String(i+1)+'. '+x.title)+'" title="'+E(x.title)+'">'+String(i+1)+(guidedCorrect(i)?' ✓':'')+'</button>').join('')+'</nav>'+
 '<section id="guidedQuestion" class="guided-question" tabindex="-1"><span class="eyebrow">STEP '+(s+1)+' / '+p.steps.length+' · '+E(q.axis)+'</span><h3>'+E(q.title)+'</h3><p>'+E(q.lesson)+'</p><h4>'+E(q.question)+'</h4><div class="options">'+q.options.map((x,i)=>'<button class="option '+(answered?(i===selected?(correct?'correct':'wrong'):''):'')+'" data-action="guided-answer" data-option="'+i+'" '+(answered?'disabled':'')+'>'+String.fromCharCode(65+i)+'. '+E(x)+'</button>').join('')+'</div>'+
 (answered?'<div class="feedback" role="status"><strong>'+(correct?'이 판단을 확인했습니다.':'다시 확인할 지점')+'</strong><p>'+E(q.feedback[selected])+'</p>'+(correct?'<p><strong>남길 근거</strong> '+E(q.proof)+'</p>':'')+'<div class="inline-actions">'+(!correct?'<button class="button primary" data-action="guided-retry">같은 단계 다시 판단하기</button>':'')+'<button class="button" data-action="open-source" data-id="'+E(q.related)+'">관련 개념 읽기 →</button></div></div>':'')+'<div class="guided-actions">'+(s>0?'<button class="button" data-action="guided-jump" data-index="'+(s-1)+'">이전 단계</button>':'<span></span>')+(s<p.steps.length-1?'<button class="button primary" data-action="guided-next" '+(!correct?'disabled':'')+'>다음 단계 →</button>':'')+'</div></section>'+
 (complete?'<section class="guided-summary"><h3>같은 자료로 작성한 보고 예시</h3><p>8개 선택과 해설을 확인했습니다. 아래는 고정된 해설 예시이며, 사용자가 직접 작성한 보고서나 실제 AI 작업 기록은 아닙니다.</p><dl>'+p.report.map(x=>'<dt>'+E(x[0])+'</dt><dd>'+E(x[1])+'</dd>').join('')+'</dl><p><strong>다음 연습</strong> 예시를 보지 않고 계산 기준·약점·다음 확인을 말한 뒤, 일정·품질 승인처럼 다른 가상 과제에도 적용해 보세요.</p><div class="inline-actions"><button class="button primary" data-action="navigate" data-tab="practice" data-mode="cases">스스로 풀 다른 과제 →</button><button class="button" data-action="navigate" data-tab="review">핵심 개념 점검 →</button></div></section>':'')+
 '<details class="quiz-disclosure"><summary>이 풀이의 학습 설계 근거</summary><div class="answer"><p>'+E(p.designEvidence.use)+'</p>'+sourceLink(p.designEvidence.url,'IES 학습 가이드 ↗')+'</div></details><button class="button" data-action="guided-reset">이 풀이 처음부터 다시</button>';
}

function renderPractice(){
const caseData=caseSource();
let body=state.practiceMode==='guided'?renderGuided():state.practiceMode==='preparation'?renderPreparation():state.practiceMode==='compare'?renderComparisons():state.practiceMode==='cases'?renderCasePractice(caseData):state.practiceMode==='stakeholders'?renderStakeholders():renderExplain();
return '<div class="practice-header">'+hero('실전에서 판단하는 힘','가상 과제 · 근거 중심 검증','가상 자료로 업무 판단을 연습합니다. 비개발자는 계산표·조사 메모·승인 판단을 결과물로 삼고, 코드 구현은 필요한 경우에만 선택합니다.')+'</div>'+
'<div class="surface pad"><div class="segmented">'+[['guided','풀이 따라하기'],['compare','전략 비교'],['cases','자료 분석'],['stakeholders','실무자 질문'],['explain','사후 Q&A'],['preparation','준비 점검']].map(a=>'<button class="segment '+(state.practiceMode===a[0]?'active':'')+'" data-action="practice-mode" data-mode="'+a[0]+'">'+a[1]+'</button>').join('')+'</div><div class="plain-divider"></div>'+body+sessionPanel()+'</div>';
}
function renderCasePractice(c){
if(!c)return '<p>기존 과제 자료를 불러오지 못했습니다.</p>';
const selected=state.portal.cases.findIndex(x=>x.id===c.id);
return '<div class="eyebrow">실무형 가상 자료 · '+state.portal.cases.length+'개</div><h2 class="subheading" style="margin-top:8px">상황을 읽고, 무엇을 증명할지 결정하세요.</h2><div class="case-selector">'+state.portal.cases.map((x,i)=>'<button class="case-choice '+(c.id===x.id?'active':'')+'" data-action="choose-case" data-id="'+E(x.id)+'"><span class="pill">'+E(x.tag||x.type||'CASE')+'</span><strong>'+E(x.title)+'</strong><small>CASE '+String(i+1).padStart(2,'0')+' / '+state.portal.cases.length+'</small></button>').join('')+'</div><hr class="thin-rule"><span class="eyebrow">현재 과제 · '+String(selected+1).padStart(2,'0')+'</span><h2 class="subheading" style="margin-top:6px">'+E(c.title)+'</h2><p class="mock-brief">'+E(c.id==='lot'?'제공 CSV의 6개 데이터 행(중복 포함)을 검토하고, 5% 초과 조사 후보를 찾으세요.':c.brief)+'</p><div class="source-note warn">이 문제의 이름·자료·정답은 교육용 가상 내용이며 SK하이닉스 또는 크래프톤의 실제 기출이 아닙니다.</div>'+
'<div class="source-note"><strong>비개발자 풀이 방법</strong><p>자료를 읽고 ① 업무 목적·미확인 조건 ② 판단표나 계산표 ③ 검증한 값·예외 ④ 결론과 한계를 정리해 보세요. 해설의 코드·API 예시는 선택 사항입니다. 실제 파일 작성과 AI 활용은 허용된 외부 도구에서 수행합니다.</p></div><h3 class="subheading">01. 제공된 자료 읽기</h3>'+(c.files||[]).map(f=>'<details class="source-file"><summary>'+E(f[0])+' <span class="muted small">내용 보기</span></summary><pre>'+E(f[1].replace(/\\n/g,'\n'))+'</pre></details>').join('')+
'<h3 class="subheading">02. 반드시 검증할 조건</h3><ul class="check-list">'+(c.checks||c.tests||[]).map(q=>'<li>'+E(q)+'</li>').join('')+'</ul>'+
'<h3 class="subheading">03. 풀이와 검증 기준</h3><button class="button '+(state.reveal?'soft':'primary')+'" data-action="reveal-solution">'+(state.reveal?'해설 접기':'해설 보기')+'</button>'+(state.reveal?'<div class="solution" style="margin-top:12px">'+E(c.reference||c.solution||'')+'</div>'+renderDecision(c.id):'')+
(c.id==='lot'?'<div class="source-note">자료 정정: 원본 요약의 7개 기록은 실제 CSV의 6행(고유 Lot 5개)과 다릅니다. E1·E2 각각 R1·R2가 모두 관측되어 이 두 요인의 완전한 교란은 확인되지 않습니다. 무작위 배정·나머지 공정 조건은 제공되지 않아 Recipe의 인과 효과를 확정할 수 없습니다.</div>':'')+
'<div class="source-note">AI가 “테스트 통과”라고 출력한 것만으로는 실제 시험을 수행한 증거가 아닙니다. 자료의 예상값과 실제 실행을 대응시켜야 합니다.</div>';
}
function renderStakeholders(){
const p=persons[state.persona];
return '<span class="eyebrow">INTERVIEW TRAINING · 학습용 가상 문답</span><h2 class="subheading" style="margin-top:6px">질문을 선택해 요구사항을 발굴하세요.</h2><div class="segmented">'+[['work','자료 분석 업무'],['fde','개발 과제 사례'],['olive','매장 업무 사례']].map(x=>'<button class="segment '+(state.persona===x[0]?'active':'')+'" data-action="choose-persona" data-id="'+x[0]+'">'+x[1]+'</button>').join('')+'</div><p>'+E(p.intro)+'</p><div class="source-note warn">실제 AI와 대화하는 화면이 아닙니다. 선택하면 미리 준비된 가상 답변과 학습 해설이 열립니다.</div>'+
p.questions.map((q,i)=>'<div class="practice-question"><button data-action="toggle-question" data-index="'+i+'"><span>'+E(String(i+1)+'. '+q[0])+'</span><span aria-hidden="true">'+(state.questions.has(i)?'−':'+')+'</span></button>'+(state.questions.has(i)?'<div class="practice-answer"><strong>담당자 답변</strong><p>'+E(q[1])+'</p><strong>왜 묻는가?</strong><p>'+E(q[2])+'</p></div>':'')+'</div>').join('');
}
function renderExplain(){
return '<span class="eyebrow">COGNITION · 제출물 기반 설명</span><h2 class="subheading" style="margin-top:6px">3분 안에 자기 결과물을 설명하는 법</h2><p>실제 코파톤 참가자가 관찰한 구조는 <strong>약점 위치 → 업무 파급 → 검증·개선 계획</strong>입니다. 아래 문항은 교육용 가상 사례입니다.</p><div class="grid2 section-margin">'+[['01','약점 위치','어느 파일·조건·상태인가'],['02','실패 파급','어떤 입력에서 무엇이 잘못되나'],['03','검증·수정','어떤 테스트로 고침을 증명하나']].map(x=>'<div class="lesson"><div class="eyebrow">'+x[0]+'</div><h4>'+E(x[1])+'</h4><p>'+E(x[2])+'</p></div>').join('')+'</div><div class="row split section-margin"><div><strong>3분 구두 연습</strong><div id="practiceTimer" class="timer">'+timeFormat(state.threeMinutes)+'</div></div><div class="row"><button class="button primary" data-action="timer-start">시작</button><button class="button" data-action="timer-pause">일시정지</button><button class="button" data-action="timer-reset">초기화</button></div></div>'+
explainCases.map((q,i)=>'<details class="quiz-disclosure"><summary>Q'+(i+1)+'. '+E(q.title)+'</summary><div class="answer"><p><strong>① 약점</strong><br>'+E(q.where)+'</p><p><strong>② 파급</strong><br>'+E(q.impact)+'</p><p><strong>③ 다음 검증</strong><br>'+E(q.next)+'</p></div></details>').join('');
}
function quizQuestions(){return state.path?.assessment||[]}
function renderReview(){
const quiz=quizQuestions(),answered=Object.keys(state.answers).length,correct=Object.entries(state.answers).filter(([k,v])=>quiz[Number(k)]&&quiz[Number(k)][2]===v).length;
const questions=quiz.map((x,i)=>({x,i})).filter(({i})=>state.reviewFilter==='wrong'?state.reviewWrong.has(i):state.reviewFilter==='unanswered'?state.answers[i]===undefined:true);
return '<div class="section-margin">'+hero('실수하는 지점을 찾아내다','확인문제 · 즉시 해설','개념을 떠올려 선택한 뒤 이유를 확인합니다. 오답만 골라 문항별로 다시 풀 수 있습니다. 공식 시험 점수나 숙련도 인증은 아닙니다.')+'</div>'+
'<div class="review-layout"><div><div class="surface content-card"><div class="row split"><div><span class="eyebrow">학습용 자기 점검</span><h2 class="subheading" style="margin:6px 0">12개 사례 판단문제</h2></div><div class="row">'+badges([answered+' / '+quiz.length+' 응답',correct+'개 정답'])+'</div></div><p class="muted small">틀린 이유를 읽은 뒤 관련 개념으로 돌아가거나 같은 문항을 다시 풀어 보세요. 읽음 기록은 이해 여부와 다릅니다.</p><div class="filter-row" aria-label="복습할 문항">'+[['all','전체 문항'],['wrong','오답 복습'],['unanswered','아직 안 푼 문항']].map(x=>'<button class="filter-btn '+(state.reviewFilter===x[0]?'active':'')+'" data-action="review-filter" data-filter="'+x[0]+'" aria-pressed="'+(state.reviewFilter===x[0])+'">'+x[1]+'</button>').join('')+'</div></div>'+
(questions.length?questions.map(({x,i})=>{const choice=state.answers[i],answered=choice!==undefined,context=x[4]||{};return '<div class="quiz-question" id="question-'+i+'"><div class="eyebrow">문항 '+String(i+1).padStart(2,'0')+' / '+quiz.length+'</div><h3>'+E(x[0])+'</h3><div class="quiz-stimulus"><span class="eyebrow">학습용 가상 상황 · '+E(context.topic||'판단')+'</span><p>'+E(context.scenario||'')+'</p></div><div class="options">'+x[1].map((label,j)=>'<button class="option '+(answered?(j===x[2]?'correct':choice===j?'wrong':''):'')+'" data-action="answer" data-index="'+i+'" data-option="'+j+'" '+(answered?'disabled':'')+'>'+String.fromCharCode(65+j)+'. '+E(label)+'</button>').join('')+'</div>'+(answered?'<div class="feedback" role="status"><strong>'+(choice===x[2]?'정답입니다.':'정답과 이유 확인')+'</strong><p>'+E(context.feedback?.[choice]||'')+'</p><p>'+E(x[3])+'</p><div class="inline-actions"><button class="button" data-action="open-source" data-id="'+(context.related||'reasoning-foundations')+'">관련 학습 읽기 →</button><button class="button" data-action="retry-answer" data-index="'+i+'">이 문항 다시 풀기</button></div></div>':'')+'</div>'}).join(''):'<section class="surface content-card"><h3>'+(state.reviewFilter==='wrong'?'남아 있는 오답이 없습니다.':'이 목록의 문항을 모두 확인했습니다.')+'</h3><p>다른 문항을 보거나 풀이에서 원칙을 적용해 보세요. 정답 선택만으로 실제 업무 수행이 검증된 것은 아닙니다.</p><div class="inline-actions"><button class="button" data-action="review-filter" data-filter="all">전체 문항 보기</button><button class="button" data-action="navigate" data-tab="practice" data-mode="guided">풀이에 적용하기 →</button></div></section>')+
'<div class="row section-margin"><button class="button" data-action="reset-quiz">전체 다시 풀기</button><button class="button primary" data-action="navigate" data-tab="learn">시작하기로</button></div></div>'+
'<aside class="review-help surface pad"><span class="eyebrow">복습 방법</span><h3 style="font-size:16px;margin:7px 0">이유를 설명하며 다시 풀기</h3><p class="small muted">해설을 읽고 바로 정답을 누르는 데 그치지 말고, 잠시 뒤 관련 개념을 가린 채 이유를 떠올려 보세요. 숫자를 잘못 계산했는지, 조건을 놓쳤는지, 출처의 범위를 혼동했는지 구분합니다.</p><hr class="thin-rule"><p class="small muted">오답 복습에는 틀린 문항과 다시 풀기 대기 문항이 남습니다. 정답으로 다시 확인하면 목록에서 빠집니다. 전체 초기화는 이 퀴즈의 답안과 오답 목록만 지웁니다.</p></aside></div>';
}
function timeFormat(t){let m=Math.floor(t/60),s=t%60;return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function timerDisplay(){const el=$('#practiceTimer');if(el)el.textContent=timeFormat(state.threeMinutes)}
function stopTimer(){if(state.clockHandle){clearInterval(state.clockHandle);state.clockHandle=null}state.clockActive=false}
function tick(){if(!state.clockActive)return;state.threeMinutes=Math.max(0,Math.ceil((state.clockUntil-Date.now())/1000));timerDisplay();if(state.threeMinutes===0){stopTimer();toast('3분이 종료됐어요. 해설을 확인하세요.')}}
async function init(){
 routeFromUrl();
 try{
 const urls=['/content.json','/luka-deep.json','/cofa-chapters.json','/portal-content.json','/source-manifest.json','/learning-guide.json','/beginner-guide.json','/learning-path.json','/deep-analysis.json'];
 const data=await Promise.all(urls.map(async url=>{const r=await fetch(url);if(!r.ok)throw Error(url+' · HTTP '+r.status);return r.json()}));
 [state.content,state.luka,state.legacy,state.portal,state.manifest,state.guide,state.beginner,state.path,state.deep]=data;
 if(state.content.sections.length!==15||state.legacy.chapters.length!==14||state.portal.newChapters.length!==5||state.portal.compare.length!==3||state.portal.cases.length!==8||state.portal.drill.length!==12)throw Error('학습 자료 구조가 예상과 다릅니다.');
 buildItems();
 state.done=new Set([...state.done].filter(id=>state.items.some(x=>x.id===id)));
 state.answers=Object.fromEntries(Object.entries(state.answers).filter(([i,v])=>state.portal.drill[i]&&Number.isInteger(v)&&v>=0&&v<state.portal.drill[i][1].length));
 if(!readLocal('scenario-quiz-v1',false)){state.answers={};setLocal('answers',{});setLocal('review-wrong',[]);setLocal('scenario-quiz-v1',true)}
 if(!readLocal('nondev-quiz-v1',false)){for(const i of Object.keys(state.beginner.quizOverrides))delete state.answers[i];setLocal('answers',state.answers);setLocal('nondev-quiz-v1',true)}
 const saved=readLocal('guided-v1',{}),n=state.path.steps.length;
 state.guided={step:0,answers:{}};
 if(saved&&typeof saved==='object'&&saved.answers&&typeof saved.answers==='object'){for(let i=0;i<n;i++){const v=saved.answers[i];if(Number.isInteger(v)&&v>=0&&v<state.path.steps[i].options.length){state.guided.answers[i]=v;if(v!==state.path.steps[i].correct)break}else break}state.guided.step=Number.isInteger(saved.step)?Math.max(0,Math.min(saved.step,guidedLimit())):0}
 const wrong=readLocal('review-wrong',[]);state.reviewWrong=new Set((Array.isArray(wrong)?wrong:[]).filter(i=>Number.isInteger(i)&&quizQuestions()[i]));
 for(const [i,v]of Object.entries(state.answers)){if(v!==quizQuestions()[i][2])state.reviewWrong.add(Number(i));else state.reviewWrong.delete(Number(i))}
 const oldKey='skh_round2_unified_20261025_';
 try{
 const old=JSON.parse(localStorage.getItem(oldKey+'done')||'[]');if(Array.isArray(old))old.forEach(id=>{if(state.items.some(x=>x.id==='old-'+id))state.done.add('old-'+id)});
 }catch(_){}
 const t=readLocal(timerKey,{});state.sessionRemain=Number.isFinite(t.remain)?Math.max(0,Math.min(14400,t.remain)):14400;state.sessionUntil=Number.isFinite(t.until)&&t.until>Date.now()?t.until:0;if(t.until&&t.until<=Date.now())state.sessionRemain=0;if(state.sessionUntil){sessionTick();state.sessionHandle=setInterval(sessionTick,500)}
 const queryJump=new URLSearchParams(location.search).get('guide');
 const hashJump=/^(organizer-research|skills-plugin-recommendations)$/.test(location.hash.slice(1))?location.hash.slice(1):'';
 const jump=queryJump||hashJump;
 state.loading=false;render();syncUrl();
 // Deep links from legacy official-guide.html preserve the intended section on the unified home.
 if(state.tab==='learn'&&/^(step[1-7]|organizer-research|skills-plugin-recommendations)$/.test(jump||'')){
   requestAnimationFrame(()=>{const target=document.getElementById(jump);if(target)target.scrollIntoView({block:'start',behavior:'instant'});});
 }
 }catch(error){
 state.loading=false;render();
 const out=$('#dynamicContent');
 if(out)out.innerHTML='<section class="surface content-card"><h1>학습 자료를 불러오지 못했습니다.</h1><p>'+E(error.message)+'</p><p>자료가 일부 빠진 상태로 진행하지 않습니다. 연결을 확인한 뒤 다시 불러오세요.</p><button class="button primary" data-action="reload">다시 불러오기</button></section>';
 }
}

document.addEventListener('click',ev=>{
const btn=ev.target.closest('[data-action],[data-nav]');if(!btn)return;
if(btn.dataset.nav){route(btn.dataset.nav);return}
const ac=btn.dataset.action;
if(ac==='navigate'){if(btn.dataset.mode)state.practiceMode=btn.dataset.mode;route(btn.dataset.tab);return}
if(ac==='skip-main'){ev.preventDefault();const main=$('#screen');main.focus();main.scrollIntoView({block:'start',behavior:'instant'});return}
if(ac==='jump-heading'){const heading=document.getElementById(btn.dataset.id);if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});heading.scrollIntoView({block:'start',behavior:'instant'})}return}
if(ac==='reload'){location.reload();return}
if(ac==='open-source'){if(!displayItems().some(x=>x.id===btn.dataset.id)){state.search='';state.sourceFilter='all'}route('library',btn.dataset.id,false);const article=$('.library-main');if(article)article.scrollIntoView({behavior:'instant',block:'start'});return}
if(ac==='toggle-done'){state.done.has(btn.dataset.id)?state.done.delete(btn.dataset.id):state.done.add(btn.dataset.id);saveDone();const marked=state.done.has(btn.dataset.id);btn.textContent=marked?'읽음 취소':'이 글 읽음으로 표시';btn.classList.toggle('primary',!marked);btn.classList.toggle('soft',marked);toast(marked?'읽음으로 표시했습니다. 이해 여부는 별도로 확인하세요.':'읽음 표시를 취소했어요.');return}
if(ac==='source-filter'){state.sourceFilter=btn.dataset.filter;const visible=displayItems();if(visible.length&&!visible.some(x=>x.id===state.selected))state.selected=visible[0].id;syncUrl();render();return}
if(ac==='practice-mode'){state.practiceMode=btn.dataset.mode;syncUrl(true);render();return}
if(ac==='guided-answer'){const q=state.path.steps[state.guided.step],j=Number(btn.dataset.option);if(state.guided.answers[state.guided.step]!==undefined||!Number.isInteger(j)||j<0||j>=q.options.length)return;state.guided.answers[state.guided.step]=j;saveGuided();render();const el=$('#guidedQuestion');if(el)el.focus({preventScroll:true});return}
if(ac==='guided-retry'){if(!guidedCorrect(state.guided.step)){delete state.guided.answers[state.guided.step];saveGuided();render();const el=$('#guidedQuestion');if(el)el.focus({preventScroll:true})}return}
if(ac==='guided-next'){if(guidedCorrect(state.guided.step))moveGuided(state.guided.step+1);return}
if(ac==='guided-jump'){moveGuided(Number(btn.dataset.index));return}
if(ac==='guided-reset'){state.guided={step:0,answers:{}};saveGuided();render();return}
if(ac==='review-filter'){if(['all','wrong','unanswered'].includes(btn.dataset.filter)){state.reviewFilter=btn.dataset.filter;render()}return}
if(ac==='retry-answer'){const i=Number(btn.dataset.index);if(!quizQuestions()[i]||state.answers[i]===undefined)return;delete state.answers[i];setLocal('answers',state.answers);render();return}
if(ac==='session-start'){if(!state.sessionUntil&&state.sessionRemain){state.sessionUntil=Date.now()+state.sessionRemain*1000;state.sessionHandle=setInterval(sessionTick,500);saveSession();sessionTick()}return}
if(ac==='session-pause'){sessionTick();state.sessionUntil=0;clearInterval(state.sessionHandle);state.sessionHandle=null;saveSession();return}
if(ac==='session-reset'){state.sessionUntil=0;state.sessionRemain=14400;clearInterval(state.sessionHandle);state.sessionHandle=null;saveSession();sessionTick();return}
if(ac==='choose-comparison'){state.compareId=btn.dataset.id;render();return}
if(ac==='choose-case'){state.caseId=btn.dataset.id;state.reveal=false;render();return}
if(ac==='reveal-solution'){state.reveal=!state.reveal;render();return}
if(ac==='choose-persona'){state.persona=btn.dataset.id;state.questions.clear();render();return}
if(ac==='toggle-question'){const i=Number(btn.dataset.index);state.questions.has(i)?state.questions.delete(i):state.questions.add(i);render();return}
if(ac==='answer'){const i=Number(btn.dataset.index),j=Number(btn.dataset.option),q=quizQuestions()[i];if(!q||!Number.isInteger(i)||!Number.isInteger(j)||j<0||j>=q[1].length||state.answers[i]!==undefined)return;state.answers[i]=j;if(j===q[2])state.reviewWrong.delete(i);else state.reviewWrong.add(i);setLocal('review-wrong',[...state.reviewWrong]);setLocal('answers',state.answers);render();const node=$('#question-'+i);if(node)node.scrollIntoView({block:'nearest',behavior:'instant'});return}
if(ac==='reset-quiz'){state.answers={};state.reviewWrong.clear();state.reviewFilter='all';setLocal('review-wrong',[]);setLocal('answers',state.answers);render();return}
if(ac==='timer-start'){if(state.clockActive||state.threeMinutes===0)return;state.clockActive=true;state.clockUntil=Date.now()+state.threeMinutes*1000;state.clockHandle=setInterval(tick,400);tick();return}
if(ac==='timer-pause'){tick();stopTimer();return}
if(ac==='timer-reset'){stopTimer();state.threeMinutes=180;timerDisplay();return}
});
document.addEventListener('input',ev=>{
if(ev.target.id!=='librarySearch')return;
const el=ev.target;const cursor=el.selectionStart;state.search=el.value;
const list=$('.source-items');if(!list)return;
const filtered=displayItems(),selected=state.selected;
list.innerHTML=filtered.length?filtered.map(x=>'<button class="source-option '+(selected===x.id?'active':'')+'" data-action="open-source" data-id="'+E(x.id)+'"><strong>'+E(x.title)+'</strong><span>'+E(x.category)+' · 약 '+E(x.minutes)+'분'+(state.done.has(x.id)?' · 읽음':'')+'</span></button>').join(''):'<p class="muted small">일치하는 자료가 없어요.</p>';
if(typeof cursor==='number'&&document.activeElement===el)el.setSelectionRange(cursor,cursor);
});
window.addEventListener('popstate',()=>{routeFromUrl();render()});
window.addEventListener('hashchange',()=>{routeFromUrl();render()});
init();
})();

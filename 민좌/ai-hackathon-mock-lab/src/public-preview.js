/* All five official-practice walkthroughs live in the main learning page.
 * Separate shadow roots keep the existing guide CSS/IDs and saved checks intact.
 * No iframe, secondary document navigation, runtime fetch, or dynamic eval.
 */
(function () {
  const bundle = JSON.parse(document.getElementById('publicPreviewData').textContent);
  const titles = {
    food: '식품·화장품 규정 위반 식별',
    snack: '간식 선호도 설문조사 분석',
    subscription: '구독 비용 최적화',
    literacy: 'AI 리터러시 프로그램 효과성 진단 및 커리큘럼 개선 전략',
    api: '주문 조회 API 오류 분석',
  };
  const mainDocument = document;
  const nativeHistory = window.history;
  let current = 'food', humanCase = null, foodController, humanController;
  const choose = document.getElementById('previewTask');
  const foodHost = document.getElementById('foodPreviewHost');
  const humanHost = document.getElementById('humanPreviewHost');
  const toolbar = document.getElementById('previewToolbar');
  const toolbarResize = new ResizeObserver(() => {
    const height = toolbar.getBoundingClientRect().height + 8;
    for (const host of [foodHost, humanHost]) host.style.setProperty('--preview-toolbar-height', height + 'px');
  });
  toolbarResize.observe(toolbar);
  const escapeApproach = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const proseApproach = items => items.map(text => '<p>'+escapeApproach(text)+'</p>').join('');
  function renderApproach(id) {
    const a = bundle.approaches[id];
    const count = n => Number(n).toLocaleString('ko-KR');
    const section = (title,body) => '<section class="approach-section"><h3>'+title+'</h3>'+body+'</section>';
    document.getElementById('problemApproach').innerHTML =
      '<p class="pill">문제를 처음 만난 사람의 순서로 읽기</p>'+
      section('먼저 문제를 살펴봅시다.',proseApproach(a.problem))+
      section('첨부된 자료는 다음과 같습니다.',proseApproach(a.materials)+
        '<div class="table-wrap"><table><thead><tr><th>자료</th><th>무엇을 확인하나요?</th><th>개수·첨부 토큰</th></tr></thead><tbody>'+a.materialGroups.map(g=>'<tr><td>'+escapeApproach(g.label)+'</td><td>'+escapeApproach(g.role)+'</td><td>'+g.count+'개<br>'+count(g.tokens)+'토큰</td></tr>').join('')+'</tbody></table></div>'+
        '<details><summary>실제 첨부파일 '+a.files.length+'개 이름과 형식 확인하기</summary><ul class="approach-file-list">'+a.files.map(f=>'<li><strong>'+escapeApproach(f.label)+'</strong><br><span>'+escapeApproach(f.name)+' · '+f.format+' · '+count(f.tokens)+'토큰</span></li>').join('')+'</ul></details>')+
      section('그러면 우리는 어디서부터 시작할까요?',proseApproach(a.plan))+
      section('질문 수와 토큰은 이렇게 배분합니다.',proseApproach(a.budget))+
      section('첫 질문에는 무엇을 맡길까요?',proseApproach(a.firstGoal)+
        '<div class="notice"><strong>실제로 첨부한 자료</strong><p>'+a.first.names.map(escapeApproach).join(' · ')+'</p><strong>'+count(a.first.tokens)+' / 20,000토큰</strong></div>'+
        '<p class="approach-caution">'+escapeApproach(a.promptCaution)+'</p><h4>실제로 입력한 첫 질문 전문 · '+a.first.prompt.length+'자</h4><pre class="approach-prompt">'+escapeApproach(a.first.prompt)+'</pre><button class="btn" id="copyApproachPrompt">실제 첫 질문 복사</button><p id="approachCopyStatus" class="muted" role="status"></p>')+
      section('AI 답변을 받으면, 여기부터 확인합니다.',proseApproach(a.probe))+
      section('이제 실제 풀이를 따라가봅시다.','<p>'+escapeApproach(a.bridge)+'</p><button class="btn primary" id="startActualWalkthrough">실제 1회차 응답과 검증 이어서 보기 →</button>');
    document.getElementById('copyApproachPrompt').onclick = async () => {
      try {await navigator.clipboard.writeText(a.first.prompt);document.getElementById('approachCopyStatus').textContent='실제 첫 질문을 복사했습니다. 위 주의사항과 뒤의 교정 기록을 함께 확인하세요.';}
      catch {document.getElementById('approachCopyStatus').textContent='위 질문 전문을 직접 선택해 복사하세요.';}
    };
    document.getElementById('startActualWalkthrough').onclick = () => {
      if (current === 'food') foodController.goRound(1);
      else {writeLocation('#actual-round-1');humanHost.shadowRoot.getElementById('actual-round-1').scrollIntoView({block:'start'});}
    };
  }

  function writeLocation(hash = '') {
    const url = new URL(location.href);
    url.searchParams.delete('task');
    url.searchParams.set('preview', current);
    url.hash = hash;
    nativeHistory.replaceState(null, '', url);
  }
  const guideHistory = {
    replaceState(_state, _title, input) {
      const destination = new URL(input, location.href);
      writeLocation(destination.hash);
    },
  };
  function createGuide(host, markup) {
    const root = host.attachShadow({mode: 'open'});
    root.innerHTML = markup;
    // Fragment targets inside a shadow root need an explicit scroll target.
    root.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = root.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      writeLocation(link.hash);
      target.scrollIntoView({block: 'start'});
    });
    return root;
  }
  function guideDocument(root) {
    return {
      getElementById: id => root.getElementById(id),
      querySelector: selector => root.querySelector(selector),
      querySelectorAll: selector => root.querySelectorAll(selector),
      addEventListener: (...args) => root.addEventListener(...args),
      execCommand: (...args) => mainDocument.execCommand(...args),
      body: root.querySelector('.embedded-guide'),
    };
  }
  function mountFood(root) {
    const document = guideDocument(root), history = guideHistory;
    __EMBED_FOOD_JS__
    return {setTab, goRound};
  }
  function mountHuman(root) {
    const document = guideDocument(root), history = guideHistory;
    __EMBED_HUMAN_JS__
    return {renderCase};
  }
  function openCase(id, fragment = '', scroll = false) {
    current = Object.hasOwn(titles, id) ? id : 'food';
    choose.value = current;
    document.getElementById('previewCaseTitle').textContent = titles[current];
    renderApproach(current);
    foodHost.hidden = current !== 'food';
    humanHost.hidden = current === 'food';
    if (current === 'food') {
      if (!foodController) foodController = mountFood(createGuide(foodHost, bundle.food));
      const round = fragment.match(/^#round-([1-9])$/);
      if (round) foodController.goRound(Number(round[1]));
      else if (['#start', '#tokens', '#verify'].includes(fragment)) foodController.setTab(fragment.slice(1), false);
    } else {
      if (!humanController) humanController = mountHuman(createGuide(humanHost, bundle.human));
      if (humanCase !== current) humanController.renderCase(current);
      humanCase = current;
    }
    writeLocation(fragment);
    const root = (current === 'food' ? foodHost : humanHost).shadowRoot;
    const target = fragment && (root.getElementById(fragment.slice(1)) || document.getElementById(fragment.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({block: 'start'}));
    else if (scroll) document.getElementById('previewCaseTitle').scrollIntoView({block: 'start'});
  }
  choose.addEventListener('change', () => openCase(choose.value, '', true));
  document.getElementById('previewOverview').addEventListener('click', () => {
    writeLocation('');
    document.getElementById('publicPreview').scrollIntoView({block: 'start'});
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-open-preview]');
    if (!button) return;
    current = button.dataset.openPreview;
    show('publicPreview');
    document.getElementById('publicPreview').scrollIntoView({block: 'start'});
  });
  window.addEventListener('public-preview-open', () => openCase(current));
  window.addEventListener('popstate', () => {
    const id = new URLSearchParams(location.search).get('preview');
    if (id) {current = id; show('publicPreview');}
    else show('home');
  });
  const initial = new URLSearchParams(location.search).get('preview');
  if (initial) {
    const fragment = location.hash;
    current = initial;
    show('publicPreview');
    if (fragment) openCase(current, fragment);
  }
})();

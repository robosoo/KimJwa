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
    const target = fragment && root.getElementById(fragment.slice(1));
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

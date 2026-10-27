(()=>{'use strict';const root=document.getElementById('step4');if(!root)return;
const explanations={
github:['GitHub · 공개 소스 보관소','공개된 프로젝트를 찾아 필요한 코드를 가져와 과제에 맞게 변경하는 재료야.','공개 코드라고 무조건 안전하거나 시험에 적합한 것은 아니야. 출처·라이선스·동작·외부 통신을 점검해.'],
skill:['Skill · AI의 작업 매뉴얼','어떤 기준과 순서로 업무를 처리할지 AI에게 알려주는 공개 작업 지침이야.','개인 PC의 비공개 Skill을 업로드하면 안 돼. 공개 Skill도 환경 안내와 제한을 지켜야 해.'],
mcp:['MCP · AI에게 연결하는 도구','Codex가 다른 도구를 호출할 수 있도록 연결하는 규격이야. 시험 가이드에는 MCP 설정 JSON을 편집·저장할 수 있다고 나와 있어.','특정 서버 설치·접속 성공은 보장되지 않아. 데이터 이동 경로와 도구의 권한을 확인해.']
};
const tabs=[...root.querySelectorAll('[data-s4-tab]')],panel=root.querySelector('#s4-term-explanation');function show(key){const v=explanations[key];if(!v)return;tabs.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.s4Tab===key)));panel.replaceChildren();let title=document.createElement('strong');title.textContent=v[0];panel.append(title);for(let i=1;i<v.length;i++){let p=document.createElement('p');p.textContent=v[i];panel.append(p)}}tabs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.s4Tab)));show('github');
const templates={
github:'README.md와 필요한 기능을 먼저 읽어 줘. 공개 GitHub 저장소가 실제로 유리한지 평가하고, 출처·라이선스·의존성·권한·외부 네트워크 통신을 점검해 줘. 시험 문제·파일·결과물을 외부로 보내지 않고 Git Push도 하지 마. 자료를 가져오기 전에 선택 이유와 위험부터 알려 줘.',
skill:'README.md를 읽고 공개 Skill이 필요한 상황인지 판단해 줘. 해당 지침의 출처·적용 범위·요구 권한을 검토해 줘. 개인 PC 파일 업로드 없이 허용된 환경에서만 사용하고, 필요하지 않다면 사용하지 않아도 된다고 설명해 줘.',
mcp:'시험 작업에 MCP가 꼭 필요한지 먼저 검토해 줘. MCP 설정 JSON을 변경하기 전에 서버가 제공하는 기능, 필요한 권한, 통신 대상, 자료 유출 가능성, 시험 제한과의 충돌을 점검해 줘. 확인되지 않으면 실행하지 말고 근거를 설명해 줘.'
};
const select=root.querySelector('#s4-prompt-kind'),out=root.querySelector('#s4-prompt'),status=root.querySelector('#s4-copy-status');function setPrompt(){out.textContent=templates[select.value]||templates.github}select.addEventListener('change',setPrompt);setPrompt();root.querySelector('#s4-copy').addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw Error('no clipboard');await navigator.clipboard.writeText(out.textContent);status.textContent='복사 완료'}catch(e){status.textContent='자동 복사가 지원되지 않아. 문장을 직접 선택해 복사해 줘.'}});

})();

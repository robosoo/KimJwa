# SK하이닉스 2차 학습센터 인수인계

갱신: 2026-10-25. 저장소 robosoo/KimJwa / 브랜치 skhynix-round2-unified-20261025 / 범위 skhynix-round2/.

## 현재 운영

- Production: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- 배포 ID: dpl_9gxtpr6UyMhMBr13hXLAxTMZziLx, READY / production. 공식 도메인이 같은 ID를 가리키는 것을 API로 확인.
- 배포 소스: faf6f9efa285c0b6fc0057635232784f64325049. 이후 검증 보고서·이 문서·스크린샷 갱신 커밋은 runtime 변경과 구분한다. 최종 문서 커밋은 브랜치 log로 확인한다.
- 검증 Preview: dpl_EaNQ5CUTq6AGdqVqfvNwYSqVmHNX, READY. https://skhynix-ai-hackathon-round2-png2cw8o5-ctpmfd42hf-8757.vercel.app/
- 직전 Production: dpl_79rfL1iS2kxiDxdm4QirQLcepHFV. 원본 운영본: dpl_7h9HuP4wmmjiXK8ikCkUMkNipawR.

## 보존과 복구

원본 Production 8개 파일의 목록·UID·크기를 조사해 누락 파일을 복구했다. 복구 커밋은 6d17af15cdbd11e5cbaef5bb9ca9522fe422cfd6, 두 JSON 최초 백업은 61239a731338369aec57934a50e38d8090587c9a다. backup-manifest.json과 reports/production-audit.md를 참고한다. 이전 브랜치 UI는 archive/pre-ui-20261025/에도 보존했다.

다음 원본 바이트를 유지한다.

| 파일 | raw SHA-1 |
|---|---|
| cofa-chapters.json | a35a50f9efa83e515ca9c21b33b45b762036b3a0 |
| portal-content.json | ff4c79003ca3564b037b77ac52728b0c3234fedc |
| content.json | 6c7dce71239c80f3f57693c0a8dcdc787d792093 |
| luka-deep.json | 813c0396cfa7cacee60eba50b5106bd05c31b52e |

14개 핵심 장, 추가 5장, 8개 실습, 12개 원문 문항, 영상 15단원, Luka 심화 11단원을 보존했다. Lot의 행 수·교란 주장 정정 및 문항 개선은 원본을 덮어쓰지 않고 화면에서 적용한다. 1차 자료·main·다른 프로젝트는 변경하지 않는다.

## 현재 학습 구성

최상위 메뉴는 시작하기 / 후기·근거 / 전략·실습 / 이해도 확인이다. hash routing으로 한 화면에서 이동한다.

- 읽기 항목 38개: 기존 36개 + 비개발자 입문 + 사용자 제공 Harness 문서 분석. 검색·유형 필터·출처 정보·소제목 목차·관련 글·읽음 상태를 제공한다.
- 기본 흐름은 핵심 이해→가상 과제 하나 끝까지 수행→틀린 판단 복습이다. 전체 글 완독이나 참가자 이름 암기를 전제하지 않는다.
- 비개발자는 문서·표·조사 메모를 작성하고 숫자·출처·예외·승인 조건을 대조한다. IDE·Bash·FDE 앱 개발을 필수로 두지 않는다.
- 공식 Cofa 전체 메뉴와 비개발자 탭의 안내용 화면을 확인했다. 공식 제품 설명은 평가 목적의 우선 근거다. 실제 시간·배점·모델·반입 규정은 해당 시험 안내가 우선한다.
- 참가자 제목을 학습 행동 중심으로 바꾸고 작성자는 출처에 보존했다. 개인 준비 일정은 기본 확장하지 않고, README 확인·필요한 질문·합의·검증·인수인계·자기 설명의 7단계를 앞에 연결했다.
- 5개 전략 비교, 8개 과제와 네 가지 판단 해설, 가상 문답 3종, 설명 사례 5개, 4시간 및 3분 자율 타이머를 제공한다. 원래 두 문답과 세 개발 사례도 유지한다.
- 12문항 중 4개를 비개발자·근거 판단 중심으로 개선했다. 의미가 바뀐 문항의 저장 답변만 최초 1회 초기화한다. 나머지 읽음·답안은 유지한다.
- 주황/검정 테마는 SK하이닉스 공식 CI의 HEX #F47725와 검정 및 공식 해커톤 사이트의 위계를 참고했다. 상표·로고·이미지 자산은 복제하지 않았다.

## 추가 자료 분석과 준비 상태

https://interview-ai-native-ko.vercel.app/?file=README.md 의 13개 파일을 모두 읽고 제공 샘플 검사 스크립트를 실행해 종료 코드 0을 확인했다. 3/5=60%, 수정 후 2/5=40%를 별도 계산했다. 파일별 SHA-256과 검사 범위는 reports/interview-kit-audit.json에 있다.

이 사이트는 문서 뷰어이며 목록에 완성 앱이 없다. 샘플 검사는 실제 앱의 저장·승인·근거 이동·내보내기를 입증하지 않는다. 준비 문서 틀은 있지만 실행 가능한 범용 키트·검증된 오픈소스 후보 목록·두 번의 전체 리허설은 미확인이다. PREPARATION_PLAN.md에 비개발자용 최소 문서와 두 종류 전체 리허설의 산출물·검증·완료 증거를 정의했다. 계획을 실행 완료로 보고하지 않는다.

공식 사이트의 Sourcer 체험은 인재 발굴 제품이다. Probe 연습장과 구분한다. 누구나 실제 과제를 풀고 공식 평가를 받는 공개 무료 Probe 연습 환경은 이번 조사에서 확인하지 못했다.

## 실제 검증 결과

- Node VM 기능 검사 25개 PASS: reports/validation.json.
- 데이터·계산·필수 주제·주요 색 대비 검사 54개 PASS: reports/data-audit.json.
- 실제 Cloud Chrome의 Playwright locator API로 390/844/768/1024/1440 CSS px, 총 20개 메뉴/크기 조합을 확인했다. 각 앱의 scrollWidth와 clientWidth가 일치했다.
- 다섯 크기의 스크린샷을 생성·검토했다. 최종 Production 캡처는 reports/screenshots/nondeveloper-production.jpg에 저장했다.
- 실제 브라우저에서 38개 목차, 이름 검색과 유형 필터, 글 선택, 모바일 본문 top 11.72px/태블릿 20.11px, 8개 과제 첨부·해설 토글·판단 해설, 5개 전략 전환을 확인했다.
- 새 비개발자 문답, 12개 정답·해설, 초기화·오답·관련 글 이동, 새로고침 후 읽음/답안 유지, 준비 상태 표기, 4시간 시작/일시정지, 설명 사례 5개를 확인했다.
- Production에서도 네 메뉴·38개 목차·공유 문서 분석 표시를 확인했다.
- 운영 도메인 본문 11개가 로컬과 바이트 일치. 기존 공유 URL 7개의 307 이동과 목적지를 확인했다. 배포 파일 16개 UID가 로컬 raw SHA-1과 모두 일치했다.
- 새 조사 링크 8개 모두 HTTP 200. 기존 19개 링크는 앞선 점검에서 18개 reachable, 프로필 1개 999 접근 제한이었다. HTTP 성공과 주장의 사실 검증은 다르다.

세부 증거: reports/nondeveloper-browser-checks.json, reports/release.json, reports/runtime-files.json, reports/cofa-official-research.md, reports/supplemental-links.json. 이전 릴리스의 browser-checks.json은 과거 검증 기록으로 보존한다.

## 한계와 다음 작업

- 현재 학습센터는 정적 학습 서비스다. 실제 AI·파일 업로드/편집·Bash 실행·업무 서비스·작업 수집·Cofa 자동 채점은 없다. 해당 한계를 입문 및 문답에 표시했다.
- 실물 iPad/iPhone, Safari/VoiceOver, safe-area는 미검증이다. 다섯 크기 검사는 Chrome iframe viewport이며 실물 기기 검사라고 표현하지 않는다.
- 로컬 Chromium 설치는 다운로드 실패. standalone browser-smoke.mjs는 재현용이며 이번에 실행해 통과했다고 주장하지 않는다.
- 일부 원문 작성일·영상 직접 확인은 제한돼 source-manifest의 null과 확인 범위를 유지한다.
- 다음 우선순위: 주최측 개인 안내로 허용 환경 확인→최소 준비 문서 적용→서로 다른 전체 리허설 2회와 실패/자기 설명 기록→실물 Safari 확인.

## 배포·운영 규칙

runtime 16개만 배포한다: index.html, app.js, style.css, brand.css, content.json, luka-deep.json, cofa-chapters.json, portal-content.json, source-manifest.json, learning-guide.json, beginner-guide.json, vercel.json, cofa-probe.html, cofa-luka.html, cofa-luka-deep.html, cofa-sim.html. tests/viewport.html은 Preview 전용이다. 보고서·archive·스크린샷은 Production에 넣지 않는다.

주요 경로: #start, #learn/probe-basics, #learn/creator-guide, #learn/luka-depth, #learn/kit-review, #practice/cases, #practice/preparation, #quiz. 기존 query 주소와 cofa-*.html 이동을 유지한다. 상태는 해당 브라우저 localStorage에만 저장된다.

Git CLI push 자격증명이 없어 연결된 GitHub API의 tree→commit→expected-head ref 갱신을 사용한다. Vercel은 기본 연결로 해당 프로젝트만 배포한다. 명시적 teamId는 이전 403을 반환했으므로 넣지 않는다. 복구는 위 원본 커밋 또는 직전 배포를 사용하며 이전 소스는 삭제하지 않는다.

## 검토 중인 다음 후보 · 아직 운영 전

제3자 학습 관점의 품질 기준과 10개 가상 경로를 정의했다. 새 후보는 인과·정합성 심층 교재(15주제/6층), 8단계 풀이 따라하기, 읽음/이해 구분, 오답 필터·단일 문항 재시도를 추가한다. 읽기 항목은 39개이며 원본 4개 JSON은 보존한다. 원문 대조로 경력 귀속·Haiku 표기·시연/행사 시간과 정보량·부채 개념의 범위를 보완했다. UNESCO·NIST·Storey·IES는 보조 개념/학습 설계 근거이며 시험 규정이나 Cofa 평가 효과의 독립 인증이 아니다. 로컬 기능 36개와 데이터 59개 PASS. Preview·운영 검증 후 릴리스 상태를 갱신해야 한다.

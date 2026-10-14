# 2026-10-14 · 사람이 푸는 공식 체험 5과제 통합 수업

- 새 수업: https://skhynix-ai-hackathon-quiz.vercel.app/human-practice-guide.html
- 간식 설문 400/400 · 구독 비용 400/400 · AI 리터러시 및 주문 API 제출·통과 확인. 서술형 화면은 -/100이며 수치 점수는 확인 불가.
- 실제 전송 17회(유료/차감 의미가 아닌 체험 질문 횟수), 이 중 일시 오류 1회는 차감되지 않아 16회 사용. 과제별 2/7/4/3회 사용, 8/3/6/7회 잔여.
- 파일의 역할을 먼저 보여주는 카드, 회차별 파일 조합과 20,000토큰 선택 연습, 실제 질문 전문·AI 응답, 사람의 원문 확인 위치, 오류 교정, 최종 제출 답안.
- 97쪽 통합 PDF: 새 실전 수업 57쪽 + 기존 식품·화장품 해설 40쪽. 실제 질문과 미실험 개선 템플릿을 구별한다.
- 검증된 대화 기억의 범위와 미확인 Context Window 크기를 구분한다. 모든 파일을 AI 외부에서 일괄 분석한 인간 단독 시험으로 표현하지 않는다.
- 기존 64문항·8실습·26개념과 식품·화장품 해설을 유지한다.
- 배포 및 브라우저 검수 결과: reports/HUMAN_LEARNING_CHECKPOINT_20261014.md.

---

# 2026-10-14 · 식품·화장품 실전 풀이 해설

- 운영: https://skhynix-ai-hackathon-quiz.vercel.app/food-cosmetics-guide.html
- 첫 화면과 상단 메뉴에 **실전 풀이 해설** 진입 추가.
- 폴더별 파일 선택 카드, 실제 질문·응답 9회, 자세한 사람의 풀이·검증 설명, 토큰 합계 선택 연습.
- 40쪽 개정 강의서: 큰 글자, 회차별 첨부 안내, 장별 책갈피 37개.
- 원래 공개 체험 채점 결과 400/400, 9회 사용·1회 잔여. 개선안 8회와 실제 실행을 구별한다.
- Vercel production READY: `dpl_5vhXLJUrkXUFiBhhy5Pyvub9t3RW`. 운영 홈·해설·PDF HTTP 200, 배포 PDF와 검수본의 바이트 일치.
- 실제 브라우저에서 회차 이동, 파일 토큰 초과·해제, 검색, 질문 복사, 최종 답안 펼치기, 체크 저장·복원, 홈 메뉴 진입 확인. 실물 iPad Safari 검사는 미실시.
- 검수 기록: [reports/FOOD_COSMETICS_READABLE_GUIDE_20261014.md](reports/FOOD_COSMETICS_READABLE_GUIDE_20261014.md).

---

# 2026-10-12 · AI 위키 26개 + 4P 원리 우선 학습 + 독립 검증 훈련

- **AI 개념 공부**: 범용 위키 26개(정의, 작동 원리, 한계, 일반 예시, 연관 개념, 공식 출처)로 개편. 반도체 응용은 여기서 분리.
- **4P 사고법**: 반도체가 아닌 개념 원리 4개 → 일상 상황 판단 8개 → 반도체 상황 6개 × 4단계 → AI 오답 탐지·수정 요청문 → 새로운 수치·조건으로 독립진단 12개.
- **가상 전문가 100인 피드백 반영**: 학습 완료/실전 판단 구분, 틀린 AI 답안과 조건 변형 문제, 첫 독립 시도 기록, 기밀 데이터 입력 경고. 평가·개선 기록: [`reports/ENCYCLOPEDIA_4P_REMEDIATION_20261012.md`](reports/ENCYCLOPEDIA_4P_REMEDIATION_20261012.md).
- **검증 주의**: 자동 브라우저 검사 통과가 실제 iPad 실기기 테스트를 의미하지는 않는다. 객관식/숫자 판정은 학습용이고 서술형 4P는 스스로 검토한다.

---

# 2026-10-12 · AI 개념 위키 + 4P 이론 중심 학습/독립 검증 개선 완료

- **사이트:** https://skhynix-ai-hackathon-quiz.vercel.app/ (Vercel 실제 배포 READY / 운영 HTTP LIVE PASS)
- **개념 메뉴:** 26개 AI 개념을 반도체 사례 없이 정의·작동 원리·한계·보편적 예시·공식 출처의 위키식 항목으로 확장.
- **4P 메뉴:** 반도체 사례 전에 Plan/Prompt/Probe/Protect의 충분한 이론·일상 예시·오해·실천 절차를 학습 → 8개 구별 퀴즈 → 반도체 실전 사례 6개(24단계).
- **가상 전문가 피드백 반영:** 가상 AI 오답 6건의 비판적 탐지, 오류 수정 프롬프트 직접 작성, 새 조건의 변형 문제 6건, 4P 열람 완료와 객관식 검증 성공을 서로 다른 학습 기록으로 분리.
- **검증 근거:** 운영 HTTP [Live PASS](https://github.com/robosoo/KimJwa/actions/runs/38155155987) · 구조/숫자 검사 GitHub Actions 정상. Chromium/WebKit 자동 브라우저 QA 4개 화면 크기 조합 및 4P 오답·변형 검사 [성공](https://github.com/robosoo/KimJwa/actions/runs/38155103159). 실물 iPad/VoiceOver 검사는 별도로 미실시.
- **상세 변경 기록:** [work/WIKI_4P_IMPROVEMENT_RELEASE_20261012.md](work/WIKI_4P_IMPROVEMENT_RELEASE_20261012.md)
- **연구 성격:** 교육용 독립 창작, SK 공식 문항·평가 배점 아님. 100인 심사 의견은 실제 전문가 설문이 아닌 가상 리뷰. 서술형 자동 의미 채점/사이트 내부 AI API 호출은 없음. 회사/고객 기밀 입력 금지.

---

# 2026-10-12 · 가상 AI 전문가 100인 피드백 리뷰

- **가상 패널 100개 관점:** 10개 분과 × 10개 리뷰. 실제 전문가 자문/독립 설문이 아님. 보고서: [`reports/SIMULATED_AI_EXPERT_PANEL_100_20261012.md`](reports/SIMULATED_AI_EXPERT_PANEL_100_20261012.md).
- **가상 심각도 분류:** P0 6 / P1 72 / P2 22. 실제 전문가 투표 결과가 아닌 한 AI가 설정한 가상 피드백 우선순위.
- **개선 핵심:** 20자 작성 후 모범 예시 열람을 역량 검증으로 오해하지 않게 하고, 오류 있는 AI 산출물 역검증·프롬프트 수정 2회전·새 숫자/경계의 변형 과제·보안·실기기 QA를 우선한다.
- **상태:** 100인 가상 피드백은 기록 완료. 이 리뷰에서 제안된 신규 기능이 모두 구현된 상태는 아니다. 기존 운영 기능·64문항·26개념·8개 실습·4P 6사례는 유지.

---

# 2026-10-12 · 4P 사고법 훈련 + 반도체 시나리오 실전 메뉴 운영 반영

- **운영:** https://skhynix-ai-hackathon-quiz.vercel.app/ — 상단 메뉴 '4P 사고법 훈련'에 진입. 기존 64개 문제 / 26개념 단원 / 8개 AI 실습 유지.
- **신규 메뉴:** 프로그래머스 공개 AX 교육 기준 Plan(문제 정의) → Prompt(AI 협업) → Probe(결과 검증) → Protect(책임 관리). 4개 상세 학습 카드 + 8개 단계 구별 퀴즈 + 반도체 가상 사례 6개 × 4단계(24개 직접 작성·예시 비교).
- **직접 내재화:** 각 단계에 스스로 최소 20자를 작성해 예시를 비교해야 다음 단계가 열립니다. Plan → Prompt → Probe → Protect를 순서대로 모두 마쳐야 다음 사례로 넘어갈 수 있습니다. 나쁜 접근과 좋은 접근 비교, 인출 연습/자가 복습 기록 및 학습자별 로컬 저장. 다른 기기에서는 기존 학습 기록 내보내기·가져오기를 활용.
- **반도체 예제:** 웨이퍼 불량률 8,000행/7,720웨이퍼, VDDQ 임계 1.030V, HBM 수율 비교, DRAM 사양서 리비전, 외부 장비 로그 인젝션, 결함 검출 혼동행렬. 모두 교육용 가상 데이터.
- **실제 운영 검증:** 배포 `dpl_7ycQotoBTvDbp3fjHC49yzBYjTii` READY, https://github.com/robosoo/KimJwa/actions/runs/38152978573 는 라이브 GET의 64/26/8과 4P 사례 6개/24단계/복습 8개, 운영 HTML 내 FP06/QC08 확인 성공.
- **연구 기록:** `work/PRACTICAL_SOLVING_RESEARCH_20261012.md` — 그렙 2024·2026 대표 인터뷰, 공식 평가 페이지, AX 교육, 공개 평가 인사이트 조사와 4P 설계 철학·한계 구분.
- **공식 범위 주의:** 4P는 프로그래머스 공식 기업교육 기준이지만 SK하이닉스 2026 1차 시험의 실제 배점·문제·질문 제한은 확인되지 않는다. 서술 단계 '복습 완료'는 내용의 정확성에 대한 공식 채점이 아니다.
- **보안/기능 범위:** 실제 회사/고객 기밀 데이터 입력·외부 AI 업로드 금지. 실습의 ChatGPT 자동 호출은 아직 없고, 사이트가 저장하는 것은 사용자 브라우저의 학습 기록. 실제 iPad Safari 실기기 테스트 여부는 브라우저 에뮬레이션과 분리해 기록한다.

---

### 2026-10-11 최종 운영 배포 상태 — Production 검증 성공

- **기존 운영 사이트:** https://skhynix-ai-hackathon-quiz.vercel.app/ — 64문항 / 개념 26단원 / 실습 8개 정상 제공을 외부 GitHub Actions가 HTTP GET으로 검증.
- **공개 웹 라이브 검증:** https://github.com/robosoo/KimJwa/actions/runs/38144076803 (성공; 실제 제공 HTML의 R1-064 및 C26 확인, 488,542바이트).
- **운영 배포 ID:** `dpl_DDyN6gvb16BBVcE9p25pPZv9v4gf`, 상태 READY, 공식 운영 도메인 alias 연결 완료. 세부 기록 `reports/production-deployment.json`.
- **Vercel 플러그인 해결책:** 기존 계정 인증은 유효했고, 호출에 명시적으로 `teamId`를 넣으면 403이 발생하지만 **`teamId` 없이 기존 `project` ID를 지정하면 운영 배포가 성공**했다. 새 계정 연결이나 `VERCEL_TOKEN` 등록은 **현재 수동 플러그인 배포의 필수 조건이 아님**.
- GitHub `gitSource` 재배포 시 `git_info_fail`가 발생해, 검증된 정적 HTML과 `bank-version.json`을 **같은 프로젝트**에 직접 업로드하는 경로로 해결. 향후 GitHub Actions 자동 배포에는 별도 CI 인증 구성이 필요할 수 있다.
- 검증 범위에 실제 iPad Safari 실기기 테스트, 사이트 내부 AI 실시간 호출은 포함되지 않는다.

### 2026-10-11 최신 실행 결과

- 정적 공개 미리보기: https://raw.githack.com/robosoo/KimJwa/main/skhynix-ai-study/index.html (GitHub Actions HTTPS GET 검증 통과)
- 라이브 검증 실행: https://github.com/robosoo/KimJwa/actions/runs/38141432537 (HTML MIME, 64문항, 26단원, 8실습 PASS)
- Chromium+WebKit 검증 실행: https://github.com/robosoo/KimJwa/actions/runs/38141208116 (두 엔진 × iPad/폰 화면, 개념 검색·즉시 해설·풀이 기록 유지 PASS)
- GitHub Pages 공개 배포는 저장소 설정에 따라 별도 활성화가 필요하지만, **Vercel production은 64문항·26개념 최신판으로 운영 배포 성공**.

# 2026-10-11 추가 배포 현황

- **GitHub 최신:** 64문항 / 개념 공부 26단원 / 실습 8개. C17–C26 신규 단원을 `data/concept-lessons.json`에 반영했다.
- **실행형 독립 HTML:** `release/index.html` (문항·해설·개념 데이터를 파일 안에 포함). 실제 사용 시 공개된 정적 호스팅에 올리거나, 파일을 지원하는 브라우저 환경에서 연다.
- **GitHub Actions 검증:** 64문항·26단원·8실습 구조 검사 및 별도 Python 수치 검산 33개 통과. 이는 사람의 의미 검수 또는 iPad Safari 실기기 검증을 대체하지 않는다.
- **Vercel 운영 사이트 변경 이력:** 초기 44문항 커밋 `dc6b0695`에 고정되어 있었지만, 2026-10-11 최신 64문항·26개념 운영 배포 `dpl_DDyN6gvb16BBVcE9p25pPZv9v4gf` READY. 기존 프로젝트를 그대로 사용했고 외부 HTTP 검증을 통과했다.
- **GitHub Pages 대체 경로:** `.github/workflows/hackathon-pages.yml`를 추가했으나 최초 실행은 Pages 비활성으로 Configure Pages 실패. GitHub 저장소 Settings → Pages → Build and deployment → Source: GitHub Actions를 선택한 후 Actions에서 `Publish AI Hackathon Study Site` 재실행 필요.
- **현재 완료 판단:** 소스 저장·정적 빌드·자동 검증·Vercel 운영 배포·외부 HTTP 실서비스 검증 완료. 별도 GitHub Pages 주소와 iPad 실기기 테스트는 미완료.

## 브라우저에서 바로 열 수 있는 임시 공개 미리보기

- URL(개발·가변 캐시): https://raw.githack.com/robosoo/KimJwa/main/skhynix-ai-study/index.html
- URL(2026-10-11 HTML 고정본): https://rawcdn.githack.com/robosoo/KimJwa/17880932fbead058592f1eaba8b4c2e53d578470/skhynix-ai-study/index.html
- 원본 GitHub: `skhynix-ai-study/index.html` (한 파일에 객관식 64문항, 개념 26단원, AI 활용 실습 8개 포함).
- **2026-10-11 공개 검증:** GitHub Actions `Verify Public HTML Preview` 실행 38141432537에서 해당 live URL을 HTTPS로 요청해 `Content-Type: text/html; charset=utf-8`와 64문항·26개념·8실습 내장을 확인했다. 동일 데이터의 브라우저 QA는 Chromium·WebKit 각 2개 화면 크기에서 통과했다. 이는 실제 iPad Safari 실기기에서 직접 테스트했다는 뜻은 아니다. 안정적인 운영 주소는 기존 Vercel 도메인으로 유지할 계획.
- 공개 중계 도메인에서는 민감한 실제 업무 문서·개인정보를 입력하지 않는다. 사이트 로컬 학습 기록도 동일 도메인에서 제공하는 다른 HTML과 분리 보장되지 않는다. 공식 운영 도메인 복구 후 사용자별 학습 기록을 JSON으로 내보내고 가져올 것.


---

# v3 · 64문항 및 공식 AI 기초 개념 26단원

운영: https://skhynix-ai-hackathon-quiz.vercel.app/

- 기존 44문항의 역할·목표·자료·판단 조건과 선택지 설명을 보완했다.
- Google·OpenAI·Claude 공식 문서 개념을 참고한 신규 20문항(45~64번)을 추가했다. 전체 64문항, 실습 8개.
- `개념 공부` 탭에 26단원: 쉬운 뜻, 업무 예시, 요청 예시, 점검 순서, 관련 문제, 공식 문서. 검색·읽음 표시·관련 문항 이동을 지원한다.
- v1 학습 기록을 가져올 수 있다. 기존 44개 ID와 정답 위치를 유지했고 보존한 원본 자료는 삭제하지 않았다.
- 출제 기준: `work/WORK_PROMPT.md`, `work/QUESTION_SPEC_AND_QA.md`, `work/OFFICIAL_DOCS_STUDY_V2.md`.
- `npm test`: 구조·중복·단원 연결·인라인 JavaScript 구문 + 독립 Python 수치 검산. 배포/브라우저 결과는 `reports`에서 확인한다.
- AI 직접 연결은 아직 구현되지 않았으며 질문 복사 후 외부 ChatGPT를 사용하는 흐름이다.

## 2026-10-11 추가 검증 및 배포 상태

- **GitHub 소스 확정:** `data/round1-question-bank.json` 64문항, `data/concept-lessons.json` 26개념 단원, `data/round1-practice.json` 8실습. 기존 16개념 유지 + C17~C26(토큰/컨텍스트/역할/Temperature/Zero-shot/Few-shot/XML/모델선택/멀티모달/작업분해/RAG·Fine-tuning) 추가.
- **UI:** 기본 화면에 64문항·26개념 표시, 개념 진입 버튼을 강조하고 참고 링크를 아래로 이동, 개념 설명 본문까지 검색할 수 있도록 수정.
- **자동 QA:** GitHub Actions Mock Lab Quality Gate가 추가 개념 빌드에 대해 통과함. 이후 UI 변경 커밋도 해당 워크플로에서 재검사. 이 검사는 iPad 실기기 및 독립 전문가 감수를 의미하지 않음.
- **운영 반영 — 오류 해결:** Vercel API 호출에 `teamId`를 명시할 때 403이 발생한 것은 맞으나, 동일 플러그인에서 팀 ID를 생략해 기존 프로젝트에 배포하면 성공. 운영 결과는 2026-10-11 GitHub Actions 라이브 HTTP 검사 성공으로 확인했다.
- **선택적 자동 배포:** `.github/workflows/deploy-skhynix-quiz.yml`는 향후 완전 자동 CI 배포를 위한 워크플로이며 CI에 별도 인증이 필요하다. 이번 운영 배포는 Vercel 플러그인 자체 인증으로 이미 완료했으므로 **사용자가 별도 토큰을 지금 설정할 필요가 없다.** 비밀 토큰은 소스에 기록하지 않는다.
- **플러그인 배포:** 기존 계정이 정상 연결되어 있었으며 `teamId`를 생략하는 방식으로 운영 배포를 성공시켰다. 재연결은 요구하지 않는다.


---

# SK하이닉스 AI 해커톤 1차 학습 문제집

1차 AI 기초 지식·활용 역량을 준비하는 비공식 학습 사이트다. 현재 **64문항·AI 활용 실습 8개**를 제공한다. 실제 기출·공식 점수·합격선을 재현하는 자료가 아니다.

- 문제: 업무 상황과 요구 조건을 읽고 판단하는 4지선다, 사용자 제공 5지선다 4개, O/X 1개.
- 해설: 지문 분석, 개념, 정답 근거, 모든 보기의 이유, 원자료 검증 순서, 함정, 출처 범위.
- 학습: 선택 즉시 채점, 선택 전 정답 공개, 해설 확인 기록, 오답 복습, 북마크, 학습자별 브라우저 기록.
- 연습시험: 답안·경과시간 저장과 재개, 제출 후 채점, 처음 혼자 푼 결과와 해설을 본 결과 구분.
- 실습: 서술형 6개와 자료 파일 선택·객관식 결과 제출 2개. 개인 ChatGPT에서 질문하고 6단계 과정·질문/답변을 직접 기록한다.
- 기록: 학습자별 JSON 내보내기·가져오기. 외부 AI 호출·유료 API 설정 없이 이용한다.

## 실행과 검증

```sh
npm test
python3 -m http.server 8794 --directory dist
```

빌드는 외부 의존성 없이 실행한다. 문항 구조·중복·소수점 보존·JavaScript 구문을 검사하고 독립 Python 계산을 수행한다. CI는 같은 구조·계산 검사와 보존된 이전 API 소스 구문 검사를 한다.

## 소스와 자료

- `src/index.html`: 학습 화면 및 브라우저 저장 로직
- `data/round1-question-bank.json`: 현재 64문항
- `data/round1-practice.json`: 현재 8개 실습 및 독립 창작 자료
- `data/learning-links.json`: 참고 링크
- `reports/`: 구조·수치·브라우저 검증 기록, 출처 범위, 개편 장부
- `snapshots/`, `data/*.b64`: 이전 90문항·12과제·AISCORE 관련 자료 보존
- `WORK_HANDOFF_1차_PROGRAMMERS_SKHYNIX.md`: 통합 작업 지시서

이전 90문항 전체를 새로 완성한 상태는 아니다. 1차 범위와 해설 품질을 기준으로 현재 은행을 구성했다. 이전 코딩·API 설정 등 범위 밖 문항은 현재 화면에서 제외했다. 기존 원본과 초기 분류표를 보존했다.

첨부된 원본 PDF 4개는 학습 개념 참고 자료로 읽었다. PDF의 체크된 보기를 정답 근거로 사용하지 않았다. 원본 PDF·유료 사이트 자료를 복제해 공개하지 않는다. 사용자 제공 5개 예시는 사진 검증 문항 1개 교체와 나머지 4개 추가로 반영했다.

## 배포

Vercel 프로젝트 `skhynix-ai-hackathon-quiz`. `vercel.json`은 빌드 출력 `dist`를 정적 사이트로 배포한다. 미리보기의 실제 브라우저 조작을 확인한 뒤 같은 결과물을 운영으로 승격한다. 현재 UI는 이전 서버리스 API를 호출하지 않는다.

실제 iPad Safari 실기기 및 독립 전문가 검수는 수행하지 않았다. 검증 기록에서 자동 검사·작성자 검토·브라우저 조작을 구분한다.

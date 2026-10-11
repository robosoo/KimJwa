# 2026-10-11 추가 배포 현황

- **GitHub 최신:** 64문항 / 개념 공부 26단원 / 실습 8개. C17–C26 신규 단원을 `data/concept-lessons.json`에 반영했다.
- **실행형 독립 HTML:** `release/index.html` (문항·해설·개념 데이터를 파일 안에 포함). 실제 사용 시 공개된 정적 호스팅에 올리거나, 파일을 지원하는 브라우저 환경에서 연다.
- **GitHub Actions 검증:** 64문항·26단원·8실습 구조 검사 및 별도 Python 수치 검산 33개 통과. 이는 사람의 의미 검수 또는 iPad Safari 실기기 검증을 대체하지 않는다.
- **Vercel 운영 사이트:** 마지막으로 확인한 production은 44문항 커밋 `dc6b0695`에 고정. 64문항 preview는 `7563bc4e` 커밋으로 READY 기록이 있으나 production 자동 반영 안 됨. 현재 Vercel 앱 배포/승격 403 (기존 `ctpmfd42hf-8757` 스코프 권한). 연결 계정 권한 회복 후 preview/production 재배포가 필요하다.
- **GitHub Pages 대체 경로:** `.github/workflows/hackathon-pages.yml`를 추가했으나 최초 실행은 Pages 비활성으로 Configure Pages 실패. GitHub 저장소 Settings → Pages → Build and deployment → Source: GitHub Actions를 선택한 후 Actions에서 `Publish AI Hackathon Study Site` 재실행 필요.
- **새로 만든 결과의 완료 판단:** 소스 저장·정적 빌드·자동 검증 완료, Vercel 운영 업데이트 및 GitHub Pages 공개 주소와 iPad 실사용 확인은 미완료.

## 브라우저에서 바로 열 수 있는 임시 공개 미리보기

- URL(개발·가변 캐시): https://raw.githack.com/robosoo/KimJwa/main/skhynix-ai-study/index.html
- URL(2026-10-11 HTML 고정본): https://rawcdn.githack.com/robosoo/KimJwa/17880932fbead058592f1eaba8b4c2e53d578470/skhynix-ai-study/index.html
- 원본 GitHub: `skhynix-ai-study/index.html` (한 파일에 객관식 64문항, 개념 26단원, AI 활용 실습 8개 포함).
- raw.githack은 외부 HTML 중계 서비스이므로 GitHub에 파일이 있다고 링크의 실제 iPad Safari 작동을 보증하지 않는다. 안정적인 운영 주소는 원래 Vercel 도메인으로 유지할 계획.
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
- **운영 미반영:** Vercel 연결의 소유 팀 `team_ZwgEf7FsZRct85EGrHTd1KHe`에 대한 배포 API 권한 403. GitHub의 최신 커밋을 `https://skhynix-ai-hackathon-quiz.vercel.app/` 에 배포했다는 증거 없음. **운영 완료 선언 금지.**
- **대체 배포 경로:** `.github/workflows/deploy-skhynix-quiz.yml` 는 커밋마다 `npm test` 후 Vercel 배포를 시도하나 현재 `VERCEL_TOKEN` GitHub Actions secret이 없어 배포 단계가 건너뛰어진 것을 확인. 사용자가 GitHub 저장소 Settings → Secrets and variables → Actions에 프로젝트 팀 권한이 있는 `VERCEL_TOKEN`을 등록하고 Actions의 `Deploy SK hynix AI Study Site` 워크플로를 재실행하면 실제 배포 및 운영 버전(64/26) 검사를 수행함. **토큰 자체는 소스에 입력하지 않는다.**
- **인증 대안:** Vercel 플러그인을 해당 프로젝트 소유 팀에 재연결해 쓰기 권한을 복구한 후 직접 배포.


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

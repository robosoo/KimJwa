# SK하이닉스 AI 해커톤 2차 학습센터

개발자 구한모·조정석이 설명한 평가 의도를 읽고, 참가자의 실제 경험과 비교하며, 스스로 선택·검증·설명하는 연습을 하는 비공식 학습 서비스입니다.

- 운영: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- 브랜치: `skhynix-round2-unified-20261025`
- 범위: `skhynix-round2/`만 변경. 기존 1차 자료와 main은 보존합니다.

## 네 메뉴와 학습 순서

| 메뉴 | 학습 내용 |
|---|---|
| 시작하기 | 비개발자 입문 → 세 평가축 → 실제 수행 → 가상 자료 하나 → 자기 설명·확인문제 |
| 후기·근거 | 39개 읽기 항목, 검색·유형 필터, 출처 메타데이터, 글 목차, 관련 글, 읽음 저장 |
| 전략·실습 | 출처가 연결된 5개 전략 비교, 8단계 풀이 따라하기, 8개 실습, 문제 이해·선택과 기각·검증 증거·취약점 설명, 가상 실무자 문답, 준비물·리허설 점검, 4시간·3분 타이머 |
| 이해도 확인 | 12문항 즉시 판정·해설, 관련 글, 진행률, 오답 필터·문항별 다시 풀기 |

개발자 인터뷰는 평가 목적을 이해하는 핵심 자료입니다. 특정 행동의 배점, 허용 도구, 실제 시험시간은 별도 주최측 안내가 필요합니다. 7월 Cofathon의 관찰을 10월 SK하이닉스 규정으로 바꾸지 않습니다.

## 소스와 보존 정책

| 파일 | 역할 |
|---|---|
| index.html / app.js | 단일 화면 구조, hash routing, 로컬 진행 상태 |
| style.css / brand.css | 반응형 읽기 체계 / 공식 색상을 참고한 주황·검정 테마 |
| content.json | 기존 Production의 사용자 제공 영상 정리 15단원, 접근 전략, 출처 목록 |
| luka-deep.json | 기존 Luka 심화 복기 11단원 |
| cofa-chapters.json / portal-content.json | 원본 14+5장, 비교 3개, 실습 8개, 문항 12개. 원본 바이트 유지 |
| beginner-guide.json | 비개발자 입문·필수 용어·제품/사이트 기능 비교·7단계 수행·학습 순서·준비 점검·추가 문서 분석 |
| learning-guide.json | 사용자 분석을 반영한 평가 관점 핵심 교재, 추가 비교 2개, 실습 판단 해설 |
| source-manifest.json | 기존 19개 원문과 별도 SK 공식 안내·디자인 참고, 신뢰 유형, 날짜 미확인 표시 |
| vercel.json / cofa-*.html | 기존 공유 주소의 호환 이동 |
| backup-manifest.json / reports/production-audit.md | 시작 시 운영본 파일 8개 SHA·크기 및 차이 |

39개 읽기 항목은 영상 15단원 + Luka 심화 1항목 + 핵심 14장 + 추가 5장 + 핵심 교재 1장 + 입문 안내 1장 + 공유된 준비 문서 분석 1장 + 인과·정합성 심층 교재 1장입니다. 같은 출처의 핵심·심화 글을 삭제하지 않고 함께 보존했습니다. 원문 URL은 중복 출처를 묶어 별도 관리합니다.

원본 복구 커밋: `6d17af15cdbd11e5cbaef5bb9ca9522fe422cfd6`. 이 커밋의 원본 8개 파일로 시작 시 Production을 재현할 수 있습니다. 브랜치의 이전 UI는 `archive/pre-ui-20261025/`에도 보존했습니다.

## 실행과 검증

서버·AI 백엔드 없이 정적 파일로 동작합니다. 검색 외 작성칸이나 가짜 AI 채팅은 없습니다.

```sh
python -m http.server 8765 --directory skhynix-round2
node skhynix-round2/tests/validate.mjs
python skhynix-round2/tests/data-audit.py
python skhynix-round2/tests/check-links.py
```

브라우저 자동화가 설치된 환경의 재현용 runner:

```sh
BASE_URL=http://127.0.0.1:8765 node skhynix-round2/tests/browser-smoke.mjs
```

2026-10-25 실제 검증은 Cloud Chrome의 Playwright locator API로 수행했습니다. 로컬 Chromium 다운로드는 실패했으므로 standalone runner를 실행해 통과했다고 주장하지 않습니다. `reports/browser-checks.json`에 실제 실행 범위를 기록합니다. 테스트용 `tests/viewport.html`은 Preview에서만 사용하며 Production 패키지에서 제외합니다.

읽음·퀴즈·4시간 타이머는 해당 브라우저 localStorage에 저장됩니다. 기기 간 동기화는 제공하지 않습니다. 읽기 시간은 추정치입니다.

## 운영

1. 소스·데이터·수치 테스트를 실행합니다.
2. Preview에서 390/844/768/1024/1440 CSS px의 네 메뉴를 클릭하고 화면을 검토합니다.
3. 실제 통과한 runtime 파일만 Production에 포함합니다. archive·테스트·보고서는 공개 배포 대상에서 제외합니다.
4. Production READY, 공식 도메인, 파일 SHA와 이전 공유 주소를 확인합니다.
5. HANDOFF와 배포·검증 보고서를 갱신하고 브랜치에 커밋합니다.

색상 참고: https://www.skhynix.com/company/UI-FR-CP0402/ 및 https://skhynix-hackathon.com/ai-2026 . 로고·배경 이미지·상표 자산은 복제하지 않았습니다.

## 비개발자 학습과 준비물

공식 Cofa 사이트의 비개발자 환경을 확인했다. 자료 확인→업무 결과 작성→원자료 대조→자기 설명을 기본 학습 경로로 둔다. 개발자용 IDE나 FDE 키트 구축을 필수로 두지 않는다. 참가자 이름은 출처에 남기고 제목은 학습할 행동을 중심으로 표시한다.

공유된 인터뷰 MVP 문서 13개를 읽고 제공 샘플 검사 스크립트를 실행했다. 입력의 유효성 검사 통과는 실제 제품의 인수 검증이 아니다. 준비 문서 틀은 있으나 실행 가능한 범용 키트와 전체 리허설은 확인하지 못했다. PREPARATION_PLAN.md와 reports/interview-kit-audit.json을 참고한다.

현재 활성 퀴즈는 인물·도구·평가축 암기형을 제외한 가상 사례 12개다. 원본 portal-content.drill은 보존한다. 전체 문항의 의미가 바뀌어 최초 갱신 때 퀴즈 답안·오답 목록만 초기화하며 읽음·풀이 기록은 유지한다.

## 제3자 학습 품질 고도화

QUALITY_STANDARD.md는 10개 검토 관점과 100점 평가 기준, 95점 목표, 중대 오류 배포 차단 조건을 정의한다. 실제 담당자 패널은 미실시이며 가상 경로 검사를 실제 사람의 평점으로 보고하지 않는다.

learning-path.json은 완성 예시→원자료 대조→8단계 선택·개별 피드백→새 숫자 적용→보고 해설로 이어진다. 선택형 확인과 실제 AI/업무 실행은 다르다. deep-analysis.json은 대담 15개 주제의 주장·논리·필요 개념·반례·적용 범위와 원문 정정을 제공한다. 읽음 표시는 숙련도가 아니다.

최근 사용자 제공 리서치 보고서는 reports/research-intake-20261025.json에 검토 결과를 남겼다. 대회 전체 철학과 2차 출제 형식, 과거 경험과 현재 규정, URL 숫자와 기사 발행일을 구분했다. 6일 계획은 권장안이며 문의 발송·리허설 완료·독립 패널 평가는 수행한 것으로 표시하지 않는다.

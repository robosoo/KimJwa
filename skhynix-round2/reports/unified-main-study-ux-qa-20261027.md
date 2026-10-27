# 2026-10-27 · 2차 학습센터 단일 메인 통합 검증

## 변경 목적
사용자가 메인 화면과 별도 `official-guide.html` 페이지를 오갈 필요 없이, 하나의 메인 학습 화면에서 시험 순서를 먼저 보고 스크롤하여 상세 지침을 읽도록 통합한다. 별도 자료실·실습·이해도 확인 메뉴는 보존한다.

## 적용된 변경 사항
- `index.html`: 기존 6단계 시험 전체 흐름 지도 아래에 공식 PDF 기반 상세 진행 6개 섹션과 참고 A·B를 직접 포함.
- `index.html`: '전체 흐름과 상세 가이드 읽기' 별도 페이지 CTA 삭제.
- `index.html`: 중복 객관식·반복 체크박스·정보를 숨기는 아코디언 없이 스크롤 가능한 상세 교재. Codex·Browser·제출 버튼 의미를 익히는 3개 실습 유지.
- `index.html`: 메인/상세 요소를 같은 메인 랜드마크에 배치하고 세부 CSS를 #examGuide로 범위 제한해 다른 탭의 기존 스타일 보호.
- `app.js`: '시작하기'일 때 통합 #examGuide를 보여주고, 후기·근거/전략·실습/이해도 확인일 때는 기존 동적 #dynamicContent만 표시. 앱 원본 학습 데이터와 기존 메뉴 기능은 삭제하지 않음.
- `official-guide.html`: 과거 공유 URL이 남아 있어도 새 메인으로 돌아갈 수 있게 얇은 리디렉션 페이지로 전환. #step1~#step7 링크를 ?guide=stepN#start로 안내.
- `app.js`: 리디렉션된 링크의 jump 값을 SPA URL 동기화 전에 읽고, 해당 섹션으로 스크롤.

## 검사 및 발견한 수정 사항
- 메인 HTML에 main 랜드마크 하나, 6단계 지도 하나, 상세 6개, 도구/장애 참고 2개 존재.
- ID 중복 0개, 원래 4개 메뉴용 PC/모바일 버튼 총 8개 보존.
- 새로운 가이드의 반복 퀴즈 0개, 체크박스 0개, 접기·펼치기 0개.
- 기존 원본 자료 JSON·app.js 및 관련 서버/API 파일은 배포에 계속 포함.
- GitHub app.js 전체 및 새 실습용 inline JS 구문 검사 통과.
- 모의 DOM 이벤트: 시작 화면→자료실→실습→이해도 확인→시작 화면 토글 정상.
- 모의 DOM 이벤트: Codex 버튼, Browser 4173/0.0.0.0/ 연결, 제출 미리보기/확정 후 역방향 차단 동작 통과.
- 레거시 딥링크 query를 syncUrl() 이전에 확보하도록 수정.

## 배포 검증
- Preview: dpl_zMxJjY6iyrZsvhwLvumC3BZLxLcP READY
- Production: dpl_FFHux7REK4WgspbjcuULszBmzPiS READY
- 도메인: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- 31개 런타임 파일의 preview/production UID 100% 동일.
- 기존 /api/tutor.mjs 파일 보존. API 키가 설정되거나 실제 GPT 대화가 작동한다고 주장하지 않음.

## 미검증 사항
- 원격 웹페이지를 실제로 fetch하는 Vercel 도구의 read_protection_bypass 단계에서 HTTP 403이 발생. 외부 UI 원격 확인 못함.
- iPad Safari, 실제 모바일 화면의 높이·배치, 실제 클릭과 접근성 사용성은 실물 브라우저에서 별도 확인 필요.
- 공식 PDF와 실제 시험 UI가 변경되면 시험 화면/주최 측 공지 우선.

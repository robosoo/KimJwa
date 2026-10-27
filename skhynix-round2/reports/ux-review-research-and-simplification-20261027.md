# 2026-10-27 · SK하이닉스 2차 학습센터 UX/학습 설계 감사 및 실제 수정

## 목표
개발·AI 초보자가 2026-10-31 시험을 앞두고 '무엇을 먼저 할지'를 판단할 수 있도록 정보/기능 밀도를 낮추고, 불필요한 지식 확인 문제를 제거하되 실제 시험 대응에 직접 필요한 조작 학습은 남긴다.

## 검토 범위와 제한
- 직접 검토한 GitHub 파일: skhynix-round2/index.html, app.js, style.css, official-guide.html, 공식 가이드 단계별 JS/CSS, ai-tutor.html, vercel.json.
- 실제 Safari/iPad 화면·접근성·행동 관찰 및 사용자 조사: 수행하지 않음.
- 접근 권한 때문에 실제 프로덕션 웹페이지 본문을 원격으로 불러오지 못해, 코드 감사+모의 DOM 이벤트 검사+Vercel 배포 파일 검증에 근거함.
- '연구가 객관식의 삭제 자체를 지지한다'고 단정하지 않음. 회상 연습 효과가 있으므로 개별 문제 풀이 기능은 메인 학습센터의 별도 메뉴로 유지한다.

## 참고 논문·가이드

1. **Richard E. Mayer (2017), Using multimedia for e-learning**, Journal of Computer Assisted Learning. DOI: https://doi.org/10.1111/jcal.12197  
   불필요한 부가 내용을 줄이는 coherence, 필수 정보 표시 signaling, 자기 속도로 나누는 segmenting 원칙.
2. **Sweller & Chandler (1994), Why Some Material Is Difficult to Learn**, Cognition and Instruction. DOI: https://doi.org/10.1207/s1532690xci1203_1  
   여러 요소가 동시에 상호작용할 때 내재적·외재적 인지부하를 구분하고 불필요한 부담을 줄여야 한다는 연구.
3. **Ward & Sweller (1990), Structuring Effective Worked Examples**, Cognition and Instruction. DOI: https://doi.org/10.1207/s1532690xci0701_1  
   일부 조건에서 문제를 바로 풀게 하는 것보다 설명된 예제를 먼저 제시하는 편이 효과적일 수 있음.
4. **Roediger & Karpicke (2006), Test-Enhanced Learning**, Psychological Science. DOI: https://doi.org/10.1111/j.1467-9280.2006.01693.x  
   적절한 인출/회상 연습은 장기 기억 유지에 도움. 따라서 '모든 문제를 없애야 한다'는 결론은 틀림. 가이드의 중복 문제만 정리하고 메인 사이트의 전용 실습/이해도 기능은 보존.
5. **Nielsen Norman Group, Progressive Disclosure**: https://www.nngroup.com/articles/progressive-disclosure/  
   초심자에게 핵심 행동만 먼저 보이고 상세 기능은 필요할 때 표시. 3단계 이상 깊은 중첩 탐색은 주의.
6. **Nielsen Norman Group, 10 Usability Heuristics**: https://www.nngroup.com/articles/ten-usability-heuristics/  
   상태 가시성, 인지하기 쉬운 선택지, 통제와 복구, 오류 예방, 미니멀 디자인.

## 발견한 문제 → 실제 반영
| 발견 | 근거와 사용성 위험 | 수정 |
|---|---|---|
| 홈의 공식 가이드 진입 링크 7개+GPT 튜터 링크 1개 | 어디서 시작해야 하는지 선택 비용 증가 | 기본 진입 1개로 정리. GPT 튜터는 기존 별도 파일 보존하되 API 설정 전 홈 CTA 노출 제거 |
| 공식 가이드가 7개 전체 단원을 하나의 긴 스크롤로 제시 | 학습 위치·다음 행동 식별이 어려움 | 한 번에 한 단계만 표시하고 단계 선택기/이전·다음 버튼/진행률 표시 |
| 본문 내용을 반복하는 객관식·상황 판단 문제의 다중 배치 | 개념 이해 전 문제를 풀어야 하는 부담 증가 | 공식 가이드 화면의 반복 문제 UI 전부 제거. 원래 메인 '전략·실습', '이해도 확인'은 보존 |
| 단계별 반복 체크리스트 | 확인 행동의 실제 가치를 넘어 과도한 클릭 요구 | 새 공식 가이드에서 체크박스 전부 제거. 중요한 종료 체크 순서는 글로 요약 |
| 비슷한 설명을 반복하는 다수의 펼침 영역 | 불필요한 스크롤/중첩 깊이 | 핵심 흐름만 기본 노출, 정확한 가림·장애·FAQ 등 상세 조건만 18개 펼침 항목으로 보존 |
| 실제 작업을 배우는 동작까지 퀴즈와 섞임 | 조작 개념과 암기 검사 혼동 | Codex 순서, Browser 포트/바인딩, 제출 확인 3가지 실습만 남김 |
| 제출 확정 버튼 시연의 불가역성 | 실수로 바로 확정된다고 배울 가능성 | 미리보기 → 확정 직전 점검 → 최종 확정의 분리된 모의 흐름 |
| 운영상 잠긴 GPT 튜터의 홈 홍보 | 사용자가 실행 가능한 것으로 오해 | 잠겨 있는 상태의 홈 CTA만 숨김. 파일/API와 기존 서비스는 삭제하지 않음 |

## 측정 (GitHub HTML의 정적 카운트)
- 편집 직전 최신 공식 가이드: HTML 69,666 문자, HTML 버튼 47개, 체크박스 15개, details 33개.
- 개편 가이드: HTML 약 22,000 문자, 버튼 9개, 체크박스 0개, details 18개.
- 참고: 더 이른 버전(100,134 문자)에는 버튼 152개/체크박스 78개가 있었으므로 동일 기준의 전후 비교에서 혼용하지 않는다.
- 홈 상단 공식 가이드 CTA: 8개 링크에서 1개 링크로 축소.
- 세부 공식 출처와 예외 조건을 필요한 만큼 남겼고, 구버전은 Git 커밋 이력으로 복원 가능.

## 실제 테스트
- 내부 JavaScript 구문 파싱 PASS.
- 모의 DOM 이벤트 하네스: #step4 직접 링크 진입 → #step5 다음 이동 → URL hash/진행률/현재 섹션 상태 갱신 PASS.
- Codex 시작 버튼, Browser의 4173/0.0.0.0/ 경로 정상 시뮬레이션 PASS.
- 제출 미리보기 진입과 이전 단계 복구 PASS. 제출 확정 이전 재확인 단계를 코드에 추가.
- 보안: 실제 API 호출이나 시험 문제·응시 기록 전송 없이 시뮬레이션만 실행.
- iPad/Safari 실사용·렌더링·접근성 테스트는 미완료.

## Vercel 배포 검증
- Preview: dpl_2kqr4EdrQtbVG4tKtgUZgm1pLaN1 — READY.
- Production: dpl_CYGaMJFLAzpSpcH765qbBQjzzUVB — READY.
- 운영 도메인 alias: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- Production과 Preview의 31개 실제 소스 파일 UID 동일. 기존 app.js·학습 자료 JSON·GPT 학습 튜터 HTML·API 함수 보존.

## 다음에 사람이 직접 점검할 핵심 3가지
1. iPad Safari 가로/세로에서 단계 선택→이전/다음→상단 스크롤이 자연스러운지.
2. 공식 7단계 중 하나로 링크한 친구가 바로 해당 단계 내용만 보는지.
3. 시험 전에 사용자에게 'README→업무 담당자→Codex→Browser 검증→저장→제출→서술형 직접 작성'을 기억하기 충분한지.

## 추가 회귀 수정 및 최종 운영 배포
- 모의 제출 순서에서 비활성 '뒤로 가기' 이벤트가 프로그램 방식으로 호출돼도 되돌아가지 않도록 핸들러에서도 차단.
- 제출 미리보기 → 확정 직전 확인 → 최종 확정 → 질문 준비 → 답변 개념 → 완료, 최종 확정 이후 뒤로 불가.
- 후속 Preview dpl_Bhi1cUxrU4aXhUADoK52LMcGgJsX READY.
- 최종 Production dpl_GEbdXNo5a3ryFRSVT3LH3giEMP7u READY, 운영 도메인 alias 재확인.
- Preview/Production 소스 31개 파일 UID 전부 일치, api/tutor.mjs 포함.

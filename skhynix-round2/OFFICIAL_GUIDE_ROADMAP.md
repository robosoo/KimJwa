# SK하이닉스 AI 해커톤 2차 예선 공식 PDF 기반 학습 페이지 운영 계획

기준: 2026-10-27 / 저장소 robosoo/KimJwa / 브랜치 skhynix-round2-unified-20261025 / 변경 범위 skhynix-round2/
출처 A: 사용자 제공 1_시험_필수확인사항_브리프.pdf, 1페이지.
출처 B: 사용자 제공 3_사전_체험_및_응시환경_상세_가이드.pdf, 5페이지.
규칙: [공식], [계산 예시], [학습 권장], [미공개]를 구별. 실제 출제 문제 및 채점 배점은 미공개.

## 전역 원칙
- 기존 4개 메뉴, 사용자 학습 기록, 기존 자료 JSON과 공유 URL 보존.
- 단계별 진입: /official-guide.html#step1 ... #step7. 긴 문장을 한 번에 외우지 않도록 초보자 설명→공식 화면 버튼→실수 사례→자가진단→체크리스트.
- 휴대폰/iPad/PC 반응형, 링크 접근성, 저장된 체크리스트, PDF 페이지 위치 표시.
- 실제 Cofa Probe UI라고 주장하지 않으며, 실제 시험 문제·답안·개인 데이터의 외부 전송을 유도하지 않음.

## 단계별 계획과 확인 상태
1. 시간·진행 흐름 — GitHub 반영 및 Vercel Production READY 확인 (2026-10-27): 09:40 접속 권장, 10~14시, 과제 180분, 질문 준비 약 5분과 최대 10분 화면 예시, 6문항×5분, 재접속·타이머, 14시 종료, 4문항 퀴즈, 체크리스트. 출처 A p1, B pp1-5.
2. 감독·환경·사전체험 — 상세 교재 구현·정적 검증 완료, 배포 최종 검증 별도:  모니터 1대, PC/휴대폰 카메라, 설치 QR vs 연결 QR, 권장 스마트폰 사양, 충전과 네트워크, 개인정보 가림 범위, 안경·신분증 촬영 절차, 실제 체험 1회 15분, 감독 알림. 출처 A p1, B pp1-2.
3. 웹 IDE·Codex — 상세 교재 구현 및 Vercel Production READY 확인: README, 파일 탐색기·에디터·터미널·Browser·메신저 구조, codex 실행, /status, /model, 승인 대기/실행/완료, Cofa Helper와 현업 담당자 구분, CPU/RAM. 출처 B pp2-3.
4. GitHub·Skill·MCP — 상세 교재·검증·Production 반영 완료 (2026-10-27): 공개된 GitHub·코드·자료·Skill/MCP/Plugin 조건부 사용, Clone 허용 vs Push 금지, 개인 업로드 불가, 별도 AI 연결·외부 전송·Computer Use·우회 금지, 상황별 허용/금지 판단 연습. 출처 A p1, B pp3,5.
5. 구현·검증·저장 — 상세 학습·시뮬레이터 구현 및 Production READY 확인: README와 담당자 질의, 파일 작성·자동 저장·충돌 복구, 서버 포트/0.0.0.0, 내장 Browser의 버튼·입력·이동 실제 동작 검증, 명령 종료 시 서버 중단. 출처 B pp2-3.
6. 제출·후속 서술형 — 상세 교재·7화면 모의 시뮬레이터·Production READY (2026-10-27): 미리보기와 최종 확정 차이, 확정 후 파일 잠금, 질문 준비 대기, 본인 직접 작성 6문항×5분, AI/복붙 금지, 앞 문항 이동 금지, 완료 ID/시각/파일 수 확인. B p4 조작 안내 '5개'는 실제 6개와 구별. 출처 A p1, B pp3-5.
7. 장애·종합 리허설 — 상세 교재·상황 판단 20문항·Production READY (2026-10-27): 영역 다시 불러오기, 세션 재접속, 웹캠/화면공유/휴대폰 복구, 문제 신고, 타이머 지속, 부정행위 확정과 경고 구분, 180분 모의 수행 시나리오. 출처 A p1, B pp3-5.

## 검증 조건
- 단계별 출처 페이지 확인 및 공식/추론 레이블 검수.
- 해시 경로 직접 접속, 모바일 390px/iPad 768·1024px/PC 1440px, 버튼·문항·로컬 저장 검사.
- 기존 네 메뉴 정상과 이전 URL 보존.
- GitHub 커밋만으로 Vercel 반영 완료 주장 금지. Preview/Production 배포 READY 및 실제 사이트 접속을 별도 확인.
- 시험은 2026-10-31. 일찍 준비할 수 있도록 모듈별 순차 배포.

## 2026-10-27 1차 적용 결과
- Vercel 운영 도메인: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- 새 페이지: https://skhynix-ai-hackathon-round2-lab.vercel.app/official-guide.html
- Vercel Production deployment: dpl_BLdp7gAm2BTpHKd3hNY7xygpNxeC, READY. 공식 도메인 alias 포함.
- 기존 runtime 18개 파일과 official-guide.html 1개(총 19개) 배포 파일 목록 확인. 기존 4개 메뉴 HTML 보존.
- 사이트 1단계에는 설명·시간표·예외 5개·4문항 자기진단·5개 체크박스·7단계 목차가 있음.
- 검증 한계: 외부 HTTP/실제 브라우저 페이지 열람은 연결/권한 제한으로 실패. Vercel API의 READY·alias·파일 목록과 GitHub 소스만 확인. 실물 Safari·iPad, 버튼 클릭 검사는 미실시.
- 나머지 2~7단계는 현재 설명 카드와 목차만 있으며 상세 강의 및 상호작용은 미구현.

### 2026-10-27 단계 2 QA
- 학습 본문/순서도/신분증 종류 선택/객관식 8문항/체크리스트 10항목 개발.
- 실행 JS 두 블록 구문 검사 통과, 신분증 3종·단계 7개·보안 제한 정적 검사 통과.
- 문제 발견 및 수정: 모바일 표 가독성, 체크리스트 복원 코드, 홈 진입문구 및 링크.
- 자체 검토 기록: reports/official-guide-stage2-self-review-20261027.md. 실제 외부 전문가 패널이나 실물 브라우저 QA를 실시했다고 주장하지 않는다.

### 2026-10-27 2단계 Production 반영 결과
- Vercel Production dpl_DtYDghuS9iWsW5BtSDaVKDq3BC6V = READY.
- alias https://skhynix-ai-hackathon-round2-lab.vercel.app/ 부여 확인.
- runtime 총 19개 파일: 기존 18개 + official-guide.html 1개. 원본 네 메뉴 파일 유지.
- 2단계 본문 및 8문항·10체크박스·신분증 3종·QR 안내 포함. 동일 페이지 #step2.
- 실제 운영 URL의 HTML 요청은 Vercel connector의 read_protection_bypass 403과 웹 뷰어 접근 제한으로 테스트하지 못함. READY·alias·파일 목록은 Vercel API 검증.

### 2026-10-27 3단계 적용·배포
- 범위: IDE 6영역, 지원 창 3종, codex/status/model, 승인·거절, 실행 상태 판별, Browser·터미널 기본, 이해도 10문항·체크리스트 10개.
- 자체 검토: 승인 강요 위험, 문의 대상 혼동, 모델 명령 표기 차이, 모의실습/실제 시스템 구분, 모바일 컴포넌트 점검 후 수정.
- QA 기록: reports/official-guide-stage3-self-review-20261027.md.
- Vercel Preview dpl_5khhvXxZ5WWnY8FET787sMg8dJ2m = READY.
- Vercel Production dpl_J3hupVaVWv4xW5rSdM3HU1iDKxwt = READY / 운영 도메인 alias 확인.
- Production 파일 트리 19개, 기존 앱 및 데이터 파일 포함 확인.
- 미검증: 실제 사이트 브라우저 클릭 테스트, iPad/Safari 터치 및 반응형 실사용. 배포 READY만으로 이들의 성공을 주장하지 않음.


### 2026-10-27 4단계 완료 내역
- GitHub / Skill / MCP 개념 비교 및 선택형 상세 설명, Clone vs Push 비교, 공식 허용·금지·미확인 표, 모의 Codex 프롬프트 3종.
- 규정 판단 연습 12문항(조건부 가능 4 / 금지 7 / 미확인 1), 각 문항의 출처 페이지와 해설, 학습 체크리스트 10개.
- 자체 QA: 좁은 화면의 비교 카드 배치 수정, 키보드 포커스/disabled 표시 강화, 공개 도구가 모두 자동 허용된다는 오해 방지.
- QA 보고서: reports/official-guide-stage4-self-review-20261027.md.
- Vercel Preview dpl_2BBc7yMYM8CTJ6LUiuS38GHtfNQf: READY.
- Vercel Production dpl_GZ3s3HEmjyHpiU9VsGd3qJGrwUZt: READY, 공식 alias 적용.
- Preview/Production 파일 21개 UID 전체 일치. 기존 정적 앱 및 학습 데이터 파일 포함.
- 실제 공개 URL 내용 조회는 도구 접근 제한으로 실패; 실제 클릭·Safari 검증 완료를 주장하지 않음.

### 2026-10-27 5단계 구현·배포
- 상세 교재: 서버·Browser 실제 PORT/URL/0.0.0.0 연결, 모의 실패와 복구, 입력·버튼 테스트, 저장/충돌/삭제 상태, 증거 구분.
- 연습: 시뮬레이션 2개, 상황판단 12문항, 체크리스트 12개(브라우저 로컬 저장).
- 자체 피드백·수정: 3000 고정 오해, 삭제파일 자동복원 암시, 불필요 이벤트 중첩 제거, 작은 화면 1열 카드.
- QA 보고서: reports/official-guide-stage5-self-review-20261027.md.
- Vercel Preview dpl_4vLSSPoiRpqv1tXPpXUngLnyM1ma READY; Production dpl_GCe8GdWaj5czUNrYYY4V3PQ3h39o READY. 23개 파일의 Preview/Production UID 일치.
- 실제 공개 HTML URL을 웹 도구에서 확인하려 했으나 접근 불가. 실물 터치/브라우저 상호작용은 미검증.

## 2026-10-27 · 6단계 완료
- 제출물 미리보기와 확정 불가역, 질문 준비 대기·재시도, 6문항 5분 규정, AI/붙여넣기 금지, 14:00 전체 종료.
- 7개 모의 화면, 선택형 설명 12문항, 준비 체크리스트 15개.
- 모의 DOM에서 미리보기 취소, 확정, 질문 준비, 문항 이동/만료, 답안 삭제, 답변 붙여넣기 금지·6문항 종료·초기화 검증.
- QA: reports/official-guide-stage6-self-review-20261027.md.
- Preview dpl_7LoEBavGjPreq4A1pePowM7XeQC6, Production dpl_AojYGXUBAF5jP7H3yGsVVyeRnQfA — 모두 READY. 동일 25개 파일.
- 실제 브라우저 Safari/iPad 클릭 검증 미완료.

## 2026-10-27 · 7단계 완료 / 전체 개편 완료
- 장애 대응: 화면 일부 멈춤, 웹캠·전체화면 공유·휴대폰 재연결, Codex 승인·실행 상태, 터미널·Browser·저장 충돌, 질문 전송 오류, 접속 복구, CPU/RAM·OOM.
- 감독 규칙: 직접 확인된 제한 위반과 추가 사실관계 확인 사례 구별, 경고 자체가 탈락 확정이 아님.
- 체험: 장애 대응 12문항, 감독 판단 8문항, 가상 신고 유형 5종, 가정 시작 시각별 시간 계획 3종, 최종 리허설 7구간, 체크리스트 15개.
- 자체 피드백: 알림·비활성·시간 보상·구도 안내·서술형 신고·전체 새로고침 전 저장 확인 FAQ 추가.
- QA: reports/official-guide-stage7-self-review-20261027.md.
- Preview dpl_8DNpCeCcMgmwkzKHyPtd2VgtrCt3 / Production dpl_2pKriSfLLddphUzBkrgAuuvWShU4, 둘 다 READY, 동일 27개 파일.
- 공식 alias: https://skhynix-ai-hackathon-round2-lab.vercel.app/official-guide.html
- 원본 웹 IDE 학습센터 홈 메뉴 4개와 1~7단계 학습 콘텐츠 소스 보존.
- 기술적 한계: web.open에서 실제 공개 HTML URL 접근 불가; 실물 iPad/Safari·스크린리더·크로스 브라우저 테스트는 아직 안 됨.

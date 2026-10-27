# GPT API 학습 튜터 구현·자체 검증 · 2026-10-27

## 목표
SK하이닉스 AI 해커톤 2차 예선 시험 **전** 학습센터의 7단계 개념과 서술형 연습을 GPT로 질문·피드백받을 수 있게 확장. 실제 시험 중 AI 사용 금지 원칙을 유지.

## 작업 내역
- `ai-tutor.html`: 7개 주제 선택, 예시 질문, 채팅·답변, 새 대화, 접속 코드, 상태 확인, 설정 방법.
- `api/tutor.mjs`: Vercel Node.js Functions에서 OpenAI Responses API 호출. 서버 환경 `OPENAI_API_KEY`, `TUTOR_ACCESS_CODE` 모두 설정되어야 호출 가능. 모델은 OPENAI_MODEL (기본 gpt-5-mini).
- 서버 보호: HTTPS 동일 출처 검사, 접속 코드 일정시간 비교, 질문 1800자, 요청 12000자, 문맥 최대 8턴, 응답 650 출력 토큰, 타임아웃 23초.
- 호출 요청에 `store:false`; 서버에서 내용/키 로그 없음; 탭에서 대화 임시 보관, localStorage 저장 없음.
- `vercel.json`: API function maxDuration 30초.
- 기존 `index.html` 및 `official-guide.html`에 튜터 링크 추가.
- 사용자가 학습 자료/시험 과제 원문/신분증을 붙여 넣지 않도록 경고.

## 자체 피드백 → 실제 반영
1. 키가 없는데 GPT가 작동하는 척할 위험 → GET 상태 확인 후 미설정이면 질문 전송 비활성화 및 setup 안내.
2. 유료 API를 무단 공개 호출할 위험 → OPENAI_API_KEY 외에 TUTOR_ACCESS_CODE 필수. 잘못된 코드와 다른 Origin 차단.
3. 초보자가 ChatGPT 구독만으로 API 사용이 가능하다고 오해할 위험 → 별도 OpenAI API 키·사용량/결제 안내.
4. 시험 중 외부 AI 사용 유도 위험 → 시험 전 연습만 허용, 실제 시험 서술형 AI·복붙 사용 금지를 반복 경고.
5. '탭에서 채팅이 사라진다'를 OpenAI에게 내용이 전혀 전달되지 않는다는 말로 오해할 위험 → 질문은 Vercel 서버를 거쳐 OpenAI API로 보내진다는 개인정보 안내 수정.
6. 동시 개발의 7단계 파일을 이전 배포로 덮어쓸 위험 → 최신 Production 소스와 변경된 GitHub 파일을 병합해 31개 파일로 배포하고 미리보기/운영 해시 동일성 검사.

## QA/배포 증거
- 프론트 script syntax 검사 PASS, 서버 script syntax (ESM import/export 제외한 내용) 검사 PASS.
- 기존 7개 단계 앵커, 실행·서술형 실습, 홈의 기존 4개 메뉴 및 새 튜터 링크 존재 확인.
- Vercel Preview: dpl_7D6E98Nc7jawRG4ajTxxKpHLxHxf, READY.
- Vercel Production: dpl_7t8mGKKzcv6zjBfE7g8xhL7QoJLs, READY.
- Production alias: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- Preview/Production 소스 31개 파일별 UID 전부 일치.
- Vercel 빌드 트리에 src/api/tutor.mjs + out/api/tutor 컴파일된 함수 존재.
- Vercel 프로젝트에서 환경 변수 목록: 0개. 지금 GPT 응답은 **미활성화**. OPENAI_API_KEY와 TUTOR_ACCESS_CODE 설정 후 재배포 필요.

## 한계 / 향후 수락 테스트
- 실제 OpenAI API를 호출한 성공 로그 없음: 계정 API 키 미설정.
- GET/POST를 HTTP로 직접 확인하려 했으나 Vercel connector의 read_protection_bypass 403(별도 프로젝트 연결 권한)으로 불가.
- 클릭·iPad Safari UX, 실제 인증 성공 경로, 비용·속도, 모델 지원 계정 연결은 미검증.
- 이 상태를 GPT 연동 '활성화 완료' 또는 사용 가능하다고 주장하지 않음.
- 공개로 다수에게 제공할 경우 별도 사용자 인증, 서버 측 분산 rate limit, 비용 상한, 보안 감사를 추가해야 함.

# 2026 SK하이닉스 2차 예선 학습용 GPT API 튜터

기준일: 2026-10-27. 이것은 시험 **전** 공부용 기능이며, 실제 SK하이닉스 시험 도구가 아님.

## 현재 구성
- 화면: `/ai-tutor.html`
- Vercel 서버 API: `/api/tutor` (`api/tutor.mjs`), OpenAI Responses API 이용
- 메인 학습센터 `/`와 `/official-guide.html`에서 튜터로 진입 가능
- 설정 전 상태: 튜터 UI가 연결 안내를 보여주고 질문 전송을 차단함. **가상 답변을 실제 GPT 답변처럼 꾸미지 않음.**
- 현재 Vercel 프로젝트에는 등록된 서버 환경 변수가 없어 GPT API 실응답은 활성화되지 않음.

## 서버 환경 변수 (프로젝트 관리자만 설정)
Vercel > `skhynix-ai-hackathon-round2-lab` > Settings > Environment Variables > Production:
- `OPENAI_API_KEY`: 개인/프로젝트 OpenAI API 키. GitHub·HTML·브라우저·이 대화에 입력하지 말고 Vercel 서버 환경에 직접 저장.
- `TUTOR_ACCESS_CODE`: 충분히 긴 무작위 문자로 구성한 학습실 접속 코드. 브라우저 화면에서 접근용 코드로만 사용; localStorage에 저장하지 않음.
- `OPENAI_MODEL` (선택): 미설정 시 `gpt-5-mini`. 실제 API 계정이 지원하는 모델을 선택.
설정 후 Production 재배포. ChatGPT 웹 구독과 OpenAI API 사용량은 별도 청구될 수 있음.

## 보안·비용
1. 모든 모델 요청은 서버 함수에서만 발생하며 OPENAI_API_KEY를 HTTP 응답·GitHub·브라우저로 전달하지 않음.
2. 두 서버 환경 변수가 모두 없는 경우(또는 하나만 있는 경우) 외부 API 요청 자체를 수행하지 않음.
3. `TUTOR_ACCESS_CODE`를 서버에서 timing-safe 비교, 브라우저 탭에만 일시 보관, 서버 로그에 기재하지 않음.
4. 요청: 동일 출처 HTTPS Origin, JSON, 최대 12k 입력 바이트(문자 검사 포함), 질문 1,800자, 과거 대화 최대 8개, GPT 출력 최대 650토큰.
5. `store:false` 설정으로 OpenAI Responses API 저장 요청을 비활성화하고, 클라이언트 대화는 탭 메모리에서만 유지. API 제공사 자체 서비스 운영·안전 로그에 대한 별도 정책까지 없앤다는 뜻은 아님.
6. 실제 시험 문제·응시 ID·개인자료·과제 결과물을 입력하지 않도록 경고.
7. 호출당 비용·실패 재시도에 따라 과금 가능. OpenAI 프로젝트 예산·사용량 알림을 별도로 설정. 공유 학습실 접속 코드가 유출되면 서버 환경 변수에서 변경.
8. 공유된 암호 기반 게이트는 임시 학습용 접근 제어이며, 다중 사용자 공개 서비스용 인증·분산 rate-limit을 대체하지 않음. 제3자에게 널리 공개하지 말고 본인 연습용으로 사용.

## 수락 테스트
- [ ] `/ai-tutor.html` UI 로드와 기존 1~6단계 가이드 보존.
- [ ] `GET /api/tutor` 응답의 `available=false` (키 미설정 시).
- [ ] 환경변수 없을 때 POST가 503을 반환하고 AI 요금 발생하지 않음.
- [ ] Vercel Functions 빌드 및 `/api/tutor` 라우트 생성 확인.
- [ ] 환경변수 설정한 후 올바른 코드로 실제 GPT 응답 확인, 잘못된 코드로 거부 확인.
- [ ] 모델 답변은 공식 규정과 가상 예시를 구분하고 실제 시험에서 사용 금지를 명시.
- [ ] 모바일 Safari/iPad 입력, 가상 프롬프트, 대화 초기화·단계 변경 테스트.
- [ ] HTTP 실패, GPT 한도 초과, 출력 없음 등 오류 메시지 테스트.

## 미실시 테스트 표기
환경변수가 없어도 배포·파일·라우트는 검증 가능하지만 실제 OpenAI API 응답과 사용자 인증 성공 경로, 실물 기기 UX는 서버 키·브라우저 테스트 없이는 '검증 완료'로 보고하면 안 됨.

## 레퍼런스
Vercel Node Functions: https://vercel.com/docs/functions/runtimes/node-js
OpenAI API 키 안전관리: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
OpenAI Responses API: https://platform.openai.com/docs/api-reference/responses

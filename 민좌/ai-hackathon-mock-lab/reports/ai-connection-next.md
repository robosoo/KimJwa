# 사이트 내부 AI 연결 · 요구사항과 현재 상태

두 사람 각자의 기록을 유지하며 사이트 안에서 자료를 선택하고 AI와 대화하는 실전 연습이 목표다. 특정 ChatGPT 유료 계정 연결 방식을 반드시 고수하는 것은 아니다. 사용자는 만들어진 사이트 주소를 먼저 요청해 현재 미리보기를 전달했다.

2026-10-11 OpenAI 공식 문서 확인:
- ChatGPT 구독과 일반 OpenAI API 결제는 별도: https://help.openai.com/en/articles/9039756-managing-billing-for-chatgpt-and-the-api-platform
- 지원 앱의 ChatGPT 구독 사용 기능은 존재: https://help.openai.com/en/articles/20001542-using-your-chatgpt-plan-in-other-apps-and-sites
- OSS/로컬 앱의 구독 연동은 동적 등록·PKCE·로컬 HTTP 콜백 등 필요: https://developers.openai.com/siwc/token-sharing-open-source/sign-in
- 원격 호스팅 제공은 별도 관심 신청 경로 안내: https://developers.openai.com/siwc/token-sharing-open-source
- 개인 VM 방식도 최초 로컬 OAuth와 보호된 자격 증명 전달이 필요: https://developers.openai.com/siwc/token-sharing-open-source/self-hosted-vms

따라서 Vercel 정적 사이트에 로그인 링크만 추가해 실제 구독 호출이 된다고 표시하지 않는다. 현재 사이트에는 해당 권한·인증 구현이 없다.

다음 구현 기준: 서버 쪽 AI 프록시, 사용자별 대화와 선택 자료, 답변 스트리밍, 제출/과정 기록, 사용량 제한, 공급자 인증 준비. 인증 수단이 확보되기 전에는 모의 응답을 실제 AI 답변처럼 표시하지 않는다. 기존 lib/provider.js와 api 소스는 이전 기능 참고용으로 보존했지만 현재 정적 배포에서 사용하지 않는다. 일반 API 또는 이미 허용된 공급자 연결을 선택할 수 있으나 별도 인증과 비용을 실제 확인해야 한다.

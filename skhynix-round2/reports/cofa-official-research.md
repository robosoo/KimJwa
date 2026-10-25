# Cofa 공식 사이트 전수 메뉴 조사와 적용

조사: 2026-10-25. 공개 메뉴와 페이지를 읽고 홈페이지의 개발자/비개발자 탭 및 비개발자 예시 결과 버튼을 실제 브라우저에서 조작했다. 로그인·문의 제출·실제 평가 응시는 수행하지 않았다.

| 메뉴/경로 | 확인 내용 | 하이닉스 비개발자 준비에 적용 |
|---|---|---|
| /ko | 세 역량, 직군별 예, 응시 환경 탭 | 기본 안내를 비개발자의 문서·표·업무 판단으로 전환 |
| /ko/about | KRAFTON AI Frontier의 현업 질문에서 시작 | 별도 계열 법인이라고 단정하지 않고 평가 목적의 근거로 연결 |
| /ko/probe | 업무 수행·기록·사후 Q&A·리포트·감독 조건 | 요구-결정-검증-설명의 연결. 배점·시간·모델·수집 범위는 개별 안내로 구분 |
| /ko/usecase#case-krafton | 내부 채용 활용 | 활용 사례와 효과에 대한 독립 검증을 구분 |
| /ko/usecase#case-cofathon | 해커톤 적용 | 지난 행사의 규칙을 하이닉스에 이식하지 않음 |
| /ko/sourcer | 인재 발굴·근거 검토·연락 준비, 별도 체험 링크 | Probe 공개 연습 링크와 혼동하지 않음 |
| /ko/contents?collection=news | SK하이닉스·Cofathon 등 소식 링크 | 공식 행사 안내의 연결 경로. Blog는 준비 중 |
| /ko/contact | 기업 도입 문의 | 개인 연습/응시 등록으로 안내하지 않음. 제출하지 않음 |

## 실제 조작으로 본 비개발자 화면

홈페이지 ‘비개발자’ 탭이 /brochure-v2/workspace-desktop-mock.html을 표시했다. README 문서, AI 작업 예시, 업무 포털, Cofa Helper와 업무 담당자 대화를 확인했다. ‘결과_요약.md’ 버튼을 눌렀을 때 업무 포털 예시가 나타났다. 자료·시간·모델·응답은 안내용이며 실제 과제와 평가 조건은 포함하지 않는다고 화면에 명시됐다. 이를 실전 모의시험이나 실제 AI 호출로 보고하지 않는다.

개발자용 /brochure-v2/workspace-mock.html에는 파일·코드·터미널·담당자/AI 도움 예시가 있다. 사용자에게 비개발자도 해당 도구를 반드시 써야 한다고 안내하지 않는다.

## 판단과 적용 경계

공식 제품 설명은 평가 목적의 우선 근거다. 평가의 객관성·특정 전략의 점수 효과·개별 시험 규정이 모두 입증됐다는 뜻은 아니다. 비개발자의 Technique를 코드 작성 여부로 치환하지 않고 결과의 정확성·형식·업무 사용 가능성으로 학습 해석했다. HW 경험은 단위·허용 범위·위험·검증에 활용하되 반도체 공정 지식은 별도 확인하도록 안내한다.

현재 학습센터에 AI·파일 편집기·Bash·업무 서비스·자동 작업 수집·공식 채점은 없다. 읽기·가상 자료·고정 문답·퀴즈·로컬 상태·타이머가 실제 기능이다. 공개 사이트에서 누구나 실제 과제를 풀고 공식 평가를 받는 무료 Probe 연습 환경은 확인하지 못했다. Sourcer 체험이나 로그인 콘솔의 존재만으로 Probe 무료 연습을 주장하지 않는다.

## 원문

- https://www.getcofa.com/ko
- https://www.getcofa.com/ko/about
- https://www.getcofa.com/ko/probe
- https://www.getcofa.com/ko/usecase
- https://www.getcofa.com/ko/sourcer
- https://www.getcofa.com/ko/contents?collection=news
- https://www.getcofa.com/ko/contact

콘텐츠 원본 4개 JSON은 수정하지 않았다. 입문 안내·직군별 해석은 beginner-guide.json과 app.js에 분리했다.

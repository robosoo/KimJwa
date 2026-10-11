# 공식 문서와 학습 설계 · 2026-10-11

Google·OpenAI·Claude 공식 공개 문서에서 개념을 확인했다. 회사·정책·수치·요청 예시는 독립 작성했다. Programmers 공개 소개는 확인했으나 이번 세션의 체험 진입은 로그인으로 전환돼 사용자 제공 예시 및 기존 유형 색인을 문장 기준으로 사용했다. 공개 문항 길이를 새로 실측했다고 주장하지 않는다.

## 확인한 공식 문서

- [Google · 구조화된 출력](https://ai.google.dev/gemini-api/docs/structured-output)
- [Google · 프롬프트 설계 전략](https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=ko)
- [Claude · Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [OpenAI · Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)
- [Google · 검색 근거 연결](https://ai.google.dev/gemini-api/docs/google-search)
- [Google · 문서 이해](https://ai.google.dev/gemini-api/docs/document-processing)
- [Claude · Citations](https://platform.claude.com/docs/en/build-with-claude/citations)
- [Claude · Reduce hallucinations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [OpenAI · Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [Google · 이미지 이해](https://ai.google.dev/gemini-api/docs/image-understanding)
- [OpenAI · Safety best practices](https://developers.openai.com/api/docs/guides/safety-best-practices)
- [Google · 머신러닝 소개](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google · 언어 모델 소개](https://developers.google.com/machine-learning/resources/intro-llms)
- [OpenAI · Retrieval](https://developers.openai.com/api/docs/guides/retrieval)
- [Google · 분류 지표](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall)
- [Google · 일반화와 과적합](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting)
- [OpenAI · Terms of Use](https://openai.com/policies/terms-of-use/)
- [Turnitin · AI Writing Report 사용 안내](https://guides.turnitin.com/hc/en-us/articles/22774058814093-Using-the-AI-Writing-Report)

## 신규 20문항 설계

| 문항 | 유형·상황 | 학습 영역 | 개념 출처 |
|---|---|---|---|
| R1-045 | 반품 분류표의 제출 전 점검 | 결과 검증 | Google · 구조화된 출력 |
| R1-046 | 부서에 요청할 보고서 조건 | 프롬프트 | Google · 프롬프트 설계 전략 |
| R1-047 | 회의 기록의 결정 상태 | 프롬프트 | Claude · Prompting best practices |
| R1-048 | 이메일 번역과 실제 발송 | 책임 있는 활용 | OpenAI · Prompt engineering |
| R1-049 | 제출 공지의 날짜가 다른 경우 | 결과 검증 | Google · 검색 근거 연결 |
| R1-050 | 빠진 보고서로 전체 실적 요약하기 | 프롬프트 | Claude · Prompting best practices |
| R1-051 | 수치에 붙은 각주의 의미 | 결과 검증 | Google · 문서 이해 |
| R1-052 | 계약 요약에 붙은 인용의 점검 | 결과 검증 | Claude · Citations |
| R1-053 | 대조표의 미확인 항목 | 프롬프트 | Claude · Reduce hallucinations |
| R1-054 | 좋은 프롬프트를 고르는 기준 | 결과 검증 | OpenAI · Evaluation best practices |
| R1-055 | 정책을 적용하는 시점 정하기 | 프롬프트 | Google · 프롬프트 설계 전략 |
| R1-056 | 글자만 추출한 시험 성적서 | AI 기초 | Google · 문서 이해 |
| R1-057 | 매출 그래프의 막대 길이 | 결과 검증 | Google · 이미지 이해 |
| R1-058 | 재고 규칙과 예시가 충돌할 때 | 프롬프트 | Claude · Prompting best practices |
| R1-059 | 자유로운 아이디어와 기준 충족 구분 | 프롬프트 | Google · 프롬프트 설계 전략 |
| R1-060 | 보고서 초안과 최종 승인 | 책임 있는 활용 | OpenAI · Safety best practices |
| R1-061 | 후속 질문 전에 표 오류 위치 찾기 | 프롬프트 | OpenAI · Prompt engineering |
| R1-062 | 반복 실행에서 기록할 조건 | 결과 검증 | OpenAI · Evaluation best practices |
| R1-063 | 표에 적힌 외부 정보의 상태 | AI 기초 | Claude · Reduce hallucinations |
| R1-064 | 잘못된 답을 고치는 평가 자료 | 결과 검증 | OpenAI · Safety best practices |

## 개념 공부 단원

- C01 AI는 예측할 때와 만들 때 하는 일이 다르다 — 관련 R1-001, R1-009
- C02 그럴듯한 답과 확인된 사실은 다르다 — 관련 R1-002, R1-028, R1-031, R1-032, R1-041, R1-063
- C03 좋은 프롬프트는 업무의 기준부터 정한다 — 관련 R1-004, R1-039, R1-046, R1-055, R1-059
- C04 예시는 규칙과 맞아야 도움이 된다 — 관련 R1-005, R1-047, R1-058, R1-064
- C05 검색한 자료도 적용 범위를 확인해야 한다 — 관련 R1-006, R1-007, R1-029, R1-030, R1-049
- C06 인용은 주장과 실제로 맞아야 한다 — 관련 R1-018, R1-035, R1-043, R1-052, R1-053
- C07 사진·PDF는 읽는 단계부터 검증한다 — 관련 R1-003, R1-051, R1-056, R1-057, R1-061
- C08 데이터 정리는 무엇을 세는지부터 — 관련 R1-022, R1-023, R1-024, R1-025, R1-026, R1-027, R1-045, R1-055, R1-059
- C09 정확도·정밀도·재현율을 구분한다 — 관련 R1-010, R1-011, R1-021
- C10 차이가 보인다고 원인이 확정되지는 않는다 — 관련 R1-012, R1-033, R1-039
- C11 평가에 쓴 자료가 실제 업무를 대표하는가 — 관련 R1-013, R1-037, R1-040, R1-054, R1-064
- C12 AI 평가자의 점수도 검증 대상이다 — 관련 R1-021, R1-028, R1-038, R1-054, R1-062
- C13 입력 자료와 최종 결과에 남는 책임 — 관련 R1-014, R1-015, R1-016, R1-036, R1-042, R1-060
- C14 공정한 판단에는 목적과 추가 근거가 필요하다 — 관련 R1-017, R1-044
- C15 읽어도 되는 자료와 실행 권한은 다르다 — 관련 R1-019, R1-020, R1-034, R1-048
- C16 읽기 쉬운 요약과 검토 가능한 표 — 관련 R1-008, R1-035, R1-043, R1-045, R1-047, R1-050, R1-052, R1-053, R1-056

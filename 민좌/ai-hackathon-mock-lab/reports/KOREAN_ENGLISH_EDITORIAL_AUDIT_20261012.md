# AI 해커톤 학습 사이트 한국어·영어 용어·메타문구 편집 품질 검토
날짜: 2026-10-12
검토 범위: `data/round1-question-bank.json` 64문항 / `data/concept-lessons.json` 26항목 / `data/four-p-guide.json` / `data/round1-practice.json` 8과제 / `src/index.html` 및 공개 배포 구조.
방식: 정규식 기반 정량 조사 + 표본별 의미 검토 + 용어 사전 비교 + GitHub Actions 자동 회귀 테스트.
주의: 외부 교정 전문 인력이 감수한 결과가 아니며 자동 맞춤법 검사의 완전한 대체재가 아니다.

## 요약: 확인된 문제와 수정 현황

| 중요도 | 진단 | 확인 수량 | 처리 |
|---|---|---:|---|
| P0 | 출처 설명·내부 QA/제작 메모가 정답 해설에 그대로 노출 | 객관식 64/64 | 학습 화면에서 제거. GitHub 편집용 원본은 보존, 공개 번들에 편집 이력 주입하지 않음 |
| P0 | 64개 `analysis`가 마지막 문제 문단 + `reasoning`을 기계적으로 붙여 해설 중복 | 객관식 64/64 | 표시 중복 제거. 출제 취지와 풀이 근거의 개별 데이터는 삭제하지 않음 |
| P1 | 표준 영어 기술명과 한국어 제목의 불일치 | 위키 26항목 | 공식/관용 원어를 제목에 명시, 한국어 설명 유지 |
| P1 | '이 문제는 ~를 묻는 문제'라는 출제자 메타 화법 | 7문항: R1-004,007,021,031,042,044,056 | 실제 상황·판단 조건을 설명하는 문장으로 변경 |
| P1 | 위키 공식 출처마다 '독립 작성/독립 창작' 반복 | 위키 26항목의 각 개별 출처 소개 | 개별 반복문구는 학습 UI에서 제거하고 글로벌 비공식 고지와 링크를 유지 |
| P1 | '행 기준 명목 비율', 본문 속 'wafer 비율' 같은 부자연스러운 표현 | AI 실습 R1-01 | '전체 로그행을 분모로 한 관측 비율', '웨이퍼 기준 불량률'로 수정 |
| P2 | '실제 기출이 아님'을 문항마다 반복하는 과도한 출처 고지 | 원래 문항별 `sourceScope` | 화면에서는 한 번의 전역 안내로 통합. 세부 출처 책임 범위는 소스에서 추적 가능 |
| P2 | 표제어는 영어, 문장 속 보통명사는 한국어를 무분별하게 치환할 위험 | 26항목 전반 | 전면 영문화 지양. 정의/공식/코드키는 원어, 설명은 읽히는 한국어로 유지 |

## 영어 유지 원칙

1. 고유한 AI 기술 개념, 모델 파라미터, API, 메서드명은 영어 원어 사용. 가능한 첫 등장에서 한국어 의미를 설명한다.
2. 이미 널리 쓰이는 '프롬프트', '데이터', '학습', '검증', '분모'는 굳이 영어로 바꾸지 않는다.
3. `wafer_id`, `defect_flag`, `TP`, `FN`, `RAG`, `JSON`, `XML` 같은 입력 필드·약어·코드 키와 수식은 절대로 임의 번역하거나 개명하지 않는다.
4. 단어 뜻이 아닌 기술적 측정식이 중요할 때 영어 + 한국어 쌍으로 제시한다(Accuracy/정확도, Precision/정밀도, Recall/재현율).
5. 반도체 응용은 4P/실습에 놓고, AI 개념 위키의 일반 예시는 산업에 종속시키지 않는다.
6. 영어를 기계적으로 남발하지 않는다: 'Problem Definition'이라는 딱딱한 표제어보다 본문 '문제 정의'가 읽기 쉽고 정확할 때가 있다.

| 표준 개념 | 권장 제목·표현 | 과도한 한글화/혼용을 피해야 할 점 |
|---|---|---|
| Hallucination | Hallucination(환각) | '지어낸 답'도 맥락상 가능, '착각'만으로 축약하면 의미가 흐려짐 |
| Prompt Engineering | Prompt Engineering(프롬프트 설계) | 단순 '명령어 작성'과 혼동 금지 |
| Context Window | Context Window(문맥 범위) | 저장된 장기 기억과 동일하다고 설명하지 않음 |
| Token / Tokenizer | Token·Tokenizer | '토큰=글자 1개'라고 단정 금지 |
| Accuracy / Precision / Recall | Accuracy·Precision·Recall(정확도·정밀도·재현율) | 세 지표의 분모 혼동 금지 |
| RAG | RAG(Retrieval-Augmented Generation) | 검색 = 항상 진실이라는 주장 금지 |
| Fine-tuning | Fine-tuning(미세조정) | 검색/RAG와 섞어 최신 지식 자동 반영이라 주장 금지 |
| Few-shot / Zero-shot | Few-shot·Zero-shot Prompting | Fine-tuning/재학습과 구분 |
| Structured Output | Structured Output(JSON 등) | 유효한 JSON과 사실인 값은 별개 |
| Prompt Injection | Prompt Injection(프롬프트 인젝션) | 외부 문서 텍스트를 지시 권한으로 승격 금지 |
| LLM-as-a-Judge | LLM-as-a-Judge | 평가 AI의 점수는 정답이라고 간주하지 않음 |
| Data Cleaning | Data Cleaning(데이터 정제) | 결측=0, 무조건 중복 삭제 같은 잘못된 단순화 금지 |
| Bias·Fairness | Bias·Fairness(편향·공정성) | 문맥 없는 '무조건 동일' 평가는 피함 |
| Task Decomposition | Task Decomposition(작업 분해) | 단계 추가 자체가 정확도 향상을 보장하지 않음 |

공식 확인 참고:
- Google ML 교육 Accuracy·Precision·Recall: https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall
- Google ML Glossary: https://developers.google.com/machine-learning/glossary
- Google ML Overfitting: https://developers.google.com/machine-learning/crash-course/overfitting/overfitting
- Anthropic Prompting Best Practices / XML: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

## 구체적인 표현 교정 사례
- 전: `행 기준 명목 비율은 200/8,000=2.5%다.`
  후: `전체 로그행을 분모로 한 관측 비율은 200/8,000=2.5%다.`
  이유: '명목 비율'은 특정 지표의 정식 명칭으로 오해 가능하다.
- 전: `이 문제는 직접 환불액을 계산하는 문제가 아니라...` (R1-004)
  후: `이번 판단의 핵심은 환불액 자체를 산출하는 것이 아니라...`
  이유: 실제 업무 상황에서 필요한 선택으로 초점 이동.
- 전: `이 문항은 보고서를 제출한 사람에게 ... 묻는다.` (R1-042)
  후: `AI로 작성한 보고서라도 제출 전 사실관계를 확인할 업무상 책임이 사라지지는 않는다.`
  이유: 출제자의 설명이 아닌 현실 업무 의사결정 문장.
- 전: `전수 논리 검토 완료 · 별도 전문가 검토 없음` (모든 문제의 정답 하단)
  후: 학습 화면에서 숨기고 출처 링크는 개념 참고용으로 표시.
  이유: 검토 현황은 학습자의 답안 해설이 아니라 콘텐츠 관리 메타데이터다.
- 전: `AI 위키: 독립 작성한 설명과 사례입니다...` (반복)
  후: 위키 원리·설명·공식 출처만 노출, 학습 자료의 비공식 범위는 상단에서 명시.

## 메타문구 구분 기준

- **학습 화면에서 제거**: 콘텐츠 생성·제작 방법, 내부 QAStatus, '독립 전문가 감수 미실시' 같은 검토 절차, 각 항목의 반복적 기출 아님 공지, '이 문제는 ~ 문제다' 같은 불필요한 해설자 화법.
- **원본 편집 소스에 유지**: 정답 계산 근거, 공식 문서 링크 및 적용 범위, 제작/검수 일지, 비공식 지문임을 밝히는 원본 provenance. 향후 감사를 위해 기록할 가치가 있다.
- **학습 화면에도 유지**: 전역 차원의 비공식 학습 자료 안내, 공개 외부 AI에 실데이터/기밀 업로드 금지, 자동 채점의 한계, 결측·조건·적용 범위의 불확실성. 이는 핵심적인 책임 있는 AI 활용 안내이지 제거 대상의 'AI 티'가 아니다.

## 자동 회귀 검사
`npm test`가 `scripts/build.mjs` → `scripts/check-editorial.mjs` → `scripts/check-numbers.py`를 실행한다.
- 위키 26개 표제어의 표준 영어명, 작동 원리, 한계 항목 확인.
- 문제 64개 원문 단락과 표시 데이터 일치, 불필요한 자기지칭 문장 재등장 방지.
- 공개 번들에서 `QAStatus`, `sourceScope`, `editorialReview`, 중복 해설 표시 제거 여부 확인.
- 문제 개수·ID·전반의 수치 검산 및 브라우저 회귀 검사는 기존 게이트로 확인.

## 남은 품질 과제
- 전체 64문항과 8실습의 문장 단위 전문 교열, 맥락별 전문 영어 명칭(예: SI/PI, Wafer, Power Good) 선택은 계속 개선 가능하며 금번 정량 검토가 완벽한 문장 교열을 증명하지는 않는다.
- 기계적 금칙어 검사는 진짜 번역의 정확성, 무의식적 확신 과장, 지문의 도메인 사실성까지 보증할 수 없다.
- 실제 iPad 기기 입력과 스크린리더는 별도 실기기 검증이 필요하다.

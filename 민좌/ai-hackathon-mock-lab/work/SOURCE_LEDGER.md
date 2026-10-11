# 2026-10-11 v2 추가 자료

64문항·16개 개념 단원의 공식 문서 목록과 신규 20문항 유형은 [OFFICIAL_DOCS_STUDY_V2.md](OFFICIAL_DOCS_STUDY_V2.md)에 기록했다. 사용자 제공 5개 예시의 본래 출제처·실제 기출 여부는 확인하지 않았으며 문장·보기의 스타일 기준으로 사용한다.

# SOURCE LEDGER: 2026 SK hynix AI Hackathon First Qualifier
Recorded 2026-10-11. Scope: 1차, AI 기초 지식 및 활용 역량. Avoid making up actual exam questions, scoring weights or time limits.

## Authority and primary URLs
1. SK hynix official event: https://skhynix-hackathon.com/ai-2026
   - Official first qualifier is Oct 17-18 (one day), AI foundational knowledge and AI utilization; second qualifier is AI Native Oct 31-Nov 1.
2. SK hynix Talent Hub story: https://talent.skhynix.com/hub/ko/company/story/237
   - Evaluates problem identification, AI utilization, verification; candidates of any major/career.
3. Programmers assessment official: https://www.programmers.co.kr/ai-assessment
   - Broad product splits AI fundamentals, AI proficiency, AI mastery. Scope this project to first two, not developer mastery tests.
4. Programmers candidate preview: https://programmers.co.kr/ai-assessment/preview
   - User-provided examples (10) come from this candidate experience; they are not verified as SK hynix real test questions.
5. Programmers official 4P/article: https://community.programmers.co.kr/post/14224
   - Plan, Prompt, Probe, Project / knowledge, real-world task solving, process and result verification; GENERAL ASSESSMENT, NOT CONFIRMED OFFICIAL SCORING FOR THIS HACKATHON.

## Public optional inspiration (never use unauthorized paid content)
- Incruit free AI assessment: https://event.incruit.com/selfcheck/aiexam/
- AISCORE CJ prep: https://aiscore.kr/prep/cj-olivenetworks (independent CJ practice; not SK official)
- AISCORE public 20-min/free first task: https://aiscore.kr/exam?company=cj-olivenetworks
- CareerXP: https://careerxp.work/ax/assessment (independent paid practice; borrow no proprietary question text)
- AI Practice: https://www.getaipractice.site/ (prompting and verification)
- JobCannon: https://jobcannon.io/ko/tests/ai-literacy
- KPC: https://license.kpc.or.kr/html/aiexam/
- Complete saved public link inventory: data/learning-links.json

## User-shared Programmers candidate example Q1-Q10 (source: current chat; taxonomy, not reprinting original text)
1. Text generation probabilistic output vs image generation functionality.
2. Summarization modality vs image generation modality.
3. Manufacturing missing defect data filled with zeros distorts statistics; correct prompt requirements: role, justified imputation, table.
4. Culturally fair job interview question prompts; evaluate role performance, not demographics.
5. Student essay use consent vs synthetic data: consider quality/privacy limitations rather than declaring synthesis automatically legal.
6. Generated commercial logo output still needs trademark/copyright similarity checks (O/X).
7. Legacy on-prem vs latest AWS RAG retrieved manuals require revision/effective-date metadata and source reconciliation.
8. External API metadata 'credit_level' versus internal prompt 'security_rating' missing mapping leads wrong security classification; fail closed.
9. Explainable prediction workflow for operational failures, feature contribution versus causal effect.
10. Pseudonymized personal data and GDPR: pseudonymization does not by itself remove rights and governance duties (O/X).

## User-uploaded PDF documents from THIS conversation
Original PDFs are NOT committed in GitHub. Reattach them in a newly started Work conversation to inspect visual figures. Paths below are ephemeral, not durable outside this chat.
1. AI Prompt Utilization level 2, approx 40 questions: /mnt/data/cbd9e5ea0789b0b8161eac95fbc228aade6a7f3f.pdf
   Topics: LLM, few-shot, over/underfitting, copyright, synthetic data, prompting, image models.
2. AI Business Utilization level 1 part 1, 33+ visible questions: /mnt/data/94752a7cff1eb0669fd3c30d683e9bd578881be1.pdf
   Topics: RAG, RL, Transformer, Claude Skills, prompt injection, financial and business judgments.
3. AI Business Utilization level 2, approx 37 questions: /mnt/data/1e9a543011b0faeeb5f2b001a95dd24c9ba51d4d.pdf
   Topics: LLM behavior, copyright, hallucination, business analytics and use judgments.
4. AI Prompt Utilization level 1 part 1, approx 35 questions: /mnt/data/d6f56d71de435e59c4409d89037996b5e9165ab6.pdf
   Topics: agents vs chatbots, model evaluation, data pre-processing, RAG, bias/security.
PDFs are long exam pages compressed to a single page each; extracted text contains garbled symbols and may omit embedded figures. DO NOT invent unreadable text or answers.

## Evidence hierarchy
Official event announcement > Official Programmers generic assessment description > User-shared preview examples > Public independently produced practice > Author inference.
Do not confuse operator/supplier, case preview, and an official SK hynix past paper. Individual question sources must substantiate the concept and conclusion, not merely share a keyword. Distinguish verified evidence / inference / unknown.

## Relevant correction cases
- RAG lowers hallucination risk but NEVER guarantees 0 hallucination.
- Synthetic data does NOT automatically waive privacy/IP/legal duties and may not preserve target distribution.
- Imputation is not universally the recent-average rule; it depends on missingness and domain requirements.
- SHAP/LIME describes model attribution, NOT the proven root cause.
- Low-temperature is not a guarantee of truth.

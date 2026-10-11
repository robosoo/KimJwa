# SK hynix First Qualifier — Programmers-style Exam Specification
Version 2026-10-11, authority: user instruction. This supersedes the old mixed 1차/2차/Claude Docs exam plan.

## Non-negotiable scope
- ONLY 2026 SK hynix AI Hackathon first qualifier (Oct 17–18), AI basic knowledge + AI utilization.
- Programmers *candidate AI assessment preview* is the main STYLE and question-format reference, not the coding test track.
- NOT an AI developer hiring test, NOT second qualifier AI Native, NOT GitHub/API/JSON schema implementation trivia.
- Candidate audience is non-developers including engineers/operations/business applicants; no programming needed to reason and answer.

## Strict retention filter
- If a question asks to recall a software library/function, coding syntax, API HTTP status, proprietary feature option, architectural trivia, or advanced implementation optimization without real-world decision value: exclude from live first-round bank and archive it.
- If the underlying learning objective is important but developer-centric, REWRITE it into a scenario with everyday work context, a particular failure, practical decisions, risk, and correct remedy.
- If a source question is ambiguous, unsupported, out of date, or impossible without a missing image/chart, EXCLUDE until repaired, NEVER guess.
- Important beginner AI ideas MUST remain if they help decisions: generative vs analytical AI, hallucinations, prompt roles/constraints, source checking, RAG, data quality, class imbalance, privacy, copyright, tool limits, fair practices.
- Do not force 90 live questions. Archive 90 originals and count how many are kept, rewritten, or removed. Quality outweighs count.

## Programmers-inspired question shape
- 120–400 Korean characters of realistically coherent situation; occasionally longer where meaningful. Role can be factory quality, HR, finance, procurement, logistics, compliance, education or customer service; semiconductors are one of several contexts.
- 1 unambiguous question: what is the safest, most accurate, best next step or root cause?
- 4 equally plausible options; one defensibly best answer based on GIVEN evidence, optionally O/X judgment when suitable. No giveaways via length, absurd assertions, obvious '항상/무조건/전부' distractors, position patterns, or developer jargon.
- Wrong choices should tempt a reasonable candidate via 3 distinct misconceptions.
- Explanation AFTER answer: (A) correct answer; (B) situation-specific reasoning citing evidence; (C) core concept lesson as in a textbook; (D) why each other option fails; (E) checks a real worker should perform; (F) source/reference and certainty; (G) common trap; optional worked math.
- Avoid creating made-up numerical tables or claiming statistical significance without calculating; create deterministic answer keys and independent verification.
- Full reasoning must stand on its own without asking student to search externally to know the answer.

## Data schema recommended
Each live item should contain stable ID and provenance:
  id, skill, level(기초/응용/검증), workplace, scenario, question, choices[4], answerIndex(0-3),
  correctRationale, wrongReasons[4], conceptTitle, conceptLesson, verificationSteps[3+],
  pitfall, sourceUrls[], sourceType(official/vendor/example/derived),
  numericFixture(optional), independentCheck(optional), revision, qaStatus.
Do not invent a hidden answer by model confidence; every source should back the claim.
Keep stable IDs for migration and avoid corrupting saved wrong-answer histories.

## Suggested first-round skills distribution (TRAINING DESIGN ONLY, not actual exam weights)
- 25% foundations via realistic examples: generative/analytical, token uncertainty, limitations, supervised/unsupervised basics, AI safety.
- 30% selecting and improving prompts: context, role, explicit constraints, output format, few-shot, missing data requests.
- 30% verification and structured data: hallucination/source conflict/RAG date, duplicate IDs, unit mismatch, denominators, mismatch checks, leakage, causal inference vs correlation.
- 15% governance and trust: personally identifiable info, pseudonymization, fair hiring, copyright, manipulation/injection in reference docs.
Retain foundational AI knowledge; these are ONLY practice allocations, not official scoring.

## UI / study guide
- Homepage: label prominently as "SK하이닉스 1차 × 프로그래머스 유형 비공식 대비".
- Clear ONE first-round question bank; optionally "학습 모드" and "실전 모드". Do not mislabel 2차 AI Native as 1차.
- The most recent publicly accessible practice link directory stays near the TOP.
- iPad Safari: readable paragraph, generous selectable text, tap-friendly options, keyboard/scroll, resume without lost work.
- Answer immediately: explanation includes concept lesson, each of the three wrong options, practical checks, and sources.
- O/X, wrong-answer redo, score and weak-topic review; no fake official percentiles.
- Free ChatGPT login handoff: copy a question/prompt, open chatgpt.com, paste and get help; individual plan available. NOT equivalent to embedding a signed-in ChatGPT model in site; paid API only if explicitly funded and rate limited.
- Source links should open safely in new tabs. Data stays local unless user consents to external service.
- Prior 12 project-style tasks may be archived or recategorized as optional extras, NOT dominant "1차 문제 bank" tabs.

## Quality gates / acceptance tests
- Original 90 and 12 tasks are backed up in repo; new bank can have fewer than 90.
- Every live item includes readable realistic scenario, four nonduplicate choices, exactly one defensible answer, 3 unique wrong-option explanations, grounded concept lesson and verification steps.
- Automated normalized duplicate detection must NOT strip decimals (2.5% and 25% differ).
- Choice location should be reasonably balanced across full bank and avoid easily guessable patterns.
- All computed answers checked independently with code/spreadsheet and edge cases.
- Semantic/manual QA: sample/inspect EVERY live question, especially counterexamples.
- Actual mock browser smoke tests: learning mode, exam mode, immediate check, back/next, scoring, wrong-answer redo, restore, Safari narrow viewport; ensure buttons actually work.
- GitHub commit, README diff, QC report, build, preview URL, then production after passing checks. Explicitly distinguish file save, successful build, deployed and user-verified.
- Do NOT assert access to paid questions or private test banks; derive ORIGINAL questions from observable public learning objectives.

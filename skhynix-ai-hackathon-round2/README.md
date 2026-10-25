# SK hynix AI Hackathon Round 2 · Cofa Probe Learning Studio

## Purpose
A **single-page, reading-first, iPad-friendly study system** for the 2026 SK hynix AI hackathon. The site keeps independent-source evidence and user-provided primary reading material, while distinguishing 2026 July **KRAFTON Cofathon** from October **SK hynix Round 2** rules.

## Start
- Vercel: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- Official Probe: https://www.getcofa.com/ko/probe
- KRAFTON developer interview: https://www.youtube.com/watch?v=CLpN3zl8noQ
- Luka Top 6 first-hand report: https://brunch.co.kr/@luma/5
- Official Cofathon: https://cofathon.getcofa.com/

## Information architecture
One responsive app with four top-level destinations:
1. 학습 로드맵 — sequence, resume, short core explanations.
2. 자료 깊이읽기 — Krafton developer interview 15 sections, original 14 evidence chapters, 6 additional firsthand sources; no new page on selection.
3. 실전 사례 — data-based exercises with attached fictitious files and visible verification/solutions.
4. 이해도 점검 — multiple-choice drills and post-task explanation templates.

Source links are optional external reading. No fake AI chat, no disconnected text entry controls, no ads/login.

## Evidence discipline
- Label **official vendor announcement**, **first-hand participant observation**, **user-provided video recap**, **assistant-authored interpretation**, **fictional study exercises**.
- Do not infer exact SK hynix 2nd-round grading weights, allowed LLM models, or post-task question count from July Cofathon.
- Distinguish completion assertions from real command/test/output evidence.
- Do not count answer to an exercise as evidence of having executed code.
- Reuse original 14-chapter resource `cofa-chapters.json` and added `portal-content.json` from existing deployed study project.

## GitHub housekeeping
The older Round 1 study materials remain in the separate historical branch `archive/round1-before-round2-20261025`. The active study site must **not** link to Round 1 content. Old files on the main branch, if removed, must be removed only after verifying archived branch (not a context-window hack).

## Software
Static HTML, CSS and vanilla JS. No API keys. Browser-only progress via `localStorage` (not account sync). Mobile bottom navigation, desktop side navigation, accessible buttons and details, no click-through page proliferation.


## Published production (2026-10-25)
- Live: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- GitHub main source of truth: this folder (`index.html`, `style.css`, `app.js`, and all four study JSON files).
- Current production uses Vercel deployment `dpl_7h9HuP4wmmjiXK8ikCkUMkNipawR` (READY) with eight source files including `vercel.json`; earlier verified equivalent release `dpl_6p9ahFETfeDA3dgA6KFFf6hemiFB`.
- Study materials: 15 developer-interview sections; 11 sections in Luka deep-dive; 14 general study chapters; 5 supplementary firsthand/official source chapters; 3 comparisons; 8 exercises; 12 questions.
- **Four visible destinations:** 학습 로드맵, 심층 자료실, 실전 연습, 이해도 점검. No first-round menu.
- Legacy separate page addresses now redirect to the unified app (see `vercel.json` / corresponding compatibility HTML files).
- The July Cofathon firsthand accounts are not official rules for the October SK hynix 2nd round.
- No real AI backend, no nonfunctional text entry, and no claim of automatic Cofa grading.

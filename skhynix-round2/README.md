# SK hynix AI Hackathon — Round 2 Cofa Probe Study Center

**Goal:** One-screen Korean study experience, not many independent microsites.

## Live links
- Vercel: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- Cofa official: https://www.getcofa.com/ko/probe
- Luka first-hand review: https://brunch.co.kr/@luma/5
- Builder Josh original Cofa developer video: https://www.youtube.com/watch?v=CLpN3zl8noQ

## Four fixed navigation sections
1. 시작하기 — direct learning sequence
2. 근거·실제 후기 — all articles read in same panel; filters and detailed source provenance
3. 전략·실전 문제 — cross-participant reasoning and eight simulated assignments
4. 이해도 확인 — 12 QA questions with answer explanations

**Remove Round 1 from the active Round 2 navigation.** Preserve first-round files as historical material rather than destroying unrelated work. Retire separate pages `cofa-probe.html`, `cofa-luka.html`, `cofa-sim.html` as navigational destinations; support redirects into the unified app.

## Content accuracy boundaries
- Separate original firsthand event observation, first-party corporate claim, participant interpretation, and hypothetical educational exercises.
- Luka was Top 6 in July 30 Cofathon FDE. He recorded 225 minutes of build, then five post-deliverable questions, 3 minutes each, and observed three 100-point axes (Technique/Intent/Cognition) plus FDE-specific Communication of unknown point value. **These details do not establish SK hynix Round 2 regulations.**
- Do not copy arbitrary personal posts in full; link original and paraphrase with rigorous analytical commentary.
- The publicly accessible Probe login console does not prove a free unaffiliated trial is available.
- No pretend AI chat. No write-a-response boxes that have no AI backend. Keep source links, case documents, answer explanations and timer.

## Source data currently served by Vercel
- `/cofa-chapters.json`: original 14 textbook chapters (core).
- `/portal-content.json`: 5 follow-up firsthand case analyses, 3 side-by-side strategy comparisons, 8 hypothetical practical tasks and 12 verification questions.
- The application fetches these files at runtime. Their originally deployed file hashes are recorded in the handoff for future restoration.

## Workflow and quality gates
- Work on GitHub branch `skhynix-round2-unified-20261025` under `skhynix-round2/` to avoid editing the old first-round study files.
- Verify JavaScript parses before deployment and that the data contains all expected sections.
- Deploy Vercel preview, check READY and file listing, then promote/create production only after passing validation.
- Prefer stable URL fragment routing `#start`, `#learn/luka`, `#practice/cases`, `#quiz`; internal route changes should not launch extra tabs.
- Content and changes documented in `HANDOFF.md`.

## Known limitations
The app is a study resource, not the official Cofa test client. Quiz and example solutions are educational only. The exact user/model context window is fixed by the model configuration and cannot be increased via GitHub; this repository is the durable external handoff and context source.

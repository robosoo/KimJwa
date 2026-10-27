# Official guide stage 2 self-review · 2026-10-27

Review type: assistant self-review and source-conformance checks. Independent experts / human panel: NOT RUN; no fabricated ratings.
Source A: user-supplied 1-page exam brief. Source B: user-supplied 5-page detailed guide.

## Requirements coverage
- PC: latest Chrome or Edge, one computer, single monitor, PC webcam with full face + two ears; no mobile webcam substitution — B p.1.
- Network: upload and download individually ≥5Mbps RECOMMENDED, not a hard failure threshold — A p.1; B pp.1–2.
- Proctor smartphone: installation QR via stock camera, session QR via Proctor app, check PC connected status; connection ≠ start recording — B p.1.
- Smartphone recommended specs: iPhone 11+/iOS16+ or Android11+/RAM4GB+, spare 1GB; charge cable — B p.1.
- Closed room, lighting, transparent window covering, no prohibited apps, no extra monitor — B p.1.
- Explicit pre-start setup order: personal link / rules confirmation / webcam / full screen sharing / phone connection — B p.1.
- After clicking '과제 시작': phone portrait positioning with front camera showing hands/keyboard/face/monitor, physical ID and glasses inspection — B p.2.
- ID masks: resident ID last 7 digits + address; driver's license also license number and authentication serial; passport number + MRZ and conditional resident last 7 — B p.2.
- Preview: one 15-minute session before actual task, same IDE and supervisor settings, sample tasks unevaluated, example written questions; no preview webcam video stored — B p.2.
- During failure: restore through '감독 연결' and '연결 확인'; timer continues — B p.5.

## Issues found and changes applied
1. Phone vs PC camera conflation risk → explicit distinct-role comparison and quiz; no instruction to substitute mobile for PC webcam.
2. QR ambiguity → explicit install (basic phone camera) vs session connection (Proctor app) sequence; no fake actual QR image used.
3. Screen-share selection risk → emphasizes '전체 화면' and explains tab/window invalid.
4. Identity exposure risk → no ID number entry or photo upload; detailed per-ID hide/show instructions.
5. Recommended vs mandatory confusion → labels bandwidth and phone specifications as recommended, not mandatory cutoffs.
6. First implementation had cryptic checklist restoration condition → replaced with direct assignment; static JS syntax checks PASS.
7. First implementation had dense mobile tables → added horizontal scrolling at narrow widths.
8. Main study homepage banner still claimed 1/7 after stage2 writing → updated entrypoint and dedicated stage2 link.

## Static verification after edits
- 7 phase anchors, 2 active detailed phases, 8 stage-2 multiple-choice questions, 10 persisted checkboxes, 3 ID types.
- 2 inline JavaScript blocks parsed by JavaScript Function compilation: both PASS; no runtime script executed by this check.
- No API keys, real exams or third-party data collected by stage2 lesson.

## Remaining limitations
- No browser click-through, iPad Safari or phone hardware test by this static review; deployment READY is not UI test completion.
- Proctor's separate installation/filming guide was referenced by B but was not present in the 2 supplied PDF sources; its extra instructions are not reproduced.
- Internal PDF screenshot visual layout is simplified into prose and interactive controls, not a claim of a pixel-faithful Cofa interface.
- Real exam content, post-task questions, official score weights, user-specific access link are not disclosed by these PDFs.

## Exit gate
Source mapping and static syntax passed; deploy 19 runtime files and verify Vercel status and file list separately.
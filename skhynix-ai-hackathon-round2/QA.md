# QA · 2026-10-25 production release

## Verified in current work
- [x] V8 JavaScript syntax parses without errors for the deployed `app.js`
- [x] All four JSONs parse; data counts: 15 interview sections, 11 Luka sections, 14 original chapters, 5 supplemental chapters, 3 comparisons, 8 cases, 12 quiz questions
- [x] Vercel preview `dpl_8yfE7iAnpWomrMriUC7jzu9TRpA5` READY with 7 required files
- [x] Production `dpl_6p9ahFETfeDA3dgA6KFFf6hemiFB` READY with primary domain alias
- [x] Subsequent active production `dpl_7h9HuP4wmmjiXK8ikCkUMkNipawR` also READY, with expected JS/CSS/4 JSON files
- [x] GitHub stores `index.html`, `style.css`, `app.js`, `content.json`, `luka-deep.json`, `cofa-chapters.json`, `portal-content.json`
- [x] Quiz choice persistence fix and `tests` / `checks` fallback are committed
- [x] No Round 1 navigation items in `index.html`; archive branch exists

## Still requires a real browser test — NOT VERIFIED
Browser tooling requires the originating browser extension, which was not connected for this session. These steps are a manual test plan, not a report of passed results.

1. On iPad Safari open https://skhynix-ai-hackathon-round2-lab.vercel.app/ and confirm no blank screen or loading skeleton remains.
2. Confirm four bottom tabs: 학습 / 자료실 / 실전 / 점검, with no first-round menu.
3. On 자료실 select official Cofa summary; then Luka; then interview chapters 01, 05, 15; confirm the article changes without opening a new page.
4. Search a term, switch a filter, read a full article, use Previous/Next and mark complete.
5. Open explicit 원문 확인 link: it should be the only normal flow opening an external site.
6. In 실전 choose cases and open their source files, verification checklists and sample solution. Check the checklist is nonempty for `portal-content.json` cases using the `tests` key.
7. In 실전 select the roleplay preset questions. Ensure there is no free-text box implying a real AI backend.
8. In 점검 answer two questions; refresh; previous quiz choices should remain. Reset quiz and confirm choices clear.
9. In the practice post-submission Q&A use the 3-minute timer; start, pause, resume and reset.
10. Open legacy /cofa-probe.html, /cofa-luka.html and /cofa-sim.html; confirm redirects to unified routes.
11. Review at 390px mobile and 1024px iPad widths: no horizontal overflow, body text legible, sidebar / bottom navigation functional.
12. Accessibility: keyboard tab/focus indication, expansion controls, viewport 200% zoom and contrast.

## Accuracy constraints
- Cofa Probe general documentation is not the SK hynix October 31 official assessment rubric.
- Luka firsthand July 30 event observations (225min, 5 questions, each rubric scale) remain explicitly distinguished from official SK hynix conditions.
- App contains no working external AI engine or API key. Completion checkboxes and site quiz are not Cofa scores.
- Stored browser completion data is device-local only.

## Files
GitHub project: https://github.com/robosoo/KimJwa/tree/main/skhynix-ai-hackathon-round2
Website: https://skhynix-ai-hackathon-round2-lab.vercel.app/

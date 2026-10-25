# Release QA and source provenance · 2026-10-25

## Automated checks actually performed
- `app.js` syntactic compilation using V8 `new Function`: PASS.
- JavaScript app under mock DOM with **real** source JSON files: 4 tab routes PASS.
- 15 user-provided developer interview sections render successfully.
- Standalone Luka extended case study renders successfully.
- 14 existing original chapters and 5 additional case studies parse successfully.
- 34 **distinct** library articles (short Luka duplicate suppressed): PASS; minimum article HTML response ~7,993 chars.
- Library official/participant filters: PASS.
- 8 cases, data views, answer reveals: PASS.
- Stakeholder fictional interview selections: PASS.
- 3-step Cognition Q&A view: PASS.
- 12 quiz questions, scoring and reset: PASS.
- All of the above tests are logic-level smoke tests in a synthetic DOM, **not actual physical iPad or interactive browser UI tests**.
- Vercel deployment READY, deployment file manifest present and production alias confirmed via Vercel API (verify again after final deploy).

## UI design
- Four nav destinations only (학습 / 자료실 / 실전 / 점검).
- Single-page app without internal hyperlinks opening separate tabs. External original sources open only upon explicit action.
- Native Apple system font stack with legible Korean support and no external webfont dependency.
- At <=930px, mobile/tablet layout switches to one content column and fixed four-tab bottom nav; reading sources scroll in a bounded panel.
- Responsive widths, keyboard-visible focus, accessible labels and reduced-motion consideration.
- No disabled or fake AI answer boxes. Questions are selectable, answers show prepared explanations.

## Source model
- `content.json`: 15 sections of detailed **user-provided developer-video summary**, educational commentary, video and original source index.
- `luka-deep.json`: 11 structured sections from direct participant account, his own limitations, 3+1 axis observed in the July 2026 Cofathon.
- `cofa-chapters.json`: 14 source-based textbook chapters from prior version, preserved without omission.
- `portal-content.json`: 5 additional source-based commentaries, 3 strategy comparisons, 8 fictional validation problems, 12 study quiz questions.

### Hard separation
Krafton's 2026 July Cofathon participant conditions are not automatically SK hynix 2026 October 31 exam conditions. Claude Code / Codex availability, model GPT-5.5, 225-minute coding time, Technique/Intent/Cognition scoring bands, and five post-task questions belong to the prior event's source accounts, not a verified rule for this exam.

## GitHub archives
- Round 1 fully preserved in branch `archive/round1-before-round2-20261025`.
- Removed Round 1-only paths from the current `main` branch using a reviewed atomic tree commit `b5b000a7014de5b0be570ee1189614095be04138`.
- Unrelated research and other repositories untouched.
- Deleting GitHub files does not expand ChatGPT's actual Context Window.

## Remaining validation limitation
A successful Vercel READY state and synthetic-DOM smoke tests are not equivalent to visual screenshot review on real iPad Safari. Cross-device screenshots, keyboard/touch interaction and actual browser navigation checks need separate live browser access. Don't claim them completed.

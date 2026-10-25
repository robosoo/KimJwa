# HANDOFF · 2026-10-25
## Current objective
Consolidate all user-supplied and found Cofa Probe learning evidence into a polished, Apple-like, **single-page** iPad-first Vercel learning site, while saving primary study source, editorial interpretation, UI source, and status in GitHub.

## Immutable facts
- Event: SK hynix AI hackathon 2nd online round 2026-10-31; actual platform details require event-specific official notices.
- 2026-07-30 KRAFTON Cofathon FDE had 225-minute build followed by 5 task-based questions (participant Luka's account), Technique/Intent/Cognition 100-point displays with added FDE communication. Not transferable as confirmed 2nd-round rules.
- Official Cofa Probe overview: https://www.getcofa.com/ko/probe.
- User's 2026-10-25 provided transcript-derived developer-video outline has **15 sections**, captured in `content.json`.
- 2026-08-02 Luka full first-person report: https://brunch.co.kr/@luma/5
- Developer video: https://www.youtube.com/watch?v=CLpN3zl8noQ
- Source categories: official, direct participant testimony, video interview summary, reconstructed study examples.

## UI expectations
- Exactly 4 top-level destinations. One page, same window navigation.
- Dense-but-readable editorial card layout, balanced whitespace, clear typography and neutral navy/teal, touch targets ≥44 px.
- No fake AI input. Quiz selections only, optionally local checked progress.
- Source deep links are optional, and only explicit original source buttons open external pages.
- Preserve total source base: 14 existing chapters + 6 additional case studies + full 15-section developer interview.
- Lesson navigation must support keyboard, mobile and iPad.

## Operational checks
1. GitHub commit all new source.
2. Vercel preview build READY; verify files.
3. Production deployment READY and project domain.
4. Confirm SPA root and original source link behavior where possible.
5. Mark any tests not actually executed; do not claim browser click checks when unavailable.

## Archive
Branch: `archive/round1-before-round2-20261025`, created from main before 1차 content cleanup. User asked to remove Round 1 from active learning. Deleting GitHub files has no effect on ChatGPT actual context window.

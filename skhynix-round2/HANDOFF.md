# Round 2 Cofa Probe — HANDOFF / 운영 인수인계

Updated: 2026-10-25 · Asia/Seoul
GitHub repo: https://github.com/robosoo/KimJwa
Active working branch: `skhynix-round2-unified-20261025`
Source directory: `skhynix-round2/`
Vercel project: `skhynix-ai-hackathon-round2-lab`
Production URL: https://skhynix-ai-hackathon-round2-lab.vercel.app/

## Required user experience

- One calm responsive application, no more scattered content pages or repeated navigation into new tabs.
- Four fixed sections: 시작하기 / 후기·근거 / 전략·실습 / 이해도 확인.
- On desktop/iPad, selecting a source swaps the adjacent article; on small mobile screens, it scrolls to the article.
- On mobile, a compact four-tab sticky bottom navigation.
- Original source links are explicitly marked and can open separately. In-app study, article choice, comparison, quiz and case selection do not open another page.
- No fake AI chat or text-entry response boxes. Search bar remains for finding articles.
- Personal read status, quiz answers, and local 4-hour countdown are stored in localStorage on the device; do not claim cross-device sync.
- No older Round 1 content in the active Round 2 menu. Keep old project material in historical GitHub folders rather than deleting valuable originals.
- External source evidence, participant interpretation, and fictional educational cases must remain visibly distinct.

## Actual implemented source structure

`index.html`: responsive shell and typography design, four navigation tabs.
`study-app.js`: live client navigation, 19 articles, source filters/search, Luka expanded historical analysis, 3 strategy comparisons, 8 case scenarios, 12 self-check questions, responsive article focus, timer, local progress.
`source-manifest.json`: verified/collected source inventory with evidence types and original URL.
`cofa-probe.html`, `cofa-sim.html`, `cofa-luka.html`, `cofa-luka-deep.html`: backward-compatible redirect shims into the unified app.
`README.md`: architecture overview and source-boundary rules.

## Vercel data files referenced by the application

The page fetches:
- `/cofa-chapters.json` — 14 original in-depth articles (deployed file SHA `a35a50f9efa83e515ca9c21b33b45b762036b3a0`)
- `/portal-content.json` — 5 additional detailed firsthand/official stories, 3 participant strategy comparisons, 8 fictional practical assignments, 12 verification questions (deployed file SHA `ff4c79003ca3564b037b77ac52728b0c3234fedc`)

**Important:** At this milestone, the complete two full-size JSON data file bodies are preserved and served by Vercel deployments and referenced by SHA. `source-manifest.json` in GitHub contains the 19 original source pointers, but is not a byte-for-byte mirror of those two JSON files. A future task should ensure the long-form data JSON files are also mirrored into GitHub if access to their full bodies is available. Do not falsely claim they are already mirrored there.

## Central firsthand Cofathon case

Luka, `https://brunch.co.kr/@luma/5`, Aug 2 2026, describes the Jul 30 Krafton FDE Top 6 experience:
- 11:15 start, ~15:00 finish of 225-min build; five follow-up questions reported in 15:00–15:20 period, 3 minutes per question.
- Original README supplied more detail than expected, limiting autonomous problem discovery.
- `INTERVIEW.md` inquiry, written agreement, `CLAUDE.md` judgement principles, 7-step STATE tracking, independent Codex review, Handoff gaps.
- Observed Technique, Intent, Cognition each 100-point axis and FDE-specific Communication with unknown point value.
- Q&A answer logic: locate real code weakness → explain failure impact → propose same-condition test and improvement.
- The participant criticizes scoring opacity, over-detailed README, similar deliverables and possible excess overhead for reusable harnesses.
- **NOT** a source for specific SK hynix Oct 31 scoring, allowed model/tool or fixed Q&A count.

Other contrasting firsthand cases:
- O Giran: prepared harness had more setup overhead than value for already specified Olive Young task.
- jiypark: Top6 participant lost 20–30min on harness environment then focused MVP.
- Kang Ho-nam: good product intent did not translate automatically into correct code-level Q&A.
- JunWon Seo: FDE winner's Ask → Build Small → Verify workflow.
- CJ Olive Young cases: marketing safety rules, SKU validation, publication authorization, feedback-loop incompleteness.

## Quality and verification

- JavaScript source compiled with `new Function(source)`: PASS.
- Mocked runtime exercise of four routes: PASS.
- Mocked switch to 8 practical cases: PASS.
- Mocked reveal solutions, quiz grading, marking read: PASS.
- Small-screen article selection scrolls into content: PASS.
- Test checking whether a fake title contained 'Top' was a **test fixture mismatch**, not an application route failure; validate URL `#learn/luka` directly if repeated.
- Vercel preview builds reached READY and the expected source files appeared in deployment file listings.
- External browser screenshot/click-through tests are **not** completed. Do not claim pixel-perfect Apple-level quality as empirically established.

## Production deployment checklist

1. Check the latest preview deployment state is READY.
2. Include `index.html`, `study-app.js`, `cofa-chapters.json`, `portal-content.json` and the four redirect pages.
3. Deploy with `target:"production"`.
4. Verify READY, expected file names and project alias after deployment.
5. Test visible main URL and previously shared legacy links if browser access permits.
6. Preserve source and handoff notes; never mix 1st and 2nd round regulations.

## User preference

Extensive logical, textbook-level prose. Human reasoning before AI output. Preserve English technical terms where natural. Link original public sources instead of long verbatim copyrighted copies. Expose what is uncertain rather than inventing exact grading.

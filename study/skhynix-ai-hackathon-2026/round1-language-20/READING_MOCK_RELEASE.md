# 1교시 독해 실전 20문항 · Vercel 배포 기록

- Production: https://skhynix-ai-hackathon-quiz.vercel.app/reading-mock.html
- Vercel deployment: `dpl_95sg4ptLAgZcgRtknhPaRFTkxtP1`, READY, production alias verified
- GitHub site source: `site/reading-mock.html`
- 홈페이지 메뉴: `site/official-nav.js` — '독해 실전 20' 버튼
- 공식 출처 독해 페이지: `site/official-exams.html` — cross-link
- 20 original questions / 4 passages: persona 5; prompt 5; Hangul Jamo virtual keyboard 5; changed 6-key keyboard 5
- 지문 길이(공백 포함): 1,268 / 1,502 / 976 / 894자
- 30분 countdown & untimed practice / localStorage autosave / 4-section navigator / 5-choice per question / ㄱ·ㄴ·ㄷ / per-question explanations visible only after submission / reset
- Browser QA at 390/768/1280 px: page errors 0; horizontal overflow 0; answer retained on reload; explanations hidden pre-submit; section/question navigation; full 20/20 yields 100 points; home nav available after page initialized; official reader cross-link verified
- Production static route, home nav script and official reader cross-link verified.

## Real public sources used to inspire rule STRUCTURE, not text
1. Programmers '대충 만든 자판': https://school.programmers.co.kr/learn/courses/30/lessons/160586
2. Codeforces 831B 'Keyboard Layouts': https://codeforces.com/problemset/problem/831/B
3. Codeforces 474A 'Keyboard': https://codeforces.com/problemset/problem/474/A
4. Codeforces 752B 'Santa Claus and Keyboard Check': https://codeforces.com/problemset/problem/752/B
5. LeetCode 2810 'Faulty Keyboard': https://leetcode.com/problems/faulty-keyboard/

All passages/questions newly authored for non-official practice. The original SK hynix examination screenshot anecdote does NOT establish exact underlying keyboard rule, scoring or per-passage lengths. Exam operation remains governed by official instructions.

Original existing site assets remained intact (preview+production deployments contain 19 existing/new files).

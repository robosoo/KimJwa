# Production과 GitHub 소스 일치

기준: 2026-10-25 · Asia/Seoul

Production: https://skhynix-ai-hackathon-round2-lab.vercel.app/
Deployment: dpl_HvfMXZ5B7XjRQLButT8F8QDx6bmC
Source commit: 54cc1ec4669a1ff7dae3f9a83bbe6295f401a344
Preview: dpl_D29FfBQ3RFG5NGyAQ8VmnmQZAxtQ

Vercel 파일 목록 18개 UID가 로컬 raw SHA-1과 모두 일치한다. HTTP로 직접 제공되는 본문 13개는 바이트와 SHA-256을 추가 대조했다. 리다이렉트 HTML 4개와 vercel.json은 배포 원본 UID로 대조했다. Git blob SHA와 raw SHA는 다르므로 혼동하지 않는다.

| 파일 | raw SHA-1 / Vercel UID | 크기 |
|---|---|---|
| index.html | e0b0869f698660d7b35329afbb7f35d6eb889d0c | 3603 |
| app.js | 1fb495bb6d84f4df74d7c8c6fba1e31ed92e989c | 75319 |
| style.css | adb930cb0f500b6698598ca70956a91e838c2fb1 | 26766 |
| brand.css | 8846049d93d498d95e480d0c2ce2fff681eab214 | 8123 |
| content.json | 6c7dce71239c80f3f57693c0a8dcdc787d792093 | 26888 |
| luka-deep.json | 813c0396cfa7cacee60eba50b5106bd05c31b52e | 9623 |
| cofa-chapters.json | a35a50f9efa83e515ca9c21b33b45b762036b3a0 | 34427 |
| portal-content.json | ff4c79003ca3564b037b77ac52728b0c3234fedc | 27614 |
| source-manifest.json | d81df80d5fffe37249431f97e6fc2fa75904faed | 51338 |
| learning-guide.json | 3b9c52eeb3cbf34eeb89cb1d42a3b3c774f3597f | 16274 |
| beginner-guide.json | 876337425be0a716eabf25da0225a77ccc5eac53 | 27691 |
| learning-path.json | b3277d7b038391f836a53f0ff177487dd0f1decb | 28292 |
| deep-analysis.json | 91e8e87d179ff395ac14ca342261324ed5003155 | 22046 |
| vercel.json | 09fdd40850961aa8c6a13b753f778b7c773f4c44 | 928 |
| cofa-luka.html | 051f6756c3394eaf69b30c3d12d036d5b49a61fa | 341 |
| cofa-luka-deep.html | 051f6756c3394eaf69b30c3d12d036d5b49a61fa | 341 |
| cofa-probe.html | 272e5aab8523f780e180deb696709d52cce8b6c9 | 347 |
| cofa-sim.html | 4d1a6080b52605e670da9238e24dd6b07b265d1a | 335 |

SHA-256·HTTP 본문·공유 URL 7개의 목적지는 reports/runtime-files.json과 reports/release.json에 기록했다. Preview 전용 테스트·문서·스크린샷은 Production에서 제외했다.

복구 소스: 6d17af15cdbd11e5cbaef5bb9ca9522fe422cfd6. 직전 운영: dpl_9gxtpr6UyMhMBr13hXLAxTMZziLx.

미검증: 실제 독립 평가자 패널, 실물 Safari/VoiceOver, 실제 응시 설정, 응시자의 전체 리허설.

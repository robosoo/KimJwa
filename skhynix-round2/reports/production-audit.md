# Production 정합성 감사 — 2026-10-25

- 공식 도메인이 가리키는 배포: dpl_7h9HuP4wmmjiXK8ikCkUMkNipawR, READY / production 확인.
- Vercel API 원본 파일 목록 8개 확인: index.html, app.js, style.css, content.json, cofa-chapters.json, portal-content.json, luka-deep.json, vercel.json.
- 7개 공개 파일을 HTTP로 내려받고 SHA-1을 Vercel 파일 ID와 대조했다. vercel.json은 배포 소스 API로 복구했다. SHA 및 크기는 backup-manifest.json에 기록했다.
- core 14장, 추가 5장, 실습 8개, 퀴즈 12개, 영상 정리 15개 단원, Luka 심화 11개 단원을 보존했다.
- 기존 브랜치에는 app.js/style.css/content.json/luka-deep.json/vercel.json이 없었다. index.html은 Production과 달랐다.
- 브랜치의 이전 index.html 및 study-app.js는 archive/pre-ui-20261025/에 보존했다. 기존 루트 study-app.js도 삭제하지 않았다.
- 두 기존 JSON은 Production과 바이트 단위로 동일하며 원본 SHA-1 a35a50f9efa83e515ca9c21b33b45b762036b3a0 / ff4c79003ca3564b037b77ac52728b0c3234fedc를 확인했다. 같은 원본을 별도 폴더에 중복 저장하지 않았다.
- 복구용 커밋에서 skhynix-round2/의 원본 8개 파일을 배포하면 기존 Production을 재현할 수 있다. 테스트·문서·archive 폴더는 공개 배포 대상에서 제외한다.
- Production은 영상 15단원+Luka 심화+기존 13장+추가 5장=34개를 보여주지만 기존 Luka 핵심 장은 목록에서 제외했다. 개선본은 삭제 없이 기존 Luka 핵심 장도 접근 가능하게 하여 35개 항목이다.
- 기존 Production은 3분 Q&A 타이머, 선택형 실무자 문답, 8개 실습, 12개 퀴즈를 제공했다. 기존 브랜치의 전략 비교와 4시간 타이머는 Production UI에서 접근할 수 없었다. 개선본에서 복구한다.
- 별도 팀 ID를 명시한 연결은 403을 반환했으나 기본 연결은 동일한 프로젝트·배포에 대한 조회에 성공했다. 다른 팀이나 프로젝트로 변경하지 않았다.

# 2차 학습센터 인수인계

갱신: 2026-10-25 · Asia/Seoul
저장소: robosoo/KimJwa
브랜치: skhynix-round2-unified-20261025
작업 범위: skhynix-round2/
운영 URL: https://skhynix-ai-hackathon-round2-lab.vercel.app/

## 현재 릴리스 상태

- 시작 시 Production: dpl_7h9HuP4wmmjiXK8ikCkUMkNipawR, READY 확인.
- 최종 검증 Preview: dpl_AM95xt5xug4KLG2jgjbHdjKRu2kf, 동일 프로젝트의 정적 앱.
- Preview: https://skhynix-ai-hackathon-round2-1qihf2yg3-ctpmfd42hf-8757.vercel.app/
- Production 배포 완료: dpl_79rfL1iS2kxiDxdm4QirQLcepHFV, READY / production. 공식 운영 도메인 연결까지 확인했다.
- 배포 소스 커밋: afd4baa3546345bed2aaebef6c4ba7ea8fd552f9. 문서만 갱신하는 후속 커밋은 runtime 배포 내용과 구분한다.

## 완료한 작업

1. Production 원본 8개 파일을 파일 목록·UID와 대조하여 복구했다. 원본 복구 커밋은 6d17af15cdbd11e5cbaef5bb9ca9522fe422cfd6다.
2. 두 기존 JSON의 raw SHA-1은 각각 a35a50f9efa83e515ca9c21b33b45b762036b3a0 / ff4c79003ca3564b037b77ac52728b0c3234fedc와 일치한다. JSON 키·원본 내용은 변경하지 않았다.
3. 14개 핵심 장, 추가 5장, 실습 8개, 퀴즈 12개, 영상 15단원, Luka 심화 11단원을 보존했다. 기존 Production이 목록에서 제외한 Luka 핵심 장도 다시 접근 가능하게 했다.
4. 개발자 대담을 학습의 중심에 두는 핵심 교재를 추가했다. 8개 우선순위, 세 축의 서로 다른 증거, 관찰·해석·규정의 경계, Cost Engineering과 단위, 의도·인지 부채를 설명한다.
5. 기존 비교 3개에 E2E 및 테스트/사후설명 비교를 보태 5개를 제공한다. 원문 링크와 적용 조건·반례를 연결했다.
6. 실습 8개마다 요구 이해 → 선택·기각 → 검증 증거 → 취약점 설명의 해설을 연결했다. Lot의 잘못된 행 수와 완전 교란 주장을 화면에서 정정했다. 원본 데이터는 그대로 보존했다.
7. 최상위 메뉴를 시작하기 / 후기·근거 / 전략·실습 / 이해도 확인으로 통일했다. 작동하지 않는 AI 입력창·답안 작성칸은 없다.
8. 읽기 글자·행간·본문 폭, 검색·필터, 출처 메타데이터, 글 목차, 내부 관련 글, 읽음·퀴즈 저장, 타이머와 공유 URL 호환성을 점검했다.
9. 주황·검정 테마를 사용자의 마지막 요청에 따라 반영했다. 공식 CI의 HEX 및 공식 해커톤의 시각 위계를 참고했으며 자산을 복제하지 않았다. brand.css에 분리했다.

## 실제 검증

- Node VM 기능 검사 22개 PASS: reports/validation.json.
- 데이터·계산·필수 주제·주요 색 대비 검사 51개 PASS: reports/data-audit.json.
- Cloud Chrome Playwright locator API로 390/844/768/1024/1440 CSS px에서 네 메뉴, 가로 넘침과 스크린샷을 확인했다. 각 화면의 앱 scrollWidth와 clientWidth가 같았다.
- 실제 브라우저에서 5개 전략 비교, 8개 문제·첨부·해설 토글·판단 해설, 두 가상 실무자, 12개 정답·오답·초기화·관련 글 이동, 읽음·퀴즈·4시간 타이머의 직접 페이지 새로고침 유지, 3분 타이머를 확인했다.
- 390px 본문 top 약 11.72px, 768/1024px 약 20px로 선택 후 이동했다. 선택 목차도 목록 안에 보이도록 유지한다.
- HTTP 링크 검사 19개 중 18개 reachable, 프로필 1개 접근 제한(999). 404로 오분류하지 않았다. HTTP 성공은 원문 주장의 검증과 다르다.
- Cloud Chrome의 확장 프로그램 metadata 오류가 관찰됐다. 앱 원인으로 오분류하지 않는다. 무제한·전수 운영 로그 모니터링을 했다는 의미는 아니다.

## 검증 한계와 다음 우선순위

- 실물 iPhone/iPad, Safari/VoiceOver, 실제 기기 safe-area는 미검증이다. 다섯 화면 검사는 실제 Chrome iframe viewport이며 실물 기기 검사가 아니다.
- 로컬 Chromium 설치는 다운로드 실패. standalone browser-smoke.mjs는 재현용 코드이며 이번 검증은 Cloud Chrome에서 수행했다. 설치 실패를 테스트 성공으로 표시하지 않는다.
- 스크린샷은 대화의 브라우저 검증 세션에서 생성·검토했다. 바이너리 파일은 저장소로 내보내지 못했다.
- 일부 LinkedIn 정확한 작성일과 영상 게시일은 미확인으로 남겼다. source-manifest의 null을 임의로 채우지 않는다.
- 개발자 설명은 제품이 측정하려는 역량의 핵심 근거다. 특정 행동의 점수와 SK하이닉스의 시간·모델·파일 반입 규정까지 확정하는 자료는 아니다.
- 향후 우선순위: 실제 기기 Safari 확인 → 주최측 개별 2차 안내가 새로 제공될 때 범위 갱신 → 원문 접근 제한 자료의 세부 문장 재대조.

## 운영과 복구

- Runtime 배포 파일: index.html, app.js, style.css, brand.css, content.json, luka-deep.json, cofa-chapters.json, portal-content.json, source-manifest.json, learning-guide.json, vercel.json, cofa-probe.html, cofa-luka.html, cofa-luka-deep.html, cofa-sim.html.
- Preview 전용 tests/viewport.html 및 archive·보고서·테스트 코드는 Production 패키지에서 제외한다.
- hash routes: #start, #learn/creator-guide, #learn/luka-depth, #practice/compare, #practice/cases, #quiz. 기존 ?tab=library&id=..., #learn/luka 및 cofa-*.html 이동을 지원한다.
- 로컬 데이터는 해당 브라우저에만 저장된다. 기기 간 동기화는 없다.
- 기존 1차 폴더·main은 변경하지 않았다. 복구는 위 원본 커밋의 8개 소스를 동일 프로젝트에 배포한다.
- Git CLI push 자격증명은 없으므로 연결된 GitHub API의 tree→commit→expected-head ref 갱신을 사용했다. 다른 브랜치나 저장소를 변경하지 않는다.

## 주요 커밋

- 61239a7: 원본 두 JSON 백업
- 6d17af1: 원본 Production 8개 파일 복구 및 정합성 감사
- 8b24ca5: 출처 메타데이터·개발자 핵심 교재·판단 훈련
- b9177a1: 네 메뉴·읽기 체계·전략 복구·기능 회귀 검사
- 이후 수정·테마 및 배포 결과는 현재 브랜치 log와 release.json에 기록한다.

## 최종 Production 확인

- 배포 ID: dpl_79rfL1iS2kxiDxdm4QirQLcepHFV
- READY 및 target production 확인. 공식 URL https://skhynix-ai-hackathon-round2-lab.vercel.app/ 가 동일 배포를 가리킨다.
- 15개 runtime 파일의 Vercel UID와 소스 SHA를 기록했다. Preview 전용 화면은 Production에 포함하지 않았다.
- 운영 도메인에서 네 메뉴를 실제로 클릭해 올바른 본문 제목을 확인했다. 기존 cofa-luka.html이 #learn/luka-depth로 이동하고 Luka 본문을 여는 것을 확인했다.
- reports/release.json: HTTP·공유 URL·파일 일치 확인. reports/runtime-files.json: runtime 파일별 raw SHA-1 및 크기.
- 테스트 상태: 기능 22 + 데이터·계산·필수 주제·주요 대비 51 PASS. Chrome 실제 다섯 viewport와 20개 메뉴/크기 조합 점검. 실물 Safari 미검증은 그대로 남긴다.
- 이후 개선 우선순위는 위 미검증 범위에 한정한다. 이미 통과한 검사를 이유 없이 반복하거나 기존 콘텐츠를 다시 만들지 않는다.

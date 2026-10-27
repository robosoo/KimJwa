# 2026-10-27 · 주최 측 단서 심층 분석 사이트 반영·출처 검증 기록

## 요청 및 구현
사용자가 직전 대화에서 받은 'SK하이닉스 2차 예선 주최 측 단서 역추적' 내용을 하나도 빠짐없이 기존 Vercel 학습센터에 포함하도록 요청함.
- 기존 URL: https://skhynix-ai-hackathon-round2-lab.vercel.app/
- 수정 파일: skhynix-round2/index.html (기존 한 사이트의 '시작하기' 화면에 삽입)
- 새 섹션 ID: organizer-research. 상단 지도/실전 가이드 아래, 기존 도구·오류 참고 영역 다음.
- 사용성: 내용을 숨기지 않고 스크롤로 읽게 구현. 별도 팝업·퀴즈·아코디언·버튼은 추가하지 않았으며 가벼운 텍스트 내부 링크 1개로 접근성 보완.

## 8개 섹션 내용 보존 점검
1. 주최 측이 제공한 9개 단서와 각각의 출처, 의미, 반론; 2차/본선 역할 분리
2. 현업 담당자 에이전트 사용의 의미; 구한모·조정석 인터뷰, PUBG 이스포츠 인터뷰 코칭 서비스 사례 및 기존 사례/이번 기출 구분
3. Cofa의 Technique/Intent/Cognition 3축; 루브릭이 공개한 좋은·나쁜 신호, 본인 산출물 일치, 작업 로그 수집, Storey의 기술·인지·의도 부채 논문
4. 업무 서비스/데이터 분석/CLI 자동화/문서/반도체 전문 과제의 상대적 예상과 각각의 한계, 웹서비스 필수 아님
5. 현업의 수작업 데이터 문제를 활용한 가상 문제, 빠른 구현 A와 질문·검증 중심 B 비교, 토큰 낭비와 과설계
6. README→업무 담당자→최소 검증 가능 결과→Codex 감독→예외 검증→설명 가능 상태의 6단계 학습 전략, Skill/MCP/Harness 범위 주의
7. 미공개 과제 주제·데이터·언어·필수 스택·파일명·배점, 10/29 링크 및 15분 사전 체험, 서술형 AI 사용 금지, 예상의 반증
8. 공식 행사, 개인 공식 메일, PDF 2종, Cofa 공식 루브릭, 제작진 인터뷰, 비공식 행사 정보, ACM Queue 논문·arXiv 출처 링크

## 외부 공개자료 검증 2026-10-27
- SK하이닉스 공식: https://skhynix-hackathon.com/ai-2026 — 2차 AI Native 역량과 본선 AI Expert 구분.
- Cofa 공식: https://www.getcofa.com/ko/probe — 기술/의도/인지, 양·불충족 신호, 수집 기록.
- 2026-10-16 제작진 인터뷰: https://maily.so/josh/posts/x1zg69d3rqg — 가상 담당자, PUBG 실습, 과설계·토큰에 대한 설명.
- DEV EVENT: https://dev-event.vercel.app/event/detail/3362 — 비공식 '데이터 활용 미션' 표현이며 실제 확정 문제 아님.
- Storey ACM Queue DOI: https://doi.org/10.1145/3807966 및 arXiv https://arxiv.org/abs/2603.22106.
- 개인 안내 메일과 PDF는 이전 대화에서 확인한 내용을 출처로 표기. 개인 Gmail 내부 링크/식별정보는 공개 페이지에 게시하지 않음.

## QA
- 8개 섹션 앵커 모두 존재, 9단서 표 포함.
- 메인 랜드마크 1개, 기존 PC/모바일 네 메뉴 버튼 총 8개 유지.
- 기존 여섯 실전 단계와 실습 기능 소스 보존.
- 새 내용에는 조작용 버튼/반복 퀴즈 0개.
- HTML ID 중복 0개.
- index.html inline JavaScript 및 기존 app.js 구문 검사 모두 PASS.
- 직접 연결되는 외부 링크(공식 행사, Cofa, 인터뷰, 비공식 행사, ACM DOI) 존재 확인.
- 전체 문서의 문구 중 [행사 공식], [Cofa 공식], [제작진 인터뷰], [비공식], [추론·가상] 구분.

## 배포
- Preview: dpl_zespuSyfMyWYwSKR18Xuqterz1Qg → READY
- Production: dpl_8UBPYRBJjagHGoqDYH68oT2amXzW → READY
- https://skhynix-ai-hackathon-round2-lab.vercel.app/ 에 운영 도메인 alias 적용 확인.
- 런타임 31개 파일 모두 preview와 production에서 내용 UID 일치. 기존 API 포함.

## 검사 한계
- Vercel 배포 READY, 정적 소스 검증, 배포 파일 동일성 확인까지 완료.
- 실제 iPad Safari 화면/터치/스크린리더 실측, 사용자의 실사용 검증은 수행하지 못했음.
- 이 보고서와 사이트의 출제 유형 우선순위는 공식 기출정보나 확률 통계가 아니라 출처를 나눈 추론.

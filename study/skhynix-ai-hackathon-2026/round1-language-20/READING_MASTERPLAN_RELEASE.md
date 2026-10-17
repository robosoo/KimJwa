# SK하이닉스 AI 해커톤 — 실전 독해·마스터플랜 Vercel 학습 배포 기록

작성: 2026-10-18
실서비스: https://skhynix-ai-hackathon-quiz.vercel.app/

## 학습 콘텐츠
1. https://skhynix-ai-hackathon-quiz.vercel.app/reading-mock.html
   - source: site/reading-mock.html
   - 4개 자체 제작 지문, 총 20개 5지선다 문항.
   - 지문: Persona (5), Prompt (5), Hangul Jamo 키 변환 (5), 자판 위치·모드 전환 (5).
   - 30분 타이머 / 무제한 연습 / 선택 답안 localStorage 저장 / 정답·근거 채점 전 숨김.
   - 명시한 참고 공개 유형: Programmers 대충 만든 자판 160586, Codeforces 831B/474A/752B, LeetCode 2810.
2. https://skhynix-ai-hackathon-quiz.vercel.app/masterplan-lab.html
   - source: site/masterplan-lab.html
   - 4단계 계획→추출→풀이→검증, 총 14개 객관식 확인 문항, 단계별 설명.
   - 6개 학습용 **가상** 원문 파일 문서, 실제 페이지·표처럼 식별할 수 있게 재현.
   - 정보 추출 튜플 (target_id,variable,value,unit,condition,exception,source), `null`, `conflict`, verified/carried 구분.
   - 고유 ID 중복 제거, 동명이인 분리, 정책 v1/v2·기간 검사, n=4/U=760 계약금액과 절감 검산, 문서내 프롬프트 인젝션 구별.
   - JSON/상태 장부 복사, 4개 단계별 프롬프트 복사, 사용자 실습 메모 로컬 저장.
3. https://skhynix-ai-hackathon-quiz.vercel.app/advanced-practice.html
   - 이전에 제작한 통합 실전 독해·마스터플랜 학습 페이지와 상호 링크 유지.
4. https://skhynix-ai-hackathon-quiz.vercel.app/official-exams.html
   - 원본 PDF를 원저작자 출처에서 불러오는 실제 공개 기출 메뉴, 기존 기능 유지.

## 검증
- Preview Vercel deployment: `dpl_6nxhugBcpbot5Lesmbbj5KS17cJ4`, READY
- Production deployment: `dpl_Bv6PYwtnYqFzFQKfnCiczD84Hdpb`, READY, canonical alias confirmed
- Chromium Playwright preview test
  * reading-mock: 390 / 768 / 1280px: 4 sections, 20 numbered questions, selection, restore after reload, submit/grade, no JS runtime error, no horizontal overflow.
  * masterplan-lab: 390 / 1024px: 4 tabs, 6 fictional document panels, 3 question PLAN module, 4 question VERIFY module, grade, v1 price switch and calculation, no JS runtime error or overflow.
  * home navigation: existing `학습하기`, `문제 풀기`, `실제 기출`, `학습 기록` remained available; `마스터플랜 심화` linked.
  * integrated practice tabs and existing official exam links verified.
- One masterplan clipboard handler syntax bug was discovered in browser QA and corrected before final production deploy.

## 시험 정보 주의
- 실제 2026 SK하이닉스 AI 해커톤의 문제 원문/정답/운영 규정이 아니다.
- 커뮤니티의 키보드 오류 후기는 출제 방식의 아이디어였을 뿐 완전한 변환표를 복원한 것이 아니다.
- 파일명·페이지 출처를 **가상 실습자료**로 표기. 실제 PDF를 검증했다고 주장하지 않는다.
- 공식 시험에서는 외부 사이트·기기 저장·AI·도구의 허용 범위를 시험 공지에 따라 준수해야 한다.

## 유지보수
- 새 배포 시 기존 Vercel 사이트 파일 전체를 해시 참조로 유지하고 변경 페이지만 대체할 것.
- 저장소의 `site/` 아래에는 추가된 학습 페이지의 원본이 있다. 기존 대용량 정적 사이트 자산은 Vercel deployment에 유지된다.

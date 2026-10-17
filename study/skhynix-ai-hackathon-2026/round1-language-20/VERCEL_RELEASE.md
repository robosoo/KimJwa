# Vercel 실제 기출 학습 뷰어 — 배포·재개 정보

- 배포 확인: **2026-10-17 (KST)**
- 운영 주소: **https://skhynix-ai-hackathon-quiz.vercel.app/official-exams.html**
- 운영 프로젝트: `skhynix-ai-hackathon-quiz` / `prj_2IicaK0JvSaIim21fdP9VU49Yze8`
- 검증된 운영 배포: **`dpl_5A6a9yaVXXWohke89r2bonrQyXzH`**, `READY`, `target=production`, 운영 도메인 alias 확인
- 사이트는 Vercel의 기존 제작물을 유지하면서 메뉴만 추가. 기존 파일(학습·객관식·4P·공개체험·기록)은 보존.
- 공개 저장소에 기출 지문·선택지·도표 **전문 복제 없음**. 원 PDF 및 원 출처를 직접 연결하여 글·표·그림을 재조립/축약하지 않고 보여준다.

## 기출 수집 현황

- [검색 가능한 구조화 카탈로그](../official-questions/catalog.json) — **10개 기출 지문·35문항**
- PDF 직접 보이는 6개 지문/24문항
- 기출 PDF 원본 내려받기 3개 지문/7문항(LEET, 응답 헤더 `Content-Disposition: attachment`)
- 원본 압축파일 ZIP 1개 지문/4문항(2010학년도 9월, ZIP 안 `언어영역.pdf`; PDF 직접 임베드 불가)
- 사용자에게는 원문 전체를 보여 주며 텍스트 요약·개조작·문항 선택지 재작성 없음. 모델이 원본 전체를 문자 단위까지 수작업 검증한 것은 **아님**. PDF의 저작권과 재배포 허용 여부는 별도.

## 배포된 원문 뷰어 소스

- [official-exams.html](./site/official-exams.html): 학습 화면 구조
- [official-exams.css](./site/official-exams.css): 모바일·iPad·데스크톱 UI
- [official-exams.js](./site/official-exams.js): 목록 검색, 필터, 원본 링크, PDF 문항 번호 및 지문 시작, 답안/메모 로컬 저장
- [official-nav.js](./site/official-nav.js): 기존 학습 사이트 상단에 ‘실제 기출’ 메뉴 추가
- [catalog.json](./official-questions/catalog.json): 서지·직접 원문 PDF/ZIP·문항 번호·출처 형식·검증한 SHA-256·페이지 인덱스

**주의:** 상기 4개 파일은 ‘추가한 원문 기출 뷰어’의 소스이고, Vercel의 기존 거대한 학습 사이트 전체(다른 JS·압축 HTML 등)의 백업을 뜻하지 않는다. 원래 Vercel 파일은 기존 배포에서 SHA 참조로 보존했다.

## QA 점검

1. Preview `dpl_DSierYXTUxArp2WREYVUkg5KV5U5`에서 실제 Chromium + Playwright 테스트.
2. 화면 폭 390/768px, 원문 목록 **10**, PDF 바로 보기 **6**, 기타(다운로드/ZIP) **4** 확인.
3. 2025학년도 수능 13번은 **PDF 5쪽**, 지문 시작 버튼은 **PDF 4쪽**으로 이동함을 확인.
4. LEET 2024 언어이해는 다운로드 페이지 안내로 표시하고 PDF iframe을 숨긴 상태 확인.
5. 답안 선택 ①~⑤, 풀이 메모가 새로고침 후 같은 브라우저에 저장됨 확인.
6. 화면 넘침 `0`, 브라우저 JS `pageerror 0` (390/768px).
7. 기존 사이트의 상단 메뉴에 ‘실제 기출’ 버튼 유지 확인.
8. 원 PDF 검증: KICE/EBSi 2025학년도 10~13, 2027학년도 6월 10~13, 2022년 7월 10~13, 2018년 CNN 24~28, 2017학년도 6월 16~19 등의 정확한 문항 페이지를 PDF 검색·직접 확인. LEET PDF는 스캔본이라 문항별 세부 페이지를 추측으로 기록하지 않음.
9. 원 PDF SHA-256은 카탈로그 해당 항목에 저장하여 후속 수집 시 PDF 파일의 변경 여부를 비교할 수 있게 함.
10. Vercel 프로덕션 배포를 `READY`로 확인. 배포 전 타 사용자의 변경이 덮이지 않도록 운영 alias 조회와 전체 파일 SHA 재사용.

## 다음 작업

- 사용자가 다시 수집을 요청하면 **이 문서와 catalog.json을 먼저 읽는다**. 현재 10개와 중복 검사.
- 추가 출처 후보마다 ① 시험명·시행 연도 ② 정확한 문항 번호 ③ 원본 PDF/ZIP 주소 HTTP 직접 조회 ④ 원문 PDF 전체 보존 ⑤ 저작권 상태 ⑥ SHA-256·문항별 페이지 확인 후 갱신.
- 원문 PDF 파일 자체를 GitHub/Vercel로 전송하거나 내용을 추출해 전문 게시하지 말고, 적법한 직접 연결을 유지한다.
- LEET 원본 다운로드 방식 개선 시 Safari/iPad 동작을 먼저 확인.
- PDF 임베드가 차단되면 원문 열기를 제공하고 미리보기 성공인 것처럼 표시하지 않는다.
- 배포는 Preview→브라우저 테스트→Production 순서이며, 반드시 준비 완료/READY 및 도메인 alias 확인.


## 2026-10-18 · 실전 독해·마스터플랜 운영 반영

- **Vercel production**: `dpl_49SUDBqjDxR35sB7SsV1qMXNWNvz` (READY, alias `skhynix-ai-hackathon-quiz.vercel.app`).
- 공개: `/advanced-practice.html` (창작 모의 지문 4개·20문항, 30분 타이머, 선지별 해설, localStorage, 한글 자모/모드 자판 시뮬레이터, 4단계 마스터플랜), `/reading-mock.html` (독해 실전 20문항), `/masterplan-lab.html` (별도 심화 학습).
- **Source basis**: Programmers '대충 만든 자판', Codeforces 831B, LeetCode 2810. 실제 SK하이닉스 출제 원문 및 자판 표로 가장하지 않음.
- **Browser QA**: Chromium, width 390/768/1280px, 4 URLs × 3 widths, HTTP 200, zero horizontal overflow, zero runtime errors. `advanced-practice.html`의 문제 선택, 답안 유지, 채점, 자모 및 자판 변환, 4단계 학습을 모두 검증.
- **Preservation**: 기존 사이트 파일 및 신규 병행 페이지 등 운영 파일 21개를 유지한 상태에서 버그 수정된 실전 페이지를 병합함.


## 2026-10-18 — 1교시 독해·마스터플랜 학습 확장

정식 사이트: https://skhynix-ai-hackathon-quiz.vercel.app/

- 30분 독립 모의시험: https://skhynix-ai-hackathon-quiz.vercel.app/reading-mock.html — 창작 4지문·20문항, 30분 타이머, 선택 답안 저장·채점·선지 근거 설명
- 통합 심화훈련: https://skhynix-ai-hackathon-quiz.vercel.app/advanced-practice.html — 페르소나·프롬프트 장문 독해, 한글 자모·변경 자판 문제, 키 입력 시뮬레이터, 상태 추출 검증
- 마스터플랜 전용: https://skhynix-ai-hackathon-quiz.vercel.app/masterplan-lab.html — 계획→추출→풀이→검증 4단계 및 3문항 단위 실습, 상태 장부·JSON·프롬프트 복사

검증 기록: 최종 정식 도메인을 직접 브라우저로 열어 390px·1024px 뷰포트에서 ① 통합 페이지의 null/conflict/경계값 3문항 채점 ② `소숲` 자모→AD/ABC ③ `13!45^2` 모드 전환·누적 뒤집기 결과 ④ 선택·새로고침 후 답안 복원·채점 ⑤ 독립 모의시험 객관식 제출·채점 ⑥ 전용 마스터플랜 4단계 이동·채점·상태 메모 ⑦ 학습 홈의 메뉴 진입점을 확인함. 모두 통과했으며 콘솔의 페이지 오류 0, 가로 넘침 0.

출처 구분: 10월 17일 참가자들의 키보드/문자 변환 경험담은 규칙 자체의 증거가 아님. 창작 연습 지문과 실제 문제를 혼동하지 말 것. 학습 사이트의 창작 문제는 [프로그래머스 대충 만든 자판](https://school.programmers.co.kr/learn/courses/30/lessons/160586), [Codeforces 831B](https://codeforces.com/problemset/problem/831/B), [LeetCode 2810](https://leetcode.com/problems/faulty-keyboard/)에서 문제 구조만 참고함. 종이·엑셀·외부 AI 제한은 실제 시험 응시 규정 우선.

배포 원칙: 기존 index.html, site-content.gz, original bank files, original exam reader and all original course assets preserved. Code source under `site/` in this folder.

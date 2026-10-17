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

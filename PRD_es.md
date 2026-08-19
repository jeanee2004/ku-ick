# PRD: 고려대학교 세종캠퍼스 유학생 생활 웹사이트 (가칭 "KUS Compass")

**작성일**: 2026-08-19
**작성자**: 이윤진
**상태**: 초안 (v0.1 — 오리엔테이션(2026 Fall, ~1주 후) 배포 목표)
**참고 자료**: 국제처 국제팀·KUS-Buddy 교환학생 오리엔테이션 PPT(2026 Fall), 디자인 가이드(`design.md`, "밥 먹으러 와" 프로젝트 원본 — 톤/컬러 시스템 구조만 차용)

---

## 1. 개요

### 1.1 한 줄 정의
고려대학교 세종캠퍼스(조치원)에 처음 온 외국인 교환학생·유학생이 캠퍼스 안팎의 장소를 지도로 찾고, 학기 중 필요한 한국 생활 정보를 검색해서 보고, SNS 커뮤니티로 연결되는 영문 웹사이트. 2026 Fall 오리엔테이션에서 직접 소개할 예정.

### 1.2 배경
- 국제처가 매 학기 오리엔테이션 PPT로 캠퍼스 시설/학사일정/유용한 앱을 안내하지만, 정적 PDF/PPT라 학기 중 다시 찾아보기 불편함.
- 기존 네이버지도 등 상용 지도는 같은 학교 주소 아래 건물명만 나열되어 있어(예: "세종로 2511" 하나로 뭉뚱그려짐) 개별 건물·상점 단위 길찾기가 사실상 불가능. → **위도/경도 좌표를 자체적으로 보유·관리하고, 사용자에게는 좌표를 노출하지 않은 채 "길찾기" 버튼 클릭 시 좌표 기반 딥링크로 지도 앱(카카오맵/네이버맵/구글맵)을 실행**하는 방식으로 우회.
- 작성자가 방학 동안 미리 리서치해 둔 외국인등록증·비자, 유심, 휴대폰 개통, 건강보험, 은행 계좌, 티머니, 네이버지도 외국어 버전, 코레일 예매 등 생활정보 글(블로그 프롬프트 양식 보유)을 재사용해 "정보 허브"로 제공.
- 1주일 내 배포가 목표이므로 **범위는 반응형 웹사이트 단독**으로 확정. PWA/크롬 확장/네이티브 앱은 15장 로드맵에 가능성만 남김.

### 1.3 배포 형태 (확정)
- 반응형 웹사이트 (모바일 우선, 데스크톱 대응)
- 로그인 없이도 전체 열람 가능. 로그인 시 즐겨찾기/저장 기능 활성화(9장)
- 오리엔테이션 당일 QR코드/링크로 안내

---

## 2. 목표 및 성공 지표 (제안 — 확정 필요)

| 목표 | 지표 (안) |
|---|---|
| 오리엔테이션에서 "쓸만하다"고 느끼게 하기 | 오리엔테이션 당일 QR 스캔/접속 수 |
| 학기 중 재방문 습관 형성 | 오리엔테이션 이후 주간 재방문율(WAU/오리엔테이션 참석자 수) |
| 지도 기반 실제 이용 | 길찾기(딥링크 클릭) 수, 카테고리 필터 클릭 수 |
| 생활정보 콘텐츠 활용 | 정보 섹션 검색/조회 수, 인기 문서 Top 5 |
| 커뮤니티 유입 | SNS 링크/QR 클릭 수 |

> 실제 목표치는 오리엔테이션 참석 인원(예상치) 확보 후 확정 필요.

---

## 3. 타겟 사용자

- **1차 (핵심)**: 2026 Fall 학기 KUS 신규 교환학생·유학생 (영어 사용, 입국 직후~학기 초 적응기)
- **2차**: 이미 재학 중인 기존 유학생 (학기 중 정보 재검색)
- **3차 (열람 전용)**: 국제처 직원, KUS-Buddy (콘텐츠 오탈자/현행화 피드백 채널로 간접 활용 가능 — 로드맵)

---

## 4. 정보구조 (IA) / 헤더 내비게이션

```
[로고/사이트명]   Map   Life in Korea   Community   (Search 아이콘)   [Log in / My]
```

| 메뉴 | 설명 |
|---|---|
| **Map** | 캠퍼스 지도 + 카테고리 필터 + 장소 상세 + 길찾기 |
| **Life in Korea** | 생활정보 아티클 허브 (검색/카테고리) |
| **Community** | SNS 오픈채팅/그룹 링크·QR 안내 |
| **Log in / My** | 비로그인 시 "Log in", 로그인 시 "My"(저장한 장소·글 목록) |
| (헤더 하단 고정 배너, 선택) | "Academic Calendar" 바로가기 — 2026 Fall 주요 일정 요약 위젯 |

> Contents/About/Contact는 푸터로 이동(오리엔테이션 PPT의 Contact 정보 포함, 6.6 참조).

---

## 5. 핵심 사용자 흐름

```
[진입 — QR/링크]
    ↓
[홈: 지도 미리보기 + 오늘의 학사일정 + 정보 섹션 하이라이트]
    ↓                              ↓                        ↓
[Map 탭]                    [Life in Korea 탭]        [Community 탭]
    ↓                              ↓                        ↓
카테고리 아이콘 클릭          검색/카테고리 필터        SNS 링크·QR 노출
    ↓                              ↓
장소 마커 클릭 → 상세 패널    아티클 클릭 → 상세 뷰
    ↓                              ↓
"길찾기" 버튼 → 지도 앱 딥링크  (로그인 시) 저장 버튼
    ↓
(로그인 시) 즐겨찾기 저장
```

- 비로그인 사용자도 지도/정보/커뮤니티 전체 열람·검색·길찾기 가능(핵심 원칙).
- 로그인은 "저장" 시점에만 유도(모달) — 가입 장벽을 낮춤.

---

## 6. 핵심 시나리오

### 시나리오 1. 오리엔테이션 당일 — QR 스캔 직후
- 신입 교환학생이 오리엔테이션장(농심국제관 중앙광장)에서 QR 스캔 → 홈 화면에서 오늘 날짜 기준 "Fall 2026 Key Dates" 위젯(다음 주요 일정 강조) + 지도 미리보기 노출 → Map 탭으로 이동해 자기 기숙사(예: Futurus) 위치 확인 → 길찾기로 실제 이동

### 시나리오 2. 입국 첫 주 — 외국인등록증/유심 정보 검색
- 아직 휴대폰 번호가 없어 불안한 상태 → Life in Korea 탭 → 검색창에 "SIM" 입력 또는 "Getting Started" 카테고리 클릭 → "USIM & Phone Number" 아티클 열람 → 관련 아티클로 "ARC & Visa", "Bank Account" 추천 노출 → 로그인 후 저장(나중에 다시 보려고)

### 시나리오 3. 밥 먹을 곳/편의점 찾기 (지도 카테고리 필터)
- 강의 사이 공강 시간에 배고픔 → Map 탭 → "Cafeteria/Food" 아이콘 클릭 → 캠퍼스 내 학생식당(Gusia Foodmarket, Hoik Plaza), 카페(Ediya, Bread&co, Grazie, Coffee Mama) 마커만 필터링되어 표시 → 가까운 카페 마커 클릭 → 상세 패널(영업정보/위치 설명) → 길찾기

### 시나리오 4. 세탁·편의점·프린터 등 생활 밀착 시설 찾기
- 프린트가 필요함 → "Printing" 카테고리 클릭 → 농심국제관 1층 유료 프린트, 도서관 등 표시 → 가장 가까운 곳 선택

### 시나리오 5. 커뮤니티 참여
- 같은 학기 유학생들과 소통하고 싶음 → Community 탭 → 오픈채팅 QR/링크 확인 → 앱으로 이동해 참여 (사이트 내 채팅 기능은 만들지 않음, 명확히 외부 연결)

### 시나리오 6. 학기 중 재방문 — 코레일 예매
- 추석 연휴(9/24~26)에 여행 계획 → Life in Korea에서 "Korail" 검색 → 예매 방법 아티클 확인

### 시나리오 7. (오리엔테이션 이후) 개발자의 데이터 확인
- 오리엔테이션 다음 날, 작성자가 관리자 대시보드(비공개)에 접속 → 시간대별 방문자 수, 어떤 카테고리/아티클이 가장 많이 검색됐는지 확인 → 콘텐츠 우선순위 조정에 활용 (13장)

### 시나리오 8. 오류 상황 — 지도 로드 실패 / 검색 결과 없음
- Wi-Fi 불안정 등으로 지도 타일 로드 실패 → 재시도 안내 배너
- 검색어에 해당하는 아티클/장소 없음 → "결과 없음" + 추천 카테고리 노출

---

## 7. 기능 명세 — Map (핵심 기능)

### 7.1 지도 엔진
- **Leaflet.js + OpenStreetMap 타일** (완전 무료, API 키 불필요)
- 중심 좌표: 고려대 세종캠퍼스(조치원읍) 고정, 초기 줌 레벨은 캠퍼스 전체가 보이는 수준
- OSM 타일의 한글 지명 밀도가 낮은 지역 특성상, **건물/상점 마커와 라벨은 100% 자체 큐레이션 데이터로 오버레이**(타일 자체의 라벨에 의존하지 않음)

### 7.2 카테고리 필터 (아이콘 토글)
PPT 반영 필수 카테고리:

| 카테고리 | 포함 장소 (PPT 근거) |
|---|---|
| 🏫 Academic/Admin | Administration Building, Library, Public Policy Building, Science & Tech Building I/II, 각 단과대 |
| 🏠 Dormitory | Futurus, Veritas, Justitia, Libertas Dormitory |
| 🍽 Cafeteria | Gusia Foodmarket(학생회관), Professor & Employee Cafeteria, Hoik Plaza |
| ☕ Cafe | Ediya Coffee, Bread&co, Grazie(도서관), Coffee Mama(석원관) |
| 🏪 Convenience Store | GS25(퓨처러스관 뒤/공공정책관), 세븐일레븐(자유관/베리타스관 식당) |
| 🖨 Printing | 농심국제관 1층(유료), 도서관 |
| 🧺 Laundry | (오리엔테이션 자료에 미기재 — 오픈 이슈, 개강 전 현장 확인 필요) |
| 🏥 Health/Support | Student Counseling Center(Bread&Co 옆), Post Office/Health Office(학생회관), 병원·클리닉 안내 링크 |
| 💪 Sports/Fitness | iPark Fitness Center, Sports Complex, Gymnasium, Tennis Court |
| 🏦 ATM/Bank | 도서관 내 ATM |
| 🚌 Shuttle | 도서관 앞 정류장(조치원역 상시/오송역 하루 2회) |
| 📚 Study Lounge | 문화체육관, S&T Building 메이커스페이스/크림슨라운지, 약대라운지, 도서관 라운지/그룹스터디룸, 농심홀라운지, Classroom SEMO |
| 🅿 Parking | Free Parking Area(정문/동문) |
| 🐯 Landmark | Tiger Statue, Sejong Amphitheater, Central Square |

- 각 아이콘은 토글형(다중 선택 가능)이며, 선택된 카테고리의 마커만 지도에 노출(네이버지도 카테고리 필터 UX 참고)
- 아이콘 스타일은 8장 디자인 가이드에 따라 일러스트 톤으로 통일 제작

### 7.3 장소 상세 패널
마커 클릭 시 하단/사이드 패널에 노출:
- 장소명(영문), 카테고리, 한 줄 설명
- 운영시간/비고(있는 경우)
- **"Get Directions" 버튼** → 내부 보유 위경도로 딥링크 생성, 새 창/앱으로 연결 (7.4)
- 로그인 시 "☆ Save" 버튼

### 7.4 길찾기(딥링크) 명세
- 사용자에게 좌표 텍스트는 절대 노출하지 않음. 버튼 클릭 시 아래 우선순위로 딥링크 시도:
  1. 모바일 웹 + 카카오맵 설치: `kakaomap://route?ep={lat},{lng}&by=FOOT`
  2. 미설치/데스크톱: 웹 폴백 — Google Maps `https://www.google.com/maps/dir/?api=1&destination={lat},{lng}` (외국인 유학생 다수가 Google Maps에 익숙 — PPT에도 없지만 해외 사용자 편의 고려)
  3. 대안: 네이버맵 웹 링크 `https://map.naver.com/p/directions/-/{lat},{lng}` (Useful Apps에 네이버지도가 포함되어 있으므로 병행 제공 — "Open in" 선택 UI로 2~3개 앱 중 고르게 함)
- 프로토콜/URL 스킴은 실제 개발 착수 시점에 최신 스펙 재검증 필요(오픈 이슈)

### 7.5 장소(POI) 데이터 스키마

| 필드 | 타입 | 설명 |
|---|---|---|
| `id` | string | 고유 식별자 |
| `nameEn` | string | 영문 장소명 |
| `category` | enum | 7.2의 카테고리 |
| `latitude` / `longitude` | float | 내부 전용, UI 비노출 |
| `descriptionEn` | string | 한 줄 설명 |
| `hours` | string \| null | 운영시간 |
| `buildingRef` | string \| null | 소속 건물(있는 경우) |
| `iconAssetKey` | string | 8장 디자인 아이콘 세트 키 |
| `isCurated` | boolean | true(자체 조사) / false(추후 사용자 제보 — 로드맵) |
| `sourceNote` | string | 출처(오리엔테이션 PPT/현장 확인 등, 내부 관리용) |
| `updatedAt` | ISO8601 | 현행화 확인용 |

---

## 8. 기능 명세 — Life in Korea (생활정보 허브)

### 8.1 콘텐츠 구조
- 아티클(블로그형 글) 목록 + 검색 + 카테고리 필터
- 작성자가 보유한 프롬프트 양식으로 지속 생성 예정 → **아티클을 코드에 하드코딩하지 않고 CMS성 데이터(JSON/헤드리스 CMS 또는 마크다운 파일 기반)로 관리**해 추가/수정이 배포 없이 가능하도록 설계 (8.3)

### 8.2 오리엔테이션 기준 필수 아티클 (1차 세트)
| 카테고리 | 아티클 |
|---|---|
| Immigration | Alien Registration Card (ARC) & Visa |
| Mobile | USIM, Getting a Phone Number |
| Insurance | 건강보험 가입 및 납부 (National Health Insurance) |
| Banking | 은행 계좌 개설 및 이용 방법 |
| Transportation | T-money 발급·충전·사용법 |
| Transportation | Naver Map 외국어 버전 사용법 |
| Transportation | 코레일(Korail) 승차권 예매 방법 |
| Campus Life | Academic Calendar 2026 Fall (10장 데이터 기반 자동 위젯 + 상세 링크) |
| Campus Life | Useful Apps (Papago, KakaoTalk, Naver Map, Hana Bank — PPT 근거, 11장) |
| Campus Life | Korea University Official Portal 안내(QR 대체 — 12장) |

> 8개 항목은 사용자가 이미 리서치·프롬프트화 완료 — 콘텐츠 제작이 아닌 **탑재 파이프라인**이 개발 과제.

### 8.3 콘텐츠 파이프라인 (제안)
- 형식: Markdown + Frontmatter(제목/카테고리/태그/작성일/썸네일)
- 검색: 제목+본문 텍스트 기반 클라이언트 사이드 검색(초기 규모엔 Fuse.js 등으로 충분, 서버 검색 인프라 불필요)
- 신규 글 추가 시: 마크다운 파일 추가 + 배포(1주일 내는 이 방식이 가장 빠름). 이후 편집 빈도가 높아지면 헤드리스 CMS 전환 고려(로드맵)

### 8.4 아티클 데이터 스키마
| 필드 | 타입 | 설명 |
|---|---|---|
| `slug` | string | URL 식별자 |
| `titleEn` | string | 제목 |
| `category` | enum | Immigration/Mobile/Insurance/Banking/Transportation/Campus Life 등 |
| `tags` | string[] | 검색 보조 키워드 |
| `bodyMd` | string | 본문(마크다운) |
| `summary` | string | 목록 카드용 요약 |
| `publishedAt` / `updatedAt` | ISO8601 | |
| `relatedSlugs` | string[] | 관련 글 추천(시나리오 2 근거) |

---

## 9. 로그인 / 계정

- **원칙(확정)**: 비로그인으로 전체 콘텐츠 열람·검색·길찾기 가능. 로그인은 "저장(Save)" 기능에서만 요구 — "밥 먹으러 와" 프로젝트와 동일한 접근.
- 저장 가능 대상: 지도 장소(즐겨찾기), 생활정보 아티클(북마크)
- 인증 방식(제안): 이메일 매직링크 또는 구글 소셜 로그인 — 유학생 다국적 특성상 이메일 기반이 국가별 SNS 계정 편차 리스크가 적음(오픈 이슈, 확정 필요)
- MVP 범위에서 별도 프로필/설정 화면은 최소화 — "My" 페이지는 저장 목록만 노출

---

## 10. Academic Calendar 위젯 (2026 Fall)

PPT 원본 데이터를 구조화해 홈/Life in Korea에 위젯으로 노출:

| 날짜 | 이벤트 | 비고 |
|---|---|---|
| Sep 1 | Fall Semester 2026 Begins | |
| Sep 1 | Welcome Event for International Students | Central Plaza, Nongshim Int'l Hall |
| Sep 2–4 | Course Add/Drop & Registration Confirmation | |
| Sep 24–26 | Chuseok Holiday | 휴강 |
| Oct 2–3 | Korea-Yonsei Games (Go-Yon Jeon) | 셔틀버스 지원, 9월 초 신청 |
| Oct 5 | Substitute Holiday (National Foundation Day) | |
| Oct 9 | Hangeul Day | 공휴일 |
| Oct 20–26 | Mid-term Exam Week | |
| Nov (TBD) | Global Crimson Day | 전체 유학생 네트워킹 |
| Dec 14–18 | Final Exam Week | |
| Dec 21 | Winter Vacation Begins | |

- "오늘 기준 다음 일정" 자동 하이라이트(현재일 비교 로직)
- 데이터는 8.3과 동일하게 JSON/마크다운으로 관리 → 학기별 갱신 용이

---

## 11. Useful Apps 섹션

PPT 4종 유지 + 링크(스토어) 카드 형태로 Life in Korea 또는 홈 위젯에 노출:
1. Papago (번역)
2. KakaoTalk (메신저)
3. Naver Map (지도 — 외국어 버전 사용법은 8.2 아티클로 상세 안내)
4. Hana Bank (은행 — 1Q 앱)

---

## 12. 기타 오리엔테이션 정보 반영 체크리스트

| PPT 항목 | 사이트 반영 위치 |
|---|---|
| Nongshim International Hall (Int'l Student Services Office Rm 102, Study Lounge, Printing, Central Plaza events) | Map POI + 상세정보 |
| Academic Information Center(Library) — 학생증 발급, 24시간 열람실, 셔틀버스 정류장, ATM, 카페&기념품샵 | Map POI + Life in Korea "Getting Your Student ID" 아티클(신규 제안) |
| Study Lounge 6종(문화체육관, S&T Makerspace/Crimson Lounge, 약대라운지, 도서관 라운지/그룹스터디룸, 농심홀라운지, Classroom SEMO) | Map "Study Lounge" 카테고리 |
| 기숙사 4개동(Futurus-Sky Café, Veritas-학생식당, Justitia-택배보관소, Libertas-분실 열쇠 재발급) | Map "Dormitory" 카테고리 + 상세 설명 |
| 편의점/카페/학생식당/우체국·보건소/헬스장/상담센터 | Map 각 카테고리 |
| 병원·클리닉 안내 링크(국제처 페이지) | Life in Korea "Health" 카테고리에 외부 링크 카드로 연결 |
| Korea University Official Portal QR | Life in Korea "Campus Life" 아티클 + 사이트 자체 QR로 대체 재생성 |
| Contact(국제처 전화/이메일/오피스 위치) | 푸터 + Life in Korea "Contact & Support" 고정 항목 |
| KUS-Buddy 안내("Ask KUS-Buddy if you have questions") | 사이트 내 "Need Help?" 배너에 KUS-Buddy/국제처 연락처 노출(챗봇 아님, 안내 문구) |

> 이 표는 "충분함" 기준의 완결성 체크리스트로, 개발 착수 전 최종 1회 더 대조 확인 권장.

---

## 13. 관리자 분석 대시보드 (비공개, 개발자 전용)

쇼핑리뷰 분석 도구 PRD와 동일하게 **시각화 대시보드** 형태로 제공하되, 이번엔 자체 웹사이트 방문자 분석.

### 13.1 접근 제어
- 별도 관리자 로그인(9장의 일반 사용자 로그인과 분리된 계정) 또는 특정 이메일(jeaneeyi2004@gmail.com) 화이트리스트 방식
- 일반 사용자 화면 어디에서도 진입 경로 노출 안 함(URL 직접 접근 + 인증)

### 13.2 수집 지표
| 지표 | 설명 |
|---|---|
| 시간대별 방문자 수 | 24시간 히트맵 또는 시계열 그래프 |
| 일별/주간 방문 추이 | 오리엔테이션 전후 비교 목적 |
| 주요 검색어(Top N) | Life in Korea 검색창 입력어 집계 |
| 인기 아티클/카테고리 | 조회수 기준 랭킹 |
| 인기 지도 카테고리/장소 | 필터·마커 클릭 집계 |
| 세션당 체류시간 / 방문 페이지 수 | 참여도 지표 |
| 유입 경로 | QR 직접 접속 vs 링크 공유 등(UTM 파라미터 활용) |
| 디바이스/언어 | 모바일 비중, 브라우저 언어 설정(국가 추정 보조지표) |

### 13.3 구현 방향 (제안)
- 1차: **Google Analytics 4** 연동으로 표준 지표 즉시 확보(1주일 내 가장 빠른 방법)
- 2차(로드맵): 검색어·카테고리 클릭 등 커스텀 이벤트는 GA4 커스텀 이벤트로 전송 + 자체 대시보드(Recharts 등)로 재시각화해 "개발자 전용 페이지"에서 한눈에 보기
- 개인 식별 정보(비로그인 사용자의 IP 등)는 수집·저장 최소화, GA4 IP 익명화 옵션 사용

---

## 14. 상태 정의 (공통)

공통 비동기 상태: `IDLE` → `LOADING` → `SUCCESS` | `ERROR` | `EMPTY`

| 화면 | 흐름 |
|---|---|
| 지도 초기 로드 | LOADING(스켈레톤/스피너) → SUCCESS(타일+마커) / ERROR(재시도 배너) |
| 카테고리 필터 | 클라이언트 사이드 필터링 — LOADING 없음, 즉시 반영 |
| 길찾기 딥링크 | 클릭 즉시 새 창/앱 오픈 시도 — 실패 시 폴백 URL 순차 시도(7.4) |
| 정보 검색 | IDLE → LOADING → SUCCESS(목록) / EMPTY(결과 0건) |
| 저장(즐겨찾기/북마크) | 비로그인 시 클릭 → 로그인 유도 모달 / 로그인 시 즉시 반영(토스트) |

---

## 15. 오픈 이슈 & 로드맵

- [ ] Laundry(세탁방) 위치 — 오리엔테이션 자료에 없음, 개강 전 현장 확인 필요
- [ ] 딥링크 URL 스킴은 개발 착수 시점 최신 스펙으로 재검증(카카오맵/네이버맵/구글맵 정책 변동 가능)
- [ ] 로그인 인증 방식 최종 확정(이메일 매직링크 vs 소셜 로그인)
- [ ] 관리자 대시보드 1차(GA4)/2차(커스텀) 범위 확정
- [ ] **향후 확장**: PWA(홈 화면 추가) → 크롬 확장/네이티브 앱은 이용 패턴 검증 후 재검토(이번 배포 범위 아님)
- [ ] 사용자 제보형 POI 추가(신뢰도 검증 프로세스 필요) — 장기 로드맵
- [ ] 다국어(영어 외 추가 언어) 지원 여부 — 1차는 영문 단일

---

## 16. 디자인 가이드 적용 방향 (design.md 구조 차용, 톤은 신규)

> `design.md`("밥 먹으러 와")는 **구조(60:30:10 컬러 비율, 타이포 대비, 인터랙션 원칙)만 차용**하고, 무드/컬러/캐릭터는 본 서비스에 맞게 새로 정의. 캐릭터(할머니 일러스트)는 사용하지 않음.

### 16.1 무드
- 고려대 세종캠퍼스 공식 아이덴티티(크림슨/아이보리)를 살리되, "학교 공식 페이지"보다는 **친근하고 명확한 정보 서비스** 톤. 올드해 보이지 않도록 여백·아이콘 중심의 모던한 레이아웃 유지.
- 지도/아이콘은 오리엔테이션 PPT의 일러스트 캠퍼스맵 스타일(플랫 일러스트)과 톤을 맞춰 카테고리 아이콘 세트를 통일 제작.

### 16.2 컬러 (60:30:10 원칙 유지)
| 비율 | 역할 | 톤 |
|---|---|---|
| 60% (베이스) | 배경/여백 | 오프화이트/아이보리 |
| 30% (서브) | 구조(헤더, 카드 테두리, 아이콘) | 고려대 크림슨의 저채도 톤 또는 뉴트럴 그레이 |
| 10% (포인트) | CTA/강조(길찾기 버튼, 로그인, 카테고리 선택 상태) | 고려대 공식 크림슨(비비드 레드 계열) — 브랜드와 자연스럽게 합치 |

### 16.3 타이포그래피
- 본문: 가독성 높은 산세리프(다국적 사용자 대상이므로 라틴 알파벳 가독성 최우선, 손글씨체 지양)
- 헤드라인: 세리프 또는 약간의 개성 있는 산세리프(고려대 로고의 세리프 톤과 통일감)

### 16.4 인터랙션 & 접근성
- 카드/버튼 호버 시 elevation 효과, 지도 마커 호버 시 확대
- 부드러운 스크롤(섹션 앵커 이동)
- **큰글씨 모드** 접근성 토글 유지(다국적 사용자 중 시인성 이슈 고려 시 유용)
- 지도 확대/축소(Leaflet 기본 제공)

---

## 17. 기술 스택 (제안 — 1주일 배포 기준)

- 프레임워크: Next.js(React) — 정적 페이지 위주라 배포 속도/SEO 유리
- 지도: Leaflet.js + react-leaflet + OpenStreetMap 타일
- 콘텐츠: Markdown 파일 기반(8.3) → 추후 헤드리스 CMS 전환 여지
- 검색: Fuse.js(클라이언트 사이드)
- 인증: 이메일 매직링크 또는 Google OAuth(Supabase Auth 등 활용 시 저장 기능까지 빠르게 구현 가능)
- 분석: GA4(1차), 커스텀 대시보드(2차)
- 배포: Vercel(무료 티어로 1주일 내 배포 충분)

---

## 18. 다음 단계

1. 본 PRD 오픈 이슈(15장) 확정
2. Map POI 데이터(7.5 스키마) 실제 좌표 수집 — 현장 실사 또는 지도 서비스 좌표 조회
3. 8.2 필수 아티클 8개, 보유 리서치 원고를 프롬프트로 변환 → 마크다운화
4. 카테고리 아이콘 세트 제작(16.1 톤 기준)
5. 개발 착수(17장 스택 기준)

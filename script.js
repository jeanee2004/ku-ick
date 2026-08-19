'use strict';

/* =========================================================================
   DATA
   - Place coordinates are hand-placed approximations pending an on-site
     survey (see PRD §7.5/§15) — this is a real, ongoing caveat, not a demo
     placeholder, so it stays flagged in the UI.
   - Article bodies for Immigration/Mobile/Insurance/Banking/Transportation
     are stand-ins for the author's own researched drafts, which will be
     swapped in separately — that MOCK_NOTE stays until then.
   - The Fall 2026 academic calendar below is transcribed from real
     orientation materials (PRD §10), not invented — only the map
     coordinates and the Life in Korea article bodies are placeholders.
   - Community link/QR are genuinely unset (no group exists yet).
   - Useful Apps, Emergency numbers, and outside links (HiKorea, NHIS,
     Korail, T-money, Korea University's own sites) are real public
     services/URLs, checked against their official domains.
   ========================================================================= */

const CAMPUS_CENTER = { lat: 36.6100, lng: 127.2938 }; // approximate KU Sejong campus center — pending survey

const CATEGORY_META = {
  academic:    { icon: '🏫', label: 'Academic/Admin', group: 'g-academic' },
  dorm:        { icon: '🏠', label: 'Dormitory', group: 'g-living' },
  cafeteria:   { icon: '🍽', label: 'Cafeteria', group: 'g-living' },
  cafe:        { icon: '☕', label: 'Cafe', group: 'g-living' },
  convenience: { icon: '🏪', label: 'Convenience Store', group: 'g-living' },
  printing:    { icon: '🖨', label: 'Printing', group: 'g-academic' },
  laundry:     { icon: '🧺', label: 'Laundry', group: 'g-living' },
  health:      { icon: '🏥', label: 'Health/Support', group: 'g-health' },
  sports:      { icon: '💪', label: 'Sports/Fitness', group: 'g-active' },
  atm:         { icon: '🏦', label: 'ATM/Bank', group: 'g-transit' },
  shuttle:     { icon: '🚌', label: 'Shuttle', group: 'g-transit' },
  study:       { icon: '📚', label: 'Study Lounge', group: 'g-academic' },
  parking:     { icon: '🅿', label: 'Parking', group: 'g-transit' },
  landmark:    { icon: '🐯', label: 'Landmark', group: 'g-active' },
};

const CATEGORY_GROUPS = [
  { id: 'g-academic', label: 'Academic & Study' },
  { id: 'g-living',   label: 'Housing & Daily Life' },
  { id: 'g-health',   label: 'Health & Support' },
  { id: 'g-transit',  label: 'Getting Around' },
  { id: 'g-active',   label: 'Sports & Landmarks' },
];

// Approximate offsets around CAMPUS_CENTER, hand-placed pending an on-site survey.
const places = [
  { id: 'p1',  nameEn: 'Nongshim International Hall', category: 'academic', dLat: 0.0000, dLng: 0.0005, desc: "International Student Services Office (Rm 102), study lounge, printing, and Central Plaza events.", hours: null },
  { id: 'p2',  nameEn: 'Administration Building', category: 'academic', dLat: 0.0010, dLng: -0.0010, desc: 'Main administration offices.', hours: null },
  { id: 'p3',  nameEn: 'Library (Academic Information Center)', category: 'academic', dLat: -0.0006, dLng: 0.0012, desc: "Student ID issuance, 24-hour reading room, shuttle stop, ATM, cafe & gift shop.", hours: null },
  { id: 'p4',  nameEn: 'Public Policy Building', category: 'academic', dLat: 0.0018, dLng: 0.0006, desc: 'Public policy college classrooms and offices.', hours: null },
  { id: 'p5',  nameEn: 'Science & Tech Building I', category: 'academic', dLat: 0.0022, dLng: -0.0004, desc: 'Science & engineering classrooms and labs.', hours: null },
  { id: 'p6',  nameEn: 'Science & Tech Building II', category: 'academic', dLat: 0.0026, dLng: -0.0008, desc: 'Science & engineering classrooms and labs.', hours: null },
  { id: 'p7',  nameEn: 'Futurus Dormitory', category: 'dorm', dLat: -0.0018, dLng: -0.0020, desc: 'Residence hall with Sky Cafe.', hours: null },
  { id: 'p8',  nameEn: 'Veritas Dormitory', category: 'dorm', dLat: -0.0022, dLng: -0.0016, desc: 'Residence hall with its own student cafeteria.', hours: null },
  { id: 'p9',  nameEn: 'Justitia Dormitory', category: 'dorm', dLat: -0.0024, dLng: -0.0022, desc: 'Residence hall; parcel storage on site.', hours: null },
  { id: 'p10', nameEn: 'Libertas Dormitory', category: 'dorm', dLat: -0.0020, dLng: -0.0026, desc: 'Residence hall; lost key reissue at front desk.', hours: null },
  { id: 'p11', nameEn: 'Gusia Foodmarket', category: 'cafeteria', dLat: 0.0002, dLng: -0.0002, desc: 'Main student hall cafeteria.', hours: null },
  { id: 'p12', nameEn: 'Hoik Plaza', category: 'cafeteria', dLat: 0.0008, dLng: 0.0014, desc: 'Campus food court / dining plaza.', hours: null },
  { id: 'p13', nameEn: 'Professor & Employee Cafeteria', category: 'cafeteria', dLat: 0.0012, dLng: -0.0012, desc: 'Cafeteria open to staff and faculty.', hours: null },
  { id: 'p14', nameEn: 'Ediya Coffee', category: 'cafe', dLat: 0.0004, dLng: 0.0008, desc: 'Coffee chain on campus.', hours: null },
  { id: 'p15', nameEn: 'Bread&Co', category: 'cafe', dLat: 0.0006, dLng: 0.0002, desc: 'Bakery cafe; Student Counseling Center is next door.', hours: null },
  { id: 'p16', nameEn: 'Grazie', category: 'cafe', dLat: -0.0004, dLng: 0.0014, desc: 'Cafe inside the library.', hours: null },
  { id: 'p17', nameEn: 'Coffee Mama', category: 'cafe', dLat: 0.0016, dLng: 0.0010, desc: 'Cafe in Seokwon Hall.', hours: null },
  { id: 'p18', nameEn: 'GS25', category: 'convenience', dLat: -0.0014, dLng: -0.0018, desc: 'Convenience store near Futurus / Public Policy Building.', hours: null },
  { id: 'p19', nameEn: '7-Eleven', category: 'convenience', dLat: -0.0020, dLng: -0.0014, desc: 'Convenience store near Jayu Hall / Veritas cafeteria.', hours: null },
  { id: 'p20', nameEn: 'Printing — Nongshim Int’l Hall 1F', category: 'printing', dLat: 0.0000, dLng: 0.0006, desc: 'Paid self-service printing, 1st floor.', hours: null },
  { id: 'p21', nameEn: 'Printing — Library', category: 'printing', dLat: -0.0006, dLng: 0.0012, desc: 'Paid self-service printing inside the library.', hours: null },
  { id: 'p22', nameEn: 'Student Counseling Center', category: 'health', dLat: 0.0005, dLng: 0.0009, desc: 'Counseling support, next to Bread&Co.', hours: null },
  { id: 'p23', nameEn: 'Post Office / Health Office', category: 'health', dLat: 0.0003, dLng: -0.0001, desc: 'Inside the student hall.', hours: null },
  { id: 'p24', nameEn: 'iPark Fitness Center', category: 'sports', dLat: 0.0030, dLng: 0.0002, desc: 'Campus gym.', hours: null },
  { id: 'p25', nameEn: 'Sports Complex / Gymnasium', category: 'sports', dLat: 0.0028, dLng: -0.0002, desc: 'Indoor gymnasium and sports complex.', hours: null },
  { id: 'p26', nameEn: 'Tennis Court', category: 'sports', dLat: 0.0032, dLng: 0.0006, desc: 'Outdoor tennis courts.', hours: null },
  { id: 'p27', nameEn: 'ATM (Library)', category: 'atm', dLat: -0.0006, dLng: 0.0012, desc: 'Bank ATM inside the library.', hours: null },
  { id: 'p28', nameEn: 'Shuttle Stop — Library', category: 'shuttle', dLat: -0.0007, dLng: 0.0011, desc: 'Shuttle to Jochiwon Station runs regularly; Osong Station twice daily.', hours: null },
  { id: 'p29', nameEn: 'Crimson Lounge (S&T Makerspace)', category: 'study', dLat: 0.0024, dLng: -0.0006, desc: 'Maker space and study lounge.', hours: null },
  { id: 'p30', nameEn: 'Nongshim Hall Lounge', category: 'study', dLat: 0.0001, dLng: 0.0005, desc: 'Study lounge inside Nongshim International Hall.', hours: null },
  { id: 'p31', nameEn: 'Culture & Sports Center Lounge', category: 'study', dLat: 0.0027, dLng: 0.0000, desc: 'Study lounge in the culture & sports building.', hours: null },
  { id: 'p32', nameEn: 'Classroom SEMO', category: 'study', dLat: 0.0014, dLng: 0.0004, desc: 'Bookable classroom/study space.', hours: null },
  { id: 'p33', nameEn: 'Free Parking Area (Main Gate)', category: 'parking', dLat: -0.0002, dLng: -0.0030, desc: 'Free parking near the main and east gates.', hours: null },
  { id: 'p34', nameEn: 'Tiger Statue', category: 'landmark', dLat: 0.0000, dLng: 0.0000, desc: 'Korea University’s tiger landmark — a popular photo spot.', hours: null },
  { id: 'p35', nameEn: 'Sejong Amphitheater', category: 'landmark', dLat: 0.0010, dLng: 0.0002, desc: 'Outdoor amphitheater for campus events.', hours: null },
  { id: 'p36', nameEn: 'Central Plaza', category: 'landmark', dLat: 0.0002, dLng: 0.0004, desc: 'Central Plaza — hosts the Welcome Event for international students.', hours: null },
];

// Placeholder copy pending the author's own researched drafts.
const MOCK_NOTE = 'This is placeholder guide text for layout/demo purposes — replace with the real researched article.';

const articles = [
  { slug: 'arc-visa', titleEn: 'Alien Registration Card (ARC) & Visa', category: 'Immigration', tags: ['arc', 'visa', 'immigration', 'registration', 'd-2', 'd-4'],
    summary: 'What the ARC is, when to apply, and what documents you’ll need.',
    body: [MOCK_NOTE, 'International students generally register for an Alien Registration Card (ARC) within 90 days of entering Korea, at the immigration office covering their address. Bring your passport, visa, a passport photo, proof of enrollment, and the application fee.', 'The ARC doubles as your Korean ID for phone contracts, bank accounts, and health insurance, so getting it early unblocks almost everything else on this list.', 'Apply or check requirements on the official HiKorea portal (hikorea.go.kr) — see the Emergency & Safety section for the link and the multilingual immigration hotline.'],
    relatedSlugs: ['usim-phone', 'bank-account', 'health-insurance'] },

  { slug: 'usim-phone', titleEn: 'Getting a SIM Card & Phone Number', category: 'Mobile', tags: ['usim', 'sim', 'phone', 'mobile', 'number'],
    summary: 'How to get a Korean phone number as a new international student.',
    body: [MOCK_NOTE, 'Most students get either a prepaid USIM (no contract, easiest before your ARC arrives) or a standard carrier plan (usually requires an ARC). Carrier stores and kiosks near campus and at the airport both sell USIMs.', 'Keep your number consistent once you get on — it’s tied to bank apps, delivery apps, and most Korean sign-up flows.'],
    relatedSlugs: ['arc-visa', 'bank-account'] },

  { slug: 'health-insurance', titleEn: 'National Health Insurance: Enrollment & Payment', category: 'Insurance', tags: ['insurance', 'health', 'nhi', 'hospital'],
    summary: 'Enrolling in National Health Insurance (NHI) and paying premiums.',
    body: [MOCK_NOTE, 'International students staying long-term are generally enrolled in National Health Insurance (NHI), either automatically or through the university. Monthly premiums are billed and can usually be paid by bank transfer or auto-debit.', 'Carry your NHI status (or ARC) when visiting a clinic — it substantially lowers the out-of-pocket cost.', 'Official info and enrollment status: the National Health Insurance Service site, nhis.or.kr (English version available) — linked in Emergency & Safety.'],
    relatedSlugs: ['bank-account', 'arc-visa'] },

  { slug: 'bank-account', titleEn: 'Opening a Bank Account in Korea', category: 'Banking', tags: ['bank', 'account', 'banking', 'debit card'],
    summary: 'What you need to open a Korean bank account as a student.',
    body: [MOCK_NOTE, 'Banks typically ask for your passport, ARC (or proof it’s in process), proof of enrollment, and sometimes a Korean phone number. Campus-adjacent branches are used to processing student accounts.', 'A Korean bank account and debit card are usually required before T-money auto-charge, some phone plans, and most part-time-job payroll.', 'Mobile-first alternatives like Toss and KakaoBank are popular with students too — see Useful Apps → Banking.'],
    relatedSlugs: ['arc-visa', 'usim-phone', 'tmoney'] },

  { slug: 'tmoney', titleEn: 'T-money: Getting, Charging, and Using Your Transit Card', category: 'Transportation', tags: ['tmoney', 'transit', 'bus', 'subway', 'card'],
    summary: 'Getting a T-money card and using it on buses, subways, and at convenience stores.',
    body: [MOCK_NOTE, 'T-money cards are sold at convenience stores (GS25, 7-Eleven, etc.) near campus and can be topped up with cash at the same stores or at subway station machines.', 'It covers city buses, intercity buses, subways, and can even be used like a small prepaid card at some shops.', 'Official info: t-money.co.kr — see Useful Apps → Transit & Payments.'],
    relatedSlugs: ['naver-map-foreign', 'korail'] },

  { slug: 'naver-map-foreign', titleEn: 'Using Naver Map in a Foreign Language', category: 'Transportation', tags: ['naver map', 'navigation', 'directions', 'language'],
    summary: 'Switching Naver Map to English (or another language) for easier navigation.',
    body: [MOCK_NOTE, 'Naver Map’s app settings let you switch the display language, which also affects transit directions and place names — useful since Korean addresses can be hard to search from a Latin keyboard otherwise.', 'For KU-ICK places, tap “Get Directions” rather than searching by address — it hands the coordinates straight to your map app.'],
    relatedSlugs: ['korail', 'tmoney'] },

  { slug: 'korail', titleEn: 'Booking Korail Train Tickets', category: 'Transportation', tags: ['korail', 'train', 'ktx', 'travel', 'chuseok'],
    summary: 'How to book Korail (including KTX) tickets, useful for holiday travel.',
    body: [MOCK_NOTE, 'The Korail app (and site, letskorail.com) let you book KTX and regular train tickets with a foreign passport; Jochiwon and Osong stations are the closest to campus.', 'Book early around holidays like Chuseok (Sep 24–26, 2026) — long-distance seats sell out fast.'],
    relatedSlugs: ['naver-map-foreign', 'academic-calendar'] },

  { slug: 'academic-calendar', titleEn: 'Fall 2026 Academic Calendar', category: 'Campus Life', tags: ['calendar', 'schedule', 'semester', 'exam', 'holiday'],
    summary: 'Key Fall 2026 semester dates, compiled from orientation materials — see the widget on the home page for a live countdown.',
    body: ['The Home page widget always highlights the next upcoming date automatically. This article is the reference list — see it below.', 'These dates are transcribed from the Fall 2026 orientation materials. Always double-check against the latest official academic calendar, since dates can shift.'],
    relatedSlugs: ['korail'] },

  { slug: 'useful-apps', titleEn: 'Useful Apps for Campus Life', category: 'Campus Life', tags: ['apps', 'papago', 'kakaotalk', 'naver map', 'toss', 'baemin', 'coupang'],
    summary: 'Real apps international students in Korea actually install, grouped by what they help with.',
    body: ['Papago and Google Translate cover day-to-day translation. KakaoTalk is the default local messenger; WhatsApp is still useful for contacts back home. Naver Map, Kakao Map, and Google Maps cover navigation — Naver Map and Kakao Map are more complete for Korean addresses and transit. Kakao T (taxis), T-money, and Korail Talk cover getting around. Toss, KakaoBank, and Hana Bank’s 1Q app are common choices for mobile-first banking. Baemin and Coupang Eats handle food delivery; Coupang covers general online shopping, and Danggeun Market (Karrot) is the go-to for secondhand goods. The Emergency Ready App sends disaster alerts in English and other languages.', 'See the Useful Apps section on this page — grouped the same way — for direct links.'],
    relatedSlugs: ['bank-account', 'naver-map-foreign'] },

  { slug: 'student-id', titleEn: 'Getting Your Student ID Card', category: 'Campus Life', tags: ['student id', 'library', 'card'],
    summary: 'Where and how to get your physical student ID card.',
    body: [MOCK_NOTE, 'Student ID cards are issued at the Library (Academic Information Center) — bring your admission confirmation and a photo ID.', 'Your student ID is also what gets you into the 24-hour reading room and some library-only services.'],
    relatedSlugs: ['arc-visa'] },
];

// Transcribed from Fall 2026 orientation materials (PRD §10) — real dates, not invented.
// Always verify against the latest official academic calendar before relying on them.
const calendarEvents = [
  { date: '2026-09-01', event: 'Fall Semester 2026 Begins', note: '' },
  { date: '2026-09-01', event: 'Welcome Event for International Students', note: 'Central Plaza, Nongshim Int’l Hall' },
  { date: '2026-09-02', event: 'Course Add/Drop & Registration Confirmation', note: 'through Sep 4' },
  { date: '2026-09-24', event: 'Chuseok Holiday', note: 'no classes, through Sep 26' },
  { date: '2026-10-02', event: 'Korea–Yonsei Games (Go-Yon Jeon)', note: 'shuttle bus support, sign up early Sep' },
  { date: '2026-10-05', event: 'Substitute Holiday (National Foundation Day)', note: '' },
  { date: '2026-10-09', event: 'Hangeul Day', note: 'public holiday' },
  { date: '2026-10-20', event: 'Mid-term Exam Week', note: 'through Oct 26' },
  { date: '2026-11-15', event: 'Global Crimson Day', note: 'date TBD — networking event for all international students' },
  { date: '2026-12-14', event: 'Final Exam Week', note: 'through Dec 18' },
  { date: '2026-12-21', event: 'Winter Vacation Begins', note: '' },
];

// Real apps, grouped by what they help with. URLs point to each app/service's
// own official site (checked against the official domain, not app-store deep
// links, since those change more often).
const usefulApps = [
  { name: 'Papago', icon: '🗣️', blurb: 'Korean translation (text, voice, camera)', url: 'https://papago.naver.com', group: 'Translation & Language' },
  { name: 'Google Translate', icon: '🌐', blurb: 'Backup translator, works offline too', url: 'https://translate.google.com', group: 'Translation & Language' },
  { name: 'KakaoTalk', icon: '💬', blurb: 'The default messenger almost everyone uses here', url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk', group: 'Messaging' },
  { name: 'WhatsApp', icon: '📱', blurb: 'Useful for contacts and family back home', url: 'https://www.whatsapp.com', group: 'Messaging' },
  { name: 'Naver Map', icon: '🗺️', blurb: 'Navigation — switch to English in settings', url: 'https://map.naver.com', group: 'Maps & Navigation' },
  { name: 'Kakao Map', icon: '📍', blurb: 'Alternative navigation app, strong transit data', url: 'https://map.kakao.com', group: 'Maps & Navigation' },
  { name: 'Google Maps', icon: '🧭', blurb: 'Familiar fallback — coverage is improving in Korea', url: 'https://maps.google.com', group: 'Maps & Navigation' },
  { name: 'Kakao T', icon: '🚕', blurb: 'Call a taxi from your phone', url: 'https://www.kakaomobility.com', group: 'Transit & Payments' },
  { name: 'T-money', icon: '🚌', blurb: 'Bus/subway transit card — check balance & history', url: 'https://www.t-money.co.kr', group: 'Transit & Payments' },
  { name: 'Korail Talk', icon: '🚆', blurb: 'Book KTX & intercity train tickets', url: 'https://www.letskorail.com', group: 'Transit & Payments' },
  { name: 'Toss', icon: '💸', blurb: 'Mobile-first banking, transfers, bill pay', url: 'https://toss.im', group: 'Banking' },
  { name: 'KakaoBank', icon: '🐣', blurb: 'App-only bank, easy account opening for students', url: 'https://www.kakaobank.com', group: 'Banking' },
  { name: 'Hana Bank (1Q)', icon: '🏦', blurb: 'Student-friendly mobile banking', url: 'https://www.hanabank.com', group: 'Banking' },
  { name: 'Baemin', icon: '🛵', blurb: 'The most popular food delivery app', url: 'https://www.baemin.com', group: 'Food Delivery' },
  { name: 'Coupang Eats', icon: '🍜', blurb: 'Alternative food delivery app', url: 'https://www.coupangeats.com', group: 'Food Delivery' },
  { name: 'Coupang', icon: '📦', blurb: 'Next-day delivery for almost everything', url: 'https://www.coupang.com', group: 'Shopping & Marketplace' },
  { name: 'Danggeun Market', icon: '🥕', blurb: 'Local secondhand marketplace (furniture, appliances)', url: 'https://www.daangn.com', group: 'Shopping & Marketplace' },
  { name: 'Emergency Ready App', icon: '🚨', blurb: 'Government disaster/safety alerts in English & more', url: 'https://english.seoul.go.kr/service/living/disaster-evacuation-tips-citizens/emergency-ready-app/', group: 'Emergency & Safety' },
];
const APP_GROUP_ORDER = ['Translation & Language', 'Messaging', 'Maps & Navigation', 'Transit & Payments', 'Banking', 'Food Delivery', 'Shopping & Marketplace', 'Emergency & Safety'];

// No real group chat exists yet — set this once orientation staff share one.
const COMMUNITY_LINK = '#';

/* =========================================================================
   STATE / PERSISTENCE (localStorage — UI-only, no backend, matches the
   sibling "밥 먹으러 와" project's pattern)
   ========================================================================= */

const STORAGE_KEY = 'kus:v1';
let store = {
  isLoggedIn: false, userName: '', email: '', nationality: '', studentType: '', joinedAt: '',
  savedPlaceIds: [], savedArticleSlugs: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) store = Object.assign(store, JSON.parse(raw));
  } catch (e) { /* private mode / file:// — degrade to memory-only */ }
}
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch (e) { return false; }
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function requireLogin(intent) {
  if (store.isLoggedIn) return true;
  openConfirm({
    emoji: '🔑',
    title: 'Log in required',
    text: `Log in to ${intent || 'save this'}. Browsing, search, and directions never require an account.`,
    okLabel: 'Log in',
    cancelLabel: 'Cancel',
    onOk: () => { closeConfirm(); openAuth('login'); },
  });
  return false;
}

/* =========================================================================
   SHARED CONFIRM MODAL
   ========================================================================= */

function openConfirm({ emoji, title, text, okLabel, cancelLabel, onOk }) {
  const body = document.getElementById('confirmBody');
  body.innerHTML = `
    <div class="confirm-emoji">${emoji || '❓'}</div>
    <div class="confirm-title">${escapeHtml(title)}</div>
    <div class="confirm-text">${escapeHtml(text)}</div>
    <div class="confirm-actions">
      <button class="btn-outline" id="confirmCancel">${escapeHtml(cancelLabel || 'Cancel')}</button>
      <button class="btn-primary" id="confirmOk">${escapeHtml(okLabel || 'OK')}</button>
    </div>`;
  document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
  document.getElementById('confirmOk').addEventListener('click', onOk);
  document.getElementById('confirmOverlay').hidden = false;
}
function closeConfirm() { document.getElementById('confirmOverlay').hidden = true; }
function closeConfirmOnOverlay(e) { if (e.target.id === 'confirmOverlay') closeConfirm(); }

/* =========================================================================
   AUTH — Sign up / Log in (UI-only stub, no credential check, no backend;
   matches sibling project's localStorage pattern — swap in a real auth API
   later if needed)
   ========================================================================= */

let authMode = 'login'; // 'login' | 'signup'

function openAuth(mode) {
  authMode = mode === 'signup' ? 'signup' : 'login';
  renderAuthBody();
  document.getElementById('authOverlay').hidden = false;
}
function closeAuth() { document.getElementById('authOverlay').hidden = true; }
function closeAuthOnOverlay(e) { if (e.target.id === 'authOverlay') closeAuth(); }

const NATIONALITY_OPTIONS = ['Vietnam', 'China', 'Mongolia', 'Uzbekistan', 'Indonesia', 'Japan', 'India', 'United States', 'Kazakhstan', 'Thailand', 'Other'];

function renderAuthBody() {
  const body = document.getElementById('authBody');
  if (store.isLoggedIn) {
    body.innerHTML = `<h3>Signed in as ${escapeHtml(store.userName)}</h3><p class="auth-note">This account is a UI-only demo — nothing is sent to a server.</p>
      <div class="auth-form"><button class="btn-outline" id="logoutBtn">Log out</button></div>`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      store.isLoggedIn = false; saveState(); updateHeaderAuthUI(); closeAuth();
    });
    return;
  }
  const isSignup = authMode === 'signup';
  body.innerHTML = `
    <div class="auth-tabs">
      <button type="button" class="auth-tab${!isSignup ? ' active' : ''}" id="tabLogin">Log In</button>
      <button type="button" class="auth-tab${isSignup ? ' active' : ''}" id="tabSignup">Sign Up</button>
    </div>
    ${isSignup ? `
      <h3>Create your KU-ICK account</h3>
      <p class="auth-note">Demo account — saved only in this browser's storage. No password, no server, no real credential check.</p>
      <form class="auth-form" id="authForm">
        <input type="text" id="authName" placeholder="Full name" required>
        <input type="email" id="authEmail" placeholder="Email address" required>
        <select id="authNationality" required>
          <option value="" disabled selected>Nationality / home country</option>
          ${NATIONALITY_OPTIONS.map(n => `<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('')}
        </select>
        <select id="authStudentType" required>
          <option value="" disabled selected>Student type</option>
          <option value="Exchange">Exchange student</option>
          <option value="Degree-seeking">Degree-seeking student</option>
          <option value="Visiting">Visiting / language program</option>
        </select>
        <label class="auth-terms"><input type="checkbox" id="authTerms" required> I agree to the <a href="#" data-open-privacy>Privacy Policy</a></label>
        <button type="submit" class="btn-primary">Create account</button>
      </form>` : `
      <h3>Log in</h3>
      <p class="auth-note">Demo login — enter your name and email, no password needed.</p>
      <form class="auth-form" id="authForm">
        <input type="text" id="authName" placeholder="Your name" required>
        <input type="email" id="authEmail" placeholder="Email address" required>
        <button type="submit" class="btn-primary">Log in</button>
      </form>`}`;

  document.getElementById('tabLogin').addEventListener('click', () => { authMode = 'login'; renderAuthBody(); });
  document.getElementById('tabSignup').addEventListener('click', () => { authMode = 'signup'; renderAuthBody(); });
  document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('authName').value.trim();
    const email = document.getElementById('authEmail').value.trim();
    if (!name || !email) return;
    store.isLoggedIn = true;
    store.userName = name;
    store.email = email;
    if (isSignup) {
      store.nationality = document.getElementById('authNationality').value;
      store.studentType = document.getElementById('authStudentType').value;
      store.joinedAt = new Date().toISOString();
    }
    saveState();
    updateHeaderAuthUI();
    closeAuth();
  });
}

function updateHeaderAuthUI() {
  const btn = document.getElementById('authBtn');
  btn.textContent = store.isLoggedIn ? `My (${store.userName})` : 'Log in';
}

/* =========================================================================
   MY PAGE (profile + saved places / articles)
   ========================================================================= */

function openMy() {
  if (!requireLogin('view your saved items')) return;
  renderMyBody();
  document.getElementById('myOverlay').hidden = false;
}
function closeMy() { document.getElementById('myOverlay').hidden = true; }
function closeMyOnOverlay(e) { if (e.target.id === 'myOverlay') closeMy(); }

function renderMyBody() {
  const savedPlaces = places.filter(p => store.savedPlaceIds.includes(p.id));
  const savedArticles = articles.filter(a => store.savedArticleSlugs.includes(a.slug));
  const body = document.getElementById('myBody');
  const initial = (store.userName || '?').trim().slice(0, 1).toUpperCase();
  const metaBits = [store.email, store.nationality, store.studentType].filter(Boolean).map(escapeHtml).join(' · ');
  body.innerHTML = `
    <div class="profile-card">
      <div class="profile-avatar">${escapeHtml(initial)}</div>
      <div class="profile-info">
        <div class="profile-name">${escapeHtml(store.userName)}</div>
        <div class="profile-meta">${metaBits || 'No profile details yet'}</div>
        ${store.joinedAt ? `<div class="profile-meta">Member since ${new Date(store.joinedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>` : ''}
      </div>
      <button class="btn-text" id="editProfileBtn">Edit</button>
    </div>
    <div id="profileEditForm"></div>
    <h3 style="margin-top:1.4rem">My Saved Places</h3>
    <div class="my-list">${savedPlaces.length ? savedPlaces.map(p => `
      <div class="my-list-item"><span>${CATEGORY_META[p.category].icon} ${escapeHtml(p.nameEn)}</span>
      <button class="btn-text" data-unsave-place="${p.id}">Remove</button></div>`).join('') : '<p class="my-empty">No saved places yet.</p>'}</div>
    <h3 style="margin-top:1.4rem">My Saved Guides</h3>
    <div class="my-list">${savedArticles.length ? savedArticles.map(a => `
      <div class="my-list-item"><span>${escapeHtml(a.titleEn)}</span>
      <button class="btn-text" data-unsave-article="${a.slug}">Remove</button></div>`).join('') : '<p class="my-empty">No saved guides yet.</p>'}</div>
    <div class="my-page-footer">
      <button class="btn-outline" id="logoutFromMyBtn">Log out</button>
      <button class="btn-text danger" id="deleteAccountBtn">Delete account</button>
    </div>`;

  body.querySelectorAll('[data-unsave-place]').forEach(btn => btn.addEventListener('click', () => {
    store.savedPlaceIds = store.savedPlaceIds.filter(id => id !== btn.dataset.unsavePlace);
    saveState(); renderMyBody();
  }));
  body.querySelectorAll('[data-unsave-article]').forEach(btn => btn.addEventListener('click', () => {
    store.savedArticleSlugs = store.savedArticleSlugs.filter(s => s !== btn.dataset.unsaveArticle);
    saveState(); renderMyBody();
  }));
  document.getElementById('editProfileBtn').addEventListener('click', renderProfileEditForm);
  document.getElementById('logoutFromMyBtn').addEventListener('click', () => {
    store.isLoggedIn = false; saveState(); updateHeaderAuthUI(); closeMy();
  });
  document.getElementById('deleteAccountBtn').addEventListener('click', () => {
    openConfirm({
      emoji: '🗑️', title: 'Delete account?',
      text: 'This clears your saved places, guides, and profile from this browser. This cannot be undone.',
      okLabel: 'Delete', cancelLabel: 'Cancel',
      onOk: () => {
        store = { isLoggedIn: false, userName: '', email: '', nationality: '', studentType: '', joinedAt: '', savedPlaceIds: [], savedArticleSlugs: [] };
        saveState(); updateHeaderAuthUI(); closeConfirm(); closeMy();
      },
    });
  });
}

function renderProfileEditForm() {
  const wrap = document.getElementById('profileEditForm');
  wrap.innerHTML = `<form class="auth-form profile-edit-form" id="profileForm">
    <input type="text" id="editName" value="${escapeHtml(store.userName)}" placeholder="Full name" required>
    <input type="email" id="editEmail" value="${escapeHtml(store.email || '')}" placeholder="Email" required>
    <button type="submit" class="btn-primary">Save</button>
  </form>`;
  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    store.userName = document.getElementById('editName').value.trim();
    store.email = document.getElementById('editEmail').value.trim();
    saveState(); updateHeaderAuthUI(); renderMyBody();
  });
}

function toggleSavePlace(placeId) {
  if (!requireLogin('save this place')) return;
  const saved = store.savedPlaceIds.includes(placeId);
  store.savedPlaceIds = saved ? store.savedPlaceIds.filter(id => id !== placeId) : [...store.savedPlaceIds, placeId];
  saveState();
  renderMapPanel(places.find(p => p.id === placeId));
}
function toggleSaveArticle(slug) {
  if (!requireLogin('save this guide')) return;
  const saved = store.savedArticleSlugs.includes(slug);
  store.savedArticleSlugs = saved ? store.savedArticleSlugs.filter(s => s !== slug) : [...store.savedArticleSlugs, slug];
  saveState();
  openArticle(slug);
}

/* =========================================================================
   MAP (Leaflet + OpenStreetMap tiles — free, no API key)
   ========================================================================= */

let leafletMap = null;
let markerLayer = null;
let tileLayer = null;
// Empty = no filter applied (show every category) — the "All Categories" chip
// stays visually active in that state so the UI never contradicts what's on screen.
let activeCategories = new Set();

function initMap() {
  leafletMap = L.map('leafletMap', { scrollWheelZoom: false }).setView([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], 16);
  // Wikimedia's "osm-intl" style renders English/Latin place names (falling back to local names
  // where no translation exists) instead of the Korean-only labels on standard OSM tiles.
  tileLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: 'Wikimedia maps | &copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(leafletMap);
  markerLayer = L.layerGroup().addTo(leafletMap);
  renderMapMarkers();

  let tileErrorShown = false;
  tileLayer.on('tileerror', () => {
    if (tileErrorShown) return;
    tileErrorShown = true;
    showMapRetryBanner();
  });

  // Leaflet measures its container once at init. If the layout shifts afterwards
  // (web fonts swapping in, the a11y/menu toggles, a window resize) the map can
  // end up sized/positioned wrong and appear to "disappear" — invalidateSize()
  // makes it re-measure and redraw.
  const resync = () => leafletMap.invalidateSize();
  window.addEventListener('load', resync);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resync).catch(() => {});
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resync, 200); });
  if (window.ResizeObserver) {
    new ResizeObserver(resync).observe(document.getElementById('leafletMap'));
  }
}

function showMapRetryBanner() {
  const mapEl = document.getElementById('leafletMap');
  if (!mapEl || !mapEl.parentElement || mapEl.parentElement.querySelector('.map-retry-banner')) return;
  const banner = document.createElement('div');
  banner.className = 'map-retry-banner';
  banner.innerHTML = `⚠️ Map tiles failed to load. <button type="button" id="mapRetryBtn">Retry</button>`;
  mapEl.parentElement.insertBefore(banner, mapEl);
  banner.querySelector('#mapRetryBtn').addEventListener('click', () => {
    banner.remove();
    tileLayer.redraw();
    leafletMap.invalidateSize();
  });
}

function renderMapFilters() {
  const wrap = document.getElementById('mapFilters');
  const byGroup = {};
  Object.entries(CATEGORY_META).forEach(([key, meta]) => { (byGroup[meta.group] ||= []).push([key, meta]); });

  wrap.innerHTML = `<button type="button" class="filter-chip filter-chip-all" data-cat="">✅ All Categories</button>` +
    CATEGORY_GROUPS.map(g => `
      <div class="filter-group">
        <span class="filter-group-label">${escapeHtml(g.label)}</span>
        ${(byGroup[g.id] || []).map(([key, meta]) => `<button type="button" class="filter-chip" data-cat="${key}">${meta.icon} ${meta.label}</button>`).join('')}
      </div>`).join('');

  const allChip = wrap.querySelector('.filter-chip-all');
  const catChips = [...wrap.querySelectorAll('.filter-chip:not(.filter-chip-all)')];
  const syncActive = () => {
    allChip.classList.toggle('active', activeCategories.size === 0);
    catChips.forEach(c => c.classList.toggle('active', activeCategories.has(c.dataset.cat)));
  };
  syncActive();

  allChip.addEventListener('click', () => { activeCategories.clear(); syncActive(); renderMapMarkers(); });
  catChips.forEach(chip => chip.addEventListener('click', () => {
    const cat = chip.dataset.cat;
    if (activeCategories.has(cat)) activeCategories.delete(cat); else activeCategories.add(cat);
    syncActive(); renderMapMarkers();
  }));
}

function jumpMapCategory(catKey) {
  activeCategories = new Set(catKey ? [catKey] : []);
  renderMapFilters();
  renderMapMarkers();
}

function renderMapMarkers() {
  markerLayer.clearLayers();
  const visible = activeCategories.size ? places.filter(p => activeCategories.has(p.category)) : places;
  visible.forEach(p => {
    const icon = L.divIcon({ className: 'leaflet-div-icon', html: CATEGORY_META[p.category].icon, iconSize: [28, 28] });
    const marker = L.marker([CAMPUS_CENTER.lat + p.dLat, CAMPUS_CENTER.lng + p.dLng], { icon });
    marker.on('click', () => renderMapPanel(p));
    marker.addTo(markerLayer);
  });
}

function renderMapPanel(place) {
  const panel = document.getElementById('mapPanel');
  if (!place) { panel.innerHTML = '<p class="map-panel-empty">Select a marker to see place details here.</p>'; return; }
  const saved = store.isLoggedIn && store.savedPlaceIds.includes(place.id);
  panel.innerHTML = `
    <div class="panel-cat">${CATEGORY_META[place.category].icon} ${CATEGORY_META[place.category].label}</div>
    <div class="panel-title">${escapeHtml(place.nameEn)}</div>
    <p class="panel-desc">${escapeHtml(place.desc)}</p>
    <p class="panel-meta">Hours: ${place.hours ? escapeHtml(place.hours) : 'Not confirmed yet'}</p>
    <div class="panel-actions">
      <button class="btn-primary" id="getDirectionsBtn">Get Directions</button>
      <button class="btn-outline" id="savePlaceBtn">${saved ? '★ Saved' : '☆ Save'}</button>
    </div>`;
  document.getElementById('getDirectionsBtn').addEventListener('click', () => openDirections(place));
  document.getElementById('savePlaceBtn').addEventListener('click', () => toggleSavePlace(place.id));
}

/* ---- Directions deep links (PRD §7.4) — coordinates never shown to the user ---- */

function openDirections(place) {
  const lat = CAMPUS_CENTER.lat + place.dLat, lng = CAMPUS_CENTER.lng + place.dLng;
  const body = document.getElementById('directionsBody');
  body.innerHTML = `
    <h3>Get Directions</h3>
    <p class="auth-note">Open <strong>${escapeHtml(place.nameEn)}</strong> in:</p>
    <div class="directions-choice">
      <a href="https://map.kakao.com/link/to/${encodeURIComponent(place.nameEn)},${lat},${lng}" target="_blank" rel="noopener">Kakao Map</a>
      <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" rel="noopener">Google Maps</a>
      <a href="https://map.naver.com/p/directions/-/-/${lat},${lng},${encodeURIComponent(place.nameEn)}" target="_blank" rel="noopener">Naver Map</a>
    </div>`;
  document.getElementById('directionsOverlay').hidden = false;
}
function closeDirections() { document.getElementById('directionsOverlay').hidden = true; }
function closeDirectionsOnOverlay(e) { if (e.target.id === 'directionsOverlay') closeDirections(); }

/* =========================================================================
   LIFE IN KOREA (articles)
   ========================================================================= */

let articleQuery = '';
let activeArticleCat = null;

function getFilteredArticles() {
  const q = articleQuery.trim().toLowerCase();
  return articles.filter(a => {
    if (activeArticleCat && a.category !== activeArticleCat) return false;
    if (!q) return true;
    return a.titleEn.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some(t => t.includes(q));
  });
}

function renderLifeFilters() {
  const cats = [...new Set(articles.map(a => a.category))];
  const wrap = document.getElementById('lifeFilters');
  wrap.innerHTML = `<button type="button" class="filter-chip" data-cat="">All</button>` +
    cats.map(c => `<button type="button" class="filter-chip" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
  const chips = [...wrap.querySelectorAll('.filter-chip')];
  const syncActive = () => chips.forEach(c => c.classList.toggle('active', (c.dataset.cat || null) === activeArticleCat));
  syncActive();
  chips.forEach(chip => chip.addEventListener('click', () => {
    activeArticleCat = chip.dataset.cat || null;
    syncActive();
    renderArticleGrid();
  }));
}

function jumpLifeCategory(cat) {
  activeArticleCat = cat || null;
  renderLifeFilters();
  renderArticleGrid();
}

function renderArticleGrid() {
  const list = getFilteredArticles();
  const grid = document.getElementById('articleGrid');
  const empty = document.getElementById('articleEmpty');
  grid.innerHTML = list.map(a => `
    <button type="button" class="article-card" data-slug="${a.slug}">
      <span class="article-cat">${escapeHtml(a.category)}</span>
      <h3>${escapeHtml(a.titleEn)}</h3>
      <p class="article-summary">${escapeHtml(a.summary)}</p>
      <span class="article-open">Read guide →</span>
    </button>`).join('');
  grid.querySelectorAll('.article-card').forEach(card => card.addEventListener('click', () => openArticle(card.dataset.slug)));
  empty.hidden = list.length > 0;
}

function openArticle(slug) {
  const a = articles.find(x => x.slug === slug);
  if (!a) return;
  const saved = store.isLoggedIn && store.savedArticleSlugs.includes(slug);
  const related = (a.relatedSlugs || []).map(s => articles.find(x => x.slug === s)).filter(Boolean);
  document.getElementById('articleBody').innerHTML = `
    <span class="article-detail-cat">${escapeHtml(a.category)}</span>
    <h2>${escapeHtml(a.titleEn)}</h2>
    <div class="article-detail-body">${a.body.map(p => `<p>${escapeHtml(p)}</p>`).join('')}</div>
    <button class="btn-outline" id="saveArticleBtn">${saved ? '★ Saved' : '☆ Save'}</button>
    ${related.length ? `<h4 style="margin-top:1.2rem">Related</h4><div class="related-list">${related.map(r => `<button data-slug="${r.slug}">${escapeHtml(r.titleEn)}</button>`).join('')}</div>` : ''}`;
  document.getElementById('saveArticleBtn').addEventListener('click', () => toggleSaveArticle(slug));
  document.getElementById('articleBody').querySelectorAll('.related-list button').forEach(b => b.addEventListener('click', () => openArticle(b.dataset.slug)));
  document.getElementById('articleOverlay').hidden = false;
}
function closeArticle() { document.getElementById('articleOverlay').hidden = true; }
function closeArticleOnOverlay(e) { if (e.target.id === 'articleOverlay') closeArticle(); }

/* =========================================================================
   USEFUL APPS / COMMUNITY
   ========================================================================= */

function slugify(str) { return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

function renderApps() {
  const byGroup = {};
  usefulApps.forEach(app => { (byGroup[app.group] ||= []).push(app); });
  document.getElementById('appsGrid').innerHTML = APP_GROUP_ORDER.filter(g => byGroup[g]).map(g => `
    <div class="apps-subsection" id="apps-${slugify(g)}">
      <h3 class="apps-subsection-title">${escapeHtml(g)}</h3>
      <div class="apps-subgrid">
        ${byGroup[g].map(app => `
          <a class="app-card" href="${app.url}" target="_blank" rel="noopener">
            <span class="app-icon">${app.icon}</span>
            <span><h4>${escapeHtml(app.name)}</h4><p>${escapeHtml(app.blurb)}</p></span>
          </a>`).join('')}
      </div>
    </div>`).join('');
}
function renderCommunity() { document.getElementById('communityLink').href = COMMUNITY_LINK; }

/* =========================================================================
   ACADEMIC CALENDAR WIDGET
   ========================================================================= */

function renderCalendarWidget() {
  const today = new Date();
  const next = calendarEvents.find(e => new Date(e.date + 'T23:59:59') >= today) || calendarEvents[calendarEvents.length - 1];
  document.getElementById('calendarNext').textContent = `Next up: ${formatDate(next.date)} — ${next.event}`;
  document.getElementById('calendarList').innerHTML = calendarEvents.map(e => `
    <li><span class="cal-date">${formatDate(e.date)}</span><span>${escapeHtml(e.event)}${e.note ? ` <span style="color:var(--text-mute)">(${escapeHtml(e.note)})</span>` : ''}</span></li>`).join('');
}
function formatDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* =========================================================================
   HEADER SEARCH (places + articles)
   ========================================================================= */

function runSearch(query, dropdownEl) {
  const q = query.trim().toLowerCase();
  if (!q) { dropdownEl.hidden = true; dropdownEl.innerHTML = ''; return; }
  const placeHits = places.filter(p => p.nameEn.toLowerCase().includes(q)).slice(0, 4)
    .map(p => ({ label: p.nameEn, sub: `Map · ${CATEGORY_META[p.category].label}`, run: () => { closeSearch(dropdownEl); location.hash = '#map'; renderMapPanel(p); } }));
  const articleHits = articles.filter(a => a.titleEn.toLowerCase().includes(q) || a.tags.some(t => t.includes(q))).slice(0, 4)
    .map(a => ({ label: a.titleEn, sub: `Guide · ${a.category}`, run: () => { closeSearch(dropdownEl); openArticle(a.slug); } }));
  const appHits = usefulApps.filter(a => a.name.toLowerCase().includes(q)).slice(0, 3)
    .map(a => ({ label: a.name, sub: `App · ${a.group}`, run: () => { closeSearch(dropdownEl); location.hash = `#apps-${slugify(a.group)}`; } }));
  const hits = [...placeHits, ...articleHits, ...appHits];
  dropdownEl.innerHTML = hits.length
    ? hits.map((h, i) => `<button type="button" class="sd-item" data-i="${i}">${escapeHtml(h.label)}<span class="sd-sub">${escapeHtml(h.sub)}</span></button>`).join('')
    : `<div class="sd-empty">No matches for "${escapeHtml(query)}"</div>`;
  dropdownEl.querySelectorAll('.sd-item').forEach((el, i) => el.addEventListener('click', () => hits[i].run()));
  dropdownEl.hidden = false;
}
function closeSearch(dropdownEl) { dropdownEl.hidden = true; }

/* =========================================================================
   PRIVACY POLICY MODAL
   ========================================================================= */

function openPrivacy() { document.getElementById('privacyOverlay').hidden = false; }
function closePrivacy() { document.getElementById('privacyOverlay').hidden = true; }
function closePrivacyOnOverlay(e) { if (e.target.id === 'privacyOverlay') closePrivacy(); }

/* =========================================================================
   INIT
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateHeaderAuthUI();

  renderMapFilters();
  initMap();
  renderLifeFilters();
  renderArticleGrid();
  renderApps();
  renderCommunity();
  renderCalendarWidget();

  document.getElementById('authBtn').addEventListener('click', () => store.isLoggedIn ? openMy() : openAuth('login'));
  document.getElementById('authCloseBtn').addEventListener('click', closeAuth);
  document.getElementById('myCloseBtn').addEventListener('click', closeMy);
  document.getElementById('directionsCloseBtn').addEventListener('click', closeDirections);
  document.getElementById('articleCloseBtn').addEventListener('click', closeArticle);
  const privacyCloseBtn = document.getElementById('privacyCloseBtn');
  if (privacyCloseBtn) privacyCloseBtn.addEventListener('click', closePrivacy);

  document.getElementById('a11yToggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.dataset.a11y = html.dataset.a11y === 'large' ? '' : 'large';
    if (leafletMap) setTimeout(() => leafletMap.invalidateSize(), 50);
  });
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('siteHeader').classList.toggle('nav-open');
    if (leafletMap) setTimeout(() => leafletMap.invalidateSize(), 50);
  });

  const articleSearchInput = document.getElementById('articleSearch');
  articleSearchInput.addEventListener('input', () => { articleQuery = articleSearchInput.value; renderArticleGrid(); });

  const siteSearchInput = document.getElementById('siteSearch');
  const searchDropdown = document.getElementById('searchDropdown');
  siteSearchInput.addEventListener('input', () => runSearch(siteSearchInput.value, searchDropdown));
  document.getElementById('searchBtn').addEventListener('click', () => siteSearchInput.focus());
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) searchDropdown.hidden = true;
  });

  // Delegated handlers for header dropdown "jump to filtered subsection" links
  // and the privacy-policy link inside the sign-up form.
  document.addEventListener('click', (e) => {
    const mapLink = e.target.closest('[data-jump-map-cat]');
    if (mapLink) jumpMapCategory(mapLink.dataset.jumpMapCat);
    const lifeLink = e.target.closest('[data-jump-life-cat]');
    if (lifeLink) jumpLifeCategory(lifeLink.dataset.jumpLifeCat);
    const signupLink = e.target.closest('[data-open-signup]');
    if (signupLink) { e.preventDefault(); openAuth('signup'); }
    const privacyLink = e.target.closest('[data-open-privacy]');
    if (privacyLink) { e.preventDefault(); openPrivacy(); }
  });
});

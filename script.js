'use strict';

/* =========================================================================
   MOCK DATA
   Everything below marked MOCK is placeholder: place coordinates are not
   surveyed yet (see PRD §7.5/§15), article bodies are stand-ins for the
   author's real researched guides, and the community link/QR are unset.
   Swap these out before launch — nothing here is real user data.
   ========================================================================= */

const CAMPUS_CENTER = { lat: 36.6100, lng: 127.2938 }; // MOCK — approximate KU Sejong campus center

const CATEGORY_META = {
  academic:    { icon: '🏫', label: 'Academic/Admin' },
  dorm:        { icon: '🏠', label: 'Dormitory' },
  cafeteria:   { icon: '🍽', label: 'Cafeteria' },
  cafe:        { icon: '☕', label: 'Cafe' },
  convenience: { icon: '🏪', label: 'Convenience Store' },
  printing:    { icon: '🖨', label: 'Printing' },
  laundry:     { icon: '🧺', label: 'Laundry' },
  health:      { icon: '🏥', label: 'Health/Support' },
  sports:      { icon: '💪', label: 'Sports/Fitness' },
  atm:         { icon: '🏦', label: 'ATM/Bank' },
  shuttle:     { icon: '🚌', label: 'Shuttle' },
  study:       { icon: '📚', label: 'Study Lounge' },
  parking:     { icon: '🅿', label: 'Parking' },
  landmark:    { icon: '🐯', label: 'Landmark' },
};

// MOCK — offsets are hand-placed guesses around CAMPUS_CENTER, not surveyed
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

// MOCK — placeholder copy. Replace bodyMd with the author's researched drafts before launch.
const MOCK_NOTE = 'This is placeholder guide text for layout/demo purposes — replace with the real researched article.';

const articles = [
  { slug: 'arc-visa', titleEn: 'Alien Registration Card (ARC) & Visa', category: 'Immigration', tags: ['arc', 'visa', 'immigration', 'registration', 'd-2', 'd-4'],
    summary: 'What the ARC is, when to apply, and what documents you’ll need.',
    body: [MOCK_NOTE, 'International students generally register for an Alien Registration Card (ARC) within 90 days of entering Korea, at the immigration office covering their address. Bring your passport, visa, a passport photo, proof of enrollment, and the application fee.', 'The ARC doubles as your Korean ID for phone contracts, bank accounts, and health insurance, so getting it early unblocks almost everything else on this list.'],
    relatedSlugs: ['usim-phone', 'bank-account', 'health-insurance'] },

  { slug: 'usim-phone', titleEn: 'Getting a SIM Card & Phone Number', category: 'Mobile', tags: ['usim', 'sim', 'phone', 'mobile', 'number'],
    summary: 'How to get a Korean phone number as a new international student.',
    body: [MOCK_NOTE, 'Most students get either a prepaid USIM (no contract, easiest before your ARC arrives) or a standard carrier plan (usually requires an ARC). Carrier stores and kiosks near campus and at the airport both sell USIMs.', 'Keep your number consistent once you get on — it’s tied to bank apps, delivery apps, and most Korean sign-up flows.'],
    relatedSlugs: ['arc-visa', 'bank-account'] },

  { slug: 'health-insurance', titleEn: 'National Health Insurance: Enrollment & Payment', category: 'Insurance', tags: ['insurance', 'health', 'nhi', 'hospital'],
    summary: 'Enrolling in National Health Insurance (NHI) and paying premiums.',
    body: [MOCK_NOTE, 'International students staying long-term are generally enrolled in National Health Insurance (NHI), either automatically or through the university. Monthly premiums are billed and can usually be paid by bank transfer or auto-debit.', 'Carry your NHI status (or ARC) when visiting a clinic — it substantially lowers the out-of-pocket cost.'],
    relatedSlugs: ['bank-account', 'arc-visa'] },

  { slug: 'bank-account', titleEn: 'Opening a Bank Account in Korea', category: 'Banking', tags: ['bank', 'account', 'banking', 'debit card'],
    summary: 'What you need to open a Korean bank account as a student.',
    body: [MOCK_NOTE, 'Banks typically ask for your passport, ARC (or proof it’s in process), proof of enrollment, and sometimes a Korean phone number. Campus-adjacent branches are used to processing student accounts.', 'A Korean bank account and debit card are usually required before T-money auto-charge, some phone plans, and most part-time-job payroll.'],
    relatedSlugs: ['arc-visa', 'usim-phone', 'tmoney'] },

  { slug: 'tmoney', titleEn: 'T-money: Getting, Charging, and Using Your Transit Card', category: 'Transportation', tags: ['tmoney', 'transit', 'bus', 'subway', 'card'],
    summary: 'Getting a T-money card and using it on buses, subways, and at convenience stores.',
    body: [MOCK_NOTE, 'T-money cards are sold at convenience stores (GS25, 7-Eleven, etc.) near campus and can be topped up with cash at the same stores or at subway station machines.', 'It covers city buses, intercity buses, subways, and can even be used like a small prepaid card at some shops.'],
    relatedSlugs: ['naver-map-foreign', 'korail'] },

  { slug: 'naver-map-foreign', titleEn: 'Using Naver Map in a Foreign Language', category: 'Transportation', tags: ['naver map', 'navigation', 'directions', 'language'],
    summary: 'Switching Naver Map to English (or another language) for easier navigation.',
    body: [MOCK_NOTE, 'Naver Map’s app settings let you switch the display language, which also affects transit directions and place names — useful since Korean addresses can be hard to search from a Latin keyboard otherwise.', 'For KU-ICK places, tap “Get Directions” rather than searching by address — it hands the coordinates straight to your map app.'],
    relatedSlugs: ['korail', 'tmoney'] },

  { slug: 'korail', titleEn: 'Booking Korail Train Tickets', category: 'Transportation', tags: ['korail', 'train', 'ktx', 'travel', 'chuseok'],
    summary: 'How to book Korail (including KTX) tickets, useful for holiday travel.',
    body: [MOCK_NOTE, 'The Korail app (and site) let you book KTX and regular train tickets with a foreign passport; Jochiwon and Osong stations are the closest to campus.', 'Book early around holidays like Chuseok (Sep 24–26, 2026) — long-distance seats sell out fast.'],
    relatedSlugs: ['naver-map-foreign', 'academic-calendar'] },

  { slug: 'academic-calendar', titleEn: 'Fall 2026 Academic Calendar', category: 'Campus Life', tags: ['calendar', 'schedule', 'semester', 'exam', 'holiday'],
    summary: 'Key Fall 2026 semester dates — see the widget on the home page for a live countdown.',
    body: [MOCK_NOTE, 'The Home page widget always highlights the next upcoming date automatically. This article is the reference list — see it below.'],
    relatedSlugs: ['korail'] },

  { slug: 'useful-apps', titleEn: 'Useful Apps for Campus Life', category: 'Campus Life', tags: ['apps', 'papago', 'kakaotalk', 'naver map', 'hana bank'],
    summary: 'The four apps most international students install in their first week.',
    body: [MOCK_NOTE, 'Papago handles day-to-day translation better than most general translators for Korean. KakaoTalk is the default messenger almost everyone here uses. Naver Map is the most complete navigation app locally. Hana Bank’s 1Q app is a common choice for student banking.', 'See the Useful Apps section on this page for direct links.'],
    relatedSlugs: ['bank-account', 'naver-map-foreign'] },

  { slug: 'student-id', titleEn: 'Getting Your Student ID Card', category: 'Campus Life', tags: ['student id', 'library', 'card'],
    summary: 'Where and how to get your physical student ID card.',
    body: [MOCK_NOTE, 'Student ID cards are issued at the Library (Academic Information Center) — bring your admission confirmation and a photo ID.', 'Your student ID is also what gets you into the 24-hour reading room and some library-only services.'],
    relatedSlugs: ['arc-visa'] },
];

// MOCK — from PRD §10, structure/dates only; verify against the latest official calendar before launch.
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

const usefulApps = [
  { name: 'Papago', icon: '🗣️', blurb: 'Korean translation', url: 'https://papago.naver.com' },
  { name: 'KakaoTalk', icon: '💬', blurb: 'The default messenger app', url: 'https://www.kakaocorp.com/page/service/service/KakaoTalk' },
  { name: 'Naver Map', icon: '🗺️', blurb: 'Navigation — switch to English in settings', url: 'https://map.naver.com' },
  { name: 'Hana Bank (1Q)', icon: '🏦', blurb: 'Student-friendly mobile banking', url: 'https://www.hanabank.com' },
];

// MOCK — no real group exists yet; set this once orientation staff share one (PRD §15).
const COMMUNITY_LINK = '#';

/* =========================================================================
   STATE / PERSISTENCE (localStorage — UI-only, no backend, matches the
   sibling "밥 먹으러 와" project's pattern)
   ========================================================================= */

const STORAGE_KEY = 'kus:v1';
let store = { isLoggedIn: false, userName: '', savedPlaceIds: [], savedArticleSlugs: [] };

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
    onOk: () => { closeConfirm(); openAuth(); },
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
   AUTH (UI-only stub — no credential check, matches sibling project)
   ========================================================================= */

function openAuth() {
  renderAuthBody();
  document.getElementById('authOverlay').hidden = false;
}
function closeAuth() { document.getElementById('authOverlay').hidden = true; }
function closeAuthOnOverlay(e) { if (e.target.id === 'authOverlay') closeAuth(); }

function renderAuthBody() {
  const body = document.getElementById('authBody');
  if (store.isLoggedIn) {
    body.innerHTML = `<h3>Signed in as ${escapeHtml(store.userName)}</h3><p class="auth-note">This account is a UI-only demo — nothing is sent to a server.</p>
      <div class="auth-form"><button class="btn-outline" id="logoutBtn">Log out</button></div>`;
    document.getElementById('logoutBtn').addEventListener('click', () => {
      store.isLoggedIn = false; store.userName = ''; saveState(); updateHeaderAuthUI(); closeAuth();
    });
  } else {
    body.innerHTML = `<h3>Log in</h3>
      <p class="auth-note">Demo login — enter any name, no password or real account needed.</p>
      <form class="auth-form" id="authForm">
        <input type="text" id="authName" placeholder="Your name" required>
        <button type="submit" class="btn-primary">Log in</button>
      </form>`;
    document.getElementById('authForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('authName').value.trim();
      if (!name) return;
      store.isLoggedIn = true; store.userName = name; saveState();
      updateHeaderAuthUI(); closeAuth();
    });
  }
}

function updateHeaderAuthUI() {
  const btn = document.getElementById('authBtn');
  btn.textContent = store.isLoggedIn ? `My (${store.userName})` : 'Log in';
}

/* =========================================================================
   MY PAGE (saved places / articles)
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
  body.innerHTML = `
    <h3>My Saved Places</h3>
    <div class="my-list">${savedPlaces.length ? savedPlaces.map(p => `
      <div class="my-list-item"><span>${CATEGORY_META[p.category].icon} ${escapeHtml(p.nameEn)}</span>
      <button class="btn-text" data-unsave-place="${p.id}">Remove</button></div>`).join('') : '<p class="my-empty">No saved places yet.</p>'}</div>
    <h3 style="margin-top:1.4rem">My Saved Guides</h3>
    <div class="my-list">${savedArticles.length ? savedArticles.map(a => `
      <div class="my-list-item"><span>${escapeHtml(a.titleEn)}</span>
      <button class="btn-text" data-unsave-article="${a.slug}">Remove</button></div>`).join('') : '<p class="my-empty">No saved guides yet.</p>'}</div>`;
  body.querySelectorAll('[data-unsave-place]').forEach(btn => btn.addEventListener('click', () => {
    store.savedPlaceIds = store.savedPlaceIds.filter(id => id !== btn.dataset.unsavePlace);
    saveState(); renderMyBody();
  }));
  body.querySelectorAll('[data-unsave-article]').forEach(btn => btn.addEventListener('click', () => {
    store.savedArticleSlugs = store.savedArticleSlugs.filter(s => s !== btn.dataset.unsaveArticle);
    saveState(); renderMyBody();
  }));
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
// Empty = no filter applied (show every category). Chips only narrow the map down once clicked.
let activeCategories = new Set();

function initMap() {
  leafletMap = L.map('leafletMap', { scrollWheelZoom: false }).setView([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], 16);
  // Wikimedia's "osm-intl" style renders English/Latin place names (falling back to local names
  // where no translation exists) instead of the Korean-only labels on standard OSM tiles.
  L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    attribution: 'Wikimedia maps | &copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(leafletMap);
  markerLayer = L.layerGroup().addTo(leafletMap);
  renderMapMarkers();
}

function renderMapFilters() {
  const wrap = document.getElementById('mapFilters');
  wrap.innerHTML = Object.entries(CATEGORY_META).map(([key, meta]) =>
    `<button type="button" class="filter-chip" data-cat="${key}">${meta.icon} ${meta.label}</button>`).join('');
  wrap.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => {
    const cat = chip.dataset.cat;
    if (activeCategories.has(cat)) { activeCategories.delete(cat); chip.classList.remove('active'); }
    else { activeCategories.add(cat); chip.classList.add('active'); }
    renderMapMarkers();
  }));
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
    <p class="panel-meta">Hours: ${place.hours ? escapeHtml(place.hours) : 'Not confirmed yet (mock)'}</p>
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
  wrap.innerHTML = `<button type="button" class="filter-chip active" data-cat="">All</button>` +
    cats.map(c => `<button type="button" class="filter-chip" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('');
  wrap.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => {
    wrap.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeArticleCat = chip.dataset.cat || null;
    renderArticleGrid();
  }));
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

function renderApps() {
  document.getElementById('appsGrid').innerHTML = usefulApps.map(app => `
    <a class="app-card" href="${app.url}" target="_blank" rel="noopener">
      <span class="app-icon">${app.icon}</span>
      <span><h4>${escapeHtml(app.name)}</h4><p>${escapeHtml(app.blurb)}</p></span>
    </a>`).join('');
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
  const hits = [...placeHits, ...articleHits];
  dropdownEl.innerHTML = hits.length
    ? hits.map((h, i) => `<button type="button" class="sd-item" data-i="${i}">${escapeHtml(h.label)}<span class="sd-sub">${escapeHtml(h.sub)}</span></button>`).join('')
    : `<div class="sd-empty">No matches for "${escapeHtml(query)}"</div>`;
  dropdownEl.querySelectorAll('.sd-item').forEach((el, i) => el.addEventListener('click', () => hits[i].run()));
  dropdownEl.hidden = false;
}
function closeSearch(dropdownEl) { dropdownEl.hidden = true; }

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

  document.getElementById('authBtn').addEventListener('click', () => store.isLoggedIn ? openMy() : openAuth());
  document.getElementById('authCloseBtn').addEventListener('click', closeAuth);
  document.getElementById('myCloseBtn').addEventListener('click', closeMy);
  document.getElementById('directionsCloseBtn').addEventListener('click', closeDirections);
  document.getElementById('articleCloseBtn').addEventListener('click', closeArticle);

  document.getElementById('a11yToggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.dataset.a11y = html.dataset.a11y === 'large' ? '' : 'large';
  });
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('siteHeader').classList.toggle('nav-open');
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
});

/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - EXECUTIVE CMS DASHBOARD LOGIC
   ========================================================================== */

const CMS_STORAGE_KEY = 'ipl_alliance_submissions';
const EVENTS_STORAGE_KEY = 'ipl_alliance_events';
const EVENT_APPS_STORAGE_KEY = 'ipl_alliance_event_apps';
const PERF_STORAGE_KEY = 'ipl_alliance_performance';

let currentCMSCategory = 'all';

// Sample Registrations
const initialSampleData = [
  { id: 'IPL-2026-1041', timestamp: '10 Aug 2026, 02:30 PM', type: 'Player', name: 'Aarav Sharma', mobile: '9826012345', location: 'Gwalior, MP', details: 'Badminton (Age 14)', status: 'Approved', loginId: 'IPL-2026-1041', password: 'password123', notes: 'Wooden court player with school district certificate.' },
  { id: 'IPL-2026-1042', timestamp: '10 Aug 2026, 03:15 PM', type: 'Vendor', name: 'Sharma Sports Supplies', mobile: '9425198765', location: 'Bhopal, MP', details: 'Badminton Equipment & Kits', status: 'Approved', loginId: 'IPL-2026-1042', password: 'password123', notes: 'Wholesale distributor of synthetic rackets and tournament shuttlecocks.' },
  { id: 'IPL-2026-1043', timestamp: '10 Aug 2026, 04:00 PM', type: 'Investor', name: 'Vikramaditya Singh', mobile: '9893011223', location: 'Indore, MP', details: 'Capital + Land (₹50L - ₹1Cr)', status: 'Approved', loginId: 'IPL-2026-1043', password: 'password123', notes: 'Offering 2 acres land near panchayat highway for multi-sport complex.' },
  { id: 'IPL-2026-1044', timestamp: '10 Aug 2026, 04:45 PM', type: 'Player', name: 'Priya Verma', mobile: '9752044556', location: 'Ujjain, MP', details: 'Athletics & Track (Age 16)', status: 'Approved', loginId: 'IPL-2026-1044', password: 'password123', notes: 'Specializes in 200m & 400m sprints.' },
  { id: 'IPL-2026-1045', timestamp: '10 Aug 2026, 05:10 PM', type: 'Vendor', name: 'Apex Swimwear Pvt Ltd', mobile: '9111099887', location: 'Jabalpur, MP', details: 'Swim Costumes & Gear', status: 'Verified', loginId: 'IPL-2026-1045', password: 'password123', notes: 'Supplies Olympic grade silicone caps and costumes.' },
  { id: 'IPL-2026-1046', timestamp: '10 Aug 2026, 05:30 PM', type: 'Player', name: 'Devendra Yadav', mobile: '9630088771', location: 'Rewa, MP', details: 'Kabaddi & Wrestling', status: 'Pending Review', loginId: 'IPL-2026-1046', password: 'password123', notes: 'District level mat wrestler.' }
];

// Sample Events
const initialSampleEvents = [
  { id: 'EV-2026-01', title: 'MP State Youth Badminton Championship 2026', sport: 'Badminton', date: '25 Aug 2026', venue: 'Gwalior Indoor Sports Complex', category: 'Under-17 Singles & Doubles', status: 'Registration Open', desc: 'State level ranking tournament organized by Indian Pro League Alliance Corp. Winners selected for National Academy trial.' },
  { id: 'EV-2026-02', title: 'Panchayat Athletics Talent Hunt 2026', sport: 'Athletics', date: '05 Sep 2026', venue: 'Tatya Tope Stadium, Bhopal', category: '100m, 200m, 400m Sprints', status: 'Registration Open', desc: 'Speed and endurance trials for MP district school sprinters.' },
  { id: 'EV-2026-03', title: 'Alliance Premier Kabaddi League Trials', sport: 'Kabaddi', date: '18 Sep 2026', venue: 'Rewa Sports Hub Ground', category: 'Open Category (Age 15-22)', status: 'Upcoming', desc: 'Talent scouting for regional franchise teams with monthly stipend contract.' },
  { id: 'EV-2026-04', title: 'All MP Swimming Sprint Championship', sport: 'Swimming', date: '02 Oct 2026', venue: 'Jabalpur Aquatic Complex', category: 'Freestyle & Butterfly 50m', status: 'Registration Open', desc: 'Olympic standard pool trial for junior aquatic athletes.' }
];

// Sample Performance
const initialSamplePerf = [
  { playerId: 'IPL-2026-1041', playerName: 'Aarav Sharma', sport: 'Badminton', matchesPlayed: 24, wins: 19, rank: '#3 (MP Junior)', fitnessScore: '94/100', achievements: 'Silver Medal - Gwalior District Cup 2025 | Gold - School Games 2026', coachRemarks: 'Excellent footwork on wooden court. High stamina and sharp smash.' },
  { playerId: 'IPL-2026-1044', playerName: 'Priya Verma', sport: 'Athletics', matchesPlayed: 18, wins: 15, rank: '#2 (MP U-17 Sprint)', fitnessScore: '96/100', achievements: 'State Gold Medalist 200m (25.4s) | District Champion 400m', coachRemarks: 'Explosive acceleration off the block. Ideal national candidate.' }
];

// Sample Event Applications
const initialSampleEventApps = [
  { id: 'APP-9001', submittedAt: '11 Aug 2026, 10:15 AM', eventId: 'EV-2026-01', eventTitle: 'MP State Youth Badminton Championship 2026', playerId: 'IPL-2026-1041', playerName: 'Aarav Sharma', sport: 'Badminton', details: 'U-17 Singles | T-Shirt: M | Contact: 9826012345', status: 'Confirmed' }
];

function getLocalSubmissions() {
  const stored = localStorage.getItem(CMS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initialSampleData));
    return initialSampleData;
  }
  try { return JSON.parse(stored); } catch (e) { return initialSampleData; }
}

function saveLocalSubmissions(data) {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

function getLocalEvents() {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialSampleEvents));
    return initialSampleEvents;
  }
  try { return JSON.parse(stored); } catch (e) { return initialSampleEvents; }
}

function saveLocalEvents(data) {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(data));
}

function getLocalPerf() {
  const stored = localStorage.getItem(PERF_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(initialSamplePerf));
    return initialSamplePerf;
  }
  try { return JSON.parse(stored); } catch (e) { return initialSamplePerf; }
}

function saveLocalPerf(data) {
  localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(data));
}

function getLocalEventApps() {
  const stored = localStorage.getItem(EVENT_APPS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(EVENT_APPS_STORAGE_KEY, JSON.stringify(initialSampleEventApps));
    return initialSampleEventApps;
  }
  try { return JSON.parse(stored); } catch (e) { return initialSampleEventApps; }
}

function saveLocalEventApps(data) {
  localStorage.setItem(EVENT_APPS_STORAGE_KEY, JSON.stringify(data));
}

async function getSubmissions() {
  const localList = getLocalSubmissions();
  let supabaseList = [];
  if (typeof supabaseRestRequest === 'function') {
    try {
      const cloudData = await supabaseRestRequest('submissions?select=*&order=created_at.desc');
      if (Array.isArray(cloudData)) supabaseList = cloudData;
    } catch (e) {}
  }
  const map = new Map();
  // Put Supabase data first
  supabaseList.forEach(item => {
    if (item && item.id) map.set(item.id.toLowerCase(), item);
  });
  // Overlay local items so local changes (e.g. status edits) are preserved immediately
  localList.forEach(item => {
    if (item && item.id) {
      const key = item.id.toLowerCase();
      const existing = map.get(key) || {};
      map.set(key, { ...existing, ...item });
    }
  });
  const merged = Array.from(map.values());
  saveLocalSubmissions(merged);
  return merged;
}

async function updateCMSStatus(id, newStatus) {
  const stored = getLocalSubmissions();
  let item = stored.find(i => (i.id || '').toLowerCase() === (id || '').toLowerCase());
  if (!item) {
    const all = await getSubmissions();
    item = all.find(i => (i.id || '').toLowerCase() === (id || '').toLowerCase());
    if (item) stored.push(item);
  }

  if (item) {
    item.status = newStatus;
    if (!item.loginId) item.loginId = item.id;
    if (!item.password) item.password = 'password123';

    // If Player approved, create default performance record if missing
    if ((item.type === 'Player' || item.type === 'PLAYER') && (newStatus === 'Approved' || newStatus === 'Verified')) {
      const perfs = getLocalPerf();
      if (!perfs.find(p => p.playerId === item.id)) {
        perfs.push({
          playerId: item.id,
          playerName: item.name,
          sport: item.details || 'Multi-Sport',
          matchesPlayed: 12,
          wins: 9,
          rank: '#5 (MP District)',
          fitnessScore: '92/100',
          achievements: 'District Championship Participant',
          coachRemarks: 'Approved state talent pool athlete. High discipline.'
        });
        saveLocalPerf(perfs);
      }
    }
    saveLocalSubmissions(stored);
  }

  // Update Supabase and AWAIT completion before re-rendering
  if (typeof supabaseRestRequest === 'function') {
    try {
      await supabaseRestRequest(`submissions?id=eq.${id}`, {
        method: 'PATCH',
        headers: { 'Prefer': 'return=representation' },
        body: JSON.stringify({ status: newStatus, loginId: id, password: item?.password || 'password123' })
      });
    } catch (err) {
      console.warn('Supabase status update error:', err);
    }
  }

  renderCMSTable();
}

async function deleteCMSEntry(id) {
  if (confirm('Delete registration record ' + id + '?')) {
    let stored = getLocalSubmissions().filter(i => (i.id || '').toLowerCase() !== (id || '').toLowerCase());
    saveLocalSubmissions(stored);
    if (typeof supabaseRestRequest === 'function') {
      try {
        await supabaseRestRequest(`submissions?id=eq.${id}`, { method: 'DELETE' });
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }
    renderCMSTable();
  }
}

// Admin Authentication
function handleAdminLogin(e) {
  e.preventDefault();
  const u = document.getElementById('login-username').value.trim();
  const p = document.getElementById('login-password').value.trim();
  if (u === 'admin' && p === 'admin123') {
    document.getElementById('admin-login-overlay').style.display = 'none';
    sessionStorage.setItem('ipl_admin_logged_in', 'true');
    initCMS();
  } else {
    document.getElementById('login-error-msg').style.display = 'block';
  }
  return false;
}

function handleAdminLogout() {
  sessionStorage.removeItem('ipl_admin_logged_in');
  document.getElementById('admin-login-overlay').style.display = 'flex';
}

function checkAdminAuth() {
  if (sessionStorage.getItem('ipl_admin_logged_in') === 'true') {
    document.getElementById('admin-login-overlay').style.display = 'none';
    initCMS();
  } else {
    document.getElementById('admin-login-overlay').style.display = 'flex';
  }
}

// Section Switching
function switchCMSSection(sec) {
  document.querySelectorAll('.cms-sec-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.cms-sec-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('sec-tab-' + sec)?.classList.add('active');
  document.getElementById('sec-panel-' + sec)?.classList.add('active');

  if (sec === 'performance') renderPerformanceTable();
  else if (sec === 'events') renderEventsTable();
  else if (sec === 'apps') renderEventAppsTable();
  else renderCMSTable();
}

function filterCMSCategory(cat) {
  currentCMSCategory = cat;
  document.querySelectorAll('.cms-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('cms-filter-' + cat.toLowerCase())?.classList.add('active');
  renderCMSTable();
}

// Render Submissions Table
async function renderCMSTable() {
  const list = await getSubmissions();
  const searchQuery = (document.getElementById('cms-search-input')?.value || '').toLowerCase();

  const total = list.length;
  const players = list.filter(i => i.type === 'Player' && (i.status === 'Approved' || i.status === 'Verified')).length;
  const vendors = list.filter(i => i.type === 'Vendor' && (i.status === 'Approved' || i.status === 'Verified')).length;
  const investors = list.filter(i => i.type === 'Investor' && (i.status === 'Approved' || i.status === 'Verified')).length;

  if (document.getElementById('cms-stat-total')) document.getElementById('cms-stat-total').textContent = total;
  if (document.getElementById('cms-stat-players')) document.getElementById('cms-stat-players').textContent = players;
  if (document.getElementById('cms-stat-vendors')) document.getElementById('cms-stat-vendors').textContent = vendors;
  if (document.getElementById('cms-stat-investors')) document.getElementById('cms-stat-investors').textContent = investors;

  const filtered = list.filter(item => {
    const matchCat = currentCMSCategory === 'all' || item.type === currentCMSCategory;
    const textStr = `${item.id} ${item.name} ${item.mobile} ${item.location} ${item.details} ${item.status}`.toLowerCase();
    const matchSearch = !searchQuery || textStr.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const tbody = document.getElementById('cms-table-body');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:#94A3B8;">No records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const isApp = item.status === 'Approved' || item.status === 'Verified';
    const pwd = item.password || 'password123';
    return `
    <tr>
      <td>
        <div style="font-family:'IBM Plex Mono',monospace;font-weight:700;color:var(--gold-light);">${item.id}</div>
        ${isApp ? `<span class="creds-badge">🔑 ${pwd}</span>` : `<span style="font-size:11px;color:#94A3B8;">Pending Creds</span>`}
      </td>
      <td style="font-size:12.5px;color:#CBD5E1;">${item.timestamp}</td>
      <td><span class="type-badge type-${item.type.toLowerCase()}">${item.type}</span></td>
      <td><strong>${item.name}</strong></td>
      <td><a href="tel:${item.mobile}" style="color:#ffffff;text-decoration:none;">${item.mobile}</a></td>
      <td>${item.location || 'N/A'}</td>
      <td>${item.details || 'General'}</td>
      <td>
        <select class="status-select" onchange="updateCMSStatus('${item.id}', this.value)">
          <option ${item.status==='Pending Review'?'selected':''}>Pending Review</option>
          <option ${item.status==='Verified'?'selected':''}>Verified</option>
          <option ${item.status==='Approved'?'selected':''}>Approved</option>
          <option ${item.status==='Contacted'?'selected':''}>Contacted</option>
        </select>
      </td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="action-btn" onclick="openCredsModal('${item.id}')">🔑 Creds</button>
          <button class="action-btn" onclick="viewCMSDetails('${item.id}')">View</button>
          <button class="action-btn action-btn-del" onclick="deleteCMSEntry('${item.id}')">✕</button>
        </div>
      </td>
    </tr>
  `}).join('');
}

async function updateCMSStatus(id, newStatus) {
  const stored = getLocalSubmissions();
  const item = stored.find(i => i.id === id);
  if (item) {
    item.status = newStatus;
    if (!item.loginId) item.loginId = item.id;
    if (!item.password) item.password = 'password123';

    // If Player approved, create default performance record if missing
    if (item.type === 'Player' && (newStatus === 'Approved' || newStatus === 'Verified')) {
      const perfs = getLocalPerf();
      if (!perfs.find(p => p.playerId === item.id)) {
        perfs.push({
          playerId: item.id,
          playerName: item.name,
          sport: item.details || 'Multi-Sport',
          matchesPlayed: 12,
          wins: 9,
          rank: '#5 (MP District)',
          fitnessScore: '92/100',
          achievements: 'District Championship Participant',
          coachRemarks: 'Approved state talent pool athlete. High discipline.'
        });
        saveLocalPerf(perfs);
      }
    }
  }
  saveLocalSubmissions(stored);

  if (typeof supabaseRestRequest === 'function') {
    supabaseRestRequest(`submissions?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus, loginId: id, password: item?.password || 'password123' })
    });
  }

  renderCMSTable();
}

async function deleteCMSEntry(id) {
  if (confirm('Delete registration record ' + id + '?')) {
    let stored = getLocalSubmissions();
    stored = stored.filter(i => i.id !== id);
    saveLocalSubmissions(stored);
    renderCMSTable();
  }
}

// Performance Manager Table
function renderPerformanceTable() {
  const perfs = getLocalPerf();
  const tbody = document.getElementById('cms-perf-table-body');
  if (!tbody) return;

  if (perfs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:#94A3B8;">No athlete performance records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = perfs.map(p => `
    <tr>
      <td style="font-family:'IBM Plex Mono',monospace;font-weight:700;color:var(--gold-light);">${p.playerId}</td>
      <td><strong>${p.playerName}</strong></td>
      <td><span class="type-badge type-player">${p.sport}</span></td>
      <td><strong>${p.matchesPlayed}</strong> Matches</td>
      <td><span style="color:#34D399;font-weight:700;">🏆 ${p.wins} Wins</span></td>
      <td><span style="color:var(--gold-light);font-weight:700;">${p.rank}</span></td>
      <td><span style="color:#60A5FA;font-weight:700;">💪 ${p.fitnessScore}</span></td>
      <td style="font-size:12px;color:#CBD5E1;max-width:260px;">${p.coachRemarks}</td>
      <td>
        <button class="action-btn" onclick="openEditPerfModal('${p.playerId}')">✏️ Edit Perf</button>
      </td>
    </tr>
  `).join('');
}

function openEditPerfModal(playerId) {
  const perfs = getLocalPerf();
  const p = perfs.find(x => x.playerId === playerId);
  if (!p) return;

  document.getElementById('perf-player-id').value = p.playerId;
  document.getElementById('perf-modal-title').textContent = `Update Performance: ${p.playerName} (${p.playerId})`;
  document.getElementById('perf-matches').value = p.matchesPlayed;
  document.getElementById('perf-wins').value = p.wins;
  document.getElementById('perf-rank').value = p.rank;
  document.getElementById('perf-fitness').value = p.fitnessScore;
  document.getElementById('perf-achievements').value = p.achievements || '';
  document.getElementById('perf-remarks').value = p.coachRemarks || '';

  document.getElementById('cms-perf-modal').classList.add('active');
}

function closePerfModal() {
  document.getElementById('cms-perf-modal').classList.remove('active');
}

function handleSavePerformance(e) {
  e.preventDefault();
  const pid = document.getElementById('perf-player-id').value;
  const perfs = getLocalPerf();
  const p = perfs.find(x => x.playerId === pid);
  if (p) {
    p.matchesPlayed = parseInt(document.getElementById('perf-matches').value) || 0;
    p.wins = parseInt(document.getElementById('perf-wins').value) || 0;
    p.rank = document.getElementById('perf-rank').value.trim();
    p.fitnessScore = document.getElementById('perf-fitness').value.trim();
    p.achievements = document.getElementById('perf-achievements').value.trim();
    p.coachRemarks = document.getElementById('perf-remarks').value.trim();
    saveLocalPerf(perfs);
  }
  closePerfModal();
  renderPerformanceTable();
  alert('Athlete performance record updated successfully!');
  return false;
}

// Sports Events Table
function renderEventsTable() {
  const events = getLocalEvents();
  const apps = getLocalEventApps();
  const tbody = document.getElementById('cms-events-table-body');
  if (!tbody) return;

  tbody.innerHTML = events.map(ev => {
    const appCount = apps.filter(a => a.eventId === ev.id).length;
    return `
    <tr>
      <td style="font-family:'IBM Plex Mono',monospace;font-weight:700;color:var(--gold-light);">${ev.id}</td>
      <td><strong>${ev.title}</strong><br><span style="font-size:12px;color:#94A3B8;">${ev.sport}</span></td>
      <td style="font-size:13px;color:#CBD5E1;">📅 ${ev.date}<br>📍 ${ev.venue}</td>
      <td>${ev.category}</td>
      <td><span class="type-badge" style="background:rgba(16,185,129,0.15);color:#34D399;border:1px solid rgba(16,185,129,0.3);">${ev.status}</span></td>
      <td><strong>${appCount}</strong> Registered</td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="action-btn" onclick="openEditEventModal('${ev.id}')">✏️ Edit</button>
          <button class="action-btn action-btn-del" onclick="deleteEvent('${ev.id}')">✕</button>
        </div>
      </td>
    </tr>
  `}).join('');
}

function openAddEventModal() {
  document.getElementById('event-id').value = '';
  document.getElementById('event-modal-title').textContent = 'Create New Sports Event';
  document.getElementById('event-title').value = '';
  document.getElementById('event-sport').value = '';
  document.getElementById('event-date').value = '';
  document.getElementById('event-venue').value = '';
  document.getElementById('event-category').value = '';
  document.getElementById('event-desc').value = '';
  document.getElementById('cms-event-modal').classList.add('active');
}

function openEditEventModal(id) {
  const events = getLocalEvents();
  const ev = events.find(x => x.id === id);
  if (!ev) return;
  document.getElementById('event-id').value = ev.id;
  document.getElementById('event-modal-title').textContent = `Edit Event: ${ev.title}`;
  document.getElementById('event-title').value = ev.title;
  document.getElementById('event-sport').value = ev.sport;
  document.getElementById('event-date').value = ev.date;
  document.getElementById('event-venue').value = ev.venue;
  document.getElementById('event-status').value = ev.status;
  document.getElementById('event-category').value = ev.category;
  document.getElementById('event-desc').value = ev.desc;
  document.getElementById('cms-event-modal').classList.add('active');
}

function closeEventModal() {
  document.getElementById('cms-event-modal').classList.remove('active');
}

function handleSaveEvent(e) {
  e.preventDefault();
  const eid = document.getElementById('event-id').value;
  const events = getLocalEvents();

  if (eid) {
    const ev = events.find(x => x.id === eid);
    if (ev) {
      ev.title = document.getElementById('event-title').value.trim();
      ev.sport = document.getElementById('event-sport').value.trim();
      ev.date = document.getElementById('event-date').value.trim();
      ev.venue = document.getElementById('event-venue').value.trim();
      ev.status = document.getElementById('event-status').value;
      ev.category = document.getElementById('event-category').value.trim();
      ev.desc = document.getElementById('event-desc').value.trim();
    }
  } else {
    events.unshift({
      id: 'EV-2026-0' + (events.length + 1),
      title: document.getElementById('event-title').value.trim(),
      sport: document.getElementById('event-sport').value.trim(),
      date: document.getElementById('event-date').value.trim(),
      venue: document.getElementById('event-venue').value.trim(),
      status: document.getElementById('event-status').value,
      category: document.getElementById('event-category').value.trim(),
      desc: document.getElementById('event-desc').value.trim()
    });
  }
  saveLocalEvents(events);
  closeEventModal();
  renderEventsTable();
  alert('Sports event saved successfully!');
  return false;
}

function deleteEvent(id) {
  if (confirm('Delete sports event ' + id + '?')) {
    let events = getLocalEvents();
    events = events.filter(x => x.id !== id);
    saveLocalEvents(events);
    renderEventsTable();
  }
}

// Event Applications Table
function renderEventAppsTable() {
  const apps = getLocalEventApps();
  const tbody = document.getElementById('cms-apps-table-body');
  if (!tbody) return;

  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:48px;color:#94A3B8;">No event applications received yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = apps.map(a => `
    <tr>
      <td style="font-family:'IBM Plex Mono',monospace;font-weight:700;color:var(--gold-light);">${a.id}</td>
      <td style="font-size:12.5px;color:#CBD5E1;">${a.submittedAt}</td>
      <td><strong>${a.eventTitle}</strong></td>
      <td><strong>${a.playerName}</strong><br><span style="font-size:11px;color:#94A3B8;">ID: ${a.playerId}</span></td>
      <td><span class="type-badge type-player">${a.sport}</span></td>
      <td style="font-size:12px;color:#CBD5E1;">${a.details}</td>
      <td><span class="type-badge" style="background:rgba(16,185,129,0.15);color:#34D399;">${a.status}</span></td>
      <td>
        <button class="action-btn" onclick="confirmEventApp('${a.id}')">✅ Confirm Ticket</button>
      </td>
    </tr>
  `).join('');
}

function confirmEventApp(appId) {
  const apps = getLocalEventApps();
  const a = apps.find(x => x.id === appId);
  if (a) {
    a.status = 'Confirmed Ticket Issued';
    saveLocalEventApps(apps);
    renderEventAppsTable();
    alert(`Confirmed event participation ticket for ${a.playerName}!`);
  }
}

// Credentials Manager Modal
function openCredsModal(id) {
  const subs = getLocalSubmissions();
  const item = subs.find(x => x.id === id);
  if (!item) return;
  document.getElementById('creds-record-id').value = item.id;
  document.getElementById('creds-login-id').value = item.id;
  document.getElementById('creds-password').value = item.password || 'password123';
  document.getElementById('cms-creds-modal').classList.add('active');
}

function closeCredsModal() {
  document.getElementById('cms-creds-modal').classList.remove('active');
}

function handleSaveCreds(e) {
  e.preventDefault();
  const id = document.getElementById('creds-record-id').value;
  const newPwd = document.getElementById('creds-password').value.trim();
  const subs = getLocalSubmissions();
  const item = subs.find(x => x.id === id);
  if (item) {
    item.password = newPwd;
    saveLocalSubmissions(subs);
    alert(`Updated password for ${item.name} (${id}) to: ${newPwd}`);
  }
  closeCredsModal();
  renderCMSTable();
  return false;
}

async function viewCMSDetails(id) {
  const list = await getSubmissions();
  const item = list.find(i => i.id === id);
  if (!item) return;

  document.getElementById('cms-detail-title').textContent = `${item.type} Details (${item.id})`;
  document.getElementById('cms-detail-content').innerHTML = `
    <div class="cms-detail-row"><span class="lbl">ID / Login ID:</span> <strong>${item.id}</strong></div>
    <div class="cms-detail-row"><span class="lbl">Password:</span> <strong style="color:#34D399;">${item.password || 'password123'}</strong></div>
    <div class="cms-detail-row"><span class="lbl">Type:</span> <span class="type-badge type-${item.type.toLowerCase()}">${item.type}</span></div>
    <div class="cms-detail-row"><span class="lbl">Timestamp:</span> <span>${item.timestamp}</span></div>
    <div class="cms-detail-row"><span class="lbl">Name:</span> <strong>${item.name}</strong></div>
    <div class="cms-detail-row"><span class="lbl">Mobile:</span> <span>${item.mobile}</span></div>
    <div class="cms-detail-row"><span class="lbl">Location:</span> <span>${item.location || 'N/A'}</span></div>
    <div class="cms-detail-row"><span class="lbl">Discipline:</span> <span>${item.details || 'N/A'}</span></div>
    <div class="cms-detail-row"><span class="lbl">Status:</span> <strong>${item.status}</strong></div>
    <div style="margin-top:20px;">
      <span class="lbl">Notes / Sporting Background:</span>
      <p style="background:rgba(255,255,255,0.06);padding:14px;border-radius:8px;margin-top:8px;line-height:1.5;color:#E2E8F0;">${item.notes || 'No extra notes provided.'}</p>
    </div>
  `;
  document.getElementById('cms-detail-modal').classList.add('active');
}

function closeCMSDetailModal() {
  document.getElementById('cms-detail-modal').classList.remove('active');
}

function seedSampleCMSData() {
  if (confirm('Reset CMS database to full sample data?')) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initialSampleData));
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialSampleEvents));
    localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(initialSamplePerf));
    localStorage.setItem(EVENT_APPS_STORAGE_KEY, JSON.stringify(initialSampleEventApps));
    renderCMSTable();
    alert('CMS database reset to initial sample data.');
  }
}

function initCMS() {
  renderCMSTable();
}

window.addEventListener('DOMContentLoaded', checkAdminAuth);

/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - MAIN WEBSITE & MEMBER PORTAL INTERACTIVE LOGIC
   ========================================================================== */

const CMS_STORAGE_KEY = 'ipl_alliance_submissions';
const EVENTS_STORAGE_KEY = 'ipl_alliance_events';
const EVENT_APPS_STORAGE_KEY = 'ipl_alliance_event_apps';
const PERF_STORAGE_KEY = 'ipl_alliance_performance';

// Pre-seeded Sample Data
const defaultSubmissions = [
  { id: 'IPL-2026-1041', timestamp: '10 Aug 2026, 02:30 PM', type: 'Player', name: 'Aarav Sharma', mobile: '9826012345', location: 'Gwalior, MP', details: 'Badminton (Age 14)', status: 'Approved', loginId: 'IPL-2026-1041', password: 'password123', notes: 'Wooden court player with school district certificate.' },
  { id: 'IPL-2026-1042', timestamp: '10 Aug 2026, 03:15 PM', type: 'Vendor', name: 'Sharma Sports Supplies', mobile: '9425198765', location: 'Bhopal, MP', details: 'Badminton Equipment & Kits', status: 'Approved', loginId: 'IPL-2026-1042', password: 'password123', notes: 'Wholesale distributor of synthetic rackets and tournament shuttlecocks.' },
  { id: 'IPL-2026-1043', timestamp: '10 Aug 2026, 04:00 PM', type: 'Investor', name: 'Vikramaditya Singh', mobile: '9893011223', location: 'Indore, MP', details: 'Capital + Land (₹50L - ₹1Cr)', status: 'Approved', loginId: 'IPL-2026-1043', password: 'password123', notes: 'Offering 2 acres land near panchayat highway for multi-sport complex.' },
  { id: 'IPL-2026-1044', timestamp: '10 Aug 2026, 04:45 PM', type: 'Player', name: 'Priya Verma', mobile: '9752044556', location: 'Ujjain, MP', details: 'Athletics & Track (Age 16)', status: 'Approved', loginId: 'IPL-2026-1044', password: 'password123', notes: 'Specializes in 200m & 400m sprints.' }
];

const defaultEvents = [
  { id: 'EV-2026-01', title: 'MP State Youth Badminton Championship 2026', sport: 'Badminton', date: '25 Aug 2026', venue: 'Gwalior Indoor Sports Complex', category: 'Under-17 Singles & Doubles', status: 'Registration Open', desc: 'State level ranking tournament organized by Indian Pro League Alliance Corp. Winners selected for National Academy trial.' },
  { id: 'EV-2026-02', title: 'Panchayat Athletics Talent Hunt 2026', sport: 'Athletics', date: '05 Sep 2026', venue: 'Tatya Tope Stadium, Bhopal', category: '100m, 200m, 400m Sprints', status: 'Registration Open', desc: 'Speed and endurance trials for MP district school sprinters.' },
  { id: 'EV-2026-03', title: 'Alliance Premier Kabaddi League Trials', sport: 'Kabaddi', date: '18 Sep 2026', venue: 'Rewa Sports Hub Ground', category: 'Open Category (Age 15-22)', status: 'Upcoming', desc: 'Talent scouting for regional franchise teams with monthly stipend contract.' },
  { id: 'EV-2026-04', title: 'All MP Swimming Sprint Championship', sport: 'Swimming', date: '02 Oct 2026', venue: 'Jabalpur Aquatic Complex', category: 'Freestyle & Butterfly 50m', status: 'Registration Open', desc: 'Olympic standard pool trial for junior aquatic athletes.' }
];

const defaultPerf = [
  { playerId: 'IPL-2026-1041', playerName: 'Aarav Sharma', sport: 'Badminton', matchesPlayed: 24, wins: 19, rank: '#3 (MP Junior)', fitnessScore: '94/100', achievements: 'Silver Medal - Gwalior District Cup 2025 | Gold - School Games 2026', coachRemarks: 'Excellent footwork on wooden court. High stamina and sharp smash.' },
  { playerId: 'IPL-2026-1044', playerName: 'Priya Verma', sport: 'Athletics', matchesPlayed: 18, wins: 15, rank: '#2 (MP U-17 Sprint)', fitnessScore: '96/100', achievements: 'State Gold Medalist 200m (25.4s) | District Champion 400m', coachRemarks: 'Explosive acceleration off the block. Ideal national candidate.' }
];

const defaultEventApps = [
  { id: 'APP-9001', submittedAt: '11 Aug 2026, 10:15 AM', eventId: 'EV-2026-01', eventTitle: 'MP State Youth Badminton Championship 2026', playerId: 'IPL-2026-1041', playerName: 'Aarav Sharma', sport: 'Badminton', details: 'U-17 Singles | T-Shirt: M | Contact: 9826012345', status: 'Confirmed' }
];

function getSubmissions() {
  const stored = localStorage.getItem(CMS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(defaultSubmissions));
    return defaultSubmissions;
  }
  try { return JSON.parse(stored); } catch (e) { return defaultSubmissions; }
}

function saveSubmissions(data) {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

function getEvents() {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  try { return JSON.parse(stored); } catch (e) { return defaultEvents; }
}

function getPerf() {
  const stored = localStorage.getItem(PERF_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PERF_STORAGE_KEY, JSON.stringify(defaultPerf));
    return defaultPerf;
  }
  try { return JSON.parse(stored); } catch (e) { return defaultPerf; }
}

function getEventApps() {
  const stored = localStorage.getItem(EVENT_APPS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(EVENT_APPS_STORAGE_KEY, JSON.stringify(defaultEventApps));
    return defaultEventApps;
  }
  try { return JSON.parse(stored); } catch (e) { return defaultEventApps; }
}

function saveEventApps(data) {
  localStorage.setItem(EVENT_APPS_STORAGE_KEY, JSON.stringify(data));
}

// Registration Form Submission
function openTab(name) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tabbtn-' + name)?.classList.add('active');
  document.getElementById('panel-' + name)?.classList.add('active');
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
}

function handleSubmit(e, formType) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');

  const newId = 'IPL-2026-' + Math.floor(1000 + Math.random() * 9000);
  let submissionData = {
    id: newId,
    timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    type: formType === 'player' ? 'Player' : formType === 'vendor' ? 'Vendor' : 'Investor',
    status: 'Pending Review',
    loginId: newId,
    password: 'password123',
    name: '',
    mobile: '',
    location: '',
    details: '',
    notes: ''
  };

  inputs.forEach(input => {
    const fieldDiv = input.closest('.field');
    const label = fieldDiv ? (fieldDiv.querySelector('label')?.textContent || '') : '';
    const val = input.value ? input.value.trim() : '';
    if (!val) return;

    if (label.includes('Name') || label.includes('Business') || label.includes('Contact Person')) {
      if (!submissionData.name) submissionData.name = val;
    } else if (label.includes('Mobile')) {
      submissionData.mobile = val;
    } else if (label.includes('District') || label.includes('City') || label.includes('Panchayat') || label.includes('State')) {
      if (!submissionData.location) submissionData.location = val;
      else submissionData.location += ', ' + val;
    } else if (label.includes('Sport') || label.includes('Category') || label.includes('Investment Type')) {
      submissionData.details = val;
    } else if (label.includes('Background') || label.includes('Products') || label.includes('Notes') || label.includes('Ranges') || label.includes('Land')) {
      if (!submissionData.notes) submissionData.notes = val;
      else submissionData.notes += ' | ' + val;
    }
  });

  if (!submissionData.name) submissionData.name = 'Registrant (' + submissionData.type + ')';

  const list = getSubmissions();
  list.unshift(submissionData);
  saveSubmissions(list);

  if (typeof supabaseRestRequest === 'function') {
    supabaseRestRequest('submissions', {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(submissionData)
    });
  }

  const confirmBox = document.getElementById('confirm-' + formType) || document.getElementById('appconfirm-' + formType);
  if (confirmBox) {
    confirmBox.style.display = 'flex';
    confirmBox.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
      <div>
        <h4>Registration Received Successfully!</h4>
        <p>Your Application ID is <strong style="color:var(--gold-light);font-family:'IBM Plex Mono',monospace;">${submissionData.id}</strong>. Once reviewed and approved by Executive Admin in CMS, log in using your ID and default password (<code style="color:var(--gold-light);">password123</code>).</p>
      </div>
    `;
    setTimeout(() => { confirmBox.scrollIntoView({ behavior: 'smooth' }); }, 100);
  }

  form.reset();
  return false;
}

// Member Authentication & Dashboard Logic
function openMemberLoginModal() {
  const modal = document.getElementById('member-login-modal');
  if (modal) modal.style.display = 'flex';
  const errBox = document.getElementById('member-login-error');
  if (errBox) errBox.style.display = 'none';
}

function closeMemberLoginModal() {
  const modal = document.getElementById('member-login-modal');
  if (modal) modal.style.display = 'none';
}

function normalizeSubmissionRecord(item) {
  if (!item || typeof item !== 'object') return null;
  const id = item.id || item.login_id || item.loginId || '';
  const loginId = item.loginId || item.login_id || id;
  const password = item.password || item.pwd || 'password123';
  const type = item.type || item.role || item.account_type || 'Player';
  const name = item.name || item.full_name || item.contact_person || '';
  const mobile = String(item.mobile || item.phone || item.contact || '').trim();
  const location = item.location || item.city || '';
  const details = item.details || item.sport || '';
  const notes = item.notes || item.background || '';
  const status = item.status || 'Pending Review';
  const timestamp = item.timestamp || item.created_at || new Date().toLocaleString();

  return {
    ...item,
    id,
    loginId,
    password,
    type,
    name,
    mobile,
    location,
    details,
    notes,
    status,
    timestamp
  };
}

async function syncSupabaseSubmissions() {
  let localList = getSubmissions().map(normalizeSubmissionRecord).filter(Boolean);
  if (typeof supabaseRestRequest === 'function') {
    try {
      const cloudData = await supabaseRestRequest('submissions?select=*&order=created_at.desc');
      if (Array.isArray(cloudData) && cloudData.length > 0) {
        const normalizedCloud = cloudData.map(normalizeSubmissionRecord).filter(Boolean);
        const map = new Map();
        localList.forEach(item => map.set(item.id.toLowerCase(), item));
        normalizedCloud.forEach(item => map.set(item.id.toLowerCase(), item));
        const merged = Array.from(map.values());
        saveSubmissions(merged);
        return merged;
      }
    } catch (err) {
      console.warn('Supabase background sync notice:', err);
    }
  }
  return localList;
}

async function handleMemberLogin(e) {
  e.preventDefault();
  const idInput = (document.getElementById('member-id')?.value || '').trim();
  const pwdInput = (document.getElementById('member-password')?.value || '').trim();
  const roleInput = (document.getElementById('member-role')?.value || 'Player').trim();
  const errBox = document.getElementById('member-login-error');

  if (errBox) {
    errBox.style.display = 'block';
    errBox.style.background = 'rgba(59, 130, 246, 0.2)';
    errBox.style.borderColor = '#3B82F6';
    errBox.style.color = '#93C5FD';
    errBox.textContent = 'Verifying credentials with database...';
  }

  const subs = await syncSupabaseSubmissions();
  const searchId = idInput.toLowerCase();
  const searchRole = roleInput.toLowerCase();

  // Flexible matching for ID, Mobile, and Role
  let user = subs.find(u => {
    if (!u) return false;
    const uId = (u.id || '').toLowerCase();
    const uLoginId = (u.loginId || '').toLowerCase();
    const uMobile = (u.mobile || '').toLowerCase();
    const uType = (u.type || '').toLowerCase();

    const idMatches = (uId === searchId || uLoginId === searchId || uMobile === searchId);
    const roleMatches = (uType === searchRole || uType.includes(searchRole) || searchRole.includes(uType));

    return idMatches && roleMatches;
  });

  // Fallback: If unique ID or mobile matches, accept match even if type formatting differs
  if (!user) {
    user = subs.find(u => {
      if (!u) return false;
      const uId = (u.id || '').toLowerCase();
      const uLoginId = (u.loginId || '').toLowerCase();
      const uMobile = (u.mobile || '').toLowerCase();
      return (uId === searchId || uLoginId === searchId || uMobile === searchId);
    });
  }

  if (!user) {
    if (errBox) {
      errBox.style.background = 'rgba(239, 68, 68, 0.2)';
      errBox.style.borderColor = '#EF4444';
      errBox.style.color = '#FCA5A5';
      errBox.textContent = `No ${roleInput} account found with ID or Mobile: "${idInput}". Check your ID or fill the registration form.`;
      errBox.style.display = 'block';
    } else {
      alert(`No ${roleInput} account found with ID: "${idInput}".`);
    }
    return false;
  }

  const statusLower = (user.status || '').toLowerCase();
  const isApproved = (statusLower === 'approved' || statusLower === 'verified' || statusLower === 'active');

  if (!isApproved) {
    if (errBox) {
      errBox.style.background = 'rgba(245, 158, 11, 0.2)';
      errBox.style.borderColor = '#F59E0B';
      errBox.style.color = '#FDE68A';
      errBox.textContent = `Your ${user.type || roleInput} registration (${user.id}) is currently pending review by Admin in CMS. Access will be unlocked once approved.`;
      errBox.style.display = 'block';
    } else {
      alert(`Registration (${user.id}) is pending review by CMS.`);
    }
    return false;
  }

  const expectedPwd = (user.password || 'password123').trim();
  if (pwdInput !== expectedPwd) {
    if (errBox) {
      errBox.style.background = 'rgba(239, 68, 68, 0.2)';
      errBox.style.borderColor = '#EF4444';
      errBox.style.color = '#FCA5A5';
      errBox.textContent = `Incorrect password for ${user.id}. Default password is "password123".`;
      errBox.style.display = 'block';
    } else {
      alert(`Incorrect password for ${user.id}. Default is "password123".`);
    }
    return false;
  }

  // Authentication Successful!
  closeMemberLoginModal();
  sessionStorage.setItem('ipl_logged_user', JSON.stringify(user));
  showDashboard(user);
  return false;
}

function handleLogoutMember() {
  sessionStorage.removeItem('ipl_logged_user');
  const dashOverlay = document.getElementById('dashboard-overlay');
  if (dashOverlay) dashOverlay.style.display = 'none';
  if (typeof showAppView === 'function') showAppView('home');
}

function checkUserSession() {
  syncSupabaseSubmissions();
  const sessionStr = sessionStorage.getItem('ipl_logged_user');
  if (sessionStr) {
    try {
      const user = JSON.parse(sessionStr);
      showDashboard(user);
    } catch (e) {}
  }
}

function showDashboard(user) {
  const dashOverlay = document.getElementById('dashboard-overlay');
  const dashContent = document.getElementById('dashboard-content');
  if (!dashOverlay || !dashContent) {
    console.error("Dashboard overlay or content element missing");
    alert("Welcome " + user.name + "! Login successful.");
    return;
  }

  dashOverlay.style.display = 'block';
  dashOverlay.style.position = 'fixed';
  dashOverlay.style.inset = '0';
  dashOverlay.style.zIndex = '9999999';
  dashOverlay.style.background = '#020817';
  dashOverlay.style.overflowY = 'auto';

  if (user.type === 'Player') {
    renderPlayerDashboard(user, dashContent);
  } else if (user.type === 'Vendor') {
    renderVendorDashboard(user, dashContent);
  } else if (user.type === 'Investor') {
    renderInvestorDashboard(user, dashContent);
  }
}

// 1. PLAYER DASHBOARD
function renderPlayerDashboard(user, container) {
  const perfs = getPerf();
  let playerPerf = perfs.find(p => p.playerId === user.id);
  if (!playerPerf) {
    playerPerf = {
      matchesPlayed: 14,
      wins: 11,
      rank: '#4 (MP State League)',
      fitnessScore: '93/100',
      achievements: 'State Trial Qualifier 2026 | District Winner',
      coachRemarks: 'High endurance, rapid agility, and verified sports background.'
    };
  }

  const events = getEvents();
  const eventApps = getEventApps();
  const myApps = eventApps.filter(a => a.playerId === user.id);

  container.innerHTML = `
    <!-- Header -->
    <div class="dash-card-header">
      <div class="dash-user-info">
        <div class="dash-avatar">🏅</div>
        <div>
          <span class="dash-badge">APPROVED STATE ATHLETE</span>
          <h2 style="font-family:'Big Shoulders Display',sans-serif;font-size:26px;color:#ffffff;margin:2px 0 0 0;">${user.name}</h2>
          <span class="dash-sub">Discipline: <strong>${user.details || 'Multi-Sport'}</strong> | District: <strong>${user.location || 'MP'}</strong></span>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="dash-id-tag">ID: ${user.id}</span>
        <button class="dash-logout-btn" onclick="handleLogoutMember()">Logout 🚪</button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="dash-stats-grid">
      <div class="dash-stat">
        <span class="lbl">Matches Played</span>
        <span class="val">${playerPerf.matchesPlayed}</span>
      </div>
      <div class="dash-stat border-green">
        <span class="lbl">Wins / Victories</span>
        <span class="val" style="color:#34D399;">🏆 ${playerPerf.wins}</span>
      </div>
      <div class="dash-stat border-gold">
        <span class="lbl">State Rank</span>
        <span class="val" style="color:var(--gold-light);">${playerPerf.rank}</span>
      </div>
      <div class="dash-stat border-blue">
        <span class="lbl">Fitness Rating</span>
        <span class="val" style="color:#60A5FA;">💪 ${playerPerf.fitnessScore}</span>
      </div>
    </div>

    <!-- Performance Details & Coach Feedback -->
    <div class="dash-box">
      <h3 class="dash-box-title">🏆 Performance Analytics &amp; Coach Feedback</h3>
      <p style="margin-top:8px;color:#E2E8F0;line-height:1.6;"><strong>Key Achievements:</strong> ${playerPerf.achievements}</p>
      <div style="margin-top:12px;background:rgba(212,149,47,0.12);padding:14px;border-left:4px solid var(--gold-light);border-radius:6px;color:#F0C875;font-size:13.5px;line-height:1.5;">
        <strong>Official Coach Remark:</strong> "${playerPerf.coachRemarks}"
      </div>
    </div>

    <!-- Sports Event Calendar Section -->
    <div class="dash-box">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <h3 class="dash-box-title">📅 Corporation Sports Events Calendar</h3>
          <p style="font-size:13px;color:#94A3B8;">Upcoming state championships and talent trials organized by Indian Pro League Alliance Corp.</p>
        </div>
      </div>

      <div class="event-cards-grid" style="margin-top:16px;">
        ${events.map(ev => {
          const hasApplied = myApps.some(a => a.eventId === ev.id);
          return `
          <div class="event-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <span class="type-badge" style="background:rgba(212,149,47,0.15);color:var(--gold-light);">${ev.sport}</span>
              <span class="type-badge" style="background:rgba(16,185,129,0.15);color:#34D399;">${ev.status}</span>
            </div>
            <h4 style="font-family:'Big Shoulders Display',sans-serif;font-size:20px;margin-top:10px;color:#ffffff;">${ev.title}</h4>
            <div style="font-size:12.5px;color:#CBD5E1;margin-top:6px;">
              <span>📅 ${ev.date}</span> &bull; <span>📍 ${ev.venue}</span>
            </div>
            <p style="font-size:12px;color:#94A3B8;margin-top:8px;line-height:1.4;">${ev.desc}</p>
            <div style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11.5px;color:var(--gold-light);font-family:'IBM Plex Mono',monospace;">Eligibility: ${ev.category}</span>
              ${hasApplied ?
                `<button class="dash-btn" style="background:rgba(16,185,129,0.2);color:#34D399;border:1px solid #10B981;" disabled>✅ Registered</button>` :
                `<button class="dash-btn dash-btn-gold" onclick="openEventAppModal('${ev.id}')">Apply Now 📝</button>`
              }
            </div>
          </div>
        `}).join('')}
      </div>
    </div>

    <!-- My Event Applications -->
    <div class="dash-box">
      <h3 class="dash-box-title">🎟️ My Registered Sports Events</h3>
      <div style="margin-top:12px;overflow-x:auto;">
        <table class="cms-table" style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr>
              <th style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);color:var(--gold-light);text-align:left;">App ID</th>
              <th style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);color:var(--gold-light);text-align:left;">Date</th>
              <th style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);color:var(--gold-light);text-align:left;">Event Title</th>
              <th style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);color:var(--gold-light);text-align:left;">Sport</th>
              <th style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.15);color:var(--gold-light);text-align:left;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${myApps.length === 0 ?
              `<tr><td colspan="5" style="text-align:center;padding:24px;color:#94A3B8;">You have not registered for any upcoming events yet. Click "Apply Now" above!</td></tr>` :
              myApps.map(a => `
                <tr>
                  <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);font-family:'IBM Plex Mono',monospace;color:var(--gold-light);font-weight:700;">${a.id}</td>
                  <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:12px;">${a.submittedAt}</td>
                  <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);"><strong>${a.eventTitle}</strong></td>
                  <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);"><span class="type-badge type-player">${a.sport}</span></td>
                  <td style="padding:10px;border-bottom:1px solid rgba(255,255,255,0.06);"><span class="type-badge" style="background:rgba(16,185,129,0.15);color:#34D399;">${a.status}</span></td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 2. VENDOR DASHBOARD
function renderVendorDashboard(user, container) {
  container.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-user-info">
        <div class="dash-avatar">📦</div>
        <div>
          <span class="dash-badge" style="background:rgba(59,130,246,0.15);color:#60A5FA;border-color:rgba(96,165,250,0.3);">VERIFIED PROCUREMENT VENDOR</span>
          <h2 style="font-family:'Big Shoulders Display',sans-serif;font-size:26px;color:#ffffff;margin:2px 0 0 0;">${user.name}</h2>
          <span class="dash-sub">Category: <strong>${user.details || 'Equipment Supplier'}</strong> | Location: <strong>${user.location || 'MP'}</strong></span>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="dash-id-tag">ID: ${user.id}</span>
        <button class="dash-logout-btn" onclick="handleLogoutMember()">Logout 🚪</button>
      </div>
    </div>

    <div class="dash-box">
      <h3 class="dash-box-title">🏢 Vendor Profile &amp; Alliance Supply Catalog</h3>
      <p style="margin-top:8px;color:#E2E8F0;line-height:1.6;">Contact Number: <strong>${user.mobile}</strong></p>
      <p style="margin-top:4px;color:#CBD5E1;line-height:1.6;">Registered Products / Rates: <em>"${user.notes || 'Badminton rackets, shuttlecocks, silicone caps, sports gear'}"</em></p>
    </div>

    <div class="dash-box">
      <h3 class="dash-box-title">📑 Active Procurement Tenders &amp; Facility Bids</h3>
      <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;">
        <div class="event-card">
          <span class="type-badge type-vendor">Badminton Complex Supply</span>
          <h4 style="color:#ffffff;margin-top:8px;">200 Wooden Court Shuttlecock Boxes</h4>
          <p style="font-size:12px;color:#94A3B8;margin-top:4px;">Gwalior &amp; Indore High-Performance Training Academies.</p>
          <span style="display:inline-block;margin-top:12px;color:#34D399;font-weight:700;font-size:13px;">Status: Verified Vendor Eligible</span>
        </div>
        <div class="event-card">
          <span class="type-badge type-vendor">Athletics Track Gear</span>
          <h4 style="color:#ffffff;margin-top:8px;">50 Starting Blocks &amp; Sprint Spikes</h4>
          <p style="font-size:12px;color:#94A3B8;margin-top:4px;">Bhopal District Sports Complex Buildout.</p>
          <span style="display:inline-block;margin-top:12px;color:#34D399;font-weight:700;font-size:13px;">Status: Bid Submission Open</span>
        </div>
      </div>
    </div>
  `;
}

// 3. INVESTOR DASHBOARD
function renderInvestorDashboard(user, container) {
  container.innerHTML = `
    <div class="dash-card-header">
      <div class="dash-user-info">
        <div class="dash-avatar">💼</div>
        <div>
          <span class="dash-badge" style="background:rgba(245,158,11,0.15);color:#FBBF24;border-color:rgba(251,191,36,0.3);">STRATEGIC INFRASTRUCTURE INVESTOR</span>
          <h2 style="font-family:'Big Shoulders Display',sans-serif;font-size:26px;color:#ffffff;margin:2px 0 0 0;">${user.name}</h2>
          <span class="dash-sub">Investment Tier: <strong>${user.details || 'Capital + Land'}</strong> | City: <strong>${user.location || 'MP'}</strong></span>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="dash-id-tag">ID: ${user.id}</span>
        <button class="dash-logout-btn" onclick="handleLogoutMember()">Logout 🚪</button>
      </div>
    </div>

    <div class="dash-box">
      <h3 class="dash-box-title">🏛️ Investor Partnership Overview</h3>
      <p style="margin-top:8px;color:#E2E8F0;line-height:1.6;">Contact Number: <strong>${user.mobile}</strong></p>
      <p style="margin-top:4px;color:#CBD5E1;line-height:1.6;">Proposal / Land Contribution Notes: <em>"${user.notes || 'Panchayat highway land offering for multi-sport complex buildout.'}"</em></p>
    </div>

    <div class="dash-box">
      <h3 class="dash-box-title">📊 Panchayat Infrastructure Profit-Sharing &amp; Timeline</h3>
      <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;">
        <div class="event-card">
          <span class="type-badge type-investor">Complex Allotment #04</span>
          <h4 style="color:#ffffff;margin-top:8px;">Panchayat Highway Sports Hub</h4>
          <p style="font-size:12px;color:#94A3B8;margin-top:4px;">Land Site Verification Completed. Blueprint approved.</p>
          <span style="display:inline-block;margin-top:12px;color:var(--gold-light);font-weight:700;font-size:13px;">Estimated ROI Share: 35% Operating Profit</span>
        </div>
      </div>
    </div>
  `;
}

// Event Application Modal
function openEventAppModal(eventId) {
  const events = getEvents();
  const ev = events.find(x => x.id === eventId);
  if (!ev) return;

  const sessionStr = sessionStorage.getItem('ipl_logged_user');
  if (!sessionStr) return;
  const user = JSON.parse(sessionStr);

  const evIdEl = document.getElementById('event-app-event-id');
  if (evIdEl) evIdEl.value = ev.id;
  const pIdEl = document.getElementById('event-app-player-id');
  if (pIdEl) pIdEl.value = user.id;
  const pNameEl = document.getElementById('event-app-player-name');
  if (pNameEl) pNameEl.value = user.name;
  const titleEl = document.getElementById('event-app-event-title');
  if (titleEl) titleEl.textContent = ev.title;
  const sportEl = document.getElementById('event-app-sport');
  if (sportEl) sportEl.textContent = `${ev.sport} (${ev.date})`;

  const modal = document.getElementById('event-app-modal');
  if (modal) {
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.inset = '0';
    modal.style.zIndex = '99999999';
  }
}

function closeEventAppModal() {
  const modal = document.getElementById('event-app-modal');
  if (modal) modal.style.display = 'none';
}

function handleEventAppSubmit(e) {
  e.preventDefault();
  const eid = document.getElementById('event-app-event-id')?.value || '';
  const pid = document.getElementById('event-app-player-id')?.value || '';
  const pname = document.getElementById('event-app-player-name')?.value || '';
  const tsize = document.getElementById('event-app-tsize')?.value || 'M';
  const contact = document.getElementById('event-app-contact')?.value.trim() || '';

  const events = getEvents();
  const ev = events.find(x => x.id === eid);

  const apps = getEventApps();
  const newApp = {
    id: 'APP-' + Math.floor(9000 + Math.random() * 900),
    submittedAt: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    eventId: eid,
    eventTitle: ev ? ev.title : 'Sports Championship',
    playerId: pid,
    playerName: pname,
    sport: ev ? ev.sport : 'General',
    details: `T-Shirt Size: ${tsize} | Emergency Contact: ${contact}`,
    status: 'Submitted & Ticket Reserved'
  };

  apps.unshift(newApp);
  saveEventApps(apps);

  closeEventAppModal();
  alert(`Registration submitted for ${ev ? ev.title : 'Sports Event'}! Your application ID is ${newApp.id}.`);

  const sessionStr = sessionStorage.getItem('ipl_logged_user');
  if (sessionStr) showDashboard(JSON.parse(sessionStr));
  return false;
}

// Scroll Gallery Banner Animation
(function () {
  const section = document.getElementById('sports');
  const track = document.getElementById('sports-full-track');
  const progressBar = document.getElementById('sports-progress');
  const banners = document.querySelectorAll('#sports-full-track .sports-poster-banner');
  if (!section || !track || !banners.length) return;

  function onScroll() {
    const sectionRect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const totalScrollable = sectionHeight - viewportHeight;
    const currentScroll = -sectionRect.top;
    let progress = currentScroll / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    const trackWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    const maxTranslate = trackWidth - windowWidth + (windowWidth * 0.16);

    const translateX = progress * maxTranslate;
    track.style.transform = `translateX(-${translateX}px)`;

    if (progressBar) progressBar.style.width = `${progress * 100}%`;

    banners.forEach((banner) => {
      const bannerRect = banner.getBoundingClientRect();
      if (bannerRect.left < windowWidth * 0.95 && bannerRect.right > 0) {
        banner.classList.add('unrolled');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();

window.addEventListener('DOMContentLoaded', checkUserSession);

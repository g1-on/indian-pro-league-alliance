/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - ADMIN CMS DASHBOARD LOGIC (BULLETPROOF SYNC)
   ========================================================================== */

const CMS_STORAGE_KEY = 'ipl_alliance_submissions';
let currentCMSCategory = 'all';

const initialSampleData = [
  { id: 'IPL-2026-1041', timestamp: '10 Aug 2026, 02:30 PM', type: 'Player', name: 'Aarav Sharma', mobile: '9826012345', location: 'Gwalior, MP', details: 'Badminton (Age 14)', status: 'Verified', notes: 'Wooden court player with school district certificate.' },
  { id: 'IPL-2026-1042', timestamp: '10 Aug 2026, 03:15 PM', type: 'Vendor', name: 'Sharma Sports Supplies', mobile: '9425198765', location: 'Bhopal, MP', details: 'Badminton Equipment & Kits', status: 'Pending Review', notes: 'Wholesale distributor of synthetic rackets and tournament shuttlecocks.' },
  { id: 'IPL-2026-1043', timestamp: '10 Aug 2026, 04:00 PM', type: 'Investor', name: 'Vikramaditya Singh', mobile: '9893011223', location: 'Indore, MP', details: 'Capital + Land (₹50L - ₹1Cr)', status: 'Approved', notes: 'Offering 2 acres land near panchayat highway for multi-sport complex.' },
  { id: 'IPL-2026-1044', timestamp: '10 Aug 2026, 04:45 PM', type: 'Player', name: 'Priya Verma', mobile: '9752044556', location: 'Ujjain, MP', details: 'Athletics & Track (Age 16)', status: 'Contacted', notes: 'Specializes in 200m & 400m sprints.' },
  { id: 'IPL-2026-1045', timestamp: '10 Aug 2026, 05:10 PM', type: 'Vendor', name: 'Apex Swimwear Pvt Ltd', mobile: '9111099887', location: 'Jabalpur, MP', details: 'Swim Costumes & Gear', status: 'Verified', notes: 'Supplies Olympic grade silicone caps and costumes.' },
  { id: 'IPL-2026-1046', timestamp: '10 Aug 2026, 05:30 PM', type: 'Player', name: 'Devendra Yadav', mobile: '9630088771', location: 'Rewa, MP', details: 'Kabaddi & Wrestling', status: 'Pending Review', notes: 'District level mat wrestler.' }
];

function getLocalSubmissions() {
  const stored = localStorage.getItem(CMS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initialSampleData));
    return initialSampleData;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return initialSampleData;
  }
}

function saveLocalSubmissions(data) {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

async function getSubmissions() {
  const localList = getLocalSubmissions();
  let supabaseList = [];

  // Direct REST API fetch to Supabase Cloud
  if (typeof supabaseRestRequest === 'function') {
    const cloudData = await supabaseRestRequest('submissions?select=*&order=created_at.desc');
    if (Array.isArray(cloudData)) {
      supabaseList = cloudData;
    }
  }

  // Merge Supabase Cloud entries with LocalStorage entries (avoid duplicates by id)
  const map = new Map();
  localList.forEach(item => map.set(item.id, item));
  supabaseList.forEach(item => map.set(item.id, item));

  const merged = Array.from(map.values());
  return merged;
}

function filterCMSCategory(cat) {
  currentCMSCategory = cat;
  document.querySelectorAll('.cms-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('cms-filter-' + cat.toLowerCase())?.classList.add('active');
  renderCMSTable();
}

async function renderCMSTable() {
  const list = await getSubmissions();
  const searchQuery = (document.getElementById('cms-search-input')?.value || '').toLowerCase();

  // Calculate statistics
  const total = list.length;
  const players = list.filter(i => i.type === 'Player').length;
  const vendors = list.filter(i => i.type === 'Vendor').length;
  const investors = list.filter(i => i.type === 'Investor').length;

  if (document.getElementById('cms-stat-total')) document.getElementById('cms-stat-total').textContent = total;
  if (document.getElementById('cms-stat-players')) document.getElementById('cms-stat-players').textContent = players;
  if (document.getElementById('cms-stat-vendors')) document.getElementById('cms-stat-vendors').textContent = vendors;
  if (document.getElementById('cms-stat-investors')) document.getElementById('cms-stat-investors').textContent = investors;

  // Filter list by category and search
  const filtered = list.filter(item => {
    const matchCat = currentCMSCategory === 'all' || item.type === currentCMSCategory;
    const textStr = `${item.id} ${item.name} ${item.mobile} ${item.location} ${item.details} ${item.status}`.toLowerCase();
    const matchSearch = !searchQuery || textStr.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const tbody = document.getElementById('cms-table-body');
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:48px;color:#94A3B8;">No registration records found matching your search query.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td style="font-family:'IBM Plex Mono',monospace;font-weight:700;color:var(--gold-light);">${item.id}</td>
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
        <div style="display:flex;gap:8px;">
          <button class="action-btn" onclick="viewCMSDetails('${item.id}')">View</button>
          <button class="action-btn action-btn-del" onclick="deleteCMSEntry('${item.id}')">✕</button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function updateCMSStatus(id, newStatus) {
  // Update in LocalStorage
  const stored = getLocalSubmissions();
  const item = stored.find(i => i.id === id);
  if (item) item.status = newStatus;
  saveLocalSubmissions(stored);

  // Update in Supabase Cloud via Direct REST
  if (typeof supabaseRestRequest === 'function') {
    supabaseRestRequest(`submissions?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus })
    });
  }

  renderCMSTable();
}

async function deleteCMSEntry(id) {
  if (confirm('Are you sure you want to delete registration record ' + id + '?')) {
    // Delete in LocalStorage
    let stored = getLocalSubmissions();
    stored = stored.filter(i => i.id !== id);
    saveLocalSubmissions(stored);

    // Delete in Supabase Cloud via Direct REST
    if (typeof supabaseRestRequest === 'function') {
      supabaseRestRequest(`submissions?id=eq.${id}`, {
        method: 'DELETE'
      });
    }

    renderCMSTable();
  }
}

async function viewCMSDetails(id) {
  const list = await getSubmissions();
  const item = list.find(i => i.id === id);
  if (!item) return;

  document.getElementById('cms-detail-title').textContent = `${item.type} Record Details (${item.id})`;
  document.getElementById('cms-detail-content').innerHTML = `
    <div class="cms-detail-row"><span class="lbl">Submission ID:</span> <strong>${item.id}</strong></div>
    <div class="cms-detail-row"><span class="lbl">Registration Type:</span> <span class="type-badge type-${item.type.toLowerCase()}">${item.type}</span></div>
    <div class="cms-detail-row"><span class="lbl">Timestamp:</span> <span>${item.timestamp}</span></div>
    <div class="cms-detail-row"><span class="lbl">Name / Business:</span> <strong>${item.name}</strong></div>
    <div class="cms-detail-row"><span class="lbl">Mobile Number:</span> <span>${item.mobile}</span></div>
    <div class="cms-detail-row"><span class="lbl">District / Location:</span> <span>${item.location || 'N/A'}</span></div>
    <div class="cms-detail-row"><span class="lbl">Category / Discipline:</span> <span>${item.details || 'N/A'}</span></div>
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

async function seedSampleCMSData() {
  if (confirm('Reset CMS database to sample registrations?')) {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(initialSampleData));
    if (typeof supabaseRestRequest === 'function') {
      supabaseRestRequest('submissions', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: JSON.stringify(initialSampleData)
      });
    }
    renderCMSTable();
  }
}

async function exportCMSToCSV() {
  const list = await getSubmissions();
  if (!list.length) { alert('No records to export.'); return; }

  const headers = ['Submission ID', 'Date & Time', 'Type', 'Name/Business', 'Mobile', 'Location', 'Category/Discipline', 'Status', 'Notes'];
  const rows = list.map(i => [
    i.id,
    `"${i.timestamp}"`,
    i.type,
    `"${i.name}"`,
    `"${i.mobile}"`,
    `"${i.location || ''}"`,
    `"${i.details || ''}"`,
    i.status,
    `"${(i.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `IPL_Alliance_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ---------- ADMIN AUTHENTICATION LOGIC ----------
const ADMIN_AUTH_KEY = 'ipl_admin_authenticated';

function checkAdminAuth() {
  const isAuth = sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  const overlay = document.getElementById('admin-login-overlay');
  const container = document.getElementById('cms-main-container');

  if (isAuth) {
    if (overlay) overlay.classList.add('hidden');
    if (container) container.style.display = 'flex';
    renderCMSTable();
  } else {
    if (overlay) overlay.classList.remove('hidden');
    if (container) container.style.display = 'none';
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('login-username')?.value.trim();
  const passwordInput = document.getElementById('login-password')?.value.trim();
  const errorMsg = document.getElementById('login-error-msg');

  // Credentials: admin / ipl2026
  if ((usernameInput === 'admin' || usernameInput === 'admin@indianproleaguealliance.in') && (passwordInput === 'ipl2026' || passwordInput === 'admin123')) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    if (errorMsg) errorMsg.style.display = 'none';
    checkAdminAuth();
  } else {
    if (errorMsg) {
      errorMsg.textContent = 'Invalid Username or Password. Please check default hint.';
      errorMsg.style.display = 'block';
    }
  }
  return false;
}

function handleAdminLogout() {
  if (confirm('Are you sure you want to log out of the Admin CMS Portal?')) {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    checkAdminAuth();
  }
}

// Initial Render and Auth Check on Page Load
document.addEventListener('DOMContentLoaded', () => {
  checkAdminAuth();
});


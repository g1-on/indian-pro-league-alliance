/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - MAIN WEBSITE INTERACTIVE LOGIC (BULLETPROOF SYNC)
   ========================================================================== */

const CMS_STORAGE_KEY = 'ipl_alliance_submissions';

function getSubmissions() {
  const stored = localStorage.getItem(CMS_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveSubmissions(data) {
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
}

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

  let submissionData = {
    id: 'IPL-2026-' + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    type: formType === 'player' ? 'Player' : formType === 'vendor' ? 'Vendor' : 'Investor',
    status: 'Pending Review',
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

  // 1. Save to LocalStorage immediately
  const list = getSubmissions();
  list.unshift(submissionData);
  saveSubmissions(list);
  console.log('✅ Local storage updated:', submissionData);

  // 2. Direct REST API Call to Supabase Cloud Database (Bulletproof Native Fetch)
  if (typeof supabaseRestRequest === 'function') {
    supabaseRestRequest('submissions', {
      method: 'POST',
      headers: { 'Prefer': 'return=minimal' },
      body: JSON.stringify(submissionData)
    }).then(res => {
      if (res) {
        console.log('☁️ Registration successfully synced to Supabase Cloud Database!');
      } else {
        console.warn('⚠️ Cloud sync returned null, local copy preserved.');
      }
    });
  }

  // 3. Show Confirmation Box
  const confirmBox = document.getElementById('confirm-' + formType);
  if (confirmBox) {
    confirmBox.style.display = 'flex';
    setTimeout(() => { confirmBox.scrollIntoView({ behavior: 'smooth' }); }, 100);
  }

  form.reset();
  return false;
}

// Full View Scroll-Driven Pinned Sports Gallery (Mouse Scroll Movement)
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

    // Calculate scroll progress from 0 to 1 inside section
    const totalScrollable = sectionHeight - viewportHeight;
    const currentScroll = -sectionRect.top;
    let progress = currentScroll / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    // Calculate horizontal translation distance
    const trackWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    const maxTranslate = trackWidth - windowWidth + (windowWidth * 0.16);

    const translateX = progress * maxTranslate;
    track.style.transform = `translateX(-${translateX}px)`;

    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    // Unroll banners as they enter the screen
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

// Global Tier Navigation Helpers
let currentTierIndex = 0;

function switchTierPage(index) {
  const section = document.getElementById('tier-network');
  if (!section) return;
  const sectionTop = window.scrollY + section.getBoundingClientRect().top;
  const sectionHeight = section.offsetHeight;
  const totalScrollable = sectionHeight - window.innerHeight;

  const targetFractions = [0.05, 0.48, 0.85];
  const targetFraction = targetFractions[index] || 0;
  const targetScrollY = sectionTop + (targetFraction * totalScrollable);

  window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
}

function stepTierPage(dir) {
  let nextIndex = currentTierIndex + dir;
  nextIndex = Math.max(0, Math.min(2, nextIndex));
  switchTierPage(nextIndex);
}

// Full-Screen Stacking Fade Showcase for 3-Tier Network (Tier 3 -> Tier 2 -> Tier 1)
(function () {
  const section = document.getElementById('tier-network');
  const pages = [
    document.getElementById('tier-page-1'),
    document.getElementById('tier-page-2'),
    document.getElementById('tier-page-3')
  ];
  const progressBar = document.getElementById('tier-fade-progress');
  const counter = document.getElementById('tier-fade-counter');

  if (!section || !pages[0]) return;

  function onTierFadeScroll() {
    const sectionRect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;

    const totalScrollable = sectionHeight - viewportHeight;
    if (totalScrollable <= 0) return;

    let progress = -sectionRect.top / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    // Determine active index: [0..0.33) -> Tier 3, [0.33..0.66) -> Tier 2, [0.66..1.0] -> Tier 1
    let activeIndex = 0;
    if (progress >= 0.66) {
      activeIndex = 2;
    } else if (progress >= 0.33) {
      activeIndex = 1;
    } else {
      activeIndex = 0;
    }

    currentTierIndex = activeIndex;

    if (counter) {
      counter.textContent = `TIER 0${activeIndex + 1} / 0${pages.length}`;
    }

    // Update active state on tab buttons
    for (let i = 0; i < 3; i++) {
      const tabBtn = document.getElementById('tier-tab-' + i);
      if (tabBtn) {
        if (i === activeIndex) tabBtn.classList.add('active');
        else tabBtn.classList.remove('active');
      }
    }

    pages.forEach((page, idx) => {
      if (!page) return;
      if (idx === activeIndex) {
        page.classList.add('active');
        page.classList.remove('exit');
      } else if (idx < activeIndex) {
        page.classList.remove('active');
        page.classList.add('exit');
      } else {
        page.classList.remove('active');
        page.classList.remove('exit');
      }
    });
  }

  window.addEventListener('scroll', onTierFadeScroll, { passive: true });
  window.addEventListener('resize', onTierFadeScroll);
  onTierFadeScroll();
})();





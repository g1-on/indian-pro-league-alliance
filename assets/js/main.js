/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - MAIN WEBSITE INTERACTIVE LOGIC (SUPABASE READY)
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

async function handleSubmit(e, formType) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');

  let submissionData = {
    id: 'IPL-2026-' + Math.floor(1000 + Math.random() * 9000),
    timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
    type: formType === 'player' ? 'Player' : formType === 'vendor' ? 'Vendor' : 'Investor',
    status: 'Pending Review'
  };

  inputs.forEach(input => {
    const label = input.closest('.field')?.querySelector('label')?.textContent || '';
    if (label.includes('Name') || label.includes('Business') || label.includes('Contact Person')) {
      if (!submissionData.name) submissionData.name = input.value;
    } else if (label.includes('Mobile')) {
      submissionData.mobile = input.value;
    } else if (label.includes('District') || label.includes('City') || label.includes('Panchayat') || label.includes('State')) {
      if (!submissionData.location) submissionData.location = input.value;
      else submissionData.location += ', ' + input.value;
    } else if (label.includes('Sport') || label.includes('Category') || label.includes('Investment Type')) {
      submissionData.details = input.value;
    } else if (label.includes('Background') || label.includes('Products') || label.includes('Notes')) {
      submissionData.notes = input.value;
    }
  });

  if (!submissionData.name) submissionData.name = 'Registrant (' + submissionData.type + ')';

  // 1. Save locally for instant UI update
  const list = getSubmissions();
  list.unshift(submissionData);
  saveSubmissions(list);

  // 2. Save to Supabase Cloud Database if client is connected
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      const { data, error } = await supabaseClient.from('submissions').insert([submissionData]);
      if (error) {
        console.warn('Supabase Insert Warning:', error.message);
      } else {
        console.log('✅ Registration saved to Supabase Cloud Database');
      }
    } catch (err) {
      console.warn('Supabase Insert Error:', err);
    }
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

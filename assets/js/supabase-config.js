/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - SUPABASE CONFIGURATION
   ========================================================================== */

// Your Supabase Project URL (Extracted from IPL-Alliance project)
const SUPABASE_URL = 'https://xxlekjolrjpmzjupipc.supabase.co';

// Paste your anon public key from Supabase Dashboard -> Project Settings -> API
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;

// Initialize Supabase client if key is configured
if (typeof supabase !== 'undefined' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase Client Initialized Successfully (IPL-Alliance)');
  } catch (err) {
    console.warn('⚠️ Supabase Initialization Error, falling back to LocalStorage:', err);
  }
} else {
  console.log('ℹ️ Supabase URL set. Please paste your anon API key into assets/js/supabase-config.js to activate live cloud database.');
}

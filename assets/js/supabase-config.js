/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - SUPABASE CONFIGURATION
   ========================================================================== */

// 1. Replace with your Supabase Project URL and Anon Key from Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;

// Initialize Supabase client if configured
if (typeof supabase !== 'undefined' && SUPABASE_URL !== 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase Client Initialized Successfully');
  } catch (err) {
    console.warn('⚠️ Supabase Initialization Error, falling back to LocalStorage:', err);
  }
} else {
  console.log('ℹ️ Supabase not fully configured yet. Operating in LocalStorage mode with automatic cloud sync ready.');
}

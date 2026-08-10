/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - SUPABASE CONFIGURATION
   ========================================================================== */

// Supabase Project URL (IPL-Alliance)
const SUPABASE_URL = 'https://xxlekjolrjpmzjupipc.supabase.co';

// Supabase Publishable / Anon Public Key
const SUPABASE_ANON_KEY = 'sb_publishable_kvQ_nASBZ5zYaxM8hDNaHw_CtYadQEY';

let supabaseClient = null;

// Initialize Supabase client
if (typeof supabase !== 'undefined' && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase Cloud Database Connected Successfully (IPL-Alliance)');
  } catch (err) {
    console.warn('⚠️ Supabase Initialization Warning:', err);
  }
} else {
  console.log('ℹ️ Operating in fallback mode.');
}

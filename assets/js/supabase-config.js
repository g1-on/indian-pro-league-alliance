/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - SUPABASE CONFIGURATION
   ========================================================================== */

// Supabase Project URL (IPL-Alliance)
const SUPABASE_URL = 'https://xxiekjolrrjpmzjuplpc.supabase.co';

// Supabase Legacy Anon JWT Key
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aWVram9scnJqcG16anVwbHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNjI1MzgsImV4cCI6MjEwMTkzODUzOH0.T5NNu9XPq66M-V01iXZZEL9T22C0X1_TMI0BvjFw9gk';

let supabaseClient = null;

// Initialize Supabase client
if (typeof supabase !== 'undefined' && SUPABASE_ANON_KEY) {
  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase Cloud Database Connected Successfully (IPL-Alliance)');
  } catch (err) {
    console.warn('⚠️ Supabase Initialization Warning:', err);
  }
}

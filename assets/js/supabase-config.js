/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - DIRECT SUPABASE REST & SDK CONFIGURATION
   ========================================================================== */

const SUPABASE_URL = 'https://xxiekjolrrjpmzjuplpc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aWVram9scnJqcG16anVwbHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNjI1MzgsImV4cCI6MjEwMTkzODUzOH0.T5NNu9XPq66M-V01iXZZEL9T22C0X1_TMI0BvjFw9gk';

// Direct REST API Headers
const SUPABASE_HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
  'Content-Type': 'application/json'
};

// Helper for direct Supabase REST API requests (Zero dependency)
async function supabaseRestRequest(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = { ...SUPABASE_HEADERS, ...(options.headers || {}) };
  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      console.warn('Supabase REST Response Error:', res.status, res.statusText);
      return null;
    }
    const text = await res.text();
    return text ? JSON.parse(text) : true;
  } catch (err) {
    console.warn('Supabase REST Fetch Error:', err);
    return null;
  }
}

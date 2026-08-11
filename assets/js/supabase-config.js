/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - DIRECT SUPABASE REST CONFIGURATION (ENCRYPTED / OBFUSCATED)
   ========================================================================== */

// Obfuscated Database Credentials
const _dK1 = 'aHR0cHM6Ly94eGlla2pvbHJyanBtemp1cGxwYy5zdXBhYmFzZS5jbw==';
const _dK2 = 'ZXlKaGJHY2lPaUpJVXpVeE5pSXNJblI1Y0NJNklrSlhWQ0o5LmV5SnBjM01pT2lKMzNYQmhZbUZ6WlMxd1pXZDVjR1FpTENKcGNYTWlPaUpjZERCc1lXUnpJaXdpY205c1pTSTZJbUZ1YjI0aUxDSnBZWFFpT2pFM09EWXpOakkxTXpnc0ltVjRjQ0k2TWpFt01pNmFNc1YySUo2WVZNVmFRd0J2akZ3QWdr';

function _getEndpoint() { return typeof atob === 'function' ? atob(_dK1) : ''; }
function _getKey() {
  const k = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aWVram9scnJqcG16anVwbHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNjI1MzgsImV4cCI6MjEwMTkzODUzOH0.T5NNu9XPq66M-V01iXZZEL9T22C0X1_TMI0BvjFw9gk';
  return k;
}

const SUPABASE_URL = _getEndpoint();
const SUPABASE_ANON_KEY = _getKey();

// Helper for direct Supabase REST API requests
async function supabaseRestRequest(endpoint, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  try {
    const res = await fetch(url, { ...options, headers });
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : true;
  } catch (err) {
    return null;
  }
}

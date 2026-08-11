/* ==========================================================================
   INDIAN PRO LEAGUE ALLIANCE - FIREBASE AUTHENTICATION CONFIGURATION
   ========================================================================== */

// Replace with your Firebase Project Configuration from Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN.firebaseapp.com",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let firebaseApp = null;
let firebaseAuth = null;

// Initialize Firebase if SDK is loaded and configured
if (typeof firebase !== 'undefined' && firebase.initializeApp) {
  try {
    if (!firebase.apps.length) {
      firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      firebaseApp = firebase.app();
    }
    firebaseAuth = firebase.auth();
    console.log('✅ Firebase SDK Loaded');
  } catch (err) {
    console.warn('⚠️ Firebase Initialization Notice:', err);
  }
} else {
  console.log('ℹ️ Firebase SDK ready for project credentials.');
}

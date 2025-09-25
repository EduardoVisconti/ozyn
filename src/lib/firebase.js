// src/lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

function must(name) {
  const v = import.meta.env[name];
  if (!v) {
    throw new Error(`[Firebase config] Missing env ${name}. Did you create .env.local and restart Vite?`);
  }
  return v;
}

const firebaseConfig = {
  apiKey: must("VITE_FIREBASE_API_KEY"),
  authDomain: must("VITE_FIREBASE_AUTH_DOMAIN"),
  projectId: must("VITE_FIREBASE_PROJECT_ID"),
  storageBucket: must("VITE_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: must("VITE_FIREBASE_MESSAGING_SENDER_ID"),
  appId: must("VITE_FIREBASE_APP_ID"),
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Persist session across reloads
setPersistence(auth, browserLocalPersistence).catch((e) => {
  // Non-fatal; just logs if a browser blocks persistence
  console.warn("Auth persistence warning:", e?.code || e);
});

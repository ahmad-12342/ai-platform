import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Defensive check for initialization
let app;
try {
    if (!getApps().length) {
        // Only initialize if we have the minimum required config
        if (firebaseConfig.apiKey) {
            app = initializeApp(firebaseConfig);
        } else {
            console.error("Firebase API Key is missing! Check Vercel Environment Variables.");
            // Return a dummy app object to prevent crashes, but it won't work
            app = { name: '[DEFAULT]', options: {}, automaticDataCollectionEnabled: false };
        }
    } else {
        app = getApp();
    }
} catch (e) {
    console.error("Firebase App initialization error:", e);
}

// Ensure auth and db are only initialized if app is valid
const auth = app && app.options ? getAuth(app) : null;
const db = app && app.options ? getFirestore(app) : null;

// Safety logs to verify initialization in browser console
if (typeof window !== 'undefined' && !firebaseConfig.apiKey) {
    console.warn("⚠️ Firebase configuration not found. Please set NEXT_PUBLIC_FIREBASE_API_KEY in Vercel.");
}

export { auth, db, app };
export default app;



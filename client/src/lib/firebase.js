import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Only initialize Firebase if API keys are present to prevent crashes (auth/invalid-api-key)
let app;
let auth;

if (firebaseConfig.apiKey) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
} else {
    // Prevent crashes if keys are not set yet
    console.warn("Firebase configuration is missing! Please add NEXT_PUBLIC_FIREBASE_API_KEY to your .env file.");
    app = null;
    auth = {
        // Mock auth object to prevent immediate reference errors in components
        currentUser: null,
        onAuthStateChanged: () => () => { } // returns empty unsubscribe function
    };
}

export { auth };
export default app;

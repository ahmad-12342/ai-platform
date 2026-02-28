import { db } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    serverTimestamp,
    increment,
} from "firebase/firestore";

// ─────────────────────────────────────────────
// USER PROFILE
// ─────────────────────────────────────────────

// Create user profile in Firestore if it doesn't exist
export async function syncUser(user) {
    if (!db || !user) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            credits: 10,
            plan: "free",
            totalGenerations: 0,
            storageUsed: 0, // MB
            timeSaved: 0,   // Hours
            createdAt: serverTimestamp(),
        });
    }
}

// Get user profile + stats
export async function getUserProfile(uid) {
    if (!db) return null;
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
}

// ─────────────────────────────────────────────
// GENERATIONS — Save & Read
// ─────────────────────────────────────────────

// Save a new generation and update user stats atomically
export async function saveGeneration({ uid, type, prompt, resultUrl = null, textContent = null, metadata = {}, creditCost, storageMB, timeSavedHrs }) {
    if (!db) return;

    // 1. Add generation document
    await addDoc(collection(db, "generations"), {
        uid,
        type,          // 'image' | 'video' | 'cv' | 'content'
        prompt,
        resultUrl,
        textContent,
        metadata,
        createdAt: serverTimestamp(),
    });

    // 2. Update user stats in one atomic write
    await updateDoc(doc(db, "users", uid), {
        credits: increment(-creditCost),
        totalGenerations: increment(1),
        storageUsed: increment(storageMB),
        timeSaved: increment(timeSavedHrs),
    });
}

// Get recent N generations for a user
export async function getRecentGenerations(uid, count = 5) {
    if (!db) return [];
    const q = query(
        collection(db, "generations"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc"),
        limit(count)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Check if user has enough credits
export async function hasCredits(uid, required) {
    const profile = await getUserProfile(uid);
    return profile && profile.credits >= required;
}

"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { syncUser, getUserProfile, getRecentGenerations } from '@/lib/firestoreService';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(false);

    // Load stats from Firestore
    const fetchProfile = useCallback(async (uid) => {
        setStatsLoading(true);
        try {
            const [profile, recent] = await Promise.all([
                getUserProfile(uid),
                getRecentGenerations(uid, 5),
            ]);

            if (profile) {
                setUserStats({
                    credits: profile.credits ?? 10,
                    totalGenerations: profile.totalGenerations ?? 0,
                    storageUsed: profile.storageUsed ?? 0,
                    timeSaved: profile.timeSaved ?? 0,
                    plan: profile.plan ?? 'free',
                });
            }
            setRecentActivity(recent);
        } catch (err) {
            console.error('Firestore profile fetch error:', err);
        } finally {
            setStatsLoading(false);
        }
    }, []);

    // Call this after every generation to refresh stats live
    const refreshStats = useCallback(async () => {
        if (user) await fetchProfile(user.uid);
    }, [user, fetchProfile]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userData = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL:
                        firebaseUser.photoURL ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${firebaseUser.email}`,
                };
                setUser(userData);
                setLoading(false); // ✅ UI shows immediately

                // Background: sync to Firestore (creates doc if new user)
                await syncUser(firebaseUser);
                // Load stats in background
                fetchProfile(firebaseUser.uid);
            } else {
                setUser(null);
                setUserStats(null);
                setRecentActivity([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [fetchProfile]);

    const logout = async () => {
        await firebaseSignOut(auth);
    };

    return (
        <AuthContext.Provider
            value={{ user, userStats, recentActivity, statsLoading, refreshStats, logout, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

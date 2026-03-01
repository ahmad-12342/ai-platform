"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    User,
    Mail,
    Calendar,
    ShieldCheck,
    Sparkles,
    CreditCard,
    TrendingUp,
    Clock,
    Loader2,
    LogOut
} from 'lucide-react';

export default function ProfilePage() {
    const { user, userStats, loading, statsLoading, logout } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    const statCards = [
        { label: "Total Generations", value: userStats?.totalGenerations || 0, icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Remaining Credits", value: userStats?.credits || 0, icon: CreditCard, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Storage Used", value: `${userStats?.storageUsed?.toFixed(1) || 0} MB`, icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
        { label: "Time Saved", value: `${userStats?.timeSaved?.toFixed(1) || 0}h`, icon: Clock, color: "text-orange-400", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
            >
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src={user?.photoURL}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-background object-cover relative"
                        />
                        <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-background"></div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-white">{user?.displayName || 'Creative User'}</h1>
                            <span className="inline-flex items-center px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                                {userStats?.plan || 'Free'} Plan
                            </span>
                        </div>
                        <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                            <Mail className="w-4 h-4" /> {user?.email}
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <button className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all shadow-lg">
                                Edit Profile
                            </button>
                            <button
                                onClick={logout}
                                className="px-6 py-2 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-sm hover:bg-red-500/20 transition-all flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background Decorations */}
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <User className="w-64 h-64" />
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all group"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        {statsLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                        ) : (
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Detailed Account Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-[2.5rem] border border-white/10"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Security & Identity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Firebase UID</p>
                                <p className="text-sm font-mono text-gray-300 break-all">{user?.uid}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Account Created</p>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <Calendar className="w-4 h-4" />
                                    {userStats?.createdAt ? new Date(userStats.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-primary/5 to-transparent flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-xl font-bold mb-4">Membership Status</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            You are currently on the <strong className="text-white italic">{userStats?.plan?.toUpperCase()}</strong> plan.
                            Upgrade to Pro to unlock unlimited generations, HD Video, and commercial usage rights.
                        </p>
                    </div>
                    {userStats?.plan !== 'pro' && (
                        <Link href="/#pricing">
                            <button className="w-full py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4" /> Upgrade to Pro
                            </button>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

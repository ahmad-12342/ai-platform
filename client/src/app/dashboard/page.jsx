"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Video, FileText, Sparkles, TrendingUp, CreditCard, Clock, History, Zap } from 'lucide-react';
import Link from 'next/link';

const stats = [
    { label: "Generations", value: "128", icon: Sparkles, color: "text-purple-400" },
    { label: "Credits Left", value: "450", icon: CreditCard, color: "text-blue-400" },
    { label: "Storage Used", value: "1.2 GB", icon: TrendingUp, color: "text-green-400" },
    { label: "Time Saved", value: "24h", icon: Clock, color: "text-orange-400" },
];

const tools = [
    { name: "AI Image Gen", desc: "Create stunning visuals", icon: ImageIcon, color: "bg-blue-500/10 text-blue-500", href: "/dashboard/images" },
    { name: "AI Video Studio", desc: "Cinematic AI videos", icon: Video, color: "bg-purple-500/10 text-purple-500", href: "/dashboard/videos" },
    { name: "Professional CV", desc: "ATS-optimized resumes", icon: FileText, color: "bg-pink-500/10 text-pink-500", href: "/dashboard/cv" },
    { name: "AI Content Writer", desc: "Blogs, scripts & code", icon: Sparkles, color: "bg-orange-500/10 text-orange-500", href: "/dashboard/content" },
];

export default function Page() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome back, User!</h1>
                <p className="text-gray-400">Ready to create something amazing today?</p>
            </div>

            {/* AI Tools Selection */}
            <div>
                <h2 className="text-xl font-bold mb-6">Explore Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tools.map((tool, idx) => (
                        <Link key={idx} href={tool.href}>
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${tool.color} group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                                <p className="text-sm text-gray-400">{tool.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4 mb-4">
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            <span className="text-sm font-medium text-gray-400">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <History className="w-5 h-5 text-primary" /> Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 last:border-0 hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <ImageIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Cyberpunk City Landscape</p>
                                        <p className="text-xs text-gray-500">Image Gen • 2h ago</p>
                                    </div>
                                </div>
                                <button className="text-xs text-primary font-bold hover:underline">View</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Tips */}
                <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-xl">
                            <Zap className="text-black w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold mb-4">Pro Promptova Tip</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                            Use more descriptive prompts to get better results. For images, try adding lighting details like &quot;cinematic lighting&quot; or &quot;golden hour&quot; to make your creations stand out.
                        </p>
                        <button className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">
                            Read Guide
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                        <Sparkles className="w-32 h-32" />
                    </div>
                </div>
            </div>
        </div>
    );
}

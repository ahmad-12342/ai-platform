// Dashboard Overview
import React from 'react';
import { Sparkles, History, Zap, TrendingUp } from 'lucide-react';

export default function DashboardOverview() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-2">Welcome back, Creator</h1>
                <p className="text-gray-400">Here's what's happening with your AI assets.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Generations', value: '12', icon: Zap, color: 'text-blue-500' },
                    { label: 'Credits Used', value: '45', icon: Sparkles, color: 'text-purple-500' },
                    { label: 'Storage Saved', value: '1.2 GB', icon: History, color: 'text-pink-500' },
                    { label: 'Time Saved', value: '24 hrs', icon: TrendingUp, color: 'text-green-500' },
                ].map((stat, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border border-white/5">
                        <stat.icon className={`w-6 h-6 ${stat.color} mb-4`} />
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass p-8 rounded-[2rem] border border-white/5">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <History className="w-5 h-5" /> Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                                        <Sparkles className="text-primary w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Blog content about AI</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-gray-400 px-3 py-1 glass rounded-full">Text Content</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-[2rem] border border-white/5 flex flex-col justify-center items-center text-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="text-primary w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold">Start New Project</h3>
                    <p className="text-gray-400 text-sm max-w-[250px]">Choose one of our AI tools to bring your next idea to life.</p>
                </div>
            </div>
        </div>
    );
}

"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Download, Play, RefreshCw, Slider, Fullscreen } from 'lucide-react';

const aspectRatios = [
    { id: '16:9', label: '16:9 Landscape', icon: '📺' },
    { id: '9:16', label: '9:16 Portrait', icon: '📱' },
    { id: '1:1', label: '1:1 Square', icon: '⏹️' },
];

const durations = ['5s', '10s', '15s'];

const VideoGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [aspect, setAspect] = useState('16:9');
    const [duration, setDuration] = useState('5s');
    const [motionLevel, setMotionLevel] = useState(5);
    const [generating, setGenerating] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        // Simulate generation
        setTimeout(() => {
            setVideoUrl('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
            setGenerating(false);
        }, 4000);
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <Video className="text-purple-500" />
                    AI Video Studio
                </h1>
                <p className="text-gray-400">Create cinematic videos from simple text descriptions.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Aspect Ratio</label>
                            <div className="space-y-2">
                                {aspectRatios.map((r) => (
                                    <button
                                        key={r.id}
                                        onClick={() => setAspect(r.id)}
                                        className={`w-full p-4 rounded-xl border transition-all flex items-center gap-3 ${aspect === r.id
                                                ? 'border-primary bg-primary/10 text-white'
                                                : 'border-white/5 hover:border-white/20 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-xl">{r.icon}</span>
                                        <span className="font-medium">{r.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Duration</label>
                            <div className="flex gap-2">
                                {durations.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDuration(d)}
                                        className={`flex-1 p-3 rounded-xl border transition-all ${duration === d
                                                ? 'border-primary bg-primary/10 text-white'
                                                : 'border-white/5 hover:border-white/20 text-gray-400'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-gray-400">Motion Level</label>
                                <span className="text-primary font-bold">{motionLevel}</span>
                            </div>
                            <input
                                type="range" min="1" max="10"
                                value={motionLevel}
                                onChange={(e) => setMotionLevel(parseInt(e.target.value))}
                                className="w-full accent-primary h-2 bg-white/5 rounded-full appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-tighter">
                                <span>Static</span>
                                <span>Hyper Dynamic</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the action and scene in detail..."
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary transition-colors resize-none mb-2"
                        />

                        <button
                            onClick={handleGenerate}
                            disabled={generating || !prompt}
                            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Rendering Video Sequence...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 fill-current" />
                                    Generate Video
                                </>
                            )}
                        </button>
                    </div>

                    <div className="aspect-video w-full rounded-3xl glass border border-white/10 flex items-center justify-center overflow-hidden relative group">
                        {videoUrl ? (
                            <>
                                <video
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    loop
                                />
                                <button className="absolute top-4 right-4 p-3 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Download className="w-5 h-5" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center space-y-4 text-gray-500">
                                <Video className="w-20 h-20 mx-auto opacity-20" />
                                <p>Advanced video rendering will appear here</p>
                            </div>
                        )}
                        {generating && (
                            <div className="absolute inset-0 glass flex items-center justify-center z-20">
                                <div className="flex flex-col items-center gap-6 w-1/2">
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 4 }}
                                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                        />
                                    </div>
                                    <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Synthesizing Frames...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGenerator;

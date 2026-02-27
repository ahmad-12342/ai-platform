"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Download, Play, RefreshCw, Sliders, Maximize } from 'lucide-react';

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
        setVideoUrl(null);

        // Simulating Video Generation
        setTimeout(() => {
            setVideoUrl('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
            setGenerating(false);
        }, 5000);
    };

    const handleDownload = async () => {
        if (!videoUrl) return;
        try {
            const response = await fetch(videoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `promptova-ai-video-${Date.now()}.mp4`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(videoUrl, '_blank');
        }
    };

    const handleRegenerate = () => {
        handleGenerate();
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-purple-500/20">
                    <Video className="w-3 h-3" />
                    Temporal Diffusion Engine
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Director&apos;s <span className="text-gradient">Studio</span></h1>
                <p className="text-gray-400 max-w-xl mx-auto">Turn your stories into cinematic video sequences with high-fidelity motion.</p>
            </motion.header>

            <div className="space-y-12">
                {/* Modern Prompt Input */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="glass p-2 rounded-[2rem] border border-white/10 shadow-2xl focus-within:border-primary/50 transition-all flex flex-col md:flex-row items-center gap-2">
                        <div className="flex-1 flex items-center px-6 w-full">
                            <Play className="w-6 h-6 text-gray-400 mr-4" />
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="A majestic eagle soaring over snow-capped mountains at sunset..."
                                className="w-full bg-transparent border-none outline-none py-6 text-lg text-white placeholder:text-gray-600"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={generating || !prompt}
                            className="w-full md:w-auto px-10 py-5 rounded-[1.5rem] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20 disabled:opacity-50"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Rendering...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 fill-current" />
                                    Action
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {aspectRatios.map(r => (
                            <button
                                key={r.id}
                                onClick={() => setAspect(r.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${aspect === r.id
                                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                                    }`}
                            >
                                <span className="mr-2">{r.icon}</span>
                                {r.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Result Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass border border-white/10 group shadow-2xl">
                        {videoUrl ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full h-full"
                            >
                                <video
                                    src={videoUrl}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    loop
                                />
                                <div className="absolute top-6 right-6 flex gap-2">
                                    <button
                                        onClick={handleDownload}
                                        className="p-3 glass text-white rounded-full hover:scale-110 transition-all border border-white/10"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handleRegenerate}
                                        className="p-3 glass text-white rounded-full hover:scale-110 transition-all border border-white/10"
                                    >
                                        <RefreshCw className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                {generating ? (
                                    <div className="space-y-8 flex flex-col items-center w-full max-w-sm px-10">
                                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 5, ease: "linear" }}
                                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xl font-bold animate-pulse text-purple-400">Synthesizing Temporal Frames</p>
                                            <p className="text-gray-500 text-xs tracking-widest uppercase">Resolution: 1080p • Duration: {duration}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 opacity-30">
                                        <div className="w-24 h-24 mx-auto border-4 border-dashed border-gray-500 rounded-full flex items-center justify-center">
                                            <Video className="w-10 h-10" />
                                        </div>
                                        <p className="text-xl font-medium max-w-xs mx-auto text-gray-400">Your AI cinematic sequence will be rendered here.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoGenerator;

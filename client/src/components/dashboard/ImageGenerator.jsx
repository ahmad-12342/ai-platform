"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Download, Sparkles, Wand2, RefreshCw } from 'lucide-react';

const styles = [
    { id: 'realistic', label: 'Realistic', icon: '📸' },
    { id: 'anime', label: 'Anime', icon: '🎨' },
    { id: 'cinematic', label: 'Cinematic', icon: '🎬' },
    { id: '3d', label: '3D Render', icon: '🧊' },
    { id: 'pixel', label: 'Pixel Art', icon: '👾' },
];

const resolutions = ['512x512', '1024x1024', '1920x1080', '1080x1920'];

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('realistic');
    const [resolution, setResolution] = useState('1024x1024');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setGenerating(true);
        // Simulate generation
        setTimeout(() => {
            setResult('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000');
            setGenerating(false);
        }, 2000);
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <ImageIcon className="text-blue-500" />
                    AI Image Generator
                </h1>
                <p className="text-gray-400">Transform your imagination into visual reality.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Settings Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Style Selector</label>
                            <div className="grid grid-cols-2 gap-2">
                                {styles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={`p-3 rounded-xl border transition-all text-sm flex flex-col items-center gap-2 ${selectedStyle === style.id
                                                ? 'border-primary bg-primary/10 text-white'
                                                : 'border-white/5 hover:border-white/20 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-2xl">{style.icon}</span>
                                        {style.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Resolution</label>
                            <select
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-primary transition-colors"
                            >
                                {resolutions.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Prompt & Preview Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-4">
                        <div className="relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Describe what you want to see in detail..."
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary transition-colors resize-none pr-12"
                            />
                            <Wand2 className="absolute top-4 right-4 text-gray-500" />
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating || !prompt}
                            className="w-full py-4 rounded-xl font-bold bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating Masterpiece...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Generate Image
                                </>
                            )}
                        </button>
                    </div>

                    {/* Result Display */}
                    <div className="aspect-square w-full rounded-3xl glass border border-white/10 flex items-center justify-center overflow-hidden relative group">
                        {result ? (
                            <>
                                <img src={result} alt="Generation result" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl">
                                        <Download className="w-6 h-6" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center space-y-4 text-gray-500">
                                <ImageIcon className="w-20 h-20 mx-auto opacity-20" />
                                <p>Your creation will appear here</p>
                            </div>
                        )}
                        {generating && (
                            <div className="absolute inset-0 glass flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <p className="text-primary font-medium animate-pulse">Diffusing Pixels...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;

"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Download, Sparkles, Wand2, RefreshCw, Upload, X } from 'lucide-react';

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
    const [referenceImage, setReferenceImage] = useState(null);

    const handleGenerate = async () => {
        if (!prompt && !referenceImage) return;
        setGenerating(true);
        setResult(null);

        // Advanced AI Synthesis Simulation
        setTimeout(() => {
            const seed = Math.floor(Math.random() * 999999);
            const timestamp = Date.now();
            const [width, height] = resolution.split('x');

            // Strict prompt cleaning
            const cleanPrompt = prompt.trim()
                .replace(/[^a-zA-Z0-9\s,.-]/g, '') // Keep only letters, numbers, spaces, and basic punctuation
                .substring(0, 500); // Limit length

            const encodedPrompt = encodeURIComponent(cleanPrompt);

            // Using the most stable Flux model endpoint
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true&t=${timestamp}`;

            console.log("Generating URL:", imageUrl);
            setResult(imageUrl);
            setGenerating(false);
        }, 2500); // More realistic delay to allow server preparation
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReferenceImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = async () => {
        if (!result) return;
        try {
            const response = await fetch(result);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `promptova-ai-image-${Date.now()}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback: open in new tab
            window.open(result, '_blank');
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
                    <Sparkles className="w-3 h-3" />
                    Neural Vision Engine
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">What will you <span className="text-gradient">imagine</span> today?</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Enter a prompt and watch the AI bring your vision to life in high resolution.</p>
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
                            <ImageIcon className="w-6 h-6 text-gray-400 mr-4" />
                            {referenceImage && (
                                <div className="relative w-12 h-12 mr-4 group">
                                    <img src={referenceImage} alt="Ref" className="w-full h-full object-cover rounded-lg border border-white/20" />
                                    <button
                                        onClick={() => setReferenceImage(null)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder={referenceImage ? "Describe how to modify this image..." : "A cinematic shot of a neon-lit futuristic Tokyo street in the rain..."}
                                className="w-full bg-transparent border-none outline-none py-6 text-lg text-white placeholder:text-gray-600"
                            />
                            <div className="flex items-center gap-2 mr-2">
                                <label className="cursor-pointer p-3 hover:bg-white/10 rounded-full transition-all group relative">
                                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Reference Image
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={generating || (!prompt && !referenceImage)}
                            className="w-full md:w-auto px-10 py-5 rounded-[1.5rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" />
                                    {referenceImage ? 'Variation' : 'Generate'}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {styles.map(s => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedStyle(s.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedStyle === s.id
                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                                    }`}
                            >
                                <span className="mr-2">{s.icon}</span>
                                {s.label}
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
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full h-full"
                            >
                                <img
                                    key={result}
                                    src={result}
                                    alt="Generated"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://via.placeholder.com/1024x1024.png?text=AI+Busy+-+Check+Direct+Link";
                                    }}
                                />
                                <div className="absolute top-4 left-4 z-30">
                                    <a href={result} target="_blank" rel="noreferrer" className="glass px-3 py-1 rounded-full text-[10px] text-white hover:bg-white/20 transition-all border border-white/10">
                                        Open Direct Link
                                    </a>
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-6">
                                    <div className="text-center">
                                        <p className="text-xl font-bold text-white mb-2">Generation Complete</p>
                                        <p className="text-gray-300 text-sm">Resolution: {resolution}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleDownload}
                                            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download 4K
                                        </button>
                                        <button
                                            onClick={handleRegenerate}
                                            className="flex items-center gap-2 px-6 py-3 glass text-white rounded-full font-bold hover:scale-105 transition-transform border border-white/20"
                                        >
                                            <RefreshCw className="w-5 h-5" />
                                            Regenerate
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                {generating ? (
                                    <div className="space-y-6 flex flex-col items-center">
                                        <div className="relative w-24 h-24">
                                            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                                            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500 animate-pulse" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold mb-2 animate-pulse">Dreaming up your image...</p>
                                            <p className="text-gray-500 text-sm">Synthesizing pixels using Neural Vision Core</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 opacity-30">
                                        <ImageIcon className="w-24 h-24 mx-auto" />
                                        <p className="text-xl font-medium max-w-xs mx-auto">Your masterpiece will manifest here after you enter a prompt.</p>
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

export default ImageGenerator;

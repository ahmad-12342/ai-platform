"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Hash, Code, Layout, MessageSquare, Wand2, RefreshCw } from 'lucide-react';

const types = [
    { id: 'blog', label: 'Blog Post', icon: Layout },
    { id: 'script', label: 'Video Script', icon: MessageSquare },
    { id: 'caption', label: 'Social Caption', icon: Hash },
    { id: 'code', label: 'Clean Code', icon: Code },
];

const ContentWriter = () => {
    const [activeType, setActiveType] = useState('blog');
    const [topic, setTopic] = useState('');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!topic) return;
        setGenerating(true);
        setResult('');
        setTimeout(() => {
            setResult(`## The Future of AI in Content Creation\n\nArtificial Intelligence is not just a tool; it's a co-creator that amplifies human potential. In the next decade, we'll see a shift from simple automation to deep collaboration between human intuition and machine efficiency...\n\n### Key Takeaways:\n1. Speed of iteration will increase 10x.\n2. Multimodal generation will become standard.\n3. Content personalization will reach individual level scale.\n\nGenerated specifically for: ${topic}`);
            setGenerating(false);
        }, 3000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-orange-500/20">
                    <Sparkles className="w-3 h-3" />
                    Neural Content Engine
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">AI <span className="text-gradient">Content</span> Writer</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Generate high-quality blogs, scripts, and captions in seconds.</p>
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
                            <Hash className="w-6 h-6 text-gray-400 mr-4" />
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                placeholder="Topic for your content (e.g. Benefits of Web3)..."
                                className="w-full bg-transparent border-none outline-none py-6 text-lg text-white placeholder:text-gray-600"
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={generating || !topic}
                            className="w-full md:w-auto px-10 py-5 rounded-[1.5rem] bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 disabled:opacity-50"
                        >
                            {generating ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Writing...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="w-5 h-5" />
                                    Compose
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        {types.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveType(t.id)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border flex items-center gap-2 ${activeType === t.id
                                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                                    }`}
                            >
                                <t.icon className="w-4 h-4" />
                                {t.label}
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
                    <div className="glass p-10 rounded-[2.5rem] border border-white/10 relative min-h-[400px] flex flex-col shadow-2xl overflow-hidden">
                        {result ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center pb-6 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">High Quality Output</span>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-400 hover:text-white transition-all border border-white/5"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied' : 'Copy Text'}
                                    </button>
                                </div>
                                <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {result}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-6">
                                {generating ? (
                                    <div className="text-center space-y-4">
                                        <div className="flex gap-2 justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <p className="text-lg font-bold text-orange-400 animate-pulse tracking-wide uppercase">AI is analyzing context</p>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4 opacity-30">
                                        <Layout className="w-20 h-20 mx-auto" />
                                        <p className="text-lg font-medium max-w-xs mx-auto">Your high-quality AI generated content will appear here.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Background Decoration */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContentWriter;

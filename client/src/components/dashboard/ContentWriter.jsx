"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Hash, Code, Layout, MessageSquare, Wand2 } from 'lucide-react';

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
        setTimeout(() => {
            setResult(`## The Future of AI in Content Creation\n\nArtificial Intelligence is not just a tool; it's a co-creator... (Generated content for ${topic})`);
            setGenerating(false);
        }, 2500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    <Sparkles className="text-orange-500" />
                    AI Content Writer
                </h1>
                <p className="text-gray-400">Generate high-quality written content for any purpose instantly.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass p-6 rounded-3xl border border-white/5 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-4">What are we writing?</label>
                            <div className="grid grid-cols-1 gap-2">
                                {types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setActiveType(type.id)}
                                        className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${activeType === type.id
                                                ? 'border-primary bg-primary/10 text-white'
                                                : 'border-white/5 hover:border-white/20 text-gray-400'
                                            }`}
                                    >
                                        <type.icon className="w-5 h-5" />
                                        <span className="font-medium">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Topic or Prompt</label>
                            <textarea
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Ex: Write a technical blog about React 19 features..."
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-primary transition-colors resize-none mb-4"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={generating || !topic}
                                className="w-full py-4 rounded-xl font-bold bg-primary hover:bg-primary/80 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {generating ? <Wand2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                {generating ? 'Writing...' : 'Generate Content'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="glass p-8 rounded-[2rem] border border-white/10 min-h-[600px] relative flex flex-col">
                        {result ? (
                            <>
                                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">AI Result</span>
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied' : 'Copy Text'}
                                    </button>
                                </div>
                                <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap flex-1">
                                    {result}
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 gap-4">
                                <Layout className="w-16 h-16 opacity-10" />
                                <p>Your generated content will appear here</p>
                            </div>
                        )}

                        {generating && (
                            <div className="absolute inset-0 glass rounded-[2rem] flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                    <p className="font-bold text-primary animate-pulse uppercase tracking-[0.2em] text-xs">AI is thinking</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentWriter;

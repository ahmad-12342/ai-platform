"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ImageIcon, Video, FileText, Cpu, Zap, Shield, Globe, Layers } from 'lucide-react';

const features = [
    {
        title: "AI Image Generation",
        description: "Convert text into stunning visual masterpieces with absolute precision and creative styles.",
        icon: ImageIcon,
        color: "bg-blue-500/10 text-blue-500",
    },
    {
        title: "AI Video Creation",
        description: "Bring your prompts to life with high-definition AI videos in multiple aspect ratios.",
        icon: Video,
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Pro CV Generator",
        description: "Generate executive-level resumes optimized for ATS with integrated AI writing assistance.",
        icon: FileText,
        color: "bg-pink-500/10 text-pink-500",
    },
    {
        title: "Smart Content Writer",
        description: "From code to blog posts, generate human-like content for any purpose instantly.",
        icon: Layers,
        color: "bg-orange-500/10 text-orange-500",
    },
    {
        title: "Ultra-Fast Processing",
        description: "Experience lightning-fast generation speeds powered by the latest GPU technology.",
        icon: Zap,
        color: "bg-yellow-500/10 text-yellow-500",
    },
    {
        title: "Private & Secure",
        description: "Your data and generated assets are encrypted and accessible only by you.",
        icon: Shield,
        color: "bg-green-500/10 text-green-500",
    }
];

const Features = () => {
    return (
        <section id="features" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Tools for Creators</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Everything you need to scale your content production and career with the power of artificial intelligence.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            whileHover={{
                                y: -12,
                                backgroundColor: "rgba(255,255,255,0.08)",
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-all group shadow-sm hover:shadow-primary/5"
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Features;

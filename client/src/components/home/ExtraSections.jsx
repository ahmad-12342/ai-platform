"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';

const faqs = [
    {
        q: "How does the credit system work?",
        a: "Each generation costs a certain amount of credits. Images cost 1 credit, videos cost 5 credits, and CVs/Text content cost 2 credits. You get 10 free credits when you sign up."
    },
    {
        q: "Can I use the images for commercial purposes?",
        a: "Yes, all generations on the Pro and Enterprise plans include a full commercial usage license."
    },
    {
        q: "What AI models do you use?",
        a: "We use a combination of state-of-the-art models including GPT-4o for text, DALL-E 3 and Stable Diffusion for images, and specialized video diffusion models."
    },
    {
        q: "How secure is my data?",
        a: "We use industry-standard encryption and never share your data or generated assets with third parties."
    }
];

const testimonials = [
    {
        name: "Alex Rivera",
        role: "Digital Artist",
        content: "Promptova AI has completely changed my workflow. The image quality is unparalleled by any other tool I've used.",
        avatar: "AR"
    },
    {
        name: "Sarah Chen",
        role: "Content Strategist",
        content: "The video generation is mind-blowing. I can create professional ads in minutes instead of days.",
        avatar: "SC"
    },
    {
        name: "James Wilson",
        role: "Software Engineer",
        content: "The CV generator helped me land my job at a top tech company. ATS optimization is a game-changer.",
        avatar: "JW"
    }
];

const FAQItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
            >
                <span className="text-xl font-semibold">{q}</span>
                {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Testimonials = () => (
    <section id="testimonials" className="py-24 bg-background/50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creators Worldwide</h2>
                <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />)}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <div key={i} className="glass p-8 rounded-3xl border border-white/5">
                        <p className="text-lg italic mb-6 text-gray-300">&quot;{t.content}&quot;</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                {t.avatar}
                            </div>
                            <div>
                                <h4 className="font-bold">{t.name}</h4>
                                <p className="text-sm text-gray-400">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FAQ = () => (
    <section id="faq" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                {faqs.map((faq, idx) => (
                    <FAQItem key={idx} {...faq} />
                ))}
            </div>
        </div>
    </section>
);

export { FAQ, Testimonials };

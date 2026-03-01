"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
        name: "Starter",
        monthlyPrice: "0",
        yearlyPrice: "0",
        description: "Perfect for exploring our AI tools.",
        features: [
            "10 free monthly credits",
            "Standard Image Generation",
            "Basic CV Templates",
            "AI Writing (Limited)",
            "Standard Support"
        ],
        buttonText: "Grow for Free",
        popular: false
    },
    {
        name: "Pro",
        monthlyPrice: "29",
        yearlyPrice: "24",
        description: "For power users and professionals.",
        features: [
            "Unlimited AI Generations*",
            "HD Video Studio Access",
            "Premium CV Templates",
            "Priority API Access",
            "Commercial Usage License",
            "24/7 Priority Support"
        ],
        buttonText: "Get Pro Now",
        popular: true
    },
    {
        name: "Enterprise",
        monthlyPrice: "99",
        yearlyPrice: "79",
        description: "Custom solutions for teams.",
        features: [
            "Dedicated GPU Instance",
            "Custom AI Fine-tuning",
            "API Integration Access",
            "Team Management",
            "SLA Guarantee",
            "Dedicated Account Manager"
        ],
        buttonText: "Join Waitlist",
        popular: false
    }
];

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section id="pricing" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10">
                        Choose the plan that fits your creative needs. Upgrade or cancel at any time.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
                        <button
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="w-14 h-7 bg-white/10 rounded-full relative p-1 transition-all"
                        >
                            <motion.div
                                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                                className="w-5 h-5 bg-primary rounded-full"
                            />
                        </button>
                        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
                            Yearly <span className="text-primary text-xs ml-1 font-bold">(-20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 rounded-[2.5rem] relative overflow-hidden transition-all hover:scale-[1.02] ${plan.popular
                                ? 'bg-gradient-to-b from-primary/20 to-accent/20 border-2 border-primary/50'
                                : 'glass border border-white/5'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-sm font-bold px-6 py-2 rounded-bl-3xl flex items-center gap-1">
                                    <Sparkles className="w-4 h-4" />
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold">
                                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                </span>
                                <span className="text-gray-400">/month</span>
                            </div>
                            <p className="text-gray-400 mb-8">{plan.description}</p>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, fidx) => (
                                    <li key={fidx} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 shrink-0">
                                            <Check className="w-4 h-4 text-primary" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/signup">
                                <button className={`w-full py-4 rounded-full font-bold transition-all ${plan.popular
                                    ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'
                                    : 'bg-white text-black hover:bg-gray-200'
                                    }`}>
                                    {plan.buttonText}
                                </button>
                            </Link>

                            {billingCycle === 'yearly' && plan.yearlyPrice !== "0" && (
                                <p className="text-center text-[10px] text-primary mt-4 font-bold uppercase tracking-wider">
                                    Billed manually at ${parseInt(plan.yearlyPrice) * 12}/year
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

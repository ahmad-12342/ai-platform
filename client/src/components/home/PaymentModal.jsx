"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Zap, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const PaymentModal = ({ isOpen, onClose, plan, billingCycle }) => {
    const { user, refreshStats } = useAuth();
    const [step, setStep] = useState('details');
    const [loading, setLoading] = useState(false);

    if (!plan) return null;

    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const total = billingCycle === 'monthly' ? price : parseInt(price) * 12;

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulation of payment processing
        setTimeout(async () => {
            try {
                if (user) {
                    const userRef = doc(db, "users", user.uid);
                    await updateDoc(userRef, {
                        plan: plan.name.toLowerCase(),
                        credits: plan.name === 'Starter' ? 10 : (plan.name === 'Pro' ? 500 : 1000),
                    });
                    await refreshStats();
                }
                setStep('success');
            } catch (err) {
                console.error("Payment update failed:", err);
                alert("Payment successful but stat update failed. Please contact support.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-[#0a0a0b] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        {step === 'details' ? (
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-primary" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">Secure Checkout</h2>
                                    </div>
                                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Order Summary */}
                                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Plan</p>
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                {plan.name} <Sparkles className="w-4 h-4 text-primary" />
                                            </h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</p>
                                            <p className="text-2xl font-black text-white">${total}</p>
                                            <p className="text-[10px] text-gray-500">{billingCycle === 'monthly' ? 'Billed monthly' : `Billed yearly ($${price}/mo)`}</p>
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    {total > 0 ? (
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Card Number</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        placeholder="0000 0000 0000 0000"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/50 transition-all outline-none"
                                                    />
                                                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Expiry</label>
                                                    <input required placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/50 transition-all outline-none" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">CVV</label>
                                                    <input required placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary/50 transition-all outline-none" />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-white/5 p-3 rounded-xl border border-white/5">
                                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                                <span>Your transaction is encrypted and secured by Stripe</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-6 bg-white/5 border border-white/5 rounded-2xl text-center space-y-3">
                                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                            </div>
                                            <p className="text-sm text-gray-400">No payment required for this plan. Just click below to activate your starter pack!</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                {total > 0 ? 'Processing Securely...' : 'Activating...'}
                                            </>
                                        ) : (
                                            <>
                                                {total > 0 ? <Zap className="w-5 h-5 fill-current" /> : <Sparkles className="w-5 h-5" />}
                                                {total > 0 ? `Pay $${total} Now` : 'Activate Free Plan'}
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </motion.div>
                                <h2 className="text-3xl font-bold mb-4">Payment Confirmed!</h2>
                                <p className="text-gray-400 mb-8 leading-relaxed">
                                    {user
                                        ? `Welcome to the ${plan.name} plan. Your account has been updated with new credits and features.`
                                        : `Your payment for ${plan.name} was successful! Now, please create an account to activate your plan.`
                                    }
                                </p>
                                <button
                                    onClick={() => {
                                        if (user) {
                                            onClose();
                                        } else {
                                            window.location.href = "/signup";
                                        }
                                    }}
                                    className="w-full py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all shadow-lg"
                                >
                                    {user ? 'Start Creating' : 'Sign Up to Claim'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;

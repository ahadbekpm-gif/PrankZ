import React, { useState, useEffect } from 'react';
import { PRICING_PLANS } from '../constants';
import { Check, Zap, Crown, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

const PricingPage: React.FC = () => {
    const [backPath, setBackPath] = useState('/');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async (priceId: string) => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.functions.invoke('create-checkout', {
                body: { priceId, successUrl: window.location.origin + '/success?checkout_id={CHECKOUT_ID}' }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error); // Handle tunneled errors

            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err: any) {
            console.error('Checkout error:', err);
            alert(`Checkout Failed: ${err.message || JSON.stringify(err)}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setBackPath('/editor');
            }
        };
        checkSession();
    }, []);

    return (
        <div className="min-h-screen bg-[#050511] text-white">
            {/* Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <Link to={backPath} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-sm">Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#ccff00] flex items-center justify-center text-black font-black italic">PZ</div>
                        <span className="font-black tracking-tighter">Prank-Z Pricing</span>
                    </div>
                    <div className="w-24"></div> {/* Spacer for center alignment */}
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center space-y-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                        Choose Your <span className="text-[#ccff00]">Weapon</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Unlimited chaos awaits. Select a plan to unlock premium styles, priority processing, and guilt-free prank generation.
                    </p>

                    {/* BILLING TOGGLE */}
                    <div className="flex items-center justify-center mt-8">
                        <div className="bg-[#151925] p-1 rounded-full border border-white/10 flex relative">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all relative z-10 ${billingCycle === 'monthly' ? 'text-black' : 'text-slate-500 hover:text-white'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest transition-all relative z-10 ${billingCycle === 'yearly' ? 'text-black' : 'text-slate-500 hover:text-white'}`}
                            >
                                Yearly <span className="text-[9px] bg-green-500 text-black px-1.5 py-0.5 rounded ml-1">-30%</span>
                            </button>
                            <div className={`absolute top-1 bottom-1 w-[50%] bg-[#ccff00] rounded-full transition-all duration-300 ${billingCycle === 'monthly' ? 'left-1' : 'left-[49%]'}`}></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRICING_PLANS[billingCycle].map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-300 group hover:-translate-y-2 ${plan.popular
                                ? 'bg-[#151925] border-[#ccff00]/30 shadow-[0_20px_40px_rgba(204,255,0,0.15)] z-20 scale-105'
                                : 'bg-[#0f1119] border-white/5 hover:border-white/10 z-10'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg z-30 animate-bounce">
                                    {plan.tag?.replace(/[()]/g, '') || 'Most Popular'}
                                </div>
                            )}

                            <div className="flex-1 space-y-6">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-xl font-black text-white uppercase tracking-tighter">{plan.name}</div>
                                        {plan.tag && !plan.popular && <div className="text-[10px] font-bold text-[#ccff00] uppercase tracking-widest opacity-80">{plan.tag}</div>}
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">{plan.description}</p>
                                </div>

                                <div className="flex flex-col border-b border-white/5 pb-6">
                                    <div className="flex items-end gap-2">
                                        {plan.originalPrice && (
                                            <span className="text-lg text-slate-500 line-through font-bold mb-1">{plan.originalPrice}</span>
                                        )}
                                        <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                        <span className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wide">{plan.period}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[#ccff00] mb-4">
                                        <Zap size={20} fill="currentColor" />
                                        <span className="text-xl font-black">{plan.tokens} Credits</span>
                                    </div>

                                    <ul className="space-y-3">
                                        {plan.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-300">
                                                <span className="leading-tight">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={() => handleCheckout(plan.priceId)}
                                    disabled={isLoading}
                                    className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${plan.popular
                                        ? 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[#ccff00]/20'
                                        : 'bg-[#1E2332] text-white hover:bg-[#252a3b]'
                                        } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        plan.popular ? 'Get Instant Access' : 'Choose Plan'
                                    )}
                                </button>
                                {plan.bestFor && (
                                    <p className="text-center mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        Best for: <span className="text-slate-300">{plan.bestFor}</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 mt-12 bg-[#0a0a0e]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex justify-center gap-8 mb-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link to="/refund" className="hover:text-white transition-colors">Refunds</Link>
                    </div>
                    <p className="text-slate-600 text-sm">
                        &copy; {new Date().getFullYear()} Prank-Z.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PricingPage;

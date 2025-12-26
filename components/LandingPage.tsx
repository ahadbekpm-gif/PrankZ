import React from 'react';
import { Ghost, Zap, Upload, Skull, Share2, Star, ArrowRight, CheckCircle2, MessageSquare, Brain, Check, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import BeforeAfterSlider from './BeforeAfterSlider';
import { LegalDocKey } from './LegalContent';
import { PRICING_PLANS } from '../constants';

// Example images for the landing page slider
// Ideally these should be real examples, but we'll use placeholders or the user's uploaded images if available
const DEMO_BEFORE = "/hero-before.jpg";
const DEMO_AFTER = "/hero-after.jpg"; // User provided examples

import { supabase } from '../services/supabase';
import AuthModal from './AuthModal';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            navigate('/editor');
        } else {
            setShowAuthModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#050511] text-white overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                onSuccess={onStart}
            />

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 group cursor-pointer hover:animate-glitch" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-300 overflow-hidden border-2 border-[#ccff00]">
                            <img src="/logo.jpg" alt="Prank-Z" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-lg sm:text-xl font-black tracking-tighter">Prank-Z</span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <Link to="/pricing" className="hidden sm:block text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#ccff00] transition-colors">
                            Pricing
                        </Link>
                        <button
                            onClick={handleLogin}
                            className="hidden sm:block text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-[#ccff00] transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-[#ccff00] text-black text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-[#b3e600] transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] hover:scale-105 active:scale-95"
                        >
                            <span className="sm:hidden">Start</span>
                            <span className="hidden sm:inline">Go Wild 😈</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-32 px-6 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#ccff00]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

                    {/* TEXT CONTENT */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-5 duration-700 hover:bg-white/10 transition-colors cursor-default">
                            <Star size={14} className="text-[#ccff00] fill-[#ccff00]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Rated #1 Tool for Ruining Friendships</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black leading-[1.2] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 py-2">
                            Turn Normal Photos&nbsp;Into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-green-400 to-purple-500 italic pb-4 inline-block">Pure, Unfiltered Nightmare Fuel.</span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Upload a photo. <br />
                            We ruin it with AI. <br />
                            You send it. <br />
                            They regret it.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <button
                                onClick={handleLogin}
                                className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-black text-lg font-black rounded-2xl hover:bg-[#b3e600] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-3"
                            >
                                <Zap size={20} fill="black" /> Start the Chaos
                            </button>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={14} /> No login. No mercy.
                            </span>
                        </div>
                    </div>

                    {/* VISUAL CONTENT (Slider) */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none animate-in fade-in slide-in-from-right-10 duration-1000 delay-300 relative">
                        {/* Chaos Elements */}
                        <div className="absolute -top-12 -right-12 text-[#ccff00] animate-bounce delay-700 opacity-80 z-20">
                            <Skull size={48} className="drop-shadow-[0_0_15px_rgba(204,255,0,0.5)] rotate-12" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 text-purple-500 animate-pulse delay-500 opacity-60 z-20">
                            <Ghost size={64} className="-rotate-12" />
                        </div>

                        <div className="relative group rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#ccff00] via-purple-500 to-pink-500 rounded-[40px] blur opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
                            <div className="relative rounded-[40px] overflow-hidden border-2 border-white/10 bg-[#0a0a0e] shadow-2xl aspect-[4/5] sm:aspect-square transform transition-transform">
                                {/* Note: We use the existing slider component. */}
                                <BeforeAfterSlider original={DEMO_BEFORE} generated={DEMO_AFTER} />

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap z-20 pointer-events-none flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" /> Slide to Chaos
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF BAR */}
            <section className="py-12 px-6 border-b border-white/5 bg-[#050511] relative">
                <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-purple-900/10 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="bg-[#151925]/80 backdrop-blur-sm border border-white/10 rounded-full py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left shadow-lg overflow-hidden relative group hover:border-[#ccff00]/20 transition-colors">
                        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer" />

// Helper component for number animation
                        const CountUpAnimation: React.FC<{ end: number; duration?: number }> = ({end, duration = 2000}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
                            let startTime: number | null = null;
                        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
                        const progress = timestamp - startTime;
                        const percentage = Math.min(progress / duration, 1);

            // Ease out expo
            const easeOut = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

                        setCount(Math.floor(easeOut(percentage) * end));

                        if (progress < duration) {
                            animationFrameId = requestAnimationFrame(animate);
            } else {
                            setCount(end); // Ensure final value is exact
            }
        };

                        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

                        return <>{count.toLocaleString()}</>;
};

                        // ... inside LandingPage component ...

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔥</span>
                            <span className="text-slate-300 font-bold"><strong className="text-white"><CountUpAnimation end={12403991} /></strong> cursed images generated</span>
                        </div>
                        <div className="h-0 md:h-8 w-full md:w-px bg-white/10" />
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">👥</span>
                            <span className="text-slate-300 font-bold">Used by people who <span className="text-red-400 line-through decoration-2">should</span> NOT be trusted with Photoshop</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="py-32 px-6 border-t border-white/5 bg-[#0a0a0e] relative overflow-hidden">
                <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black mb-20 tracking-tighter max-w-4xl mx-auto">
                        Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-purple-500">Ruin a Perfectly Good Photo</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Skull size={32} />,
                                title: 'Meme Weaponry',
                                desc: 'Turn friends into viral victims.',
                                color: 'bg-red-500'
                            },
                            {
                                icon: <MessageSquare size={32} />,
                                title: 'Social Sabotage',
                                desc: 'Perfect for the group chat roast.',
                                color: 'bg-blue-500'
                            },
                            {
                                icon: <Brain size={32} />,
                                title: 'AI Chaos Mode',
                                desc: 'Let AI decide how evil today is.',
                                color: 'bg-purple-500'
                            },
                            {
                                icon: <Zap size={32} />,
                                title: 'One-Click Ruin',
                                desc: 'Upload → regret → send.',
                                color: 'bg-[#ccff00] text-black'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-10 rounded-[2rem] bg-[#151925] border border-white/5 hover:border-[#ccff00]/30 transition-all group hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-b from-${feature.color.split('-')[1]}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color.includes('text-black') ? feature.color : feature.color + '/20 text-' + feature.color.replace('bg-', '')} group-hover:scale-110 transition-transform shadow-lg relative z-10`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-3 relative z-10">{feature.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed relative z-10">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET SECTION */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#050511] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#ccff00]/5 pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tighter text-center">
                        What You <span className="text-[#ccff00]">Get</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                        {[
                            "AI-powered photo transformations",
                            "Image-to-image editing",
                            "Access to premium styles",
                            "Faster generation",
                            "Commercial & personal use",
                            "Credit-based usage system"
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="min-w-[24px] h-6 rounded-full bg-[#ccff00] flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-black" />
                                </div>
                                <span className="font-bold text-lg text-slate-200">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-32 px-6 border-t border-white/5 bg-[#050511] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-6xl font-black mb-20 tracking-tighter">3 Steps. <span className="text-[#ccff00]">Zero Regrets.</span></h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                number: '1',
                                icon: <Upload size={32} />,
                                title: 'Upload a photo',
                                desc: 'Pick a victim.'
                            },
                            {
                                number: '2',
                                icon: <Skull size={32} />,
                                title: 'Pick a prank',
                                desc: 'AI does the damage.'
                            },
                            {
                                number: '3',
                                icon: <Share2 size={32} />,
                                title: 'Send it',
                                desc: 'Wait for the reaction.'
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="relative p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#ccff00] rounded-full flex items-center justify-center text-black font-black text-xl border-4 border-[#050511] z-20">
                                    {step.number}
                                </div>
                                <div className="mt-4 mb-4 text-[#ccff00]/50 group-hover:text-[#ccff00] transition-colors duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-2">{step.title}</h3>
                                <p className="text-slate-400 font-bold">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-widest animate-pulse">
                        <span className="text-xl">⚠️</span> We are not responsible for group chat chaos.
                    </div>
                </div>
            </section>

            {/* PROOF GALLERY SECTION */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#050511]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter text-center">
                        Proof This Is a <span className="text-red-500">Bad Idea</span>
                    </h2>
                    <p className="text-xl text-slate-400 font-bold text-center mb-16">(In a Good Way)</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* CARD 1: Fake Chat */}
                        <div className="row-span-2 rounded-3xl bg-[#151925] border border-white/5 p-6 relative overflow-hidden group hover:border-[#ccff00]/30 transition-all">
                            <div className="absolute top-0 left-0 w-full h-8 bg-[#1a1d2d] flex items-center px-4 gap-2 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-auto text-[10px] text-slate-500 font-bold uppercase">Mom</span>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="bg-[#2a2e3d] text-white p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                                    <img src={DEMO_AFTER} className="rounded-lg mb-2 opacity-80" />
                                    Look what happened to Sarah 😂
                                </div>
                                <div className="bg-[#ccff00] text-black p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-sm font-bold shadow-lg">
                                    OMG is she okay?? That looks Infected.
                                </div>
                                <div className="bg-[#2a2e3d] text-white p-3 rounded-2xl rounded-tl-none max-w-[80%] text-sm">
                                    It's the Zombie filter lol
                                </div>
                                <div className="bg-[#ccff00] text-black p-3 rounded-2xl rounded-tr-none max-w-[80%] ml-auto text-sm font-bold shadow-lg">
                                    I almost called 911... send me the app link rn
                                </div>
                            </div>
                        </div>

                        {/* CARD 2: Meme Edit */}
                        <div className="rounded-3xl border border-white/5 relative overflow-hidden group cursor-pointer">
                            <img src={DEMO_BEFORE} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors" />
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-2xl font-black text-white uppercase italic drop-shadow-lg">"Trust me, I know a good barber"</h3>
                            </div>
                        </div>

                        {/* CARD 3: News Ticker */}
                        <div className="rounded-3xl bg-black border border-white/5 relative overflow-hidden group">
                            <img src={DEMO_AFTER} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 left-4 right-4 bg-red-600 text-white px-4 py-2 font-black uppercase text-sm animate-pulse tracking-widest">
                                Breaking News: Local Man Turns into Glitch Demon
                            </div>
                            <div className="absolute top-4 right-4 bg-white text-black px-2 py-1 font-bold text-xs uppercase rounded-sm">
                                LIVE
                            </div>
                        </div>

                        {/* CARD 4: Before/After Static */}
                        <div className="lg:col-span-2 rounded-3xl bg-[#151925] border border-white/5 p-4 flex gap-4 overflow-hidden group">
                            <div className="flex-1 relative rounded-2xl overflow-hidden">
                                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold z-10">Before</span>
                                <img src={DEMO_BEFORE} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                            </div>
                            <div className="hidden sm:flex items-center justify-center">
                                <ArrowRight className="text-[#ccff00]" />
                            </div>
                            <div className="flex-1 relative rounded-2xl overflow-hidden ring-2 ring-[#ccff00]/50 shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                                <span className="absolute top-2 left-2 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold z-10">Ruined</span>
                                <img src={DEMO_AFTER} className="w-full h-full object-cover" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section className="py-32 px-6 border-t border-white/5 bg-[#0a0a0e] relative" id="pricing">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center space-y-6 mb-16">
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter">
                            Choose Your <span className="text-[#ccff00]">Weapon</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Select a plan to unlock premium styles and guilt-free prank generation.
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
                                        {plan.tag.replace(/[()]/g, '') || 'Most Popular'}
                                    </div>
                                )}

                                <div className="flex-1 space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{plan.name}</div>
                                        {plan.tag && !plan.popular && <div className="text-xs font-bold text-[#ccff00] uppercase tracking-widest opacity-80">{plan.tag}</div>}
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="flex items-end gap-2">
                                            {(plan as any).originalPrice && (
                                                <span className="text-lg text-slate-500 line-through font-bold mb-1">{(plan as any).originalPrice}</span>
                                            )}
                                            <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                                            <span className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-wide">{(plan as any).period}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-4 border-t border-white/5">
                                        <div className="flex items-center gap-3 text-[#ccff00]">
                                            <Zap size={20} fill="currentColor" />
                                            <span className="text-xl font-black">{plan.tokens} Credits</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 pt-4">
                                        {(plan as any).features?.map((feat: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                                {feat}
                                            </li>
                                        )) || ["HD Results", "No Ads", "Priority Queue", "Premium Styles"].map((feat, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                                <div className="bg-[#ccff00]/20 p-1 rounded-full text-[#ccff00]"><Check size={12} strokeWidth={4} /></div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 pt-6">
                                    <a
                                        href={(plan as any).link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${plan.popular
                                            ? 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[#ccff00]/20'
                                            : 'bg-[#1E2332] text-white hover:bg-[#252a3b]'
                                            }`}
                                    >
                                        {plan.popular ? 'Get Instant Access' : 'Choose Plan'}
                                    </a>
                                    <p className="text-center mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        Secure payment via Paddle
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ccff00]/5 pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1]">
                        Make Something You'll <br />
                        <span className="text-[#ccff00]">Immediately Regret.</span>
                        <div className="text-2xl md:text-4xl text-slate-400 mt-4 line-through decoration-red-500 decoration-4">Or Don't. But You Will.</div>
                    </h2>

                    <div className="flex flex-col items-center gap-6 mt-12">
                        <button
                            onClick={handleLogin}
                            className="px-12 py-6 bg-white text-black text-xl md:text-2xl font-black rounded-full hover:bg-[#ccff00] hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(204,255,0,0.5)] flex items-center gap-3"
                        >
                            🚀 Start Editing Now
                        </button>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse">
                            Free. Fast. No downloads.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOOTER LINKS */}
            <Footer />
        </div>
    );
};

export default LandingPage;

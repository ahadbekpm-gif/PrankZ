import React from 'react';
import { Ghost, Zap, Upload, Skull, Share2, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

// Example images for the landing page slider
// Ideally these should be real examples, but we'll use placeholders or the user's uploaded images if available
const DEMO_BEFORE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
const DEMO_AFTER = "https://images.unsplash.com/photo-1620500435451-93e871790403?q=80&w=1000&auto=format&fit=crop"; // Placeholder zombie/glitch effect

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-[#050511] text-white overflow-x-hidden font-sans selection:bg-[#ccff00] selection:text-black">
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center border-2 border-black -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                            <Ghost className="text-black w-5" />
                        </div>
                        <span className="text-xl font-black tracking-tighter">PrankGen</span>
                    </div>
                    <button
                        onClick={onStart}
                        className="px-6 py-2 rounded-full bg-[#ccff00] text-black text-sm font-bold hover:bg-[#b3e600] transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.5)] hover:scale-105 active:scale-95"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none opacity-50 animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#ccff00]/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">

                    {/* TEXT CONTENT */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <Star size={14} className="text-[#ccff00] fill-[#ccff00]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Rated #1 Prank App of 2024</span>
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-black leading-[1.1] tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            Turn Friends into <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-green-400 italic">Viral Memes.</span>
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            The professional AI chaos engine. Transform innocent photos into cursed masterpieces, zombies, and cyber-freaks in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <button
                                onClick={onStart}
                                className="w-full sm:w-auto px-8 py-4 bg-[#ccff00] text-black text-lg font-black rounded-2xl hover:bg-[#b3e600] hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(204,255,0,0.3)] flex items-center justify-center gap-3"
                            >
                                <Zap size={20} fill="black" /> Start Pranking - Free
                            </button>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={14} /> No Signup Required
                            </span>
                        </div>
                    </div>

                    {/* VISUAL CONTENT (Slider) */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#ccff00] to-purple-600 rounded-[40px] blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                            <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-[#0a0a0e] shadow-2xl aspect-[4/5] sm:aspect-square">
                                {/* Note: We use the existing slider component. If images fail to load due to demo URLs, that's expected in dev, 
                      but visually this structure is correct. */}
                                <BeforeAfterSlider original={DEMO_BEFORE} generated={DEMO_AFTER} />

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap z-20 pointer-events-none">
                                    Slide to see the damage
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0e]">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tighter">How to <span className="text-purple-500">Ruin a Friendship</span></h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Upload size={32} />, title: '1. Upload Photo', desc: 'Pick a clear photo of your victim (friend).' },
                            { icon: <Skull size={32} />, title: '2. Choose Effect', desc: 'Select from Zombie, Old Age, or pure Glitch chaos.' },
                            { icon: <Share2 size={32} />, title: '3. Share & Laugh', desc: 'Download the result and wait for the angry texts.' }
                        ].map((step, idx) => (
                            <div key={idx} className="p-8 rounded-3xl bg-[#151925] border border-white/5 hover:border-[#ccff00]/30 transition-all group hover:-translate-y-2">
                                <div className="w-16 h-16 mx-auto bg-[#ccff00] rounded-2xl flex items-center justify-center mb-6 text-black group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-black mb-4">{step.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ccff00]/5 pointer-events-none" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Ready to cause chaos?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join thousands of pranksters ensuring nobody trusts a photo ever again.</p>
                    <button
                        onClick={onStart}
                        className="px-10 py-5 bg-white text-black text-xl font-black rounded-2xl hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                    >
                        Launch PrankGen
                    </button>
                </div>
            </section>

            {/* FOOTER LINKS */}
            <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2024 PrankGen AI. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

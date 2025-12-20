'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Camera, Upload, RotateCcw, Download, Loader2, Sparkles,
  History as HistoryIcon, X, Image as ImageIcon, Monitor, Zap,
  Skull, Ghost, ArrowRight, CheckCircle2, Flame, Crown,
  Settings2, Share2, MousePointer2, Star, Trash2, Maximize2, ShieldCheck, Lock, EyeOff, Scale,
  MessageSquare, MousePointerClick
} from 'lucide-react';
import { TRANSLATIONS, PRICING_PLANS, TRENDING_EXAMPLES, PRESETS } from '../constants';
import { Language, AppStep, UserState, PlanType, Preset, HistoryItem } from '../types';
import { transformImageAction } from './actions';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import PaywallModal from '../components/PaywallModal';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- LANDING PAGE ---
const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const t = TRANSLATIONS;
  const lang: Language = 'en';
  return (
    <div className="min-h-screen bg-[#050511] text-white overflow-x-hidden font-sans">
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#ccff00] rounded-lg flex items-center justify-center border-2 border-black -rotate-6 group-hover:rotate-0 transition-transform">
            <Ghost className="text-black w-5" />
          </div>
          <span className="text-xl font-black tracking-tighter">PrankGen</span>
        </div>
        <button onClick={onStart} className="px-6 py-2 rounded-full bg-[#ccff00] text-black text-sm font-bold hover:bg-[#b3e600] transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)]">
          Get Started
        </button>
      </nav>

      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
          {/* Left: Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <h1 className="text-5xl sm:text-7xl font-black leading-tight tracking-tighter">
              Make Your Friends Regret <br />Sending You Photos.
            </h1>
            <h2 className="text-xl sm:text-2xl font-black text-[#ccff00] uppercase tracking-wider">
              Turn innocent pics into cursed, viral chaos in seconds.
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 font-medium">
              The ultimate AI prank machine. Fake chats, cursed edits, chaos mode. <br />First prank is free.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4">
              <button onClick={onStart} className="px-10 py-5 bg-[#ccff00] text-black text-xl font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(204,255,0,0.4)] flex items-center gap-3">
                ⚡ Start Pranking Free
              </button>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">
                No login required · Takes 10 seconds
              </span>
            </div>
          </div>

          {/* Right: Visual Proof */}
          <div className="flex-1 relative w-full max-w-[500px] aspect-square lg:aspect-auto h-[400px] lg:h-[500px]">
            {/* Before Card */}
            <div className="absolute top-0 left-0 w-[240px] sm:w-[300px] aspect-[4/5] rounded-[32px] overflow-hidden border-4 border-white/10 -rotate-12 hover:rotate-0 transition-all duration-500 shadow-2xl z-10 group bg-[#1a1c2c]">
              <img src="/before.png" alt="Before" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Before</span>
              </div>
            </div>

            {/* After Card */}
            <div className="absolute bottom-0 right-0 w-[240px] sm:w-[300px] aspect-[4/5] rounded-[32px] overflow-hidden border-4 border-[#ccff00] rotate-6 hover:rotate-0 transition-all duration-500 shadow-[0_0_40px_rgba(204,255,0,0.2)] z-20 group bg-[#050511]">
              <img src="/after.png" alt="After" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#ccff00] rounded-full shadow-lg">
                <span className="text-[10px] font-black text-black uppercase tracking-widest">After</span>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-2xl border border-[#ccff00]/30 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-[#ccff00] uppercase tracking-widest whitespace-nowrap">AI Generated</span>
              </div>
            </div>

            {/* Decorative Sparkles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ccff00]/5 blur-[80px] rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <div className="w-full border-y border-white/5 bg-white/[0.02] py-8 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050511] bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <span className="text-xl font-black text-white whitespace-nowrap">🔥 12,403,991 <span className="text-slate-500 font-bold text-sm">cursed images created</span></span>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end gap-3 rotate-1 lg:rotate-0">
            {[
              { icon: '⚠️', text: 'Group Chat Ruiner' },
              { icon: '😂', text: 'Viral Certified' },
              { icon: '🧠', text: 'AI Powered' },
              { icon: '🚫', text: 'No Photoshop Skills Needed' }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 hover:border-[#ccff00]/30 transition-colors">
                <span className="text-sm">{badge.icon}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#ccff00]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6">
            Everything You Need To <br />
            <span className="text-[#ccff00]">Ruin A Perfectly Good Photo</span>
          </h2>
          <div className="w-20 h-1.5 bg-[#ccff00] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Cursed Filters",
              text: "Make anyone look deeply untrustworthy.",
              icon: <Ghost className="text-[#ccff00]" size={32} />
            },
            {
              title: "Fake Chat Generator",
              text: "Create screenshots that destroy friendships.",
              icon: <MessageSquare className="text-[#ccff00]" size={32} />
            },
            {
              title: "AI Chaos Mode",
              text: "Let AI decide how evil to be.",
              icon: <Zap className="text-[#ccff00]" size={32} />
            },
            {
              title: "One-Click Edits",
              text: "Upload. Click. Ruin.",
              icon: <MousePointerClick className="text-[#ccff00]" size={32} />
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-[32px] bg-[#151925]/50 border border-white/5 hover:border-[#ccff00]/30 transition-all hover:translate-y-[-8px] duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ccff00]/5 blur-[40px] group-hover:bg-[#ccff00]/10 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#ccff00]/10 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 underline decoration-[#ccff00]/30 underline-offset-[12px]">
            3 Steps. Zero Regrets.
          </h2>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
            {[
              {
                step: "01",
                title: "Upload a photo",
                text: "Pick a victim.",
                icon: <Upload className="text-[#ccff00]" size={40} />
              },
              {
                step: "02",
                title: "Pick a prank",
                text: "Filters, fake chats, chaos.",
                icon: <Flame className="text-[#ccff00]" size={40} />
              },
              {
                step: "03",
                title: "Send & wait",
                text: "Enjoy the reaction.",
                icon: <Share2 className="text-[#ccff00]" size={40} />
              }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="relative mb-10">
                  <div className="w-32 h-32 rounded-full bg-[#151925] border-2 border-white/5 flex items-center justify-center group-hover:border-[#ccff00]/50 transition-all duration-500 shadow-xl group-hover:shadow-[#ccff00]/10">
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#ccff00] text-black flex items-center justify-center font-black text-sm shadow-lg">
                      {s.step}
                    </div>
                    {s.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3">{s.title}</h3>
                <p className="text-slate-400 font-bold max-w-[200px]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-24 text-center">
          <button onClick={onStart} className="px-12 py-5 bg-white/5 hover:bg-[#ccff00] text-white hover:text-black border border-white/10 hover:border-[#ccff00] rounded-2xl text-xl font-black transition-all group active:scale-95">
            Stop Reading. <span className="opacity-50 group-hover:opacity-100">Start Ruining.</span> ⚡
          </button>
        </div>
      </section>

      {/* Proof This Is A Bad Idea Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#ccff00]/5 to-transparent pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-4">
            Proof This Is A <span className="text-red-500">Bad Idea</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">(In a Good Way)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {/* Before/After Gallery Card */}
          <div className="group space-y-4">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/5 bg-[#151925] relative">
              <BeforeAfterSlider
                original="/before_2.png"
                generated="/after_2.png"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-30">
                <span className="text-[9px] font-black text-white uppercase tracking-widest">Before / After</span>
              </div>
            </div>
            <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Destroy Corporate Headshots</p>
          </div>

          {/* Fake News Card */}
          <div className="group space-y-4 lg:mt-12">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/5 bg-[#151925] hover:border-[#ccff00]/30 transition-all duration-500 relative">
              <img src="/fake_news.png" alt="Fake News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-[#ccff00] font-black text-sm uppercase tracking-wider">Fake News Generator</span>
              </div>
            </div>
            <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Staged Headlines</p>
          </div>

          {/* Meme Edit Card */}
          <div className="group space-y-4">
            <div className="aspect-[4/5] rounded-[32px] overflow-hidden border-2 border-white/5 bg-[#151925] hover:border-[#ccff00]/30 transition-all duration-500 relative">
              <img src="/meme_edit.png" alt="Meme Edit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <span className="text-[#ccff00] font-black text-sm uppercase tracking-wider">Meme Style Edits</span>
              </div>
            </div>
            <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Extreme Character Design</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">⚠️ {t.safety_disclaimer[lang]} For jokes only. Don’t be evil.</span>
          </div>
        </div>
      </section>

      <footer className="w-full text-center py-20 px-6 border-t border-white/5">
        <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase opacity-60">
          {t.safety_disclaimer[lang]}
        </p>
      </footer>
    </div>
  );
};

// --- EDITOR APP ---
const EditorApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const lang: Language = 'en';
  const [step, setStep] = useState<AppStep>('upload');
  const [user, setUser] = useState<UserState>(() => {
    if (typeof window === 'undefined') return { tokens: 1, plan: 'free', planExpiry: null };
    const saved = localStorage.getItem('prankgen_user');
    return saved ? JSON.parse(saved) : { tokens: 1, plan: 'free', planExpiry: null };
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('prankgen_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [lastObjectUrl, setLastObjectUrl] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [fakeProgress, setFakeProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS;

  const [hintIndex, setHintIndex] = useState(0);
  const hints = [
    "Zombie apocalypse survivor",
    "Turn into a meme",
    "80 years old filter",
    "LinkedIn vs Reality"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % hints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hints.length]);

  useEffect(() => {
    localStorage.setItem('prankgen_user', JSON.stringify(user));
    localStorage.setItem('prankgen_history', JSON.stringify(history));
  }, [user, history]);

  useEffect(() => {
    if (isGenerating) {
      const messages = t.loading_messages[lang].split('|');
      let msgIdx = 0;
      const mInt = setInterval(() => {
        msgIdx = (msgIdx + 1) % messages.length;
        setLoadingMessage(messages[msgIdx]);
      }, 3000);
      const pInt = setInterval(() => {
        setFakeProgress(prev => prev < 92 ? prev + Math.random() * 5 : prev);
      }, 800);
    }
  }, [isGenerating]);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (lastObjectUrl) {
        URL.revokeObjectURL(lastObjectUrl);
      }
    };
  }, [lastObjectUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalyzing(true);
      let fileToProcess = file;

      // Handle HEIC/HEIF conversion
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        try {
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          });
          fileToProcess = new File([Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
            { type: 'image/jpeg' });
        } catch (error) {
          console.error("HEIC conversion failed:", error);
          // Fallback to original file if conversion fails (though it likely won't display)
        }
      }

      // 1. Instant preview using object URL
      if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
      const objectUrl = URL.createObjectURL(fileToProcess);
      setOriginalImage(objectUrl);
      setLastObjectUrl(objectUrl);
      setGeneratedImage(null);

      // 2. Background read for API (Base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
        setAnalyzing(false);
        setStep('preset');
      };
      reader.readAsDataURL(fileToProcess);
    }
  };

  const handleGenerate = async () => {
    const cost = selectedPresetId ? PRESETS.find(p => p.id === selectedPresetId)?.cost || 1 : 1;
    if (user.tokens < cost) {
      setShowPaywall(true);
      return;
    }

    setIsGenerating(true);
    setStep('generating');
    setGeneratedImage(null);

    try {
      const result = await transformImageAction(base64Image!, customPrompt);
      setGeneratedImage(result);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        original: originalImage!,
        generated: result,
        prompt: customPrompt,
        timestamp: Date.now()
      };

      setHistory(prev => [newHistoryItem, ...prev]);
      setUser(prev => ({ ...prev, tokens: Math.max(0, prev.tokens - cost) }));
      setStep('result');
    } catch (err: any) {
      alert(err.message || "Engine Error");
      setStep('preset');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePurchase = (plan: PlanType, tokens: number) => {
    setUser(prev => ({
      ...prev,
      plan,
      tokens: prev.tokens + tokens,
      planExpiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
    }));
    setShowPaywall(false);
  };

  const handleHistoryView = (item: HistoryItem) => {
    setOriginalImage(item.original);
    setGeneratedImage(item.generated);
    setCustomPrompt(item.prompt);
    setStep('result');
  };

  const handleTrendingClick = (example: any) => {
    setCustomPrompt(example.prompt);
    setSelectedPresetId(example.id);
  };

  const handleReset = () => {
    if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl);
    setOriginalImage(null);
    setBase64Image(null);
    setLastObjectUrl(null);
    setGeneratedImage(null);
    setCustomPrompt('');
    setSelectedPresetId(null);
    setStep('upload');
  };

  const handleDownload = (imageUrl: string) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `prankgen-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (imageUrl: string) => {
    if (!imageUrl) return;
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'prank.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'PrankGen Creation',
          text: 'Look what I created with PrankGen!',
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser. Try saving the image instead.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050511] font-sans">
      <header className="sticky top-0 z-[60] w-full border-b border-white/5 bg-[#050511]/90 backdrop-blur-xl h-20 flex justify-between items-center px-6">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onBack}>
          <div className="w-10 h-10 rounded-xl bg-[#ccff00] flex items-center justify-center shadow-lg"><Ghost size={20} className="text-black" /></div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">PrankGen</h1>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Upload. Ruin. Share.</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1E2332] rounded-full border border-white/5 shadow-inner">
            <Zap size={14} className="text-[#ccff00]" fill="currentColor" />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-black text-white">{user.tokens}</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Credits</span>
            </div>
          </div>
          <div className="relative group">
            <button onClick={() => setShowPaywall(true)} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-black hover:scale-105 transition-all shadow-lg active:scale-95">
              <Crown size={14} fill="white" />
              <span>Upgrade</span>
            </button>
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-[#1a1c2c] border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white shadow-2xl z-[100]">
              Unlock 80 images/month
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow min-h-0">
        <div className="flex-1 bg-[#0a0a0e] relative flex flex-col items-center p-6 border-r border-white/5 overflow-y-auto">
          <div className="w-full max-w-4xl space-y-8">
            {step === 'generating' ? (
              <div className="flex flex-col items-center py-20 text-center animate-in fade-in duration-500">
                <div className="relative w-48 h-48 mb-10">
                  <div className="absolute inset-0 border-[6px] border-[#ccff00]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-[6px] border-[#ccff00] rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute inset-6 bg-[#ccff00]/10 rounded-full flex items-center justify-center"><Sparkles className="text-[#ccff00]" size={40} /></div>
                  <div className="absolute -bottom-2 right-0 bg-black border border-white/10 px-3 py-1 rounded-full text-[#ccff00] text-xs font-black">{Math.floor(fakeProgress)}%</div>
                </div>
                <h2 className="text-3xl font-black text-white mb-2">{loadingMessage || t.generating[lang]}</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Calibrating distortions...</p>
              </div>
            ) : !originalImage ? (
              <div className="w-full space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <Flame className="text-orange-500" size={18} fill="currentColor" />
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Trending Pranks</h2>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {TRENDING_EXAMPLES.map((example) => (
                      <div
                        key={example.id}
                        onClick={() => handleTrendingClick(example)}
                        className="flex-shrink-0 group relative w-32 h-20 rounded-[16px] overflow-hidden border border-white/5 cursor-pointer hover:border-[#ccff00]/50 transition-all hover:scale-[1.05]"
                      >
                        <img src={example.after} alt={example.label[lang]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2 text-center backdrop-blur-[1px]">
                          <span className="text-[9px] font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">{example.label[lang]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group w-full aspect-video rounded-[40px] border-4 border-dashed border-white/10 hover:border-[#ccff00]/50 transition-all flex flex-col items-center justify-center cursor-pointer bg-[#151925]/50 p-10"
                >
                  {analyzing ? <Loader2 className="animate-spin text-[#ccff00]" size={48} /> : (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Upload size={40} className="text-slate-500" /></div>
                      <h3 className="text-3xl font-black mb-2">Upload a Photo</h3>
                      <p className="text-slate-500 font-bold">Choose a photo to prank</p>
                      <div className="mt-8 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700" key={hintIndex}>
                        <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Try this:</span>
                        <div className="px-5 py-2.5 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.05)]">
                          <span className="text-[#ccff00] text-sm font-black italic">"{hints[hintIndex]}"</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-12 pb-20">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-[#050511]">
                  {generatedImage ? (
                    <BeforeAfterSlider original={originalImage} generated={generatedImage} />
                  ) : (
                    <img src={originalImage} alt="Original" className="w-full max-h-[60vh] object-contain" />
                  )}
                </div>

                <div className="space-y-6 pt-10 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white flex items-center gap-3"><HistoryIcon className="text-[#ccff00]" /> {t.your_creations[lang]}</h3>
                    <span className="text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">{history.length} Saved</span>
                  </div>
                  {history.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[30px] bg-white/[0.02] text-slate-600 font-bold">No cursed images yet.</div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {history.map(item => (
                        <div key={item.id} onClick={() => handleHistoryView(item)} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-[#ccff00] transition-all">
                          <img src={item.generated} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 className="text-white" /></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[400px] bg-[#151925] border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#151925]/50 backdrop-blur-sm">
            <div className="flex items-center gap-2"><Settings2 size={16} className="text-[#ccff00]" /><h2 className="text-xs font-black uppercase tracking-widest text-white">Configuration</h2></div>
            {originalImage && <button onClick={handleReset} className="text-[10px] font-black text-red-400 flex items-center gap-1 uppercase hover:text-red-300"><RotateCcw size={12} /> Clear</button>}
          </div>

          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1. Your Vision</label>
              <textarea
                value={customPrompt}
                onChange={e => { setCustomPrompt(e.target.value); setSelectedPresetId(null); }}
                placeholder="Turn me into a terrifying zombie..."
                className="w-full h-32 bg-[#0a0a0e] border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-[#ccff00] transition-all resize-none shadow-inner"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  "Make it funny", "Make it cursed", "Make it ultra-realistic",
                  "Make it viral", "Meme style lighting"
                ].map((booster) => (
                  <button
                    key={booster}
                    onClick={() => setCustomPrompt(prev => prev ? `${prev}, ${booster}` : booster)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-[#ccff00]/10 border border-white/5 hover:border-[#ccff00]/20 rounded-full text-[9px] font-black text-slate-500 hover:text-[#ccff00] transition-all uppercase tracking-wider"
                  >
                    + {booster}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2. Quick Presets</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map(p => (
                  <button key={p.id} onClick={() => { setCustomPrompt(p.prompt); setSelectedPresetId(p.id); }} className={`p-4 rounded-xl border text-left transition-all ${selectedPresetId === p.id ? 'bg-[#ccff00] text-black border-transparent' : 'bg-[#1E2332] border-white/5 text-white hover:border-white/10'}`}>
                    <span className="text-2xl mb-2 block">{p.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">{p.label[lang]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#151925] border-t border-white/5 space-y-4">
            {generatedImage && (
              <div className="grid grid-cols-2 gap-3 mb-2 animate-in slide-in-from-bottom duration-300">
                <button onClick={() => handleDownload(generatedImage)} className="py-4 bg-white text-black rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"><Download size={14} /> Save</button>
                <button onClick={() => handleShare(generatedImage)} className="py-4 bg-[#1E2332] text-white rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 border border-white/10 hover:bg-[#252a3b] transition-colors"><Share2 size={14} /> Share</button>
              </div>
            )}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !originalImage || !customPrompt}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] ${isGenerating || !originalImage || !customPrompt ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[#ccff00]/10'}`}
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : (
                user.tokens === 0 ? <><Crown size={22} fill="currentColor" /> {t.unlock_chaos[lang]}</> : <><Zap size={22} fill="currentColor" /> {t.generate_btn[lang]}</>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-80">{t.cost_hint[lang]}</p>
            <p className="text-center text-[9px] text-slate-600 font-bold mt-2 italic">{t.safety_disclaimer[lang]}</p>
          </div>
        </div>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*,.heic,.heif" />
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} lang={lang} onPurchase={handlePurchase} />
    </div>
  );
};

export default function Home() {
  const [view, setView] = useState<'landing' | 'editor'>('landing');
  return view === 'landing' ? <LandingPage onStart={() => setView('editor')} /> : <EditorApp onBack={() => setView('landing')} />;
}



import React, { useState, useEffect, useRef } from 'react';
import {
  Camera, Upload, RotateCcw, Download, Loader2, Sparkles,
  History as HistoryIcon, X, Image as ImageIcon, Monitor, Zap,
  Skull, Ghost, ArrowRight, CheckCircle2, Flame, Crown,
  Settings2, Share2, MousePointer2, Star, Trash2, Maximize2, ShieldCheck, Lock, EyeOff, Scale, Brain
} from 'lucide-react';
import { TRANSLATIONS, PRICING_PLANS, EXAMPLES, PRESETS } from './constants';
import { Language, AppStep, UserState, PlanType, Preset, HistoryItem } from './types';
import { supabase } from './services/supabase'; // Import Supabase
import { transformImage } from './services/imageService';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PaywallModal from './components/PaywallModal';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';
import PricingPage from './components/PricingPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to capture video frame
const captureVideoFrame = (video: HTMLVideoElement): string => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(video, 0, 0);
  return canvas.toDataURL('image/jpeg');
};

// --- EDITOR APP ---
const EditorApp: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const lang: Language = 'en';
  const [step, setStep] = useState<AppStep>('upload');
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('prankz_user');
    return saved ? JSON.parse(saved) : { tokens: 1, plan: 'free', planExpiry: null };
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('prankz_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth Modal State
  const [loadingMessage, setLoadingMessage] = useState('');
  const [fakeProgress, setFakeProgress] = useState(0);

  // Camera state
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS;
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  // Fetch profile from Supabase
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error fetching profile:', error);
      }

      if (data) {
        setUser(prev => ({
          ...prev,
          tokens: data.credits,
          plan: data.plan as PlanType
        }));
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('prankz_user', JSON.stringify(user));
    localStorage.setItem('prankz_history', JSON.stringify(history));
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
      return () => { clearInterval(mInt); clearInterval(pInt); };
    }
  }, [isGenerating]);

  // Camera handlers
  // Camera handlers
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      streamRef.current = stream;
      setShowCamera(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Could not access camera. Please allow camera permissions.");
    }
  };

  useEffect(() => {
    if (showCamera && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [showCamera]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const imageData = captureVideoFrame(videoRef.current);
      setOriginalImage(imageData);
      setGeneratedImage(null);
      setStep('preset'); // Ensures we go to the editor view, not 'preview' which might not be handled
      stopCamera();
    }
  };

  /* 
   * Enhanced file upload handler with HEIC support
   */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAnalyzing(true);

      let processedFile = file;

      // Handle HEIC/HEIF conversion
      if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
        try {
          const heic2any = (await import('heic2any')).default;
          // @ts-ignore
          const blob = await heic2any({ blob: file, toType: "image/jpeg" });
          processedFile = Array.isArray(blob) ? blob[0] as File : blob as File;
        } catch (err) {
          console.error("HEIC conversion failed:", err);
          alert("Could not convert HEIC image. Please try a JPEG or PNG.");
          setAnalyzing(false);
          return;
        }
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage(reader.result as string);
        setGeneratedImage(null);
        setAnalyzing(false);
        setStep('preset');
      };
      reader.readAsDataURL(processedFile);
    }
  };

  const handleGenerate = async () => {
    const cost = selectedPresetId ? PRESETS.find(p => p.id === selectedPresetId)?.cost || 1 : 1;
    let currentCredits = user.tokens;

    // Strict DB Check if logged in
    if (session?.user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', session.user.id)
        .single();

      if (error || !data || data.credits < cost) {
        setShowPaywall(true);
        return;
      }
      currentCredits = data.credits;
    } else if (user.tokens < cost) {
      setShowPaywall(true);
      return;
    }

    setIsGenerating(true);
    setStep('generating');
    setGeneratedImage(null);

    try {
      const result = await transformImage(originalImage!, customPrompt);
      setGeneratedImage(result);

      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        original: originalImage!,
        generated: result,
        prompt: customPrompt,
        timestamp: Date.now()
      };

      setHistory(prev => [newHistoryItem, ...prev]);

      // Deduct from the FRESH fetched value (or local if not logged in)
      const newTokens = Math.max(0, currentCredits - cost);

      // Update local state
      setUser(prev => ({ ...prev, tokens: newTokens }));

      // Update Supabase if logged in
      if (session?.user) {
        supabase.from('profiles')
          .update({ credits: newTokens })
          .eq('id', session.user.id)
          .then(({ error }) => {
            if (error) console.error('Error updating credits:', error);
          });
      }

      setStep('result');

      // Trigger paywall if out of tokens (after small delay to see result)
      if (newTokens <= 0) {
        setTimeout(() => setShowPaywall(true), 2000);
      }
    } catch (err: any) {
      alert(err.message || "Engine Error");
      setStep('preset');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePurchase = (plan: PlanType, tokens: number) => {
    const newTokens = user.tokens + tokens;
    const newPlanExpiry = Date.now() + (30 * 24 * 60 * 60 * 1000);

    // Update local state
    setUser(prev => ({
      ...prev,
      plan,
      tokens: newTokens,
      planExpiry: newPlanExpiry
    }));

    // Update Supabase if logged in
    if (session?.user) {
      supabase.from('profiles')
        .update({
          credits: newTokens,
          plan: plan
        })
        .eq('id', session.user.id)
        .then(({ error }) => {
          if (error) console.error('Error updating purchase:', error);
        });
    }

    setShowPaywall(false);
  };

  const handleHistoryView = (item: HistoryItem) => {
    setOriginalImage(item.original);
    setGeneratedImage(item.generated);
    setCustomPrompt(item.prompt);
    setStep('result');
  };

  // Fix: Added handleReset to clear the editor state and return to upload step
  const handleReset = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setCustomPrompt('');
    setSelectedPresetId(null);
    setStep('upload');
  };

  // Fix: Added handleDownload to allow users to save the generated image
  const handleDownload = (imageUrl: string) => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `prankz-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fix: Added handleShare to use the Web Share API for sharing the image
  const handleShare = async (imageUrl: string) => {
    if (!imageUrl) return;
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'prank.png', { type: 'image/png' });
        await navigator.share({
          files: [file],
          title: 'Prank-Z Creation',
          text: 'Look what I created with Prank-Z!',
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert('Sharing is not supported on this browser. Try saving the image instead.');
    }
  };




  const handleLogin = async () => {
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050511] font-sans">
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      {/* RESTORED HEADER */}
      <header className="sticky top-0 z-[60] w-full border-b border-white/5 bg-[#050511]/90 backdrop-blur-xl h-16 sm:h-20 flex justify-between items-center px-4 sm:px-6">
        <div className="flex items-center gap-3 cursor-pointer group hover:animate-glitch" onClick={onBack}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#ccff00] flex items-center justify-center shadow-lg overflow-hidden border-2 border-black"><img src="/logo.jpg" alt="Prank-Z" className="w-full h-full object-cover" /></div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white leading-none">Prank-Z</h1>
            <span className="hidden sm:block text-[9px] font-black text-slate-500 uppercase tracking-widest">AI Chaos Engine</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {!session ? (
            <button onClick={handleLogin} className="text-[10px] sm:text-xs font-bold text-white hover:text-[#ccff00] uppercase tracking-widest">
              Login
            </button>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#1E2332] rounded-full border border-white/5 shadow-inner">
              <Zap size={12} className="text-[#ccff00] sm:w-3.5 sm:h-3.5" fill="currentColor" />
              <div className="flex flex-col leading-none">
                <span className="text-xs sm:text-sm font-black text-white">{user.tokens}</span>
                <span className="hidden sm:inline text-[8px] font-bold text-slate-500 uppercase tracking-widest">Credits</span>
              </div>
            </div>
          )}

          <div className="relative group">
            <button onClick={() => navigate('/pricing')} className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs sm:text-sm font-black hover:scale-105 transition-all shadow-lg active:scale-95">
              <Crown size={12} fill="white" className="sm:w-3.5 sm:h-3.5" />
              <span>Upgrade</span>
            </button>
            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-[#1a1c2c] border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-white shadow-2xl z-[100]">
              Unlock 80 images/month
            </div>
          </div>

          {session && (
            <button onClick={handleLogout} className="hidden sm:block text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">
              Logout
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-grow min-h-0">
        {/* CANVAS */}
        <div className="flex-1 bg-[#0a0a0e] relative flex flex-col items-center p-4 sm:p-6 border-r border-white/5 overflow-y-auto">
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
              <>
                <div className="relative w-full max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200 z-20">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#ccff00] text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(204,255,0,0.6)] flex items-center gap-2 whitespace-nowrap z-30 animate-bounce">
                    <div className="w-2 h-2 bg-black rounded-full animate-ping"></div>
                    FREE TRIAL: 1 Chaos Credit
                  </div>
                </div>

                <div className="w-full max-w-2xl mx-auto rounded-[3rem] border-4 border-dashed border-white/10 flex flex-col items-center justify-center bg-[#151925]/30 p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                  {analyzing ? <Loader2 className="animate-spin text-[#ccff00]" size={48} /> : (
                    <>
                      <div className="w-24 h-24 rounded-full bg-[#ccff00] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(204,255,0,0.3)]">
                        <Upload size={40} className="text-black" />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md z-10">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 py-4 bg-[#1E2332] border border-white/10 rounded-2xl font-black uppercase text-sm hover:bg-[#252a3b] hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
                        >
                          <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                          Upload Photo
                        </button>

                        <button
                          onClick={startCamera}
                          className="flex-1 py-4 bg-[#ccff00] text-black rounded-2xl font-black uppercase text-sm hover:bg-[#b3e600] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] active:scale-95"
                        >
                          <Camera size={18} />
                          Take Photo
                        </button>
                      </div>

                      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-8">
                        First chaos is free. <span className="text-white">No mercy after 😈</span>
                      </p>

                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </>
                  )}
                </div>

                {/* CAMERA OVERLAY */}
                {showCamera && (
                  <div className="fixed inset-0 z-[100] bg-black flex flex-col">
                    <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        onLoadedMetadata={() => videoRef.current?.play()}
                      />
                      <div className="absolute inset-0 border-[20px] border-black/50 pointer-events-none"></div>
                    </div>

                    <div className="h-32 bg-black flex items-center justify-between px-8 pb-8 pt-4">
                      <button onClick={stopCamera} className="text-white font-bold p-4 rounded-full bg-white/10 hover:bg-white/20"><X size={24} /></button>
                      <button
                        onClick={handleCapturePhoto}
                        className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform"
                      >
                        <div className="w-16 h-16 bg-white rounded-full group-hover:bg-[#ccff00] transition-colors"></div>
                      </button>
                      <div className="w-12"></div> {/* Spacer for alignment */}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-12 pb-20">
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white/10 bg-[#050511]">
                  {generatedImage ? (
                    <BeforeAfterSlider original={originalImage} generated={generatedImage} />
                  ) : (
                    <img src={originalImage} alt="Original" className="w-full max-h-[60vh] object-contain" />
                  )}
                </div>

                {/* CREATIONS LIST */}
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

          {/* SOCIAL PROOF FOOTER */}
          <div className="mt-auto pt-20 flex flex-col items-center gap-6 z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-[10px] font-bold text-slate-500 uppercase tracking-widest opacity-60">
              <span className="flex items-center gap-2"><Flame size={12} className="text-orange-500" /> 12,403,999 photos ruined</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-2"><Brain size={12} className="text-purple-500" /> Powered by AI Chaos Engine</span>
              <span className="hidden sm:inline">•</span>
              <span>🚫 Not responsible for group chats</span>
            </div>

            <div className="text-center animate-in fade-in duration-1000 delay-500">
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity cursor-default">
                Make memes. Ruin friendships. Repeat.
              </p>
            </div>
          </div>

          <div className="w-full mt-20">
            <Footer />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="w-full lg:w-[400px] bg-[#151925] border-l border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#151925]/50 backdrop-blur-sm">
            <div className="flex items-center gap-2"><Settings2 size={16} className="text-[#ccff00]" /><h2 className="text-xs font-black uppercase tracking-widest text-white">The Lab</h2></div>
            {originalImage && <button onClick={handleReset} className="text-[10px] font-black text-red-400 flex items-center gap-1 uppercase hover:text-red-300"><RotateCcw size={12} /> Nuke It</button>}
          </div>

          <div className="flex-1 p-6 space-y-8 overflow-y-auto">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">1. Explain the Prank</label>
              <textarea
                value={customPrompt}
                onChange={e => { setCustomPrompt(e.target.value); setSelectedPresetId(null); }}
                placeholder="Make him look like he hasn't slept in 40 years..."
                className="w-full h-32 bg-[#0a0a0e] border border-white/10 rounded-2xl p-4 text-white text-sm focus:border-[#ccff00] transition-all resize-none shadow-inner"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">2. Choose Your Chaos</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map(p => {
                  const isLocked = p.premium && user.plan === 'free';
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (isLocked) {
                          setShowPaywall(true);
                        } else {
                          setCustomPrompt(p.prompt);
                          setSelectedPresetId(p.id);
                        }
                      }}
                      className={`relative p-4 rounded-xl border text-left transition-all hover:animate-shake overflow-hidden
                        ${selectedPresetId === p.id
                          ? 'bg-[#ccff00] text-black border-transparent'
                          : isLocked
                            ? 'bg-[#1E2332]/50 border-white/5 text-slate-500 hover:border-white/10'
                            : 'bg-[#1E2332] border-white/5 text-white hover:border-white/10'
                        }`}
                    >
                      {isLocked && (
                        <div className="absolute top-2 right-2 z-10">
                          <Lock size={12} className="text-slate-500" />
                        </div>
                      )}
                      {p.premium && !isLocked && (
                        <div className="absolute top-2 right-2 z-10">
                          <Crown size={12} className="text-[#FFD700]" fill="currentColor" />
                        </div>
                      )}
                      <span className={`text-2xl mb-2 block ${isLocked ? 'grayscale opacity-50' : ''}`}>{p.icon}</span>
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">{p.label[lang]}</span>
                      {isLocked && <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>}
                    </button>
                  );
                })}
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
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] relative overflow-hidden group ${isGenerating || !originalImage || !customPrompt
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                : user.tokens < (selectedPresetId ? PRESETS.find(p => p.id === selectedPresetId)?.cost || 1 : 1)
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-red-500/20'
                  : 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[0_0_30px_rgba(204,255,0,0.4)] animate-pulse hover:animate-none'
                }`}
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" />
              ) : user.tokens < (selectedPresetId ? PRESETS.find(p => p.id === selectedPresetId)?.cost || 1 : 1) ? (
                <><Lock size={22} /> 🔒 Upgrade to Keep the Chaos Going</>
              ) : (
                <><Zap size={22} fill="currentColor" /> ⚡ Generate Chaos</>
              )}
            </button>
            <p className="text-center text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-80">
              Uses {selectedPresetId ? PRESETS.find(p => p.id === selectedPresetId)?.cost || 1 : 1} credit • ~15–30 seconds • worth it
            </p>
          </div>
        </div>

      </div>


      <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
      <PaywallModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} lang={lang} onPurchase={handlePurchase} />
    </div>
  );
};



// ... (keep EditorApp and other definitions)

// Wrapper for LandingPage to handle navigation
const LandingPageWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <LandingPage onStart={() => navigate('/editor')} />;
};

const EditorAppWrapper: React.FC = () => {
  const navigate = useNavigate();
  return <EditorApp onBack={() => navigate('/')} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/editor" element={<EditorAppWrapper />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<LegalPage docKey="privacy" />} />
        <Route path="/terms" element={<LegalPage docKey="terms" />} />
        <Route path="/refund" element={<LegalPage docKey="refund" />} />
        <Route path="/acceptable-use" element={<LegalPage docKey="acceptable_use" />} />
        <Route path="/disclaimer" element={<LegalPage docKey="disclaimer" />} />
        <Route path="/contact" element={<LegalPage docKey="contact" />} />
        <Route path="*" element={<LandingPageWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;

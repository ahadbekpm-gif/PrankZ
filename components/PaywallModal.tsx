import React from 'react';
import { X, Check, Crown, Zap, Star } from 'lucide-react';
import { TRANSLATIONS, PRICING_PLANS } from '../constants';
import { Language, PlanType } from '../types';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onPurchase: (plan: PlanType, tokens: number) => void;
}

const PaywallModal: React.FC<PaywallProps> = ({ isOpen, onClose, lang, onPurchase }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-[#0a0a0e] border border-white/10 w-full max-w-5xl rounded-[30px] sm:rounded-[40px] p-5 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-6 sm:gap-8 my-auto">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-50 sm:opacity-100"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white bg-white/5 p-2 rounded-full transition-colors z-[110]"
        >
          <X size={18} />
        </button>

        {/* Info Column */}
        <div className="md:w-1/3 flex flex-col justify-center relative z-10 space-y-4 sm:space-y-6 pt-6 md:pt-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#ccff00]/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[#ccff00] border border-[#ccff00]/20 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
            <Crown size={24} className="sm:size-32" />
          </div>
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t.premium_modal_title[lang]}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
              {t.premium_desc[lang]}
            </p>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-4 pt-4 border-t border-white/5">
            {["HD Results", "No Ads", "Priority Queue", "Pro Styles"].map((feat, i) => (
              <li key={i} className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-sm font-bold text-slate-300">
                <div className="bg-[#ccff00]/20 p-0.5 sm:p-1 rounded-full text-[#ccff00]"><Check size={10} className="sm:size-14" strokeWidth={4} /></div>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing Cards Column */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative z-10 pb-4 md:pb-0">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] border transition-all duration-300 group hover:scale-[1.05] cursor-pointer ${plan.popular
                  ? 'bg-[#151925] border-[#ccff00]/30 shadow-[0_15px_30px_rgba(204,255,0,0.15)] z-20 scale-105'
                  : 'bg-[#0f1119] border-white/5 hover:border-white/10 z-10'
                }`}
              onClick={() => onPurchase(plan.id as PlanType, plan.tokens)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg z-30 animate-bounce">
                  Best Value
                </div>
              )}

              <div className="flex-1 space-y-3 sm:space-y-4">
                <div className="flex justify-between items-start">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.name}</div>
                  {(plan as any).tag && <div className="text-[10px] font-bold text-[#ccff00] uppercase tracking-widest opacity-80">{(plan as any).tag}</div>}
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter">{plan.price}</span>
                  <span className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-wide">One-time payment</span>
                </div>

                <div className="pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 text-[#ccff00]">
                    <Zap size={16} fill="currentColor" />
                    <span className="text-base sm:text-lg font-black">{plan.tokens} Chaos Edits</span>
                  </div>
                </div>
              </div>

              <button className={`w-full mt-5 sm:mt-6 py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${plan.popular
                  ? 'bg-[#ccff00] text-black hover:bg-[#b3e600] shadow-[#ccff00]/20'
                  : 'bg-[#1E2332] text-white hover:bg-[#252a3b]'
                }`}>
                {plan.popular ? 'Upgrade & Ruin Photos' : 'Select Plan'}
              </button>
            </div>
          ))}

          <div className="text-center md:col-span-3 pt-6">
            <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">
              Cancel anytime. No guilt. Plenty of regret.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
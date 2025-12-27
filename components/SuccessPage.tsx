
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const checkoutId = searchParams.get('checkout_id');

    useEffect(() => {
        // Optional: You could verify the checkout status here if needed
        // For now, we'll just show success and redirect
        const timer = setTimeout(() => {
            navigate('/editor');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-[#ccff00]/10 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
                <CheckCircle2 size={64} className="text-[#ccff00]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                Payment <span className="text-[#ccff00]">Successful</span>!
            </h1>

            <p className="text-slate-400 text-lg max-w-lg mb-8">
                Your credits have been added to your account. Prepare for chaos.
            </p>

            <div className="bg-[#151925] border border-white/10 rounded-xl p-4 mb-8">
                <p className="text-xs text-slate-500 font-mono">Reference ID: {checkoutId || 'N/A'}</p>
            </div>

            <button
                onClick={() => navigate('/editor')}
                className="px-8 py-3 bg-[#ccff00] text-black rounded-xl font-black uppercase text-sm hover:bg-[#b3e600] transition-all flex items-center gap-2"
            >
                Go to Editor <ArrowRight size={16} />
            </button>

            <p className="text-xs text-slate-600 mt-8 animate-pulse">
                Redirecting automatically in 5 seconds...
            </p>
        </div>
    );
};

export default SuccessPage;

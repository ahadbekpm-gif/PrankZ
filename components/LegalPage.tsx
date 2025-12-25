import { supabase } from '../services/supabase';
import { useState, useEffect } from 'react';

// ... other imports ...

const LegalPage: React.FC<LegalPageProps> = ({ docKey }) => {
    const { title, content } = LEGAL_CONTENT[docKey];
    const [backPath, setBackPath] = useState('/');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) setBackPath('/editor');
        });
    }, []);

    // ... renderContent ...

    return (
        <div className="min-h-screen bg-[#050511] text-slate-300">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to={backPath} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-sm">Back</span>
                    </Link>
                    <div className="flex items-center gap-2 text-[#ccff00]">
                        <div className="w-8 h-8 rounded-lg bg-[#ccff00]/10 flex items-center justify-center">
                            {docKey === 'privacy' && <ShieldCheck size={18} />}
                            {docKey === 'terms' && <FileText size={18} />}
                            {docKey === 'refund' && <CreditCard size={18} />}
                            {docKey === 'contact' && <Mail size={18} />}
                            {(docKey === 'acceptable_use' || docKey === 'disclaimer') && <Info size={18} />}
                        </div>
                        <span className="font-black text-white tracking-tight">{title}</span>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="prose prose-invert max-w-none">
                    {renderContent(content)}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 mt-12 bg-[#0a0a0e]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Prank-Z. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LegalPage;

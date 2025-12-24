import React from 'react';
import { ShieldCheck, FileText, Mail, Info, CreditCard, ArrowLeft } from 'lucide-react';
import { LEGAL_CONTENT, LegalDocKey } from './LegalContent';
import { Link } from 'react-router-dom';

interface LegalPageProps {
    docKey: LegalDocKey;
}

const LegalPage: React.FC<LegalPageProps> = ({ docKey }) => {
    const { title, content } = LEGAL_CONTENT[docKey];

    // Simple markdown renderer reuse
    const renderContent = (text: string) => {
        return text.split('\n').map((line, idx) => {
            if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-xl font-bold text-white mt-8 mb-4">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('* ')) {
                return (
                    <li key={idx} className="ml-4 pl-2 text-slate-300 mb-2 list-disc marker:text-[#ccff00]">
                        {renderLine(line.replace('* ', ''))}
                    </li>
                );
            }
            if (line.startsWith('# ')) {
                return <h2 key={idx} className="text-3xl font-black text-white mt-10 mb-6 border-b border-white/10 pb-4">{line.replace('# ', '')}</h2>;
            }
            if (line.trim() === '---') {
                return <hr key={idx} className="border-white/10 my-8" />;
            }
            if (line.trim() === '') {
                return <div key={idx} className="h-4" />;
            }
            return <p key={idx} className="text-slate-400 leading-relaxed mb-4 text-lg">{renderLine(line)}</p>;
        });
    };

    const renderLine = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="min-h-screen bg-[#050511] text-slate-300">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050511]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-sm">Back to Home</span>
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

import React from 'react';
import { X, ShieldCheck, FileText, Mail, Info, CreditCard } from 'lucide-react';
import { LEGAL_CONTENT, LegalDocKey } from './LegalContent';

interface LegalModalProps {
    docKey: LegalDocKey | null;
    onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ docKey, onClose }) => {
    if (!docKey) return null;

    const { title, content } = LEGAL_CONTENT[docKey];

    // Simple markdown renderer for the provided content structure
    // Handles headers (##), lists (*), and bold text (**)
    const renderContent = (text: string) => {
        return text.split('\n').map((line, idx) => {
            if (line.startsWith('## ')) {
                return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('* ')) {
                return (
                    <li key={idx} className="ml-4 pl-2 text-slate-300 mb-2 list-disc marker:text-[#ccff00]">
                        {renderLine(line.replace('* ', ''))}
                    </li>
                );
            }
            if (line.startsWith('# ')) {
                // Should be title usually, but if inside content
                return <h2 key={idx} className="text-2xl font-black text-white mt-8 mb-4 border-b border-white/10 pb-2">{line.replace('# ', '')}</h2>;
            }
            if (line.trim() === '---') {
                return <hr key={idx} className="border-white/10 my-6" />;
            }
            if (line.trim() === '') {
                return <div key={idx} className="h-2" />;
            }
            return <p key={idx} className="text-slate-400 leading-relaxed mb-2">{renderLine(line)}</p>;
        });
    };

    // Helper to process inline formatting like **bold**
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#0a0a0e] border border-white/10 w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#050511]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
                            {docKey === 'privacy' && <ShieldCheck size={20} />}
                            {docKey === 'terms' && <FileText size={20} />}
                            {docKey === 'refund' && <CreditCard size={20} />}
                            {docKey === 'contact' && <Mail size={20} />}
                            {(docKey === 'acceptable_use' || docKey === 'disclaimer') && <Info size={20} />}
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                        <X size={16} className="text-slate-400" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                    <div className="prose prose-invert max-w-none">
                        {renderContent(content)}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-white/5 bg-[#050511] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LegalModal;

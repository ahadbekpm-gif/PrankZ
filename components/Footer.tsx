import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';

interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
    return (
        <footer className={`py-12 px-6 border-t border-white/5 bg-[#020205] text-center w-full ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
                <div className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                    <Ghost size={20} className="text-white" />
                    <span className="font-black tracking-tighter text-white">Prank-Z</span>
                </div>

                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    For jokes only. Don't be evil. Be funny. <br />
                    <span className="text-xs opacity-50">Legal: If you get fired, that's on you.</span>
                </p>

                <nav className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-600">
                    <Link to="/privacy" className="hover:text-[#ccff00] transition-colors">Privacy Policy</Link>
                    <span className="opacity-50">·</span>
                    <Link to="/terms" className="hover:text-[#ccff00] transition-colors">Terms & Conditions</Link>
                    <span className="opacity-50">·</span>
                    <Link to="/refund" className="hover:text-[#ccff00] transition-colors">Refund Policy</Link>
                    <span className="opacity-50">·</span>
                    <Link to="/contact" className="hover:text-[#ccff00] transition-colors">Contact</Link>
                </nav>

                <p className="text-[10px] text-slate-700 uppercase tracking-widest">© 2024 Prank-Z. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

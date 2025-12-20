
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterProps {
  original: string;
  generated: string;
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({ original, generated, className = "" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    
    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('mousemove', handleMove as any);
      window.addEventListener('touchmove', handleMove as any);
    } else {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('touchmove', handleMove as any);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('touchmove', handleMove as any);
    };
  }, [isDragging]);

  return (
    <div 
      className={`relative select-none group flex justify-center min-h-[300px] sm:min-h-[400px] w-full ${className}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* 
         Sizer Image: Invisible copy to force parent dimensions.
         Must have same max-height constraint as the preview in App.tsx to align properly.
      */}
      <img 
        src={original} 
        alt="Sizer" 
        className="block w-full h-auto opacity-0 pointer-events-none object-contain max-h-[60vh]"
      />

      {/* Actual visual layers */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0a0a0e]">
          {/* Background Grid */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none z-0" 
            style={{
                backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', 
                backgroundSize: '24px 24px'
            }} 
          />

          {/* Layer 1: Original (Bottom) */}
          <img 
            src={original} 
            alt="Original" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-1"
          />
          
          {/* Layer 2: Generated (Top) - Clipped */}
          <img 
            src={generated} 
            alt="Generated" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-2"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }} 
          />

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/80 text-white/90 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/10 z-10 pointer-events-none">
            Victim
          </div>
          <div className="absolute top-4 right-4 bg-[#ccff00] text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-black/10 z-10 pointer-events-none">
            Cursed
          </div>

          {/* Slider line and handle */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-white cursor-ew-resize shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20 hover:w-[4px] transition-all"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl text-white group-hover:scale-110 transition-transform">
              <ArrowLeftRight size={20} />
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 text-white/30 text-[9px] font-black uppercase tracking-[0.2em] pointer-events-none z-10 flex items-center gap-2">
            <Sparkles size={10} />
            PrankGen Chaos Engine
          </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

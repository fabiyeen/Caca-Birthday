import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-[#04060C] py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="font-celestial font-semibold tracking-wider text-sm uppercase">
            Letters for Kak Caca
          </span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        <p className="text-xs text-slate-400 max-w-md font-sans-ui leading-relaxed">
          Crafted with love by the Agrabah & Wonka ensemble. A digital constellation keepsake to honor Kak Caca's birthday across time and space.
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400/80 mt-2">
          <span>Preserved forever in the cosmic memory bank</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-rose-400/90">
            Made with <Heart className="w-3 h-3 fill-rose-400/50" />
          </span>
        </div>
      </div>
    </footer>
  );
};

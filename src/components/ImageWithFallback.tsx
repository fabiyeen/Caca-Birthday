import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackName?: string;
  fallbackColor?: string;
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackName = "Friend",
  fallbackColor = "#F59E0B",
  className = "",
  containerClassName = "",
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  if (hasError || !src) {
    const isCircular = containerClassName.includes('rounded-full');

    return (
      <div 
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0A0E1A] to-[#04060C] border border-white/15 select-none ${
          isCircular ? 'rounded-full' : 'rounded-2xl'
        } ${containerClassName}`}
        style={{ borderColor: `${fallbackColor}40` }}
      >
        {/* Soft cosmic glow */}
        <div 
          className="absolute inset-0 opacity-25 blur-xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 40%, ${fallbackColor} 0%, transparent 70%)` }}
        />

        {/* Ambient star speckles */}
        <div className="absolute top-2 left-3 w-1 h-1 bg-white/60 rounded-full" />
        <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-amber-200/50 rounded-full" />
        <div className="absolute top-4 right-6 w-1 h-1 bg-sky-200/40 rounded-full" />

        <div className="relative z-10 flex flex-col items-center justify-center p-2 text-center">
          <span 
            className="font-celestial font-bold tracking-wider text-white text-base sm:text-lg drop-shadow"
            style={{ color: fallbackColor }}
          >
            {getInitials(fallbackName)}
          </span>
          <span className="text-[10px] font-sans text-slate-400/80 truncate max-w-[90px] mt-0.5">
            {fallbackName}
          </span>
        </div>

        <Sparkles 
          className="w-3.5 h-3.5 absolute bottom-1.5 right-1.5 opacity-80"
          style={{ color: fallbackColor }}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/60 animate-pulse flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || fallbackName}
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

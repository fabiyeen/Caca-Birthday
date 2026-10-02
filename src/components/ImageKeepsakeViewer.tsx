import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Download, 
  Sparkles,
  Move,
  Image as ImageIcon
} from 'lucide-react';

interface ImageKeepsakeViewerProps {
  imageUrl: string;
  friendName: string;
}

export const ImageKeepsakeViewer: React.FC<ImageKeepsakeViewerProps> = ({
  imageUrl,
  friendName
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  // Fade out interaction hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  // Reset transform when imageUrl changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsLoading(true);
    setHasError(false);
  }, [imageUrl]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 4));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.6);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
    setScale((prev) => {
      const newScale = Math.min(Math.max(prev * zoomFactor, 0.6), 4.5);
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newScale;
    });
  };

  // Double click toggle zoom
  const handleDoubleClick = () => {
    if (scale > 1.2) {
      handleReset();
    } else {
      setScale(2);
    }
  };

  // Mouse pan handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only left click
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch pan & pinch zoom handling
  const touchStartRef = useRef<{ x: number; y: number; dist?: number }>({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      touchStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartRef.current.dist = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setPosition({
        x: e.touches[0].clientX - touchStartRef.current.x,
        y: e.touches[0].clientY - touchStartRef.current.y
      });
    } else if (e.touches.length === 2 && touchStartRef.current.dist) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const factor = dist / touchStartRef.current.dist;
      touchStartRef.current.dist = dist;
      setScale((prev) => Math.min(Math.max(prev * factor, 0.6), 4.5));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartRef.current.dist = undefined;
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Controls Toolbar */}
      <div className="w-full max-w-3xl flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-2xl bg-[#0D1122]/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50">
        <div className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Original Keepsake Photo / Scan</span>
          <span className="sm:hidden">Keepsake</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-[11px] font-mono">
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-40 transition border border-white/10 cursor-pointer"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleZoomIn}
            disabled={scale >= 4.5}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white disabled:opacity-40 transition border border-white/10 cursor-pointer"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs transition border border-white/10 flex items-center gap-1 cursor-pointer"
            title="Reset Zoom & Pan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <div className="h-4 w-px bg-white/15 mx-1" />

          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
            title="Open Original High-Res File"
            aria-label="Open original image"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href={imageUrl}
            download
            className="p-1.5 sm:p-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 transition border border-amber-500/30"
            title="Download Original Keepsake"
            aria-label="Download keepsake"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Interactive Image Frame */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleDoubleClick}
        className={`relative w-full max-w-3xl min-h-[450px] max-h-[70vh] flex items-center justify-center rounded-2xl bg-[#030712] border border-white/15 overflow-hidden shadow-2xl select-none transition-colors ${
          isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'
        }`}
      >
        {/* Soft Cosmic Glow in background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#080B14]/80 z-20">
            <div className="w-9 h-9 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
            <p className="text-xs text-amber-200/80 font-celestial tracking-wider">
              Revealing original keepsake...
            </p>
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="p-8 text-center max-w-md z-10">
            <p className="text-amber-300 font-serif-letter text-lg mb-2">
              Original keepsake image is being polished in the stars.
            </p>
            <p className="text-xs text-slate-400 mb-4">
              {friendName}'s keepsake will appear here shortly.
            </p>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/40 text-xs font-medium hover:bg-amber-500/30 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Direct File
            </a>
          </div>
        )}

        {/* High-Res Transformable Image */}
        {!hasError && (
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
            className="flex items-center justify-center p-4 max-w-full max-h-full"
          >
            <img
              src={imageUrl}
              alt={`Original letter keepsake from ${friendName}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              draggable={false}
              className="max-h-[64vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              style={{
                imageRendering: 'auto'
              }}
            />
          </div>
        )}

        {/* Floating Interaction Hint */}
        {showHint && !isLoading && !hasError && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none transition-opacity duration-500 shadow-lg">
            <Move className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Drag to pan • Scroll / pinch to zoom • Double-click to magnify</span>
          </div>
        )}
      </div>

      {/* Caption footer */}
      <p className="text-xs text-slate-400/90 text-center mt-3 font-sans-ui flex items-center gap-1.5">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>Original keepsake from {friendName}</span>
      </p>
    </div>
  );
};

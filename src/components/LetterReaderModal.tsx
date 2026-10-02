import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FriendLetter } from '../data/lettersData';
import { PdfCanvasViewer } from './PdfCanvasViewer';
import { ImageKeepsakeViewer } from './ImageKeepsakeViewer';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  FileCheck, 
  Image as ImageIcon,
  Volume2, 
  Sparkles, 
  Calendar,
  Share2,
  Check
} from 'lucide-react';

interface LetterReaderModalProps {
  letter: FriendLetter | null;
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

export const LetterReaderModal: React.FC<LetterReaderModalProps> = ({
  letter,
  onClose,
  onSelectNext,
  onSelectPrev
}) => {
  const [activeTab, setActiveTab] = useState<'formatted' | 'original'>('formatted');
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [hasCopiedShare, setHasCopiedShare] = useState<boolean>(false);

  // Keyboard Navigation: ESC to close, Left/Right arrow keys to switch
  useEffect(() => {
    if (!letter) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectPrev();
      } else if (e.key === 'ArrowRight') {
        onSelectNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letter, onClose, onSelectNext, onSelectPrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (letter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [letter]);

  if (!letter) return null;

  // Render markdown text cleanly with quotes and headers
  const renderFormattedLetter = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let inQuote = false;
    let quoteLines: string[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Check blockquote
      if (trimmed.startsWith('>')) {
        inQuote = true;
        quoteLines.push(trimmed.replace(/^>\s*/, ''));
        return;
      } else if (inQuote) {
        // Flush quote
        elements.push(
          <blockquote 
            key={`quote-${index}`}
            className="my-5 p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 font-serif-letter italic text-amber-100 text-lg leading-relaxed shadow-sm"
          >
            {quoteLines.join(' ')}
          </blockquote>
        );
        inQuote = false;
        quoteLines = [];
      }

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-celestial font-bold text-amber-200 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed === '') {
        elements.push(<div key={index} className="h-3" />);
      } else {
        // Process inline bold / italic
        const formatted = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-200 font-semibold">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="text-slate-200 italic">$1</em>');

        elements.push(
          <p 
            key={index} 
            className="text-slate-300 font-sans-ui text-base sm:text-lg leading-relaxed sm:leading-loose mb-3"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      }
    });

    if (inQuote && quoteLines.length > 0) {
      elements.push(
        <blockquote 
          key="quote-last"
          className="my-5 p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 font-serif-letter italic text-amber-100 text-lg leading-relaxed shadow-sm"
        >
          {quoteLines.join(' ')}
        </blockquote>
      );
    }

    return elements;
  };

  const handleShareQuote = () => {
    if (!letter) return;
    const text = `"${letter.snippetQuote}" — Letter for Kak Caca from ${letter.name}`;
    navigator.clipboard.writeText(text);
    setHasCopiedShare(true);
    setTimeout(() => setHasCopiedShare(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#080B14]/95 border border-white/15 backdrop-blur-2xl shadow-2xl shadow-black/80 z-10 overflow-hidden"
        >
          {/* Top Decorative Celestial Glow */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl opacity-20 pointer-events-none"
            style={{ background: letter.colorAccent || '#F59E0B' }}
          />

          {/* Modal Header */}
          <div className="relative shrink-0 p-5 sm:p-6 border-b border-white/10 bg-[#0D1122]/70 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4">
              {/* Author & Memory Photo Info */}
              <div className="flex items-center gap-4">
                <div 
                  className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-[#080B14] border-2 border-amber-500/40 flex items-center justify-center shadow-lg shadow-black/60 shrink-0"
                  style={{ borderColor: letter.colorAccent ? `${letter.colorAccent}80` : undefined }}
                >
                  <span className="font-celestial font-bold text-xl sm:text-2xl text-amber-200 tracking-wider">
                    {letter.name.charAt(0)}
                  </span>
                  <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#080B14] border border-amber-500/40 text-amber-300">
                    <Sparkles className="w-3 h-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-celestial font-bold text-white tracking-wide">
                      {letter.name}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-400/80 flex items-center gap-1 mt-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    Ensemble Keepsake • Birthday Special
                  </p>
                </div>
              </div>

              {/* Close & Share Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareQuote}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
                  title="Copy Quote"
                  aria-label="Copy Quote"
                >
                  {hasCopiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition border border-white/10"
                  title="Close (Esc)"
                  aria-label="Close letter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex items-center gap-2 mt-5">
              <button
                onClick={() => setActiveTab('formatted')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'formatted'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Read Letter</span>
              </button>

              <button
                onClick={() => setActiveTab('original')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  activeTab === 'original'
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 bg-white/5'
                }`}
              >
                {letter.originalMedia?.type === 'image' ? (
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                ) : (
                  <FileCheck className="w-4 h-4 text-amber-400" />
                )}
                <span>Original Keepsake</span>
                {letter.originalMedia && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-amber-300/90 border border-amber-500/20">
                    {letter.originalMedia.type === 'image' ? 'Photo / Scan' : 'Handwritten PDF'}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#080B14]">
            {activeTab === 'formatted' ? (
              <div className="max-w-2xl mx-auto py-2">
                {/* Voice Note Simulation Header (If applicable) */}
                <div className="mb-6 p-3.5 rounded-2xl bg-[#0D1122]/70 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingVoice(!isPlayingVoice)}
                      className="w-10 h-10 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center transition cursor-pointer"
                      title={isPlayingVoice ? "Pause Voice Memo" : "Play Voice Memo"}
                    >
                      <Volume2 className={`w-5 h-5 ${isPlayingVoice ? 'animate-bounce' : ''}`} />
                    </button>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">
                        Voice Note from {letter.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {isPlayingVoice ? "Playing ambient tribute voice..." : "Click to hear voice reflection"}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-amber-300/80 bg-black/40 px-2 py-1 rounded">
                    01:24
                  </span>
                </div>

                {/* Formatted Markdown Content */}
                <div className="prose prose-invert prose-amber max-w-none">
                  {renderFormattedLetter(letter.letterMarkdown)}
                </div>

                {/* Sign-off Decorative Star Divider */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-center gap-3 text-amber-400/50">
                  <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                {letter.originalMedia?.type === 'image' ? (
                  <ImageKeepsakeViewer
                    imageUrl={letter.originalMedia.url}
                    friendName={letter.name}
                  />
                ) : (
                  <PdfCanvasViewer
                    pdfUrl={letter.originalMedia?.type === 'pdf' ? letter.originalMedia.url : (letter.pdfUrl || '')}
                    friendName={letter.name}
                    onSwitchToFormattedView={() => setActiveTab('formatted')}
                  />
                )}
              </div>
            )}
          </div>

          {/* Modal Navigation Footer */}
          <div className="shrink-0 p-4 sm:p-5 border-t border-white/10 bg-[#0D1122]/90 backdrop-blur-md flex items-center justify-between text-xs sm:text-sm">
            <button
              onClick={onSelectPrev}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition border border-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Friend</span>
            </button>

            <span className="text-slate-400/80 text-[11px] hidden sm:inline">
              Use <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono">→</kbd> keys to browse
            </span>

            <button
              onClick={onSelectNext}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition border border-white/10 cursor-pointer"
            >
              <span>Next Friend</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

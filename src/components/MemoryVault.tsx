import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORY_PHOTOS, type MemoryPhoto } from '../data/lettersData';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Compass 
} from 'lucide-react';

export const MemoryVault: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  // Subtle resting rotations for organic floating keepsakes
  const restingRotations = [-1.5, 1.4, -1.2, 1.6, -1.3, 1.1, -1.6, 1.3];

  // Varied aspect ratios for organic polaroid & photo framing
  const aspectRatios = [
    'aspect-[4/3]',
    'aspect-[1/1]',
    'aspect-[3/2]',
    'aspect-[4/5]',
    'aspect-[1/1]',
    'aspect-[3/4]',
  ];

  // Distribute all photos dynamically across 3 staggered columns for an organic masonry layout
  const col1 = MEMORY_PHOTOS.filter((_, idx) => idx % 3 === 0);
  const col2 = MEMORY_PHOTOS.filter((_, idx) => idx % 3 === 1);
  const col3 = MEMORY_PHOTOS.filter((_, idx) => idx % 3 === 2);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const curIdx = MEMORY_PHOTOS.findIndex((m) => m.id === selectedPhoto.id);
        const nextIdx = (curIdx + 1) % MEMORY_PHOTOS.length;
        setSelectedPhoto(MEMORY_PHOTOS[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        const curIdx = MEMORY_PHOTOS.findIndex((m) => m.id === selectedPhoto.id);
        const prevIdx = (curIdx - 1 + MEMORY_PHOTOS.length) % MEMORY_PHOTOS.length;
        setSelectedPhoto(MEMORY_PHOTOS[prevIdx]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const curIdx = MEMORY_PHOTOS.findIndex((m) => m.id === selectedPhoto.id);
    const nextIdx = (curIdx + 1) % MEMORY_PHOTOS.length;
    setSelectedPhoto(MEMORY_PHOTOS[nextIdx]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    const curIdx = MEMORY_PHOTOS.findIndex((m) => m.id === selectedPhoto.id);
    const prevIdx = (curIdx - 1 + MEMORY_PHOTOS.length) % MEMORY_PHOTOS.length;
    setSelectedPhoto(MEMORY_PHOTOS[prevIdx]);
  };

  const renderPhotoCard = (photo: MemoryPhoto, originalIndex: number) => {
    const rotation = restingRotations[originalIndex % restingRotations.length];
    const aspect = aspectRatios[originalIndex % aspectRatios.length];

    return (
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.5, delay: (originalIndex % 3) * 0.08 }}
        style={{ rotate: `${rotation}deg` }}
        whileHover={{
          rotate: 0,
          y: -10,
          scale: 1.04,
          zIndex: 35,
          transition: { type: 'spring', stiffness: 350, damping: 22 },
        }}
        onClick={() => setSelectedPhoto(photo)}
        className="group relative cursor-pointer bg-slate-900/60 backdrop-blur-md p-2.5 sm:p-3 border border-white/10 hover:border-amber-400/40 rounded-2xl shadow-xl hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 overflow-hidden"
      >
        {/* Sheen sweep animation on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none transform -skew-x-12 z-20" />

        {/* Pure Image Container with Polaroid Framing */}
        <div className={`relative ${aspect} w-full rounded-xl overflow-hidden bg-slate-950 border border-white/5`}>
          <ImageWithFallback
            src={photo.imageUrl}
            alt="Memory Photo"
            fallbackName="Memory Photo"
            fallbackColor="#F59E0B"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            containerClassName="w-full h-full"
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="memories" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background Constellation Tether Lines */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 900"
          className="w-full h-full opacity-35"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="tetherStarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="1" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Faint Glowing Dashed Tether Lines connecting sky to photo gallery */}
          <line x1="200" y1="40" x2="350" y2="280" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.4" />
          <line x1="350" y1="280" x2="600" y2="180" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.35" />
          <line x1="600" y1="180" x2="880" y2="260" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.4" />
          <line x1="880" y1="260" x2="1050" y2="90" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />

          <line x1="350" y1="280" x2="220" y2="580" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
          <line x1="600" y1="180" x2="620" y2="520" stroke="#FDE68A" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.35" />
          <line x1="880" y1="260" x2="960" y2="620" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />

          {/* Intersecting Sky Nodes */}
          <circle cx="200" cy="40" r="4" fill="#FDE68A" />
          <circle cx="350" cy="280" r="5" fill="#FFF" />
          <circle cx="350" cy="280" r="14" fill="url(#tetherStarGlow)" />

          <circle cx="600" cy="180" r="6" fill="#FDE68A" />
          <circle cx="600" cy="180" r="18" fill="url(#tetherStarGlow)" />

          <circle cx="880" cy="260" r="5" fill="#FFF" />
          <circle cx="880" cy="260" r="14" fill="url(#tetherStarGlow)" />

          <circle cx="1050" cy="90" r="4" fill="#93C5FD" />
          <circle cx="620" cy="520" r="4" fill="#FDE68A" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Floating Keepsakes</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-celestial font-bold text-white tracking-wide">
          Memory Constellation & Photo Vault
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl font-sans-ui">
          Polaroids and keepsakes woven into the night sky. Tap any photo to enlarge.
        </p>
      </div>

      {/* Organic Masonry Layout (3 Staggered Columns with Resting Rotations) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {col1.map((photo) => {
            const originalIndex = MEMORY_PHOTOS.findIndex((m) => m.id === photo.id);
            return renderPhotoCard(photo, originalIndex);
          })}
        </div>

        {/* Column 2 (Staggered downward for natural organic feel) */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:mt-10">
          {col2.map((photo) => {
            const originalIndex = MEMORY_PHOTOS.findIndex((m) => m.id === photo.id);
            return renderPhotoCard(photo, originalIndex);
          })}
        </div>

        {/* Column 3 (Staggered upward/offset) */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:-mt-4">
          {col3.map((photo) => {
            const originalIndex = MEMORY_PHOTOS.findIndex((m) => m.id === photo.id);
            return renderPhotoCard(photo, originalIndex);
          })}
        </div>
      </div>

      {/* Enlarged Photo Lightbox (Fits comfortably within viewport, zero cutoff) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg cursor-pointer"
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 transition cursor-pointer hover:scale-105 shadow-2xl backdrop-blur-md"
              title="Close (Esc)"
              aria-label="Close photo"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrevPhoto}
              className="fixed left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 transition cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md"
              title="Previous Photo (←)"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextPhoto}
              className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-black/95 text-white border border-white/20 transition cursor-pointer hover:scale-110 shadow-2xl backdrop-blur-md"
              title="Next Photo (→)"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Pure Photo Modal Container (Guaranteed max-height & max-width so it is NEVER cut off) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-40 max-w-[90vw] max-h-[90vh] flex items-center justify-center select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={selectedPhoto.imageUrl}
                alt="Enlarged Memory Photo"
                fallbackName="Memory Photo"
                fallbackColor="#F59E0B"
                className="max-h-[85vh] max-w-[88vw] w-auto h-auto object-contain rounded-2xl shadow-2xl border border-white/15 bg-black/50"
                containerClassName="flex items-center justify-center"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { celestialSoundscape } from '../utils/celestialAudio';
import { 
  Sparkles, 
  Compass, 
  Camera, 
  Heart, 
  Volume2, 
  VolumeX, 
  Menu, 
  X 
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const muted = celestialSoundscape.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B14]/85 backdrop-blur-xl border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Title */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform shadow-md shadow-amber-950/30">
            <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <span className="font-celestial font-bold text-slate-100 text-base sm:text-lg tracking-wide group-hover:text-amber-200 transition-colors">
              Letters for Kak Caca
            </span>
            <span className="block text-[10px] font-sans tracking-widest text-slate-400 uppercase">
              The Constellation of Memories
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#constellation"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-amber-300 transition"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Constellation
          </a>

          <a
            href="#memories"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-amber-300 transition"
          >
            <Camera className="w-3.5 h-3.5 text-purple-400" />
            Photo Vault
          </a>

          <a
            href="#tribute"
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-300 hover:text-amber-300 transition"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            Tribute
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-amber-300 transition border border-white/10 cursor-pointer"
            title={isMuted ? "Unmute Celestial Audio" : "Mute Celestial Audio"}
            aria-label="Toggle celestial audio mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            Birthday Keepsake
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 text-slate-300 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080B14]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <a
            href="#constellation"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm text-slate-200 hover:text-amber-300 py-1"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Constellation Map
          </a>

          <a
            href="#memories"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm text-slate-200 hover:text-amber-300 py-1"
          >
            <Camera className="w-4 h-4 text-purple-400" />
            Memory Vault
          </a>

          <a
            href="#tribute"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-sm text-slate-200 hover:text-amber-300 py-1"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            Ensemble Tribute
          </a>
        </div>
      )}
    </header>
  );
};

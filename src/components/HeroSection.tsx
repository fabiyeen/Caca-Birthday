import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FRIEND_LETTERS } from '../data/lettersData';
import { celestialSoundscape } from '../utils/celestialAudio';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Compass, 
  Heart,
  Sliders,
  ChevronDown
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    const unsubscribe = celestialSoundscape.subscribe((state) => {
      setIsPlayingAudio(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleAudio = async () => {
    await celestialSoundscape.toggle();
  };

  const handleToggleMute = () => {
    celestialSoundscape.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    celestialSoundscape.setVolume(val);
  };

  const triggerBirthdayWish = () => {
    // Respect browser autoplay: smoothly trigger background track on user wish interaction
    if (!isPlayingAudio) {
      celestialSoundscape.play().catch(() => {});
    }

    // Multi-stage golden & celestial confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FDE68A', '#F59E0B', '#FEF3C7', '#A78BFA', '#38BDF8'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F59E0B', '#FDE68A', '#FFFFFF'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#FDE68A', '#FFFFFF'],
      });
    }, 250);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-12 overflow-hidden">
      {/* Background Ambient Glow & Nebula */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-amber-500/10 via-purple-600/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Floating Soundscape Controller */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#0D1122]/80 backdrop-blur-xl border border-white/10 shadow-xl"
      >
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 text-xs font-medium text-amber-200 hover:text-amber-100 transition cursor-pointer"
        >
          {isPlayingAudio ? (
            <Pause className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          )}
          <span>{isPlayingAudio ? "Pause Atmosphere" : "Play Background Music"}</span>
        </button>

        {/* Animated Soundwave Equalizer */}
        {isPlayingAudio && !isMuted && (
          <div className="flex items-end gap-0.5 h-3.5 px-1 py-0.5" title="Playing Yiruma - Reminiscent">
            <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-3" />
            <span className="w-0.5 bg-amber-300 rounded-full animate-pulse delay-75 h-2" />
            <span className="w-0.5 bg-amber-200 rounded-full animate-pulse delay-150 h-3.5" />
            <span className="w-0.5 bg-amber-400 rounded-full animate-pulse delay-100 h-1.5" />
          </div>
        )}

        <div className="h-3 w-px bg-white/15" />

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleToggleMute}
            className="p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="p-1 text-slate-400 hover:text-slate-200 transition cursor-pointer"
            title="Adjust Volume"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {showVolumeSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 accent-amber-400 h-1 bg-white/20 rounded cursor-pointer"
            />
          )}
        </div>
      </motion.div>

      {/* Center Cinematic Hero Typography */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Keepsake Birthday Tribute</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-celestial font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-amber-200/80 drop-shadow-sm leading-tight sm:leading-none"
        >
          To Kak Caca
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-2xl md:text-3xl font-serif-letter italic text-amber-200/90 mt-4 tracking-wide"
        >
          "Across Time, Space & Endless Stages"
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-300/90 max-w-2xl mt-6 font-sans-ui leading-relaxed"
        >
          From the late-night backstage huddles to the sweet moments of triumph and laughter, you have been our guiding constellation. Here are the letters, handwritten keepsakes, and timeless memories kept just for you.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a
            href="#constellation"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            Explore Constellation
          </a>

          <button
            onClick={triggerBirthdayWish}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
            Send Birthday Sparkles
          </button>
        </motion.div>

        {/* Highlight Stats Pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 pt-8 border-t border-white/10 w-full max-w-lg text-center"
        >
          <div>
            <div className="text-xl sm:text-2xl font-celestial font-bold text-amber-300">{FRIEND_LETTERS.length}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Friends' Stars</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-celestial font-bold text-purple-300">100%</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Pure Keepsake</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-celestial font-bold text-sky-300">∞</div >
            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Shared Smiles</div>
          </div>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.a
        href="#constellation"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="relative z-10 inline-flex flex-col items-center text-xs text-slate-400 hover:text-amber-300 transition mt-6 cursor-pointer"
      >
        <span className="text-[11px] tracking-widest uppercase mb-1">Scroll to Explore</span>
        <ChevronDown className="w-4 h-4 text-amber-400" />
      </motion.a>
    </section>
  );
};

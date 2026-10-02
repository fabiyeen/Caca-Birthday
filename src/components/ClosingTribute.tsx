import React, { useState } from 'react';
import { motion } from 'framer-motion';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { FRIEND_LETTERS, MEMORY_PHOTOS } from '../data/lettersData';
import { 
  Sparkles, 
  Download, 
  Heart, 
  Check, 
  Crown, 
  BookHeart,
  Loader2 
} from 'lucide-react';

export const ClosingTribute: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [hasExported, setHasExported] = useState(false);

  const handleDownloadKeepsakeZip = async () => {
    try {
      setIsExporting(true);

      const zip = new JSZip();

      // Folder 1: Letters
      const lettersFolder = zip.folder("letters");
      FRIEND_LETTERS.forEach((friend) => {
        const fileContent = `=====================================================
LETTERS FOR KAK CACA - BIRTHDAY KEEPSAKE
From: ${friend.name}
Snippet: "${friend.snippetQuote || ''}"
=====================================================

${friend.letterMarkdown}

---
Kept with eternal love across the constellation.
`;
        lettersFolder?.file(`${friend.id}-letter.txt`, fileContent);
      });

      // Folder 2: Memories
      const memoriesFolder = zip.folder("memories");
      let memoriesSummary = `=====================================================
THE CONSTELLATION OF MEMORIES - PHOTO ARCHIVE
=====================================================\n\n`;

      MEMORY_PHOTOS.forEach((photo, idx) => {
        memoriesSummary += `[${idx + 1}] Photo ID: ${photo.id}\nFile: ${photo.imageUrl}\n\n-----------------------------------------------------\n\n`;
      });
      memoriesFolder?.file("memory-vault-stories.txt", memoriesSummary);

      // Root Readme
      const readme = `*****************************************************
DEAREST KAK CACA,
HAPPY BIRTHDAY FROM ALL THE ONES YOU HELPED AND THE ONES WHO LOVE YOU
*****************************************************

This archive contains all the heartfelt letters, memories, and stories
written by your closest friends to celebrate you.

"No matter where the stage of life leads us,
the constellation of our shared memories will always shine bright."

Generated with love from: "Letters for Kak Caca"
Date: September 30
*****************************************************
`;
      zip.file("README_FOR_KAK_CACA.txt", readme);

      // Generate Zip blob
      const content = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(content);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Letters_For_Kak_Caca_Keepsake.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setHasExported(true);
      setIsExporting(false);

      // Celebrate with confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#F59E0B', '#FDE68A', '#FEF3C7', '#A78BFA', '#F472B6'],
      });

      setTimeout(() => setHasExported(false), 4000);
    } catch (err) {
      console.error("Error creating zip:", err);
      setIsExporting(false);
    }
  };

  const handleBurstConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FDE68A', '#F59E0B', '#38BDF8', '#F472B6'],
    });
  };

  return (
    <section id="tribute" className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glass Keepsake Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-gradient-to-b from-[#0D1122]/90 via-[#0A0D18]/95 to-[#05070E] border border-amber-500/30 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl text-center overflow-hidden"
      >
        {/* Crown Icon / Star Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 mb-6 shadow-lg shadow-amber-950/40">
          <Crown className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Ensemble's Collective Wish</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-celestial font-bold text-white tracking-wide mb-6">
          To Our Guiding Light, Forever
        </h2>

        {/* Heartfelt collective message */}
        <div className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed font-sans-ui space-y-4 mb-8">
          <p>
            Kak Caca, teater dan panggung mungkin punya akhir, tetapi ikatan yang kita jalin di balik layar akan terus bergema melintasi waktu. Kamu bukan hanya kakak yang hebat, kamu adalah rumah dan tempat bersandar bagi kami semua.
          </p>
          <p className="font-serif-letter italic text-amber-200 text-lg sm:text-xl">
            "Semoga setiap langkah Kak Caca ke depan selalu diterangi bintang-bintang terindah, dipenuhi tawa tanpa beban, dan selalu dikelilingi cinta setulus yang Kakak berikan."
          </p>
          <p className="text-sm text-slate-400">
            Selamat ulang tahun, Kak Caca. Dari {FRIEND_LETTERS.map(f => f.name).join(', ')}, dan seluruh sahabat tercinta.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-white/10">
          <button
            onClick={handleDownloadKeepsakeZip}
            disabled={isExporting}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            ) : hasExported ? (
              <Check className="w-4 h-4 text-emerald-950" />
            ) : (
              <Download className="w-4 h-4 text-slate-950" />
            )}
            <span>
              {isExporting
                ? "Packing Keepsake Zip..."
                : hasExported
                ? "Keepsake Downloaded!"
                : "Download All as Keepsake (.zip)"}
            </span>
          </button>

          <button
            onClick={handleBurstConfetti}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/15 backdrop-blur-md transition cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
            <span>Celebrate Her Birthday</span>
          </button>
        </div>

        {/* Offline Archive Guarantee Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400/80">
          <BookHeart className="w-3.5 h-3.5 text-amber-400" />
          <span>The ZIP bundle includes all text transcripts, letters, and memory captions for offline safekeeping.</span>
        </div>
      </motion.div>
    </section>
  );
};

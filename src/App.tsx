import { useState } from 'react';
import './App.css';
import { FRIEND_LETTERS, type FriendLetter } from './data/lettersData';
import { StarryCanvas } from './components/StarryCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConstellationMap } from './components/ConstellationMap';
import { MemoryVault } from './components/MemoryVault';
import { ClosingTribute } from './components/ClosingTribute';
import { Footer } from './components/Footer';
import { LetterReaderModal } from './components/LetterReaderModal';

function App() {
  const [selectedLetter, setSelectedLetter] = useState<FriendLetter | null>(null);

  const handleSelectLetter = (letter: FriendLetter) => {
    setSelectedLetter(letter);
  };

  const handleCloseModal = () => {
    setSelectedLetter(null);
  };

  const handleSelectNext = () => {
    if (!selectedLetter) return;
    const curIdx = FRIEND_LETTERS.findIndex((l) => l.id === selectedLetter.id);
    const nextIdx = (curIdx + 1) % FRIEND_LETTERS.length;
    setSelectedLetter(FRIEND_LETTERS[nextIdx]);
  };

  const handleSelectPrev = () => {
    if (!selectedLetter) return;
    const curIdx = FRIEND_LETTERS.findIndex((l) => l.id === selectedLetter.id);
    const prevIdx = (curIdx - 1 + FRIEND_LETTERS.length) % FRIEND_LETTERS.length;
    setSelectedLetter(FRIEND_LETTERS[prevIdx]);
  };

  return (
    <div className="relative min-h-screen bg-[#080B14] text-[#E2E8F0] overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic Starfield Canvas Background */}
      <StarryCanvas />

      {/* Subtle Ambient Cosmic Background Image Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen z-0"
        style={{ backgroundImage: `url('/photos/celestial_bg.jpg')` }}
      />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Hero & Ambient Greeting */}
        <HeroSection />

        {/* Section A: The Interactive Constellation Map & Archive List */}
        <ConstellationMap onSelectLetter={handleSelectLetter} />

        {/* Section C: Memory Constellation / Photo Vault */}
        <MemoryVault />

        {/* Section D: Closing Ensemble Tribute & Offline Keepsake */}
        <ClosingTribute />
      </main>

      {/* Footer */}
      <Footer />

      {/* Section B: The Letter Reader Modal (Interactive PDF Canvas + Formatted Text) */}
      <LetterReaderModal
        letter={selectedLetter}
        onClose={handleCloseModal}
        onSelectNext={handleSelectNext}
        onSelectPrev={handleSelectPrev}
      />
    </div>
  );
}

export default App;

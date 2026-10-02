import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRIEND_LETTERS, CONSTELLATION_LINKS, type FriendLetter } from '../data/lettersData';
import { 
  Sparkles, 
  Map as MapIcon, 
  LayoutGrid, 
  BookOpen, 
  ArrowRight, 
  Clock,
  Compass,
  Search,
  X
} from 'lucide-react';

interface ConstellationMapProps {
  onSelectLetter: (letter: FriendLetter) => void;
}

export const ConstellationMap: React.FC<ConstellationMapProps> = ({ onSelectLetter }) => {
  const [hoveredLetter, setHoveredLetter] = useState<FriendLetter | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter letters for Archive List view
  const filteredFriends = FRIEND_LETTERS.filter((friend) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      !query ||
      friend.name.toLowerCase().includes(query) ||
      (friend.snippetQuote || '').toLowerCase().includes(query) ||
      (friend.letterMarkdown || '').toLowerCase().includes(query)
    );
  });

  // Calculate coordinates on a 1000x650 SVG viewbox
  const getCoords = (coords: { x: number; y: number }) => {
    return {
      x: (coords.x / 100) * 1000,
      y: (coords.y / 100) * 650,
    };
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section id="constellation" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '18s' }} />
            <span>Interactive Celestial Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-celestial font-bold text-white tracking-wide">
            The Constellation of Memories
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans-ui">
            Each radiant star is a friend connected across shared circles. Hover or tap any star to open their letter.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0D1122]/80 backdrop-blur-md border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'map'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Constellation Map</span>
            <span className="sm:hidden">Map</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Archive List</span>
            <span className="sm:hidden">List</span>
          </button>
        </div>
      </div>

      {/* Primary Constellation Map View */}
      {viewMode === 'map' && (
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#0D1122]/80 via-[#080B14]/90 to-[#05070E] border border-white/10 backdrop-blur-xl shadow-2xl p-4 sm:p-8">
          {/* Subtle Ambient Grid Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Desktop/Tablet Interactive Canvas Map */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[460px] flex items-center justify-center">
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Luminous line gradient */}
                <linearGradient id="constellationLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.35" />
                </linearGradient>

                {/* Star Glow Filter */}
                <filter id="starGlowEffect" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Connecting Constellation Lines */}
              <g className="transition-opacity duration-500">
                {CONSTELLATION_LINKS.map(([fromId, toId], idx) => {
                  const fromNode = FRIEND_LETTERS.find((l) => l.id === fromId);
                  const toNode = FRIEND_LETTERS.find((l) => l.id === toId);
                  if (!fromNode || !toNode) return null;

                  const p1 = getCoords(fromNode.constellationCoords);
                  const p2 = getCoords(toNode.constellationCoords);

                  const isHighlighted =
                    hoveredLetter &&
                    (hoveredLetter.id === fromId || hoveredLetter.id === toId);

                  return (
                    <g key={`link-${idx}`}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={isHighlighted ? "#FDE68A" : "url(#constellationLineGrad)"}
                        strokeWidth={isHighlighted ? 2.4 : 1.2}
                        className="transition-all duration-300"
                        opacity={isHighlighted ? 0.95 : 0.4}
                      />
                      {isHighlighted && (
                        <circle r="2.5" fill="#FDE68A">
                          <animateMotion
                            path={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
                            dur="3s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Star Nodes */}
              {FRIEND_LETTERS.map((friend) => {
                const { x, y } = getCoords(friend.constellationCoords);
                const isHovered = hoveredLetter?.id === friend.id;
                const starColor = friend.colorAccent || '#F59E0B';

                return (
                  <g
                    key={friend.id}
                    className="cursor-pointer group"
                    onClick={() => onSelectLetter(friend)}
                    onMouseEnter={() => setHoveredLetter(friend)}
                    onMouseLeave={() => setHoveredLetter(null)}
                  >
                    {/* Outer radiant pulse rings */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 38 : 26}
                      fill={starColor}
                      opacity={isHovered ? 0.25 : 0.08}
                      className="transition-all duration-300"
                    />

                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 24 : 16}
                      fill={starColor}
                      opacity={isHovered ? 0.4 : 0.2}
                      className="transition-all duration-300 animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Central Core Star Node */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 10 : 7}
                      fill="#FFFFFF"
                      stroke={starColor}
                      strokeWidth={isHovered ? 3 : 2}
                      filter="url(#starGlowEffect)"
                      className="transition-all duration-200"
                    />

                    {/* Four-point twinkle spikes on hover */}
                    {isHovered && (
                      <g className="transition-opacity duration-300">
                        <line x1={x - 22} y1={y} x2={x + 22} y2={y} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" />
                        <line x1={x} y1={y - 22} x2={x} y2={y + 22} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.85" />
                      </g>
                    )}

                    {/* Label below node */}
                    <text
                      x={x}
                      y={y + 32}
                      textAnchor="middle"
                      className="text-[13px] font-celestial font-semibold tracking-wider fill-slate-200 group-hover:fill-amber-300 transition-colors pointer-events-none drop-shadow"
                    >
                      {friend.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Floating Letter Preview Card */}
            <AnimatePresence>
              {hoveredLetter && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-md p-4 rounded-2xl bg-[#0D1122]/95 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-amber-950/40 pointer-events-none sm:pointer-events-auto"
                >
                  <div className="flex items-start gap-3.5">
                    <div 
                      className="relative shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-[#030712] border border-amber-500/40 flex items-center justify-center shadow-md shadow-black/50"
                      style={{ borderColor: hoveredLetter.colorAccent ? `${hoveredLetter.colorAccent}70` : undefined }}
                    >
                      <span className="font-celestial font-bold text-base text-amber-200">
                        {hoveredLetter.name.charAt(0)}
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute -top-1 -right-1" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h4 className="font-celestial font-bold text-amber-100 text-base truncate">
                          {hoveredLetter.name}
                        </h4>
                      </div>
                      <p className="text-xs text-amber-200/90 italic font-serif-letter line-clamp-2">
                        "{hoveredLetter.snippetQuote}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Handwritten & Formatted
                    </span>
                    <button
                      onClick={() => onSelectLetter(hoveredLetter)}
                      className="inline-flex items-center gap-1 text-amber-300 font-medium hover:text-amber-200 cursor-pointer pointer-events-auto"
                    >
                      Open Letter <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Footer Helper */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center text-xs text-slate-400">
            <p className="text-slate-400/90 italic text-xs text-center flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tip: Click any star to view their original letter and keepsake PDF.
            </p>
          </div>
        </div>
      )}

      {/* Archive List View with Search & Cluster Filter */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Search Bar & Stats */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1122]/70 backdrop-blur-md border border-white/10">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search friend by name or message..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-amber-400/60 focus:outline-none text-sm text-slate-100 placeholder:text-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white transition cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count pill */}
            <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-center shrink-0">
              Showing <span className="text-amber-300 font-semibold">{filteredFriends.length}</span> of {FRIEND_LETTERS.length} stars
            </span>
          </div>

          {/* Cards Grid */}
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectLetter(friend)}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0D1122]/80 backdrop-blur-md border border-white/10 hover:border-amber-500/40 transition-all shadow-xl hover:shadow-amber-950/30 cursor-pointer overflow-hidden"
                >
                  {/* Subtle top glow */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                    style={{ background: friend.colorAccent || '#F59E0B' }}
                  />

                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div 
                        className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-[#030712] border border-amber-500/35 flex items-center justify-center shadow-md shrink-0 group-hover:border-amber-400/60 group-hover:shadow-amber-500/20 transition-all"
                        style={{ borderColor: friend.colorAccent ? `${friend.colorAccent}50` : undefined }}
                      >
                        <span className="font-celestial font-bold text-base text-amber-200">
                          {friend.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-celestial font-bold text-slate-100 group-hover:text-amber-200 transition-colors">
                          {friend.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-amber-200/90 italic font-serif-letter leading-relaxed line-clamp-3 mb-4 pl-3 border-l-2 border-amber-500/30">
                      "{friend.snippetQuote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Read Letter</span>
                      {friend.originalMedia && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {friend.originalMedia.type === 'image' ? 'Keepsake Photo' : 'Handwritten PDF'}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1 text-amber-300 font-medium group-hover:translate-x-1 transition-transform">
                      Open <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#0D1122]/60 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-celestial font-semibold text-lg text-slate-200 mb-1">
                No stars found matching "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Try searching for another friend's name, or clear the search input.
              </p>
              <button
                onClick={clearSearch}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs font-medium transition cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

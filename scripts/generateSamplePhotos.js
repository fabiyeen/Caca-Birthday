import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photosDir = path.join(__dirname, '..', 'public', 'photos');
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

// Generate pure artistic photography-style SVGs without any text or titles
function createArtisticPhotoSvg(type, primaryColor, secondaryColor, accentColor) {
  let contentSvg = '';

  if (type === 'stage_silhouettes') {
    // Stage ensemble with warm spotlight beams & starry haze
    contentSvg = `
      <defs>
        <linearGradient id="spot1" x1="0%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="${secondaryColor}" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="spot2" x1="100%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- Beams -->
      <polygon points="50,0 200,0 350,400 0,400" fill="url(#spot1)" />
      <polygon points="400,0 550,0 600,400 250,400" fill="url(#spot2)" />
      <!-- Starry dust -->
      <circle cx="120" cy="140" r="2.5" fill="#FFF" opacity="0.8" />
      <circle cx="280" cy="90" r="2" fill="#FDE68A" opacity="0.9" />
      <circle cx="450" cy="180" r="3" fill="#FFF" opacity="0.7" />
      <circle cx="320" cy="220" r="1.5" fill="#FDE68A" opacity="0.8" />
      <circle cx="180" cy="260" r="2" fill="#FFF" opacity="0.6" />
      <!-- Stage floor -->
      <ellipse cx="300" cy="380" rx="350" ry="80" fill="#05070E" opacity="0.95" />
      <!-- Silhouettes of ensemble members -->
      <path d="M120,380 C120,330 140,320 150,300 C155,290 150,270 160,265 C170,265 175,285 180,300 C190,320 210,330 210,380 Z" fill="#080B14"/>
      <circle cx="165" cy="255" r="14" fill="#080B14" />

      <path d="M250,380 C250,320 275,305 285,285 C290,275 285,255 295,250 C305,250 310,270 315,285 C325,305 350,320 350,380 Z" fill="#080B14"/>
      <circle cx="300" cy="240" r="16" fill="#080B14" />

      <path d="M390,380 C390,330 410,320 420,300 C425,290 420,270 430,265 C440,265 445,285 450,300 C460,320 480,330 480,380 Z" fill="#080B14"/>
      <circle cx="435" cy="255" r="14" fill="#080B14" />
      <circle cx="300" cy="240" r="18" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.5" />
    `;
  } else if (type === 'theatre_curtain') {
    // Elegant velvet curtains & golden sparkles
    contentSvg = `
      <defs>
        <radialGradient id="stageGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.7"/>
          <stop offset="60%" stop-color="${primaryColor}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#05070E" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#stageGlow)" />
      <!-- Drapes on sides -->
      <path d="M0,0 Q60,200 0,400 L80,400 Q130,200 80,0 Z" fill="#150B24" opacity="0.9"/>
      <path d="M600,0 Q540,200 600,400 L520,400 Q470,200 520,0 Z" fill="#150B24" opacity="0.9"/>
      <!-- Hanging celestial chandelier / star cluster -->
      <circle cx="300" cy="120" r="6" fill="#FFF" />
      <line x1="300" y1="0" x2="300" y2="120" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="2 3"/>
      <circle cx="270" cy="140" r="4" fill="${secondaryColor}" />
      <line x1="270" y1="0" x2="270" y2="140" stroke="${secondaryColor}" stroke-width="1" stroke-dasharray="2 3"/>
      <circle cx="330" cy="140" r="4" fill="${secondaryColor}" />
      <line x1="330" y1="0" x2="330" y2="140" stroke="${secondaryColor}" stroke-width="1" stroke-dasharray="2 3"/>
      <!-- Star sparks -->
      <polygon points="300,105 304,116 315,120 304,124 300,135 296,124 285,120 296,116" fill="#FFF" />
      <polygon points="180,220 183,228 191,231 183,234 180,242 177,234 169,231 177,228" fill="${secondaryColor}" opacity="0.9"/>
      <polygon points="420,210 423,218 431,221 423,224 420,232 417,224 409,221 417,218" fill="${accentColor}" opacity="0.9"/>
    `;
  } else if (type === 'night_cafe') {
    // Warm cafe window, cups, late-night starry atmosphere
    contentSvg = `
      <defs>
        <radialGradient id="lampGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="${primaryColor}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#04060C" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#lampGlow)" />
      <!-- Lamp fixture -->
      <path d="M260,70 L340,70 L360,110 L240,110 Z" fill="#0F172A" stroke="${secondaryColor}" stroke-width="1.5"/>
      <line x1="300" y1="0" x2="300" y2="70" stroke="${secondaryColor}" stroke-width="2"/>
      <circle cx="300" cy="115" r="10" fill="#FFF" opacity="0.95"/>
      <!-- Table surface -->
      <ellipse cx="300" cy="360" rx="280" ry="90" fill="#0A0E1A" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <!-- Coffee cups with steam -->
      <rect x="220" y="300" width="36" height="42" rx="4" fill="#1E293B" stroke="${secondaryColor}" stroke-width="1.5"/>
      <path d="M256,310 C266,310 266,330 256,330" fill="none" stroke="${secondaryColor}" stroke-width="2"/>
      <path d="M232,295 Q235,280 230,270" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.6"/>
      <path d="M242,295 Q245,280 240,270" fill="none" stroke="${secondaryColor}" stroke-width="1.5" opacity="0.6"/>

      <rect x="330" y="300" width="36" height="42" rx="4" fill="#1E293B" stroke="${accentColor}" stroke-width="1.5"/>
      <path d="M366,310 C376,310 376,330 366,330" fill="none" stroke="${accentColor}" stroke-width="2"/>
      <path d="M342,295 Q345,280 340,270" fill="none" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
    `;
  } else if (type === 'rooftop_sunset') {
    // Rooftop skyline with golden sky & celestial twilight
    contentSvg = `
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#080B14"/>
          <stop offset="40%" stop-color="#1E1B4B"/>
          <stop offset="70%" stop-color="${primaryColor}"/>
          <stop offset="90%" stop-color="${secondaryColor}"/>
          <stop offset="100%" stop-color="${accentColor}"/>
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#skyGrad)" />
      <!-- Starry sky on top half -->
      <circle cx="80" cy="50" r="1.5" fill="#FFF" />
      <circle cx="220" cy="30" r="2" fill="#FDE68A" />
      <circle cx="390" cy="60" r="1.5" fill="#FFF" />
      <circle cx="510" cy="40" r="2" fill="#FFF" />
      <circle cx="480" cy="80" r="1.5" fill="#FDE68A" />
      <!-- Crescent Moon -->
      <path d="M120,40 A18,18 0 0,0 134,68 A15,15 0 1,1 120,40 Z" fill="#FDE68A" />
      <!-- Skyline silhouette -->
      <rect x="40" y="240" width="45" height="160" fill="#060810" />
      <rect x="100" y="210" width="60" height="190" fill="#05070E" />
      <rect x="180" y="260" width="50" height="140" fill="#070A12" />
      <rect x="250" y="190" width="70" height="210" fill="#04060C" />
      <rect x="340" y="230" width="55" height="170" fill="#060810" />
      <rect x="415" y="200" width="65" height="200" fill="#05070E" />
      <rect x="500" y="250" width="70" height="150" fill="#070A12" />
      <!-- Windows glow -->
      <circle cx="120" cy="240" r="2" fill="${secondaryColor}" opacity="0.8"/>
      <circle cx="275" cy="220" r="2" fill="${secondaryColor}" opacity="0.8"/>
      <circle cx="435" cy="230" r="2" fill="${secondaryColor}" opacity="0.8"/>
      <!-- Rooftop railing foreground -->
      <line x1="0" y1="360" x2="600" y2="360" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
      <line x1="0" y1="380" x2="600" y2="380" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <line x1="100" y1="360" x2="100" y2="400" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <line x1="250" y1="360" x2="250" y2="400" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <line x1="400" y1="360" x2="400" y2="400" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <line x1="550" y1="360" x2="550" y2="400" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    `;
  } else {
    // Starry constellation nebula dreamscape
    contentSvg = `
      <defs>
        <radialGradient id="nebulaCore" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="${secondaryColor}" stop-opacity="0.8"/>
          <stop offset="40%" stop-color="${primaryColor}" stop-opacity="0.5"/>
          <stop offset="80%" stop-color="#0E1326" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#04060C" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#nebulaCore)" />
      <!-- Starry constellation points & lines -->
      <line x1="120" y1="200" x2="220" y2="120" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
      <line x1="220" y1="120" x2="360" y2="160" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
      <line x1="360" y1="160" x2="460" y2="240" stroke="${secondaryColor}" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
      <line x1="220" y1="120" x2="300" y2="280" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>
      <line x1="300" y1="280" x2="460" y2="240" stroke="${accentColor}" stroke-width="1.5" opacity="0.6"/>

      <circle cx="120" cy="200" r="5" fill="#FFF" />
      <circle cx="220" cy="120" r="7" fill="#FDE68A" />
      <circle cx="360" cy="160" r="6" fill="#FFF" />
      <circle cx="460" cy="240" r="5" fill="#FDE68A" />
      <circle cx="300" cy="280" r="7" fill="#FFF" />
      <!-- Glowing halo around main star -->
      <circle cx="220" cy="120" r="18" fill="${secondaryColor}" opacity="0.25" />
      <circle cx="300" cy="280" r="18" fill="${accentColor}" opacity="0.25" />
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#080B14"/>
  ${contentSvg}
</svg>`;
}

const photoConfigs = [
  // Avatars (clean portraits, no text)
  { file: 'fabian-avatar.svg', type: 'stage_silhouettes', p: '#1E293B', s: '#F59E0B', a: '#FDE68A' },
  { file: 'nadia-avatar.svg', type: 'theatre_curtain', p: '#1E1B4B', s: '#EC4899', a: '#F472B6' },
  { file: 'aris-avatar.svg', type: 'theatre_curtain', p: '#312E81', s: '#EAB308', a: '#FDE68A' },
  { file: 'tasya-avatar.svg', type: 'night_cafe', p: '#0F172A', s: '#06B6D4', a: '#38BDF8' },
  { file: 'dion-avatar.svg', type: 'stage_silhouettes', p: '#1E293B', s: '#8B5CF6', a: '#A78BFA' },
  { file: 'maya-avatar.svg', type: 'rooftop_sunset', p: '#172554', s: '#F43F5E', a: '#FB7185' },

  // Memories with Caca (no text)
  { file: 'caca-fabian-stage.svg', type: 'stage_silhouettes', p: '#1E293B', s: '#F59E0B', a: '#FDE68A' },
  { file: 'caca-nadia-backstage.svg', type: 'theatre_curtain', p: '#2E1065', s: '#EC4899', a: '#F472B6' },
  { file: 'caca-aris-wonka.svg', type: 'theatre_curtain', p: '#3730A3', s: '#EAB308', a: '#FDE68A' },
  { file: 'caca-tasya-cafe.svg', type: 'night_cafe', p: '#090D16', s: '#06B6D4', a: '#38BDF8' },
  { file: 'caca-dion-music.svg', type: 'stage_silhouettes', p: '#1E1B4B', s: '#8B5CF6', a: '#A78BFA' },
  { file: 'caca-maya-sunset.svg', type: 'rooftop_sunset', p: '#172554', s: '#F43F5E', a: '#FB7185' },

  // Memory Vault Gallery (PURE PICTURES, zero text)
  { file: 'memory-agrabah-crew.svg', type: 'stage_silhouettes', p: '#312E81', s: '#F59E0B', a: '#FDE68A' },
  { file: 'memory-wonka-premiere.svg', type: 'theatre_curtain', p: '#4C1D95', s: '#EAB308', a: '#FBBF24' },
  { file: 'memory-midnight-rehearsal.svg', type: 'night_cafe', p: '#0F172A', s: '#06B6D4', a: '#38BDF8' },
  { file: 'memory-cafe-laughter.svg', type: 'night_cafe', p: '#1E293B', s: '#EC4899', a: '#F472B6' },
  { file: 'memory-golden-hour.svg', type: 'rooftop_sunset', p: '#1E1B4B', s: '#F59E0B', a: '#F97316' },
  { file: 'memory-backstage-magic.svg', type: 'theatre_curtain', p: '#080B14', s: '#A855F7', a: '#E2E8F0' },
];

for (const item of photoConfigs) {
  const content = createArtisticPhotoSvg(item.type, item.p, item.s, item.a);
  fs.writeFileSync(path.join(photosDir, item.file), content);
  console.log(`Saved pure photo: ${item.file}`);
}

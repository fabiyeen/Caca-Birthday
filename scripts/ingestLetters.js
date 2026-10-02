import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lettersDir = path.join(__dirname, '..', 'public', 'letters');
const photosDir = path.join(__dirname, '..', 'public', 'photos');
const outputDataFile = path.join(__dirname, '..', 'src', 'data', 'lettersData.ts');

if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

// Curated colors and quotes for each friend (no groupings, no personal descriptions)
const KNOWN_DATA = {
  'fabian': {
    name: 'Fabian',
    color: '#EAB308',
    quote: "You are one of the reasons I’m still here in this world. You were there for me at my lowest... You inspired me to stay strong, kind, and honest and never give up."
  },
  'ci-jane': {
    name: 'Ci Jane',
    color: '#F59E0B',
    quote: "Selama aku kenal sama kamu, aku tau kamu orangnya ga fake sama sekali! Like honestly ga semua orang bisa punya that kind and genuine heart like yours."
  },
  'clea': {
    name: 'Clea',
    color: '#EC4899',
    quote: "Kak Caca punya kemampuan untuk bikin orang merasa nyaman jadi dirinya sendiri. Kak Caca ceria, random, dan membuat momen biasa jadi nggak terasa terlalu biasa."
  },
  'palen': {
    name: 'Palen',
    color: '#38BDF8',
    quote: "Kak Caca, you may not know tp aku bnrn regen krn Kak Caca... I'm extra, really, very, extremely, ultra grateful that you are my friend and my sister."
  },
  'rara': {
    name: 'Rara',
    color: '#EC4899',
    quote: "You meant so much simply because you were there... someone I could be completely myself around, and someone who turned ordinary days into memories."
  },
  'shena': {
    name: 'Shena',
    color: '#EAB308',
    quote: "You didn’t really have to involve yourself, but you chose to care anyway. Aku bersyukur bisa bertemu dengan seseorang yang bisa show me what true kindness can look like."
  },
  'ason': {
    name: 'Ason',
    color: '#38BDF8',
    quote: "Cuman mau say thank you udah temenan 10 tahun ini. Thank you udah kenalin gua ke Nat, semoga lu bisa cepet dapat jodoh. Thank you sudah mendengarkan curhatan gua dari awal kita kenal."
  },
  'bima': {
    name: 'Bima',
    color: '#F59E0B',
    quote: "Lu salah satu cewek yang gua bisa percaya kalo gua di tempat yang aman buat cerita... Thank you for hijacking my existential crisis."
  },
  'diana': {
    name: 'Diana',
    color: '#FB7185',
    quote: "Mungkin aku ga pernah bilang tapi aku tuh banyak belajar dari kamu... super caring ke orang lain padahal tingkahnya suka kayak bocil. Chacha tuh orang yang kalo gaada dia ya jadi sepi gitu lhoo."
  },
  'husen': {
    name: 'Husen',
    color: '#10B981',
    quote: "You’re the kind of person yang fun buat diajak hangout, tapi at the same time nggak pernah terasa melelahkan... being a good friend doesn’t always mean doing something extraordinary. Sometimes, you just being you was enough."
  },
  'jes': {
    name: 'Jes',
    color: '#A855F7',
    quote: "Ci Cha tuh salah satu orang yang bener-bener bawa warna... Jiwa Ci Cha tuh polos dan ceria banget. Kayak di mana pun Ci Cha ada, pasti ada aja sesuatu yang bikin suasana jadi cair."
  },
  'ka-echa': {
    name: 'Ka Echa',
    color: '#F97316',
    quote: "Caca itu gak pelit sama sekali dan gak pernah pamrih, semua materi dan perhatian yang diberikan sama kamu, kamu gak meminta imbalan... aku sebagai temen kamu bangga dan itu bisa jadi hal yang menginspirasi."
  },
  'ka-pier': {
    name: 'Ka Pier',
    color: '#6366F1',
    quote: "Intinya adalah saya bersyukur punya teman yg baik bgt dan sangat outgoing... kekurangan lu merupakan kekuatan anda dimana anda bisa bawa santai segala hal dan bikin orang cair."
  },
  'mui': {
    name: 'Mui',
    color: '#14B8A6',
    quote: "Dihari ke 26 ni, terima kasih selalu menjadi orang yang baik. Pas tu aku masuk rumah sakit kamu mau bantu jaga sama rawat aku, makasi ya... Terima kasih sudah pernah hadir di dunia ini."
  },
  'suci': {
    name: 'Suci',
    color: '#F59E0B',
    quote: "Mulai dari awal aja kamu udah ngalah sama aku jadinya aku bisa visual, terus ngebantuin bikinnya juga... Jadi tanpa kamu sadar Cak kamu meng-inspire aku buat out of the box!"
  }
};

function formatNameFromFilename(filename) {
  const base = filename.replace(/\.pdf$/i, '').trim();
  return base
    .split(/[\s_-]+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function sanitizeId(filename) {
  return filename
    .replace(/\.pdf$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function cleanPdfText(rawText) {
  const paragraphs = rawText
    .split(/\n{2,}/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);

  return paragraphs.join('\n\n');
}

function extractSnippet(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const emotionalKeywords = ['grateful', 'bersyukur', 'love', 'sayang', 'friend', 'sahabat', 'kindness', 'kebaikan', 'remember', 'ingat', 'berarti', 'always', 'selalu', 'terima kasih'];
  
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length >= 45 && trimmed.length <= 180) {
      const lower = trimmed.toLowerCase();
      if (emotionalKeywords.some(k => lower.includes(k))) {
        return trimmed;
      }
    }
  }

  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.length >= 40 && trimmed.length <= 160) {
      return trimmed;
    }
  }

  return sentences[0]?.trim().slice(0, 140) + '...' || "A heartfelt birthday keepsake for Kak Caca.";
}

// Find matching original keepsake file (image or pdf)
function findOriginalMedia(filename, allFiles) {
  const nameWithoutExt = filename.replace(/\.pdf$/i, '').trim();
  const coreKey = nameWithoutExt.toLowerCase().replace(/^(kak|ci|ka)\s+/i, '').trim();
  
  for (const f of allFiles) {
    const lower = f.toLowerCase();
    if (!lower.includes('original')) continue;

    const matchCore = lower.includes(coreKey);
    const matchFull = lower.includes(nameWithoutExt.toLowerCase());

    if (matchCore || matchFull) {
      const ext = path.extname(f).toLowerCase();
      const isPdf = ext === '.pdf';
      const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext);

      if (isPdf || isImage) {
        return {
          type: isPdf ? 'pdf' : 'image',
          url: `/letters/${encodeURIComponent(f)}`
        };
      }
    }
  }

  return null;
}

function ensureAvatarSvg(id, displayName, colorAccent) {
  const avatarPath = path.join(photosDir, `${id}-avatar.svg`);
  if (fs.existsSync(avatarPath)) return;

  const initials = displayName
    .split(/\s+/)
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <radialGradient id="grad_${id}" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${colorAccent}" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#0F172A" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#030712" stop-opacity="1"/>
    </radialGradient>
    <filter id="glow_${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="200" height="200" rx="36" fill="url(#grad_${id})"/>
  <circle cx="100" cy="100" r="76" fill="none" stroke="${colorAccent}" stroke-width="1.8" stroke-dasharray="6 4" opacity="0.45"/>
  <circle cx="100" cy="100" r="62" fill="none" stroke="${colorAccent}" stroke-width="1" opacity="0.25"/>
  <circle cx="100" cy="100" r="46" fill="${colorAccent}" fill-opacity="0.1" filter="url(#glow_${id})"/>
  <text x="100" y="112" font-family="'Cinzel', 'Outfit', serif" font-size="34" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
    ${initials}
  </text>
  <circle cx="44" cy="50" r="2.5" fill="${colorAccent}" opacity="0.8"/>
  <circle cx="156" cy="148" r="2" fill="${colorAccent}" opacity="0.7"/>
  <circle cx="150" cy="46" r="1.5" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="50" cy="154" r="1.8" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

  fs.writeFileSync(avatarPath, svg, 'utf-8');
}

// Balanced coordinates across the midnight sky
const CONSTELLATION_COORDINATES = {
  'clea': { x: 20.0, y: 22.0 },
  'jes': { x: 32.0, y: 24.0 },
  'ka-pier': { x: 18.0, y: 36.0 },
  'ka-echa': { x: 30.0, y: 40.0 },
  'palen': { x: 24.0, y: 50.0 },

  'fabian': { x: 68.0, y: 22.0 },
  'suci': { x: 80.0, y: 24.0 },
  'diana': { x: 82.0, y: 38.0 },
  'husen': { x: 70.0, y: 40.0 },
  'rara': { x: 76.0, y: 52.0 },

  'ason': { x: 36.0, y: 68.0 },
  'bima': { x: 48.0, y: 62.0 },
  'ci-jane': { x: 62.0, y: 66.0 },
  'mui': { x: 42.0, y: 79.0 },
  'shena': { x: 58.0, y: 80.0 }
};

async function ingestAllLetters() {
  console.log('Scanning public/letters for PDF letters and original keepsakes...');
  const allLetterFiles = fs.readdirSync(lettersDir);
  
  // Clean PDF letters (excluding *original*)
  const cleanPdfFiles = allLetterFiles
    .filter(f => f.toLowerCase().endsWith('.pdf') && !f.toLowerCase().includes('original'))
    .sort();

  console.log(`Found ${cleanPdfFiles.length} clean PDF letters:`, cleanPdfFiles);

  const friends = [];

  for (const filename of cleanPdfFiles) {
    const rawDisplayName = formatNameFromFilename(filename);
    const id = sanitizeId(filename);
    const known = KNOWN_DATA[id] || {};

    const displayName = known.name || rawDisplayName;
    const colorAccent = known.color || '#F59E0B';

    // Read and parse PDF text
    const filePath = path.join(lettersDir, filename);
    const fileData = new Uint8Array(fs.readFileSync(filePath));
    const doc = await pdfjs.getDocument({ data: fileData }).promise;

    let fullText = '';
    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
      const page = await doc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageString = textContent.items.map(item => item.str).join(' ');
      fullText += pageString + '\n\n';
    }

    const cleanedText = cleanPdfText(fullText);
    const letterMarkdown = `### Dearest Kak Caca,\n\n${cleanedText}`;
    const snippetQuote = known.quote || extractSnippet(cleanedText);

    // Look for matching original keepsake file (image or pdf)
    const originalMedia = findOriginalMedia(filename, allLetterFiles);

    // Coords
    const constellationCoords = CONSTELLATION_COORDINATES[id] || {
      x: 50 + (Math.sin(friends.length) * 25),
      y: 50 + (Math.cos(friends.length) * 25)
    };

    // Ensure fallback avatar exists
    ensureAvatarSvg(id, displayName, colorAccent);

    const friendEntry = {
      id,
      name: displayName,
      avatarUrl: `/photos/${id}-avatar.svg`,
      photoWithCaca: `/photos/caca-${id}.svg`,
      constellationCoords,
      snippetQuote,
      letterMarkdown,
      pdfUrl: `/letters/${encodeURIComponent(filename)}`,
      ...(originalMedia ? { originalMedia } : {}),
      colorAccent
    };

    friends.push(friendEntry);
    console.log(`Ingested: ${displayName} (Original: ${originalMedia ? `${originalMedia.type} - ${originalMedia.url}` : 'None (fallback to PDF)'})`);
  }

  // Constellation links connecting all stars into a harmonious celestial net
  const links = [
    ['clea', 'jes'],
    ['clea', 'ka-pier'],
    ['jes', 'ka-echa'],
    ['ka-pier', 'ka-echa'],
    ['ka-pier', 'palen'],
    ['ka-echa', 'palen'],

    ['fabian', 'suci'],
    ['fabian', 'husen'],
    ['suci', 'diana'],
    ['husen', 'diana'],
    ['husen', 'rara'],
    ['diana', 'rara'],

    ['ason', 'bima'],
    ['bima', 'ci-jane'],
    ['ason', 'mui'],
    ['ci-jane', 'shena'],
    ['mui', 'shena'],
    ['bima', 'shena'],

    ['jes', 'fabian'],
    ['palen', 'ason'],
    ['rara', 'ci-jane'],
    ['ka-echa', 'bima'],
    ['husen', 'bima']
  ];

  // Scan public/photos for all valid image files (.jpg, .jpeg, .png)
  const photosDir = path.join(__dirname, '../public/photos');
  const photoFiles = fs.readdirSync(photosDir);
  const memoryPhotos = [];

  photoFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext) && file.toLowerCase() !== 'celestial_bg.jpg') {
      const baseName = path.basename(file, path.extname(file))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      memoryPhotos.push({
        id: baseName,
        imageUrl: `/photos/${encodeURIComponent(file)}`
      });
    }
  });

  // Write TypeScript dataset file
  const tsContent = `export interface FriendLetter {
  id: string;
  name: string;
  nickname?: string;
  avatarUrl?: string;
  photoWithCaca?: string;
  constellationCoords: { x: number; y: number };
  snippetQuote: string;
  letterMarkdown: string; // Formatted text extracted from [name].pdf
  pdfUrl?: string; // Formatted PDF path
  originalMedia?: {
    type: "pdf" | "image";
    url: string; // Path to original file (e.g., "/letters/Mui-original.jpg")
  };
  audioVoiceNoteUrl?: string;
  colorAccent?: string;
}

export interface MemoryPhoto {
  id: string;
  imageUrl: string;
}

export const FRIEND_LETTERS: FriendLetter[] = ${JSON.stringify(friends, null, 2)};

export const MEMORY_PHOTOS: MemoryPhoto[] = ${JSON.stringify(memoryPhotos, null, 2)};

export const CONSTELLATION_LINKS: [string, string][] = ${JSON.stringify(links, null, 2)};
`;

  fs.writeFileSync(outputDataFile, tsContent, 'utf-8');
  console.log(`Successfully generated ${outputDataFile} with ${friends.length} friend letters!`);
}

ingestAllLetters().catch(err => {
  console.error('Error during ingestion:', err);
  process.exit(1);
});

# Letters for Kak Caca | The Constellation of Memories

A celestial birthday tribute and digital keepsake web application crafted for **Kak Caca** from her closest friends across the **Agrabah** and **Wonka** theater circles.

---

## 🌟 Key Features

1. **The Constellation of Memories (Interactive Hero Map)**:
   - Interactive SVG/Canvas celestial map where each friend represents a radiant star node.
   - Constellation lines connect shared circles (*Agrabah*, *Wonka*, *Close Friends*).
   - Hover and tap to view preview quotes and open the letter keepsakes.
   - Smooth switch between **Constellation Map View** and **Archive List View** (responsive on all screen sizes).

2. **In-Browser PDF Canvas Viewer (Zero Forced Downloads)**:
   - Built with `pdfjs-dist` rendering directly onto HTML5 `<canvas>`.
   - Multi-page navigation (`Page 1 of 2`), dynamic zoom (`65%` to `220%`), and fullscreen mode.
   - Safe on iOS Safari and Android Chrome without triggering download prompts.
   - **Graceful Fallback Protection**: If a PDF is not yet placed in `public/letters/`, displays an elegant celestial parchment state directing the user to the formatted text version.

3. **Dual-View Letter Reader Modal**:
   - **Read Letter Tab**: Beautiful formatted typography, quote highlights, audio voice note reflection player.
   - **Original Handwritten PDF Tab**: In-browser page flipping and zooming.
   - **Keyboard Navigation**: `ESC` to close, `Left` and `Right` arrow keys to seamlessly browse next/previous friend letters.

4. **Memory Constellation & Photo Vault**:
   - Curated gallery of milestone memories across Agrabah, Wonka, and midnight hangouts.
   - Interactive Lightbox with date, location, quote, and the full story behind each moment.

5. **Generative Celestial Soundscape (Web Audio API)**:
   - 100% offline, zero external audio network dependencies.
   - Synthesizes ethereal pentatonic chimes, warm sub-bass drones, and space delay harmonies.
   - Interactive play/pause, volume control, mute, and live equalizer animation.

6. **Offline Keepsake Exporter (.zip)**:
   - Bundles all friend letters, photo archives, and commemorative readme files into `Letters_For_Kak_Caca_Keepsake.zip` using `JSZip`.
   - Birthday fireworks confetti burst via `canvas-confetti`.

---

## 📁 Directory Setup & Asset Placement

```
public/
├── letters/                   # Drop friend PDF letters here
│   ├── fabian-letter.pdf
│   ├── nadia-letter.pdf
│   └── aris-letter.pdf
├── photos/                    # Drop memory photos and avatars here
│   ├── celestial_bg.jpg       # Ambient background nebula
│   ├── fabian-avatar.svg
│   ├── caca-fabian-stage.svg
│   └── memory-agrabah-crew.svg
└── favicon.svg                # Celestial star icon
```

### Adding New Letters or Modifying Friends
Edit [src/data/lettersData.ts](file:///c:/Users/youkn/Documents/Projects/Letters/src/data/lettersData.ts):
```ts
export interface FriendLetter {
  id: string;
  name: string;
  tagline: string;
  avatarUrl: string; // e.g. "/photos/friend-avatar.jpg"
  photoWithCaca?: string; // e.g. "/photos/caca-friend.jpg"
  constellationCoords: { x: number; y: number }; // (0-100)%
  groupTag: "Agrabah" | "Wonka" | "Close Friends";
  snippetQuote: string;
  letterMarkdown: string;
  pdfUrl: string; // e.g. "/letters/friend-letter.pdf"
  colorAccent?: string;
}
```

---

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Locally (Dev Server)
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build Production Bundle
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```

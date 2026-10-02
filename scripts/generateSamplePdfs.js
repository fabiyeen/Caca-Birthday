import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lettersDir = path.join(__dirname, '..', 'public', 'letters');
if (!fs.existsSync(lettersDir)) {
  fs.mkdirSync(lettersDir, { recursive: true });
}

async function createLetterPdf(filename, authorName, title, linesPage1, linesPage2) {
  const pdfDoc = await PDFDocument.create();
  const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontTimesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // Page 1
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Background tint
  page1.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.98, 0.97, 0.95), // Warm parchment
  });

  // Border frame
  page1.drawRectangle({
    x: 36,
    y: 36,
    width: width - 72,
    height: height - 72,
    borderColor: rgb(0.8, 0.7, 0.5),
    borderWidth: 1.5,
  });

  // Inner subtle border
  page1.drawRectangle({
    x: 42,
    y: 42,
    width: width - 84,
    height: height - 84,
    borderColor: rgb(0.88, 0.82, 0.68),
    borderWidth: 0.5,
  });

  // Header
  page1.drawText("THE CONSTELLATION OF MEMORIES", {
    x: 175,
    y: height - 70,
    size: 13,
    font: fontTimesBold,
    color: rgb(0.5, 0.38, 0.15),
  });

  page1.drawText("A Birthday Tribute for Kak Caca", {
    x: 210,
    y: height - 88,
    size: 11,
    font: fontTimesItalic,
    color: rgb(0.4, 0.4, 0.4),
  });

  page1.drawLine({
    start: { x: 120, y: height - 100 },
    end: { x: width - 120, y: height - 100 },
    thickness: 1,
    color: rgb(0.8, 0.7, 0.5),
  });

  page1.drawText(title, {
    x: 60,
    y: height - 130,
    size: 16,
    font: fontTimesBold,
    color: rgb(0.15, 0.15, 0.2),
  });

  let currentY = height - 165;
  for (const line of linesPage1) {
    page1.drawText(line, {
      x: 60,
      y: currentY,
      size: 12,
      font: fontTimes,
      color: rgb(0.2, 0.2, 0.25),
      lineHeight: 18,
    });
    currentY -= 22;
  }

  // Page 1 footer
  page1.drawText("- Page 1 of 2 -", {
    x: width / 2 - 30,
    y: 50,
    size: 10,
    font: fontTimesItalic,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Page 2
  if (linesPage2 && linesPage2.length > 0) {
    const page2 = pdfDoc.addPage([595.28, 841.89]);
    page2.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(0.98, 0.97, 0.95),
    });

    page2.drawRectangle({
      x: 36,
      y: 36,
      width: width - 72,
      height: height - 72,
      borderColor: rgb(0.8, 0.7, 0.5),
      borderWidth: 1.5,
    });

    let currentY2 = height - 80;
    for (const line of linesPage2) {
      page2.drawText(line, {
        x: 60,
        y: currentY2,
        size: 12,
        font: fontTimes,
        color: rgb(0.2, 0.2, 0.25),
        lineHeight: 18,
      });
      currentY2 -= 22;
    }

    page2.drawText(`With eternal gratitude and love,`, {
      x: 60,
      y: currentY2 - 20,
      size: 12,
      font: fontTimesItalic,
      color: rgb(0.3, 0.3, 0.35),
    });

    page2.drawText(authorName, {
      x: 60,
      y: currentY2 - 45,
      size: 16,
      font: fontTimesBold,
      color: rgb(0.5, 0.38, 0.15),
    });

    page2.drawText("- Page 2 of 2 -", {
      x: width / 2 - 30,
      y: 50,
      size: 10,
      font: fontTimesItalic,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(lettersDir, filename);
  fs.writeFileSync(filePath, pdfBytes);
  console.log(`Generated: ${filePath}`);
}

async function main() {
  await createLetterPdf(
    'fabian-letter.pdf',
    'Fabian',
    'From Agrabah Rehearsals to Wonka Dreams',
    [
      'Dear Kak Caca,',
      '',
      'Happy Birthday! Looking back at the years we spent together, it feels like flipping',
      'through the pages of an epic script filled with laughter, chaos, and triumphs.',
      'From those grueling late-night rehearsals in Agrabah when the clock struck 2 AM and',
      'we were all barely running on cold iced tea and nervous adrenaline, you were the anchor.',
      '',
      'You had this superpower of smiling through the pandemonium, calming down the backstage',
      'crew, fixing missing props with sheer improvisational genius, and reminding each of us',
      'why we loved theatre in the first place.',
      '',
      'And then came Wonka! A whole new world of pure imagination and even bigger dreams.',
      'You stepped in not just as a mentor, but as the kindest, most radiant elder sister',
      'anyone in our circle could ever ask for.'
    ],
    [
      'Whenever the weight of production or life outside felt too heavy, a five-minute talk',
      'with you was always enough to put the fire back in our chests.',
      '',
      'You see potential in people before they even see it in themselves.',
      'In our constellation of memories, your star has always shone the brightest.',
      'Thank you for believing in me, for cheering me on during my darkest self-doubts,',
      'and for making every rehearsal room feel like home.',
      '',
      'I hope this year brings you as much happiness, peace, and wondrous adventures',
      'as you have so selflessly given to everyone around you.'
    ]
  );

  await createLetterPdf(
    'nadia-letter.pdf',
    'Nadia',
    'A Sister Across All Galaxies',
    [
      'Dearest Kak Caca,',
      '',
      'Sending you the warmest birthday embrace from across the universe!',
      'When I think of Agrabah, my first memory isn\'t the frantic costume changes or the',
      'missed cues—it\'s you holding my trembling hands behind the velvet curtain, whispering:',
      '"We got this, Nadia. You are going to be wonderful."',
      '',
      'And we were wonderful, because you made us believe it.',
      'You taught me what grace under pressure really looks like. No matter how wild the world gets,',
      'you carry this poise and gentleness that puts every anxious storm to rest.'
    ],
    [
      'Thank you for all the shared lunches, the honest life talks, and for always holding space',
      'for everyone\'s tears and victories alike.',
      '',
      'May your year ahead be filled with blooming gardens, sweet melodies, and the realization',
      'of every dream tucked inside your heart. Happy birthday, Kak Caca!'
    ]
  );

  await createLetterPdf(
    'aris-letter.pdf',
    'Aris & Kevin',
    'The Golden Ticket to Friendship',
    [
      'To our one and only Kak Caca,',
      '',
      'Wonka taught us that "the best things in life are sweet," but having you as our senior',
      'and friend has been the real golden ticket!',
      '',
      'You always brought an unmatched energy into the room. Whether it was choreographing scenes,',
      'solving logistical nightmares, or just sharing hilarious stories during supper breaks,',
      'you made the hard work feel like an unforgettable adventure.'
    ],
    [
      'Thank you for being our fiercest supporter, our wisest guide, and our dearest friend.',
      'We hope this birthday treats you like the royalty you are.',
      'Here\'s to more laughter, endless coffee runs, and timeless memories together!'
    ]
  );
}

main().catch(console.error);

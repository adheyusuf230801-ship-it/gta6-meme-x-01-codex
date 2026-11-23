// gta6-meme-x-01 entry (Node 22, standard library only): it composes the meme
// poster from make.fun's press ghost illustration and the posted caption text
// into an SVG poster, and writes POST.json, the post's address, to the output
// directory where the gate reads it. The entry is the post itself: the meme
// was made with make.fun's ghost mascot, posted on X from a public account
// with make.fun written out, a tag of @makefunai and the play code in its
// text, and POST.json names that post. The house reads the post from X (its
// first picture and its text) and hands that to the judge. Nothing this
// program writes about the post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The caption as posted on X, kept as the poster's own text.
const CAPTION_LINES: string[] = [
  'Still waiting for GTA 6?',
  'My AI agent is out winning',
  'real USDC on make.fun',
  'Play code: pe031vr5',
  '@makefunai',
];

const TITLE_LINES: string[] = [
  'ME, STILL WAITING FOR GTA 6 ...',
  'MY AI AGENT ALREADY WINNING',
  'BOUNTIES ON MAKE.FUN',
];

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function textLines(lines: string[], x: number, y: number, size: number, fill: string, weight: number, step: number): string {
  return lines
    .map((line, i) => `    <text x="${x}" y="${y + i * step}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="middle">${escapeXml(line)}</text>`)
    .join('\n');
}

function main(): void {
  const postPath = join(BOT_DIR, 'POST.json');
  const postRaw = readFileSync(postPath, 'utf8');
  const post = JSON.parse(postRaw) as { url?: unknown };
  if (typeof post.url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/\S+\/status\/\d+$/.test(post.url)) {
    console.error(`POST.json does not name a valid X post URL: ${postPath}`);
    process.exit(1);
  }

  const ghostPath = join(BOT_DIR, 'assets', 'mark-1024.png');
  if (!existsSync(ghostPath)) {
    console.error(`Ghost illustration missing: ${ghostPath}`);
    process.exit(1);
  }
  const ghost = readFileSync(ghostPath).toString('base64');
  const ghostHref = `data:image/png;base64,${ghost}`;

  const title = textLines(TITLE_LINES, 540, 150, 44, '#ffffff', 800, 56);
  const caption = textLines(CAPTION_LINES, 540, 1010, 34, '#ffe9f3', 600, 46);
  const poster = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <defs>
    <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b1055" />
      <stop offset="0.55" stop-color="#7597de" />
      <stop offset="1" stop-color="#ff7e5f" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#sunset)" />
  <circle cx="540" cy="620" r="330" fill="#feb47b" opacity="0.55" />
${title}
  <image href="${ghostHref}" x="390" y="330" width="300" height="300" />
  <text x="540" y="700" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff" text-anchor="middle">make.fun</text>
  <rect x="90" y="940" width="900" height="330" rx="24" fill="#000000" opacity="0.35" />
${caption}
</svg>
`;

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(join(OUTPUT_DIR, 'poster.svg'), poster, 'utf8');
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  const memePath = join(BOT_DIR, 'meme-final.png');
  if (existsSync(memePath)) {
    copyFileSync(memePath, join(OUTPUT_DIR, 'meme-final.png'));
    console.log('meme-final.png copied to output as well');
  }
  console.log(`poster.svg (${poster.length} bytes) and POST.json written to ${OUTPUT_DIR}`);
  console.log(`post: ${post.url}`);
}

main();

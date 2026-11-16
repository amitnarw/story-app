// Generates portrait covers (1200x1800), landscape card covers (1200x675),
// and in-story images (1200x900 landscape, 900x1200 portrait) for new stories.
// Pure Node.js PNG encoder — no native dependencies.

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');

function hexToRgb(hex) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
  };
}

function interpolateColor(c1, c2, t) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

function drawCircle(pixels, width, height, cx, cy, r, color, opacity) {
  const rr = r * r;
  const op = opacity || 1;
  for (let y = Math.max(0, cy - r); y <= Math.min(height - 1, cy + r); y++) {
    for (let x = Math.max(0, cx - r); x <= Math.min(width - 1, cx + r); x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= rr) {
        const i = (y * width + x) * 4;
        pixels[i] = Math.round(pixels[i] * (1 - op) + color.r * op);
        pixels[i + 1] = Math.round(pixels[i + 1] * (1 - op) + color.g * op);
        pixels[i + 2] = Math.round(pixels[i + 2] * (1 - op) + color.b * op);
      }
    }
  }
}

// ---------- PNG encoding ----------

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function writeChunk(type, data) {
  const len = data.length;
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(len, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const combined = Buffer.concat([lenBuf, typeBuf, data]);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([combined, crcBuf]);
}

function encodePNG(width, height, pixels) {
  const rowBytes = width * 4;
  const filtered = Buffer.alloc(height * (1 + rowBytes));
  for (let y = 0; y < height; y++) {
    filtered[y * (1 + rowBytes)] = 0;
    pixels.copy(filtered, y * (1 + rowBytes) + 1, y * rowBytes, (y + 1) * rowBytes);
  }
  const compressed = zlib.deflateSync(filtered, { level: 9 });
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  return Buffer.concat([
    signature,
    writeChunk('IHDR', ihdrData),
    writeChunk('IDAT', compressed),
    writeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function makeGradientPixels(width, height, c1, c2, angle = 45) {
  const pixels = Buffer.alloc(width * height * 4);
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const maxDist = Math.abs(dx) * width + Math.abs(dy) * height;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const t = ((x * dx + y * dy) / maxDist + 0.5) % 1;
      const c = interpolateColor(c1, c2, t);
      const i = (y * width + x) * 4;
      pixels[i] = c.r;
      pixels[i + 1] = c.g;
      pixels[i + 2] = c.b;
      pixels[i + 3] = 255;
    }
  }
  return pixels;
}

// ---------- Story designs ----------

const stories = [
  {
    slug: 'the-guest-house-at-midnight',
    order: 7,
    primary: '#3a1a2a',
    secondary: '#c89b74',
    accent: '#f5efe8',
  },
  {
    slug: 'a-season-in-the-hills',
    order: 8,
    primary: '#2d3a1a',
    secondary: '#f0d9a5',
    accent: '#f5efe8',
  },
  {
    slug: 'the-photographers-wife',
    order: 9,
    primary: '#2a1a3a',
    secondary: '#c89b74',
    accent: '#f5efe8',
  },
  {
    slug: 'after-the-last-metro',
    order: 10,
    primary: '#1a2a3a',
    secondary: '#f0d9a5',
    accent: '#f5efe8',
  },
];

for (const story of stories) {
  const dir = path.join(ASSETS_DIR, story.slug);
  fs.mkdirSync(dir, { recursive: true });

  const c1 = hexToRgb(story.primary);
  const c2 = hexToRgb(story.secondary);
  const c3 = hexToRgb(story.accent);

  // ---- cover.png: portrait 1200x1800 ----
  {
    const w = 1200, h = 1800;
    const p = makeGradientPixels(w, h, c1, c2, 135);
    drawCircle(p, w, h, w * 0.5, h * 0.35, 220, c3, 0.10);
    drawCircle(p, w, h, w * 0.8, h * 0.75, 160, c3, 0.08);
    fs.writeFileSync(path.join(dir, 'cover.png'), encodePNG(w, h, p));
  }

  // ---- card-cover.png: landscape 1200x675 ----
  {
    const w = 1200, h = 675;
    const p = makeGradientPixels(w, h, c1, c2, 45);
    drawCircle(p, w, h, w * 0.25, h * 0.35, 140, c3, 0.12);
    drawCircle(p, w, h, w * 0.8, h * 0.7, 180, c3, 0.08);
    fs.writeFileSync(path.join(dir, 'card-cover.png'), encodePNG(w, h, p));
  }

  // ---- img-1.png: landscape 1200x900 ----
  {
    const w = 1200, h = 900;
    const p = makeGradientPixels(w, h, c1, c2, 60);
    drawCircle(p, w, h, w * 0.3, h * 0.4, 160, c3, 0.10);
    fs.writeFileSync(path.join(dir, 'img-1.png'), encodePNG(w, h, p));
  }

  // ---- img-2.png: portrait 900x1200 ----
  {
    const w = 900, h = 1200;
    const p = makeGradientPixels(w, h, c2, c1, 120);
    drawCircle(p, w, h, w * 0.5, h * 0.35, 140, c3, 0.10);
    fs.writeFileSync(path.join(dir, 'img-2.png'), encodePNG(w, h, p));
  }

  console.log(`Generated assets for ${story.slug}`);
}

console.log('\nAll assets generated.');

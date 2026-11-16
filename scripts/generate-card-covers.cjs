// Minimal PNG encoder (no dependencies) for generating landscape card covers.
// Produces a valid PNG with a linear gradient + decorative circles.

const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');

const WIDTH = 1200;
const HEIGHT = 675; // 16:9

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

function drawCircle(pixels, cx, cy, r, color, opacity) {
  const rr = r * r;
  const op = opacity || 1;
  for (let y = Math.max(0, cy - r); y <= Math.min(HEIGHT - 1, cy + r); y++) {
    for (let x = Math.max(0, cx - r); x <= Math.min(WIDTH - 1, cx + r); x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= rr) {
        const i = (y * WIDTH + x) * 4;
        pixels[i] = Math.round(pixels[i] * (1 - op) + color.r * op);
        pixels[i + 1] = Math.round(pixels[i + 1] * (1 - op) + color.g * op);
        pixels[i + 2] = Math.round(pixels[i + 2] * (1 - op) + color.b * op);
      }
    }
  }
}

// ---------- PNG encoding ----------

function crc32(buf) {
  // Simple CRC32 implementation
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
  // pixels: Buffer of RGBA data (width * height * 4)
  // Add filter bytes (0 = none) for each scanline
  const rowBytes = width * 4;
  const filtered = Buffer.alloc(height * (1 + rowBytes));
  for (let y = 0; y < height; y++) {
    filtered[y * (1 + rowBytes)] = 0; // filter type: none
    pixels.copy(filtered, y * (1 + rowBytes) + 1, y * rowBytes, (y + 1) * rowBytes);
  }

  const compressed = zlib.deflateSync(filtered, { level: 9 });

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const idatData = compressed;
  const iendData = Buffer.alloc(0);

  return Buffer.concat([
    signature,
    writeChunk('IHDR', ihdrData),
    writeChunk('IDAT', idatData),
    writeChunk('IEND', iendData),
  ]);
}

// ---------- Story designs ----------

const stories = [
  {
    slug: 'the-lamplighters-daughter',
    primary: '#1a2e3a',
    secondary: '#c89b74',
    accent: '#f5efe8',
  },
  {
    slug: 'a-room-with-yellow-curtains',
    primary: '#3a2e1a',
    secondary: '#f0d9a5',
    accent: '#f5efe8',
  },
  {
    slug: 'the-last-train-to-somewhere',
    primary: '#2a1a3a',
    secondary: '#c89b74',
    accent: '#f5efe8',
  },
  {
    slug: 'what-the-orchard-kept',
    primary: '#2d3a1a',
    secondary: '#c89b74',
    accent: '#f5efe8',
  },
  {
    slug: 'small-hours',
    primary: '#1a2a3a',
    secondary: '#f0d9a5',
    accent: '#f5efe8',
  },
  {
    slug: 'the-cartographer-of-rain',
    primary: '#1a2a3d',
    secondary: '#94b8c8',
    accent: '#f5efe8',
  },
];

for (const story of stories) {
  const c1 = hexToRgb(story.primary);
  const c2 = hexToRgb(story.secondary);
  const c3 = hexToRgb(story.accent);

  const pixels = Buffer.alloc(WIDTH * HEIGHT * 4);

  // Gradient background (diagonal top-left to bottom-right)
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const t = (x / WIDTH + y / HEIGHT) / 2;
      const c = interpolateColor(c1, c2, t);
      const i = (y * WIDTH + x) * 4;
      pixels[i] = c.r;
      pixels[i + 1] = c.g;
      pixels[i + 2] = c.b;
      pixels[i + 3] = 255;
    }
  }

  // Decorative circles
  drawCircle(pixels, WIDTH * 0.2, HEIGHT * 0.3, 140, c3, 0.12);
  drawCircle(pixels, WIDTH * 0.8, HEIGHT * 0.7, 180, c3, 0.08);
  drawCircle(pixels, WIDTH * 0.5, HEIGHT * 0.5, 90, c3, 0.10);

  const png = encodePNG(WIDTH, HEIGHT, pixels);

  const dir = path.join(ASSETS_DIR, story.slug);
  const out = path.join(dir, 'card-cover.png');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(out, png);
  console.log(`Generated ${out} (${png.length} bytes)`);
}

console.log('\nAll card covers generated.');

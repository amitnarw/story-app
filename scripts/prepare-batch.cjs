/**
 * One-off prep: reads each story folder from the supplied pack, picks the
 * titled thumbnail (the 16:9 image), picks the distinct in-story images,
 * and stages everything the authoring step and the asset step need.
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/Narwal/Downloads/Story App 1 (1)';
const STAGE = path.resolve('staging');

const SLUGS = {
  6: 'aadhi-raat-ki-muskaan',
  7: 'aadhi-raat-ki-phusphusahat',
  8: 'khidki-wala-raaz',
  9: 'aadhi-raat-ki-hansi',
  10: 'muskaan-ka-naya-raaz',
  11: 'baramde-ka-raaz',
  12: 'wo-ek-mulaqaat',
  13: 'itni-si-himmat',
  14: 'dosti-se-zara-aage',
  15: 'phir-wahi-jhijhak',
  16: 'chhat-par-badhi-nazdeekiyan',
  17: 'rasoi-mein-chhupa-raaz',
  18: 'ek-baar-phir-pyaar',
  19: 'rasoi-mein-chhupa-pyaar',
  20: 'rasoi-ka-ankaha-raaz',
  22: 'bahu-aur-sasur-ki-mulaqaat',
  23: 'purane-pyaar-ki-mulaqaat',
  24: 'rasoi-mein-dil-ka-raaz',
  25: 'aaine-mein-chhupa-raaz',
  26: 'akeli-bahu-ka-raaz',
  27: 'makan-malikin-ki-mohabbat',
  28: 'akeli-bahu-aur-sasur',
  29: 'chupke-se-badhi-nazdeekiyan',
  30: 'dewar-ki-bahon-mein-bhabhi',
  31: 'chhupi-nazdeekiyon-ka-raaz',
  32: 'rasoi-mein-chhupi-nazdeekiyan',
  33: 'college-ki-madam',
  34: 'makan-malik-ki-betii',
  35: 'bahu-aur-sasur-ki-anokhi-kahani',
  37: 'rasoi-mein-bahu-aur-sasur',
  39: 'purane-dost-ka-raaz',
  40: 'chhat-par-dewar-aur-bhabhi',
  41: 'akeli-makan-malikin',
  42: 'purane-premi-ka-raaz',
  43: 'makan-malikin-ki-nayi-mohabbat',
  44: 'shaadi-se-pehle-wada',
  45: 'mangetar-ka-ankaha-raaz',
  46: 'purane-pyaar-ka-ankaha-raaz',
  47: 'office-ka-raaz',
  48: 'jab-dosti-mohabbat-bani',
  49: 'bas-ek-ichchha',
  50: 'patni-ki-ek-baat',
  52: 'ek-kamra-do-saheliyan',
  55: 'jethani-ke-kamre-mein-dewar',
  56: 'bhabhi-ka-chupke-se-ishara',
  57: 'office-ki-malikin-aur-driver',
  58: 'chhat-wali-mohabbat',
  59: 'saas-aur-damad',
  60: 'padosan-ne-aadhi-raat-ko-kaha',
  61: 'dost-ki-girlfriend-ka-raaz',
};

// Folders where more than one 16:9 image exists; the titled one is picked by eye.
const THUMB_OVERRIDES = {
  49: 'BE4646BF-2CFA-42EF-BE41-798F9D858D96.PNG',
  58: 'BBC0CFE5-2512-4BD5-BEE8-1991DF16FE5D.PNG',
};

function readText(folderDir) {
  const name = fs.readdirSync(folderDir).find((f) => f.toLowerCase().endsWith('.txt'));
  if (!name) return null;
  const buf = fs.readFileSync(path.join(folderDir, name));
  let text;
  if (buf[0] === 0xff && buf[1] === 0xfe) text = buf.toString('utf16le');
  else if (buf[0] === 0xfe && buf[1] === 0xff) text = Buffer.from(buf).swap16().toString('utf16le');
  else text = buf.toString('utf8');
  return text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
}

function decodeName(buffer, offset, length) {
  return buffer.toString('utf8', offset, offset + length);
}

fs.mkdirSync(path.join(STAGE, 'texts'), { recursive: true });

const plan = [];
const assetLines = [];

const folders = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && SLUGS[d.name])
  .map((d) => d.name)
  .sort((a, b) => Number(a) - Number(b));

for (const folder of folders) {
  const slug = SLUGS[folder];
  const dir = path.join(ROOT, folder);
  const files = fs.readdirSync(dir);

  // Image dimensions come from the JPEG/PNG header.
  const images = files
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .map((f) => {
      const buf = fs.readFileSync(path.join(dir, f));
      let width = 0;
      let height = 0;
      if (buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
        width = buf.readUInt32BE(16);
        height = buf.readUInt32BE(20);
      } else {
        let i = 2;
        while (i < buf.length) {
          if (buf[i] !== 0xff) {
            i += 1;
            continue;
          }
          const marker = buf[i + 1];
          if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
            height = buf.readUInt16BE(i + 5);
            width = buf.readUInt16BE(i + 7);
            break;
          }
          i += 2 + buf.readUInt16BE(i + 2);
        }
      }
      return { file: f, width, height, area: width * height, ratio: width / height };
    });

  let thumb;
  if (THUMB_OVERRIDES[folder]) {
    thumb = images.find((i) => i.file === THUMB_OVERRIDES[folder]);
  }
  if (!thumb) {
    const landscape = images.filter((i) => i.ratio > 1.7 && i.ratio < 1.85 && i.width >= 1000);
    landscape.sort((a, b) => b.area - a.area);
    thumb = landscape[0];
  }
  if (!thumb) throw new Error(`no thumbnail candidate in folder ${folder}`);

  const rest = images.filter((i) => i.file !== thumb.file);
  const maxArea = Math.max(...rest.map((i) => i.area));
  const inStory = rest
    .filter((i) => i.area >= maxArea * 0.6)
    .sort((a, b) => b.area - a.area)
    .slice(0, 3);

  const text = readText(dir);
  const mp3 = files.find((f) => f.toLowerCase().endsWith('.mp3'));
  if (!text) throw new Error(`no text in folder ${folder}`);
  if (!mp3) throw new Error(`no audio in folder ${folder}`);

  const chars = text.length;
  const minutes = chars > 2500 ? 3 : 2;

  fs.writeFileSync(
    path.join(STAGE, 'texts', `${folder}.txt`),
    [
      `FOLDER: ${folder}`,
      `SLUG: ${slug}`,
      `MINUTES: ${minutes}`,
      `IMAGE_BLOCKS: ${inStory.length}`,
      `SOURCE_TITLE: ${text.split('\n')[0]}`,
      '',
      text,
      '',
    ].join('\n'),
    'utf8',
  );

  plan.push({
    folder,
    slug,
    minutes,
    chars,
    imageBlocks: inStory.length,
    coverAltSource: thumb.file,
    images: inStory.map((i) => i.file),
    audioSource: mp3,
  });
  assetLines.push(
    [folder, slug, thumb.file, ...inStory.map((i) => i.file), mp3].join('\t'),
  );
}

fs.writeFileSync(path.join(STAGE, 'plan.json'), JSON.stringify(plan, null, 2), 'utf8');
fs.writeFileSync(path.join(STAGE, 'assets.tsv'), assetLines.join('\n'), 'utf8');
console.log(`prepared ${plan.length} stories`);
for (const p of plan) {
  console.log(`${p.folder}\t${p.slug}\timg=${p.imageBlocks}\tmin=${p.minutes}\tchars=${p.chars}`);
}

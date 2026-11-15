const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');

const stories = [
  {
    slug: 'the-lamplighters-daughter',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=101' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=102' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=103' },
    ],
  },
  {
    slug: 'a-room-with-yellow-curtains',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=201' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=202' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=203' },
    ],
  },
  {
    slug: 'the-last-train-to-somewhere',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=301' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=302' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=303' },
    ],
  },
  {
    slug: 'what-the-orchard-kept',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=401' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=402' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=403' },
    ],
  },
  {
    slug: 'small-hours',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=501' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=502' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=503' },
    ],
  },
  {
    slug: 'the-cartographer-of-rain',
    images: [
      { file: 'cover.jpg', url: 'https://picsum.photos/1200/1800?random=601' },
      { file: 'img-1.jpg', url: 'https://picsum.photos/1200/900?random=602' },
      { file: 'img-2.jpg', url: 'https://picsum.photos/900/1200?random=603' },
    ],
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Request failed: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
      file.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  for (const story of stories) {
    const dir = path.join(ASSETS_DIR, story.slug);
    fs.mkdirSync(dir, { recursive: true });
    for (const img of story.images) {
      try {
        await download(img.url, path.join(dir, img.file));
        console.log(`Downloaded ${story.slug}/${img.file}`);
      } catch (err) {
        console.error(`Failed ${story.slug}/${img.file}: ${err.message}`);
      }
    }
  }
  console.log('Done.');
})();

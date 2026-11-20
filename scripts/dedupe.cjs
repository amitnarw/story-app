/**
 * Drop in-story images that are near-duplicates (same scene, smaller copy) of
 * an image already kept, using a 16x16 average hash.
 */
const fs = require('fs');
const path = require('path');

const STAGE = path.resolve('staging');
const ROOT = 'C:/Users/Narwal/Downloads/Story App 1 (1)';

function distance(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) {
    const x = parseInt(a[i], 16) ^ parseInt(b[i], 16);
    d += (x & 1) + ((x >> 1) & 1) + ((x >> 2) & 1) + ((x >> 3) & 1);
  }
  return d;
}

const hashes = new Map();
for (const line of fs.readFileSync(path.join(STAGE, 'hashes.tsv'), 'utf8').split(/\r?\n/)) {
  if (!line.trim()) continue;
  const [folder, file, hash] = line.split('\t');
  hashes.set(`${folder}/${file}`, hash);
}

const plan = JSON.parse(fs.readFileSync(path.join(STAGE, 'plan.json'), 'utf8'));
let changes = 0;

for (const entry of plan) {
  const thumbHash = hashes.get(`${entry.folder}/${entry.coverAltSource}`);
  const kept = [];
  for (const file of entry.images) {
    const hash = hashes.get(`${entry.folder}/${file}`);
    if (!hash) continue;
    const clash = kept.find((k) => distance(hashes.get(`${entry.folder}/${k}`), hash) <= 30);
    if (clash) {
      console.log(`drop ${entry.folder}/${file} (dup of ${clash}, d=${distance(hashes.get(`${entry.folder}/${clash}`), hash)})`);
      changes += 1;
      continue;
    }
    kept.push(file);
  }
  if (kept.length > 3) kept.length = 3;
  entry.images = kept;
  entry.imageBlocks = kept.length;
}

fs.writeFileSync(path.join(STAGE, 'plan.json'), JSON.stringify(plan, null, 2), 'utf8');

// Refresh the asset list and the image-count header in each staged text.
const assetLines = [];
for (const entry of plan) {
  assetLines.push([entry.folder, entry.slug, entry.coverAltSource, ...entry.images, entry.audioSource].join('\t'));
  const file = path.join(STAGE, 'texts', `${entry.folder}.txt`);
  const text = fs.readFileSync(file, 'utf8').replace(/^IMAGE_BLOCKS: \d+$/m, `IMAGE_BLOCKS: ${entry.imageBlocks}`);
  fs.writeFileSync(file, text, 'utf8');
}
fs.writeFileSync(path.join(STAGE, 'assets.tsv'), assetLines.join('\n'), 'utf8');
console.log(`changes=${changes}`);

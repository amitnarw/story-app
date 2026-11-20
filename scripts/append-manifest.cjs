/**
 * One-off: append the 50 imported stories to the manifest, after the five
 * hand-authored ones. Idempotent — existing slugs are skipped.
 */
const fs = require('fs');
const path = require('path');

const MANIFEST = path.resolve('src/content/manifest.ts');
const plan = JSON.parse(fs.readFileSync(path.resolve('staging/plan.json'), 'utf8'));

const START_ORDER = 6;

function entryFor(story, order) {
  const dir = `../../assets/stories/${story.slug}`;
  return `  {
    slug: '${story.slug}',
    order: ${order},
    minutes: ${story.minutes},
    genre: 'romance',
    mature: true,
    cover: require('${dir}/card-cover.jpg'),
    cardCover: require('${dir}/card-cover.jpg'),
    images: [
      require('${dir}/img-1.jpg'),
      require('${dir}/img-2.jpg'),
      require('${dir}/img-3.jpg'),
    ],
    audio: {
      language: 'hi',
      source: require('${dir}/audio-hi.mp3'),
    },
  },`;
}

let text = fs.readFileSync(MANIFEST, 'utf8');
const existing = new Set([...text.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]));

const additions = [];
plan.forEach((story, index) => {
  if (existing.has(story.slug)) return;
  additions.push(entryFor(story, START_ORDER + index));
});

if (additions.length === 0) {
  console.log('manifest already up to date');
  process.exit(0);
}

const close = text.lastIndexOf('\n];');
if (close === -1) throw new Error('could not find manifest array end');

text = text.slice(0, close) + '\n' + additions.join('\n') + text.slice(close);
fs.writeFileSync(MANIFEST, text, 'utf8');
console.log(`added ${additions.length} manifest entries`);

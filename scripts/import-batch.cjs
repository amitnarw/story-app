/**
 * One-off importer for the 50 supplied story folders.
 *
 * Builds one chapter per story (12 paragraph blocks + 3 image blocks) from the
 * Hindi source text, translates each block into English via Google Translate,
 * and romanises every source paragraph into Hinglish via Google Transliterate.
 * All remote results are cached so the run can resume after a rate limit.
 */
const fs = require('fs');
const path = require('path');

const ROOT = 'C:/Users/Narwal/Downloads/Story App 1 (1)';
const PROCESSED = path.resolve('staging/processed');
const CACHE_FILE = path.resolve('staging/translate-cache.json');
const ASSETS = path.resolve('assets/stories');

const planAll = JSON.parse(fs.readFileSync(path.resolve('staging/plan.json'), 'utf8'));
const plan = process.env.LIMIT ? planAll.slice(0, Number(process.env.LIMIT)) : planAll;
const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};

const TAGS = [
  [['राज़', 'राज'], 'राज़', 'secret', 'raaz'],
  [['प्यार', 'मोहब्बत', 'इश्क़', 'इश्क'], 'प्यार', 'love', 'pyaar'],
  [['दिल'], 'दिल', 'heart', 'dil'],
  [['रात'], 'रात', 'night', 'raat'],
  [['बहू'], 'बहू', 'daughter-in-law', 'bahu'],
  [['ससुर', 'सास', 'ससुराल'], 'ससुराल', 'in-laws', 'sasural'],
  [['देवर', 'भाभी', 'जेठानी', 'जेठ'], 'रिश्ते', 'relationships', 'rishte'],
  [['दोस्त', 'दोस्ती'], 'दोस्ती', 'friendship', 'dosti'],
  [['ऑफिस', 'बॉस', 'मालिक'], 'ऑफिस', 'office', 'office'],
  [['शादी', 'मंगेतर', 'सगाई'], 'शादी', 'marriage', 'shaadi'],
  [['अकेली', 'अकेला', 'अकेलापन'], 'अकेलापन', 'loneliness', 'akelapan'],
];

const STOPWORDS = new Set([
  'The', 'A', 'An', 'And', 'But', 'Or', 'So', 'Then', 'When', 'While', 'After',
  'Before', 'That', 'This', 'There', 'Their', 'They', 'She', 'He', 'His', 'Her',
  'It', 'Its', 'At', 'In', 'On', 'Of', 'For', 'With', 'As', 'To', 'From', 'By',
  'Now', 'Tonight', 'Today', 'One', 'Two', 'Three', 'Both', 'Every', 'All',
  'What', 'Why', 'How', 'Who', 'Where', 'No', 'Not', 'Yes', 'Even', 'Still',
  'Inside', 'Outside', 'Once', 'Only', 'Just', 'Like', 'Some', 'My', 'Our',
  'Your', 'Was', 'Were', 'Had', 'Have', 'Has', 'Would', 'Could', 'Will', 'Can',
  'Do', 'Did', 'Does', 'Is', 'Are', 'Am', 'If', 'Into', 'Over', 'Under',
  'Again', 'Very', 'More', 'Most', 'Much', 'Than', 'Up', 'Down', 'Out', 'Off',
  'About', 'Because', 'Between', 'Through', 'During',
]);

function tagsFor(title, body) {
  const text = `${title} ${body}`;
  const picked = TAGS.filter(([keys]) => keys.some((key) => text.includes(key)));
  for (const tag of TAGS) {
    if (picked.length === 3) break;
    if (!picked.includes(tag)) picked.push(tag);
  }
  return picked.slice(0, 3).map(([, hi, en, hl]) => ({ hi, en, hl }));
}

function properNouns(text) {
  const names = new Set();
  for (const raw of text.split(/[^A-Za-z'’]+/)) {
    const word = raw.replace(/['’]s$/, '');
    if (word.length < 3 || STOPWORDS.has(word)) continue;
    if (!/^[A-Z][a-z]+$/.test(word)) continue;
    names.add(word.toLowerCase());
  }
  return [...names];
}

function splitSentences(text) {
  return text.match(/[^.!?।]+[.!?।]*["'”’]?/g) || [text];
}

/**
 * Google Transliterate truncates input at the first comma and around 150
 * characters, so text is split into clause-sized pieces and stitched back.
 */
function splitForTranslit(text) {
  const clauses = text.match(/[^,;:।.!?]+[,;:।.!?]*["'”’]?/g) || [text];
  const parts = [];
  for (const clause of clauses) {
    let rest = clause.trim();
    while (rest.length > 100) {
      let cut = rest.lastIndexOf(' ', 100);
      if (cut < 40) cut = 100;
      parts.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) parts.push(rest);
  }
  // A closing quote can arrive as its own fragment; keep it glued to the
  // preceding text so the stitched output has no stray spaces.
  const merged = [];
  for (const part of parts) {
    if (!/[\u0900-\u097F]/.test(part) && merged.length > 0) {
      merged[merged.length - 1] += part;
    } else {
      merged.push(part);
    }
  }
  return merged.filter(Boolean);
}

function sentenceCase(text) {
  return splitSentences(text)
    .map((sentence) => {
      const trimmed = sentence.trim();
      if (!trimmed) return '';
      return trimmed.replace(/^([“"'‘(\[]*)(\p{L})/u, (match, prefix, letter) => prefix + letter.toUpperCase());
    })
    .join(' ')
    .trim();
}

const SMALL_WORDS = new Set([
  'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'of', 'to', 'in', 'on',
  'at', 'by', 'with', 'from', 'as',
]);

function titleCase(text) {
  return text
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && SMALL_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let lastRequest = 0;
async function politeJson(url, init, attempts = 6) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    const gap = Date.now() - lastRequest;
    if (gap < 500) await sleep(500 - gap);
    lastRequest = Date.now();
    try {
      const response = await fetch(url, {
        ...init,
        headers: { 'User-Agent': 'Mozilla/5.0', ...(init && init.headers) },
        signal: AbortSignal.timeout(30000),
      });
      if (response.status === 429) throw new Error('HTTP 429');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      await sleep(3000 * (i + 1));
    }
  }
  throw lastError;
}

const TRANSLATE_URL = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=hi&tl=en';

async function translate(text) {
  const data = await politeJson(TRANSLATE_URL + '&q=' + encodeURIComponent(text));
  return (Array.isArray(data) ? data.join('') : String(data)).trim();
}

/**
 * Translate several blocks in one request (Google keeps the newlines between
 * them) and fall back to one request per block if the shape does not line up.
 */
async function translateMany(texts) {
  const results = [];
  let index = 0;
  while (index < texts.length) {
    const group = [];
    let size = 0;
    while (index < texts.length && (group.length === 0 || size + texts[index].length <= 500)) {
      size += texts[index].length;
      group.push(texts[index]);
      index += 1;
    }

    if (group.length === 1) {
      results.push(await translate(group[0]));
      continue;
    }

    const joined = await translate(group.join('\n'));
    const parts = joined
      .split('\n')
      .map((part) => part.trim())
      .filter(Boolean);
    if (parts.length === group.length) {
      results.push(...parts);
    } else {
      for (const text of group) results.push(await translate(text));
    }
  }
  return results;
}

async function transliterate(text) {
  const url =
    'https://www.google.com/transliterate?langpair=hi|en&text=' + encodeURIComponent(text);
  const data = await politeJson(url);
  const result = data[0] && data[0].hws && data[0].hws[0];
  if (!result) throw new Error('no transliteration');
  return result.trim();
}

async function cached(key, producer) {
  if (cache[key]) return cache[key];
  const value = await producer();
  cache[key] = value;
  return value;
}

/** Transliterate long text piece by piece, caching each piece. */
async function transliterateText(text, keyBase) {
  const parts = splitForTranslit(text);
  const pieces = [];
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    let out = await cached(`${keyBase}#${i}`, () => transliterate(part));

    // The endpoint eats the clause-ending comma/semicolon; put it back.
    const quoteMatch = part.match(/["'”’]$/);
    const quote = quoteMatch ? quoteMatch[0] : '';
    const bare = quote ? part.slice(0, -1) : part;
    const mark = /[,;:]$/.test(bare) ? bare.slice(-1) : '';
    if (mark && !out.endsWith(mark)) out += mark;
    if (quote && !out.endsWith(quote)) out += quote;
    pieces.push(out);
  }
  return pieces.join(' ');
}

function romanise(raw, names) {
  let text = raw
    .replace(/।/g, '.')
    .replace(/\s+([,.;:!?%”’])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  text = text.replace(/\bmen\b/gi, 'mein').replace(/\bmeN\b/gi, 'mein');

  for (const name of names) {
    const cap = name.charAt(0).toUpperCase() + name.slice(1);
    text = text.replace(new RegExp(`\\b${name}\\b`, 'gi'), cap);
  }
  return sentenceCase(text);
}

function parseSource(entry) {
  const dir = path.join(ROOT, entry.folder);
  const file = fs.readdirSync(dir).find((name) => name.toLowerCase().endsWith('.txt'));
  const raw = fs.readFileSync(path.join(dir, file), 'utf8').replace(/^\uFEFF/, '');
  const paragraphs = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const title = paragraphs.shift();
  while (paragraphs[0] === title) paragraphs.shift();
  return { title, body: paragraphs };
}

/** Evenly grouped paragraph chunks: 12 text blocks, images after 3, 7, 11. */
function chunkParagraphs(body) {
  const TEXT_BLOCKS = 12;
  const chunks = [];
  const base = Math.floor(body.length / TEXT_BLOCKS);
  const extra = body.length % TEXT_BLOCKS;
  let cursor = 0;
  for (let i = 0; i < TEXT_BLOCKS; i += 1) {
    const size = base + (i < extra ? 1 : 0);
    chunks.push(body.slice(cursor, cursor + size));
    cursor += size;
  }
  return chunks;
}

function summaryFrom(body) {
  const first = body[0];
  if (first.length <= 240) return first;
  const sentences = splitSentences(first);
  let summary = '';
  for (const sentence of sentences) {
    if ((summary + sentence).length > 240) break;
    summary += sentence;
  }
  if (summary) return summary.trim();
  return `${first.slice(0, 237).replace(/\s+\S*$/, '')}…`;
}

function tsString(value) {
  return (
    "'" +
    String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') +
    "'"
  );
}

function renderStory(story) {
  const lines = [];
  lines.push('  {');
  lines.push(`    slug: ${tsString(story.slug)},`);
  lines.push(`    title: ${tsString(story.title)},`);
  lines.push(`    author: ${tsString(story.author)},`);
  lines.push(`    kicker: ${tsString(story.kicker)},`);
  lines.push(`    summary: ${tsString(story.summary)},`);
  lines.push(`    tags: [${story.tags.map((tag) => tsString(tag)).join(', ')}],`);
  lines.push(`    coverAlt: ${tsString(story.coverAlt)},`);
  if (story.contentNote) lines.push(`    contentNote: ${tsString(story.contentNote)},`);
  lines.push('    chapters: [');
  lines.push('      {');
  lines.push('        blocks: [');
  for (const block of story.blocks) {
    lines.push('          {');
    if (block.kind === 'image') {
      lines.push("            kind: 'image',");
      lines.push(`            alt: ${tsString(block.alt)},`);
    } else {
      lines.push("            kind: 'paragraph',");
      lines.push(`            text: ${tsString(block.text)},`);
      if (block.dropCap) lines.push('            dropCap: true,');
    }
    lines.push('          },');
  }
  lines.push('        ],');
  lines.push('      },');
  lines.push('    ],');
  lines.push('  },');
  return lines.join('\n');
}

async function main() {
  const prepared = [];

  for (const entry of plan) {
    const { title, body } = parseSource(entry);
    const chunks = chunkParagraphs(body);
    const tags = tagsFor(title, body.join(' '));
    const summary = summaryFrom(body);

    // Copy artwork + narration into the app asset tree.
    const assetDir = path.join(ASSETS, entry.slug);
    fs.mkdirSync(assetDir, { recursive: true });
    for (const file of ['card-cover.jpg', 'img-1.jpg', 'img-2.jpg', 'img-3.jpg']) {
      fs.copyFileSync(path.join(PROCESSED, entry.folder, file), path.join(assetDir, file));
    }
    fs.copyFileSync(
      path.join(ROOT, entry.folder, entry.audioSource),
      path.join(assetDir, 'audio-hi.mp3'),
    );

    prepared.push({ entry, title, body, chunks, tags, summary });
    console.log(`assets ready: ${entry.slug}`);
  }

  for (const item of prepared) {
    const { slug } = item.entry;
    const flatParagraphs = item.chunks.flat();

    const enTitle = await cached(`en:title:${slug}`, () => translate(item.title));
    const enSummary = await cached(`en:summary:${slug}`, () => translate(item.summary));

    const enTexts = new Array(item.chunks.length).fill('');
    const missing = [];
    for (let i = 0; i < item.chunks.length; i += 1) {
      const key = `en:${slug}:${i}`;
      if (cache[key]) enTexts[i] = cache[key];
      else missing.push(i);
    }
    if (missing.length > 0) {
      const translated = await translateMany(
        missing.map((index) => item.chunks[index].join(' ')),
      );
      missing.forEach((index, position) => {
        cache[`en:${slug}:${index}`] = translated[position];
        enTexts[index] = translated[position];
      });
    }

    const hlParagraphs = [];
    for (let i = 0; i < flatParagraphs.length; i += 1) {
      hlParagraphs.push(
        await transliterateText(flatParagraphs[i], `hlp2:${slug}:${i}`),
      );
    }

    const hlTexts = [];
    let cursor = 0;
    const names = properNouns([enTitle, enSummary, ...enTexts].join(' '));
    for (const chunk of item.chunks) {
      const pieces = hlParagraphs.slice(cursor, cursor + chunk.length);
      cursor += chunk.length;
      hlTexts.push(romanise(pieces.join(' '), names));
    }

    const hlTitleRaw = await transliterateText(item.title, `hl2:title:${slug}`);
    const hlSummaryRaw = await transliterateText(item.summary, `hl2:summary:${slug}`);

    item.en = { title: titleCase(enTitle), summary: enSummary };
    item.enTexts = enTexts;
    item.hlTexts = hlTexts;
    item.hl = {
      title: hlTitleRaw
        .replace(/।/g, '')
        .replace(/\bmen\b/gi, 'mein')
        .split(/\s+/)
        .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join(' ')
        .trim(),
      summary: romanise(hlSummaryRaw, names),
    };

    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf8');
    console.log(`${slug}: done`);
  }

  const header = (name, note) => `import type { StoryCopy } from '../types';

/** ${note} */
export const ${name}: StoryCopy[] = [
`;

  const assetAlt = {
    hi: 'कहानी का मुख्य दृश्य',
    en: 'Story artwork',
    hl: 'Kahani ka mukhya drishya',
  };

  const hiStories = [];
  const enStories = [];
  const hlStories = [];

  for (const item of prepared) {
    const { entry } = item;
    const kickerHi = item.title.replace(/[!?]+$/, '').slice(0, 40);

    const toBlocks = (texts, alt) => {
      const blocks = [];
      let textIndex = 0;
      item.chunks.forEach((chunk, index) => {
        blocks.push({ kind: 'paragraph', text: texts[textIndex], dropCap: index === 0 });
        textIndex += 1;
        if (index === 2 || index === 6 || index === 10) {
          blocks.push({ kind: 'image', alt });
        }
      });
      return blocks;
    };

    hiStories.push({
      slug: entry.slug,
      title: item.title,
      author: 'संपादकीय',
      kicker: kickerHi,
      summary: item.summary,
      tags: item.tags.map((tag) => tag.hi),
      coverAlt: assetAlt.hi,
      contentNote: 'वयस्क थीम, अंतरंगता',
      blocks: toBlocks(
        item.chunks.map((chunk) => chunk.join(' ')),
        assetAlt.hi,
      ),
    });

    const hlTitle = item.hl.title.replace(/[.!]+$/, '');

    enStories.push({
      slug: entry.slug,
      title: item.en.title,
      author: 'The Editors',
      kicker: item.en.title.slice(0, 42),
      summary: item.en.summary,
      tags: item.tags.map((tag) => tag.en),
      coverAlt: assetAlt.en,
      contentNote: 'Adult themes, sensuality',
      blocks: toBlocks(item.enTexts, assetAlt.en),
    });

    hlStories.push({
      slug: entry.slug,
      title: hlTitle,
      author: 'The Editors',
      kicker: hlTitle.slice(0, 42),
      summary: item.hl.summary,
      tags: item.tags.map((tag) => tag.hl),
      coverAlt: assetAlt.hl,
      contentNote: 'Adult themes, sensuality',
      blocks: toBlocks(item.hlTexts, assetAlt.hl),
    });
  }

  fs.writeFileSync(
    path.resolve('src/content/copy/hi.batch.ts'),
    header('hiBatch', 'Imported batch — Hindi text from the supplied story pack.') +
      hiStories.map(renderStory).join('\n') +
      '\n];\n',
    'utf8',
  );
  fs.writeFileSync(
    path.resolve('src/content/copy/en.batch.ts'),
    header('enBatch', 'Imported batch — English translation of the supplied pack.') +
      enStories.map(renderStory).join('\n') +
      '\n];\n',
    'utf8',
  );
  fs.writeFileSync(
    path.resolve('src/content/copy/hinglish.batch.ts'),
    header(
      'hinglishBatch',
      'Imported batch — romanised Hindi of the supplied pack.',
    ) +
      hlStories.map(renderStory).join('\n') +
      '\n];\n',
    'utf8',
  );

  console.log(`done: ${prepared.length} stories`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

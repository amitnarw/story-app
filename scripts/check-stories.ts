import fs from 'fs';
import path from 'path';

import { enCopy } from '../src/content/copy/en';
import { hiCopy } from '../src/content/copy/hi';
import { hinglishCopy } from '../src/content/copy/hinglish';
import type { StoryCopy } from '../src/content/types';

const ROOT = process.cwd();
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');
const MANIFEST_FILE = path.join(ROOT, 'src', 'content', 'manifest.ts');

const copies: Record<string, StoryCopy[]> = {
  en: enCopy,
  hi: hiCopy,
  hinglish: hinglishCopy,
};

let errors = 0;

function fail(msg: string) {
  console.error(msg);
  errors += 1;
}

function describeBlock(block: { kind: string; dropCap?: boolean }) {
  return block.kind === 'paragraph' && block.dropCap ? 'paragraph+' : block.kind;
}

/**
 * The manifest is loaded as text instead of imported: it `require()`s PNGs,
 * which only resolve inside the app bundle, not under tsx in Node.
 */
function manifestSlugs(): string[] {
  const text = fs.readFileSync(MANIFEST_FILE, 'utf8');
  const slugs = [...text.matchAll(/slug: '([^']+)'/g)].map((match) => match[1]);
  if (slugs.length === 0) {
    fail(`[manifest] could not read any slugs from ${MANIFEST_FILE}`);
  }
  if (new Set(slugs).size !== slugs.length) {
    fail('[manifest] duplicate slugs in manifest');
  }
  return slugs;
}

function imagesOnDisk(slug: string): number {
  const dir = path.join(ASSETS_DIR, slug);
  if (!fs.existsSync(dir)) {
    fail(`[assets] missing assets dir for "${slug}": ${dir}`);
    return 0;
  }
  if (!fs.existsSync(path.join(dir, 'cover.png'))) {
    fail(`[assets] missing cover.png for "${slug}"`);
  }
  let count = 0;
  while (fs.existsSync(path.join(dir, `img-${count + 1}.png`))) {
    count += 1;
  }
  return count;
}

const slugs = manifestSlugs();
const imagesAvailable = new Map(slugs.map((slug) => [slug, imagesOnDisk(slug)]));

// 2. Every language copy must mirror the manifest and each other exactly:
// same slugs in the same order, same chapter counts, same block kinds and
// block counts per chapter, no empty text.
for (const [language, copy] of Object.entries(copies)) {
  const copySlugs = copy.map((story) => story.slug);
  if (copySlugs.length !== slugs.length) {
    fail(`[${language}] expected ${slugs.length} stories, found ${copySlugs.length}`);
  }
  copySlugs.forEach((slug, index) => {
    if (slug !== slugs[index]) {
      fail(`[${language}] slug at position ${index} is "${slug}", expected "${slugs[index]}"`);
    }
  });

  for (const story of copy) {
    const label = `[${language}] "${story.title}" (${story.slug})`;

    if (!story.title?.trim()) fail(`${label}: empty title`);
    if (!story.author?.trim()) fail(`${label}: empty author`);
    if (!story.kicker?.trim()) fail(`${label}: empty kicker`);
    if (!story.summary?.trim()) fail(`${label}: empty summary`);
    if (!story.coverAlt?.trim()) fail(`${label}: empty coverAlt`);
    if (!Array.isArray(story.tags) || story.tags.length === 0 || story.tags.some((t) => !t.trim())) {
      fail(`${label}: tags missing or empty`);
    }

    if (story.chapters.length === 0) {
      fail(`${label}: no chapters`);
      continue;
    }

    let imageBlocks = 0;

    story.chapters.forEach((chapter, chapterIndex) => {
      if (chapter.blocks.length === 0) {
        fail(`${label}: chapter ${chapterIndex + 1} has no blocks`);
        return;
      }
      const enStory = copies.en.find((item) => item.slug === story.slug);
      const enChapter = enStory?.chapters[chapterIndex];
      if (enChapter && chapter.blocks.length !== enChapter.blocks.length) {
        fail(
          `${label}: chapter ${chapterIndex + 1} has ${chapter.blocks.length} blocks, English has ${enChapter.blocks.length}`,
        );
      }
      if (enChapter?.title && !chapter.title?.trim()) {
        fail(`${label}: chapter ${chapterIndex + 1} title empty`);
      }

      chapter.blocks.forEach((block, blockIndex) => {
        const enBlock = enChapter?.blocks[blockIndex];
        if (enBlock && enBlock.kind !== block.kind) {
          fail(
            `${label}: chapter ${chapterIndex + 1} block ${blockIndex + 1} is "${block.kind}", English has "${enBlock.kind}"`,
          );
        }
        if (block.kind === 'paragraph' && !block.text?.trim()) {
          fail(`${label}: chapter ${chapterIndex + 1} block ${blockIndex + 1}: empty paragraph`);
        }
        if (block.kind === 'image') {
          imageBlocks += 1;
          if (!block.alt?.trim()) {
            fail(`${label}: chapter ${chapterIndex + 1} image block missing alt text`);
          }
        }
      });
    });

    const available = imagesAvailable.get(story.slug) ?? 0;
    if (imageBlocks > available) {
      fail(`${label}: ${imageBlocks} image blocks but only ${available} images on disk`);
    }

    // Exactly one drop cap per story, on the first paragraph of chapter 1.
    const dropCapBlocks = story.chapters.flatMap((chapter) =>
      chapter.blocks.filter((block) => block.kind === 'paragraph' && block.dropCap),
    );
    if (dropCapBlocks.length !== 1) {
      fail(`${label}: expected exactly 1 drop-cap paragraph, found ${dropCapBlocks.length}`);
    }
    const firstBlock = story.chapters[0]?.blocks[0];
    if (firstBlock?.kind !== 'paragraph' || !firstBlock.dropCap) {
      fail(`${label}: first block of chapter 1 is not a drop-cap paragraph`);
    }
  }
}

// 3. Cross-language shape check: every language must have the same block
// signature per story so the reader layout stays identical everywhere.
const signature = (story: StoryCopy) =>
  JSON.stringify(
    story.chapters.map((chapter) => [
      chapter.title !== undefined,
      chapter.blocks.map(describeBlock),
    ]),
  );
for (const story of copies.en) {
  const base = signature(story);
  for (const language of ['hi', 'hinglish'] as const) {
    const other = copies[language].find((item) => item.slug === story.slug);
    if (other && signature(other) !== base) {
      fail(
        `[${language}] "${story.slug}" chapter/block structure differs from English:\n` +
          `  en:        ${base}\n` +
          `  ${language}: ${signature(other)}`,
      );
    }
  }
}

if (errors === 0) {
  const languages = Object.keys(copies).join(', ');
  console.log(`[check-stories] OK — ${slugs.length} stories validated across ${languages}`);
} else {
  console.error(`[check-stories] FAILED — ${errors} error(s)`);
  process.exit(1);
}

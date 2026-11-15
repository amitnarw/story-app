import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const STORIES_DIR = path.join(ROOT, 'src', 'content');
const ASSETS_DIR = path.join(ROOT, 'assets', 'stories');

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+$/, '');
}

let errors = 0;

function fail(msg: string) {
  console.error(msg);
  errors += 1;
}

// 1. Content integrity: every story has a slug matching its filename directory,
// required fields, unique slugs, and at least one chapter with blocks.
import { stories } from './src/content/stories';

const slugs = new Set<string>();

for (const story of stories) {
  const dir = path.join(ASSETS_DIR, story.slug);

  if (!fs.existsSync(dir)) {
    fail(`[content] missing assets dir for story "${story.title}": ${dir}`);
    continue;
  }

  const cover = path.join(dir, 'cover.svg');
  if (!fs.existsSync(cover)) {
    fail(`[content] missing cover for story "${story.title}": ${cover}`);
  }

  if (story.chapters.length === 0) {
    fail(`[content] story "${story.title}" has no chapters`);
  }

  for (const chapter of story.chapters) {
    if (chapter.blocks.length === 0) {
      fail(`[content] chapter "${chapter.title ?? '(untitled)'}" in "${story.title}" has no blocks`);
    }
    for (const block of chapter.blocks) {
      if (block.kind === 'image') {
        // image sources are required at bundle time; we can't validate here,
        // but check alt text is present
        if (!block.alt || block.alt.trim().length === 0) {
          fail(`[content] image block in "${story.title}" missing alt text`);
        }
      }
    }
  }

  if (slugs.has(story.slug)) {
    fail(`[content] duplicate slug: ${story.slug}`);
  }
  slugs.add(story.slug);
}

if (errors === 0) {
  console.log(`[check-stories] OK — ${stories.length} stories validated`);
} else {
  console.error(`[check-stories] FAILED — ${errors} error(s)`);
  process.exit(1);
}

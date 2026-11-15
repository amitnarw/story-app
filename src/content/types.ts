import type { ImageSourcePropType } from 'react-native';

import type { StoryManifestEntry } from './manifest';

/**
 * Language-specific text for one story. Image blocks carry only alt/caption
 * here — the actual artwork comes from `manifest.ts` by ordinal, so artwork
 * and structure stay shared across languages.
 */
export type StoryCopyBlock =
  | { kind: 'paragraph'; text: string; dropCap?: boolean }
  | { kind: 'image'; alt: string; caption?: string };

export type StoryCopyChapter = {
  title?: string;
  blocks: StoryCopyBlock[];
};

export type StoryCopy = {
  slug: string;
  title: string;
  author: string;
  kicker: string;
  summary: string;
  tags: string[];
  coverAlt: string;
  chapters: StoryCopyChapter[];
};

/** Blocks as they appear in the merged runtime story. */
export type StoryBlock =
  | { kind: 'paragraph'; text: string; dropCap?: boolean }
  | { kind: 'heading'; text: string }
  | { kind: 'image'; source: ImageSourcePropType; alt: string; caption?: string }
  | { kind: 'quote'; text: string; cite?: string }
  | { kind: 'divider' };

export type StoryChapter = {
  title?: string;
  blocks: StoryBlock[];
};

/** A runtime story: manifest artwork + language copy, merged by `index.ts`. */
export type Story = StoryManifestEntry & StoryCopy;

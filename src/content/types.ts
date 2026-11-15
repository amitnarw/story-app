import type { ImageSourcePropType } from 'react-native';

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

export type Story = {
  slug: string;
  order: number;
  title: string;
  author: string;
  kicker: string;
  summary: string;
  minutes: number;
  tags: string[];
  cover: ImageSourcePropType;
  coverAlt: string;
  chapters: StoryChapter[];
};

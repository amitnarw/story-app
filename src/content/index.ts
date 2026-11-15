import { useMemo } from 'react';

import { dictionaries } from '@/i18n';
import type { Language } from '@/i18n/types';
import { useSettings } from '@/store/settings';

import { enCopy } from './copy/en';
import { hiCopy } from './copy/hi';
import { hinglishCopy } from './copy/hinglish';
import { manifestBySlug } from './manifest';
import type { Story, StoryCopy } from './types';

export type { Story, StoryCopy, StoryBlock, StoryChapter } from './types';

const copyByLanguage: Record<Language, StoryCopy[]> = {
  en: enCopy,
  hi: hiCopy,
  hinglish: hinglishCopy,
};

/**
 * Merge the language-independent manifest (artwork, order, minutes) with the
 * copy for one language. Image blocks in the copy carry alt/caption only and
 * are matched to manifest artwork by the order they appear.
 */
export function buildStories(language: Language): Story[] {
  const copy = copyByLanguage[language];
  const merged = copy.map((storyCopy) => {
    const entry = manifestBySlug.get(storyCopy.slug);
    if (!entry) {
      throw new Error(`[content] no manifest entry for slug "${storyCopy.slug}"`);
    }
    let imageOrdinal = 0;
    const chapters = storyCopy.chapters.map((chapter) => ({
      title: chapter.title,
      blocks: chapter.blocks.map((block) => {
        if (block.kind !== 'image') return block;
        imageOrdinal += 1;
        const source = entry.images[imageOrdinal - 1];
        if (!source) {
          throw new Error(
            `[content] story "${storyCopy.slug}" has more image blocks than the manifest provides`,
          );
        }
        return { kind: 'image' as const, source, alt: block.alt, caption: block.caption };
      }),
    }));
    return { ...entry, ...storyCopy, chapters };
  });
  return merged.sort((a, b) => a.order - b.order);
}

/** All stories for the active language. Re-sorted by library order. */
export function useStories(): Story[] {
  const language = useSettings((state) => state.language);
  return useMemo(() => buildStories(language), [language]);
}

/** One story by slug, in the active language. */
export function useStory(slug: string | undefined): Story | undefined {
  const stories = useStories();
  return useMemo(
    () => (slug ? stories.find((story) => story.slug === slug) : undefined),
    [stories, slug],
  );
}

/** The story that fronts the library and the onboarding screen. */
export function useFeatured(): Story {
  const stories = useStories();
  return stories[0];
}

export function storyProgressText(language: Language, minutes: number): string {
  const { progress } = dictionaries[language];
  if (minutes < 5) return progress.short;
  if (minutes < 12) return progress.quick;
  return progress.long;
}

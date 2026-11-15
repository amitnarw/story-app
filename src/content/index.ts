import { stories } from './stories';
import type { Story } from './types';

export { type Story } from './types';
export const allStories: Story[] = [...stories].sort((a, b) => a.order - b.order);

const storyBySlug = new Map(allStories.map((item) => [item.slug, item]));

export const featured = allStories[0];

export function getStory(slug: string | undefined): Story | undefined {
  return slug ? storyBySlug.get(slug) : undefined;
}

export function storyProgressText(minutes: number): string {
  if (minutes < 5) return 'A short read';
  if (minutes < 12) return 'A quick read';
  return 'A long, slow read';
}

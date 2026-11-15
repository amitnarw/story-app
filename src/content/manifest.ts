import type { ImageSourcePropType } from 'react-native';

/**
 * The language-independent skeleton of every story: order in the library,
 * reading time, and the artwork. Prose lives in `copy/<language>.ts` and is
 * merged onto these entries at build time — images and structure are shared
 * across all languages.
 */
export type StoryManifestEntry = {
  slug: string;
  order: number;
  minutes: number;
  cover: ImageSourcePropType;
  /** In-story images, in the order they appear in the copy. */
  images: ImageSourcePropType[];
};

export const manifest: StoryManifestEntry[] = [
  {
    slug: 'the-lamplighters-daughter',
    order: 1,
    minutes: 8,
    cover: require('../../assets/stories/the-lamplighters-daughter/cover.png'),
    images: [
      require('../../assets/stories/the-lamplighters-daughter/img-1.png'),
      require('../../assets/stories/the-lamplighters-daughter/img-2.png'),
    ],
  },
  {
    slug: 'a-room-with-yellow-curtains',
    order: 2,
    minutes: 7,
    cover: require('../../assets/stories/a-room-with-yellow-curtains/cover.png'),
    images: [
      require('../../assets/stories/a-room-with-yellow-curtains/img-1.png'),
      require('../../assets/stories/a-room-with-yellow-curtains/img-2.png'),
    ],
  },
  {
    slug: 'the-last-train-to-somewhere',
    order: 3,
    minutes: 9,
    cover: require('../../assets/stories/the-last-train-to-somewhere/cover.png'),
    images: [
      require('../../assets/stories/the-last-train-to-somewhere/img-1.png'),
      require('../../assets/stories/the-last-train-to-somewhere/img-2.png'),
    ],
  },
  {
    slug: 'what-the-orchard-kept',
    order: 4,
    minutes: 8,
    cover: require('../../assets/stories/what-the-orchard-kept/cover.png'),
    images: [
      require('../../assets/stories/what-the-orchard-kept/img-1.png'),
      require('../../assets/stories/what-the-orchard-kept/img-2.png'),
    ],
  },
  {
    slug: 'small-hours',
    order: 5,
    minutes: 7,
    cover: require('../../assets/stories/small-hours/cover.png'),
    images: [
      require('../../assets/stories/small-hours/img-1.png'),
      require('../../assets/stories/small-hours/img-2.png'),
    ],
  },
  {
    slug: 'the-cartographer-of-rain',
    order: 6,
    minutes: 8,
    cover: require('../../assets/stories/the-cartographer-of-rain/cover.png'),
    images: [
      require('../../assets/stories/the-cartographer-of-rain/img-1.png'),
      require('../../assets/stories/the-cartographer-of-rain/img-2.png'),
    ],
  },
];

export const manifestBySlug = new Map(manifest.map((entry) => [entry.slug, entry]));

import type { ImageSourcePropType } from 'react-native';

/**
 * The language-independent skeleton of every story: order in the library,
 * reading time, artwork, genre, and maturity rating. Prose lives in
 * `copy/<language>.ts` and is merged onto these entries at build time —
 * images and structure are shared across all languages.
 */
export type StoryGenre = 'romance' | 'mystery' | 'drama' | 'fantasy';

export type StoryManifestEntry = {
  slug: string;
  order: number;
  minutes: number;
  /** Portrait 2:3 cover — onboarding, search, story hero. */
  cover: ImageSourcePropType;
  /** Landscape 16:9 card cover — home grid cards. */
  cardCover: ImageSourcePropType;
  genre: StoryGenre;
  mature: boolean;
  /** In-story images, in the order they appear in the copy. */
  images: ImageSourcePropType[];
};

export const manifest: StoryManifestEntry[] = [
  {
    slug: 'the-lamplighters-daughter',
    order: 1,
    minutes: 8,
    genre: 'drama',
    mature: false,
    cover: require('../../assets/stories/the-lamplighters-daughter/cover.png'),
    cardCover: require('../../assets/stories/the-lamplighters-daughter/card-cover.png'),
    images: [
      require('../../assets/stories/the-lamplighters-daughter/img-1.png'),
      require('../../assets/stories/the-lamplighters-daughter/img-2.png'),
    ],
  },
  {
    slug: 'a-room-with-yellow-curtains',
    order: 2,
    minutes: 7,
    genre: 'mystery',
    mature: false,
    cover: require('../../assets/stories/a-room-with-yellow-curtains/cover.png'),
    cardCover: require('../../assets/stories/a-room-with-yellow-curtains/card-cover.png'),
    images: [
      require('../../assets/stories/a-room-with-yellow-curtains/img-1.png'),
      require('../../assets/stories/a-room-with-yellow-curtains/img-2.png'),
    ],
  },
  {
    slug: 'the-last-train-to-somewhere',
    order: 3,
    minutes: 9,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/the-last-train-to-somewhere/cover.png'),
    cardCover: require('../../assets/stories/the-last-train-to-somewhere/card-cover.png'),
    images: [
      require('../../assets/stories/the-last-train-to-somewhere/img-1.png'),
      require('../../assets/stories/the-last-train-to-somewhere/img-2.png'),
    ],
  },
  {
    slug: 'what-the-orchard-kept',
    order: 4,
    minutes: 8,
    genre: 'drama',
    mature: false,
    cover: require('../../assets/stories/what-the-orchard-kept/cover.png'),
    cardCover: require('../../assets/stories/what-the-orchard-kept/card-cover.png'),
    images: [
      require('../../assets/stories/what-the-orchard-kept/img-1.png'),
      require('../../assets/stories/what-the-orchard-kept/img-2.png'),
    ],
  },
  {
    slug: 'small-hours',
    order: 5,
    minutes: 7,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/small-hours/cover.png'),
    cardCover: require('../../assets/stories/small-hours/card-cover.png'),
    images: [
      require('../../assets/stories/small-hours/img-1.png'),
      require('../../assets/stories/small-hours/img-2.png'),
    ],
  },
  {
    slug: 'the-cartographer-of-rain',
    order: 6,
    minutes: 8,
    genre: 'fantasy',
    mature: false,
    cover: require('../../assets/stories/the-cartographer-of-rain/cover.png'),
    cardCover: require('../../assets/stories/the-cartographer-of-rain/card-cover.png'),
    images: [
      require('../../assets/stories/the-cartographer-of-rain/img-1.png'),
      require('../../assets/stories/the-cartographer-of-rain/img-2.png'),
    ],
  },
  {
    slug: 'the-guest-house-at-midnight',
    order: 7,
    minutes: 8,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/the-guest-house-at-midnight/cover.png'),
    cardCover: require('../../assets/stories/the-guest-house-at-midnight/card-cover.png'),
    images: [
      require('../../assets/stories/the-guest-house-at-midnight/img-1.png'),
      require('../../assets/stories/the-guest-house-at-midnight/img-2.png'),
    ],
  },
  {
    slug: 'a-season-in-the-hills',
    order: 8,
    minutes: 7,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/a-season-in-the-hills/cover.png'),
    cardCover: require('../../assets/stories/a-season-in-the-hills/card-cover.png'),
    images: [
      require('../../assets/stories/a-season-in-the-hills/img-1.png'),
      require('../../assets/stories/a-season-in-the-hills/img-2.png'),
    ],
  },
  {
    slug: 'the-photographers-wife',
    order: 9,
    minutes: 9,
    genre: 'drama',
    mature: true,
    cover: require('../../assets/stories/the-photographers-wife/cover.png'),
    cardCover: require('../../assets/stories/the-photographers-wife/card-cover.png'),
    images: [
      require('../../assets/stories/the-photographers-wife/img-1.png'),
      require('../../assets/stories/the-photographers-wife/img-2.png'),
    ],
  },
  {
    slug: 'after-the-last-metro',
    order: 10,
    minutes: 8,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/after-the-last-metro/cover.png'),
    cardCover: require('../../assets/stories/after-the-last-metro/card-cover.png'),
    images: [
      require('../../assets/stories/after-the-last-metro/img-1.png'),
      require('../../assets/stories/after-the-last-metro/img-2.png'),
    ],
  },
  {
    slug: 'the-monsoon-letters',
    order: 11,
    minutes: 7,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/the-monsoon-letters/cover.png'),
    cardCover: require('../../assets/stories/the-monsoon-letters/card-cover.png'),
    images: [
      require('../../assets/stories/the-monsoon-letters/img-1.png'),
      require('../../assets/stories/the-monsoon-letters/img-2.png'),
    ],
  },
  {
    slug: 'room-14-third-floor',
    order: 12,
    minutes: 8,
    genre: 'mystery',
    mature: true,
    cover: require('../../assets/stories/room-14-third-floor/cover.png'),
    cardCover: require('../../assets/stories/room-14-third-floor/card-cover.png'),
    images: [
      require('../../assets/stories/room-14-third-floor/img-1.png'),
      require('../../assets/stories/room-14-third-floor/img-2.png'),
    ],
  },
  {
    slug: 'what-the-dark-kept',
    order: 13,
    minutes: 9,
    genre: 'drama',
    mature: true,
    cover: require('../../assets/stories/what-the-dark-kept/cover.png'),
    cardCover: require('../../assets/stories/what-the-dark-kept/card-cover.png'),
    images: [
      require('../../assets/stories/what-the-dark-kept/img-1.png'),
      require('../../assets/stories/what-the-dark-kept/img-2.png'),
    ],
  },
  {
    slug: 'the-taste-of-salt',
    order: 14,
    minutes: 8,
    genre: 'romance',
    mature: true,
    cover: require('../../assets/stories/the-taste-of-salt/cover.png'),
    cardCover: require('../../assets/stories/the-taste-of-salt/card-cover.png'),
    images: [
      require('../../assets/stories/the-taste-of-salt/img-1.png'),
      require('../../assets/stories/the-taste-of-salt/img-2.png'),
    ],
  },
];

export const manifestBySlug = new Map(manifest.map((entry) => [entry.slug, entry]));

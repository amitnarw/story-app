import type { AudioSource } from 'expo-audio';
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
  /**
   * Optional narration. `language` is the language actually spoken, which may
   * differ from the text the reader is currently showing.
   */
  audio?: {
    language: 'hi' | 'en' | 'hinglish';
    source: AudioSource;
  };
};

const ASSETS_BASE = 'https://nritraders.com/app/story_app_1';

const storyAsset = (slug: string) => ({
  cover: { uri: `${ASSETS_BASE}/${slug}/card-cover.jpg`, width: 1200, height: 675 },
  cardCover: { uri: `${ASSETS_BASE}/${slug}/card-cover.jpg`, width: 1200, height: 675 },
  images: [
    { uri: `${ASSETS_BASE}/${slug}/img-1.jpg`, width: 1200, height: 675 },
    { uri: `${ASSETS_BASE}/${slug}/img-2.jpg`, width: 1200, height: 675 },
    { uri: `${ASSETS_BASE}/${slug}/img-3.jpg`, width: 1200, height: 675 },
  ],
  audio: {
    language: 'hi' as const,
    source: { uri: `${ASSETS_BASE}/${slug}/audio-hi.mp3` },
  },
});

export const manifest: StoryManifestEntry[] = [
  {
    slug: 'neeli-saree',
    order: 1,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('neeli-saree'),
  },
  {
    slug: 'kirayedar-ki-jhijhak',
    order: 2,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('kirayedar-ki-jhijhak'),
  },
  {
    slug: 'bas-itni-si-jagah',
    order: 3,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('bas-itni-si-jagah'),
  },
  {
    slug: 'holi-ka-ek-rang',
    order: 4,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('holi-ka-ek-rang'),
  },
  {
    slug: 'muskaan-ka-raaz',
    order: 5,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('muskaan-ka-raaz'),
  },
  {
    slug: 'aadhi-raat-ki-muskaan',
    order: 6,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('aadhi-raat-ki-muskaan'),
  },
  {
    slug: 'aadhi-raat-ki-phusphusahat',
    order: 7,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('aadhi-raat-ki-phusphusahat'),
  },
  {
    slug: 'khidki-wala-raaz',
    order: 8,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('khidki-wala-raaz'),
  },
  {
    slug: 'aadhi-raat-ki-hansi',
    order: 9,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('aadhi-raat-ki-hansi'),
  },
  {
    slug: 'muskaan-ka-naya-raaz',
    order: 10,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('muskaan-ka-naya-raaz'),
  },
  {
    slug: 'baramde-ka-raaz',
    order: 11,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('baramde-ka-raaz'),
  },
  {
    slug: 'wo-ek-mulaqaat',
    order: 12,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('wo-ek-mulaqaat'),
  },
  {
    slug: 'itni-si-himmat',
    order: 13,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('itni-si-himmat'),
  },
  {
    slug: 'dosti-se-zara-aage',
    order: 14,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('dosti-se-zara-aage'),
  },
  {
    slug: 'phir-wahi-jhijhak',
    order: 15,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('phir-wahi-jhijhak'),
  },
  {
    slug: 'chhat-par-badhi-nazdeekiyan',
    order: 16,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('chhat-par-badhi-nazdeekiyan'),
  },
  {
    slug: 'rasoi-mein-chhupa-raaz',
    order: 17,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-mein-chhupa-raaz'),
  },
  {
    slug: 'ek-baar-phir-pyaar',
    order: 18,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('ek-baar-phir-pyaar'),
  },
  {
    slug: 'rasoi-mein-chhupa-pyaar',
    order: 19,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-mein-chhupa-pyaar'),
  },
  {
    slug: 'rasoi-ka-ankaha-raaz',
    order: 20,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-ka-ankaha-raaz'),
  },
  {
    slug: 'bahu-aur-sasur-ki-mulaqaat',
    order: 21,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('bahu-aur-sasur-ki-mulaqaat'),
  },
  {
    slug: 'purane-pyaar-ki-mulaqaat',
    order: 22,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('purane-pyaar-ki-mulaqaat'),
  },
  {
    slug: 'rasoi-mein-dil-ka-raaz',
    order: 23,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-mein-dil-ka-raaz'),
  },
  {
    slug: 'aaine-mein-chhupa-raaz',
    order: 24,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('aaine-mein-chhupa-raaz'),
  },
  {
    slug: 'akeli-bahu-ka-raaz',
    order: 25,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('akeli-bahu-ka-raaz'),
  },
  {
    slug: 'makan-malikin-ki-mohabbat',
    order: 26,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('makan-malikin-ki-mohabbat'),
  },
  {
    slug: 'akeli-bahu-aur-sasur',
    order: 27,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('akeli-bahu-aur-sasur'),
  },
  {
    slug: 'chupke-se-badhi-nazdeekiyan',
    order: 28,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('chupke-se-badhi-nazdeekiyan'),
  },
  {
    slug: 'dewar-ki-bahon-mein-bhabhi',
    order: 29,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('dewar-ki-bahon-mein-bhabhi'),
  },
  {
    slug: 'chhupi-nazdeekiyon-ka-raaz',
    order: 30,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('chhupi-nazdeekiyon-ka-raaz'),
  },
  {
    slug: 'rasoi-mein-chhupi-nazdeekiyan',
    order: 31,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-mein-chhupi-nazdeekiyan'),
  },
  {
    slug: 'college-ki-madam',
    order: 32,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('college-ki-madam'),
  },
  {
    slug: 'makan-malik-ki-betii',
    order: 33,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('makan-malik-ki-betii'),
  },
  {
    slug: 'bahu-aur-sasur-ki-anokhi-kahani',
    order: 34,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('bahu-aur-sasur-ki-anokhi-kahani'),
  },
  {
    slug: 'rasoi-mein-bahu-aur-sasur',
    order: 35,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('rasoi-mein-bahu-aur-sasur'),
  },
  {
    slug: 'purane-dost-ka-raaz',
    order: 36,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('purane-dost-ka-raaz'),
  },
  {
    slug: 'chhat-par-dewar-aur-bhabhi',
    order: 37,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('chhat-par-dewar-aur-bhabhi'),
  },
  {
    slug: 'akeli-makan-malikin',
    order: 38,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('akeli-makan-malikin'),
  },
  {
    slug: 'purane-premi-ka-raaz',
    order: 39,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('purane-premi-ka-raaz'),
  },
  {
    slug: 'makan-malikin-ki-nayi-mohabbat',
    order: 40,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('makan-malikin-ki-nayi-mohabbat'),
  },
  {
    slug: 'shaadi-se-pehle-wada',
    order: 41,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('shaadi-se-pehle-wada'),
  },
  {
    slug: 'mangetar-ka-ankaha-raaz',
    order: 42,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('mangetar-ka-ankaha-raaz'),
  },
  {
    slug: 'purane-pyaar-ka-ankaha-raaz',
    order: 43,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('purane-pyaar-ka-ankaha-raaz'),
  },
  {
    slug: 'office-ka-raaz',
    order: 44,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('office-ka-raaz'),
  },
  {
    slug: 'jab-dosti-mohabbat-bani',
    order: 45,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('jab-dosti-mohabbat-bani'),
  },
  {
    slug: 'bas-ek-ichchha',
    order: 46,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('bas-ek-ichchha'),
  },
  {
    slug: 'patni-ki-ek-baat',
    order: 47,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('patni-ki-ek-baat'),
  },
  {
    slug: 'ek-kamra-do-saheliyan',
    order: 48,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('ek-kamra-do-saheliyan'),
  },
  {
    slug: 'jethani-ke-kamre-mein-dewar',
    order: 49,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('jethani-ke-kamre-mein-dewar'),
  },
  {
    slug: 'bhabhi-ka-chupke-se-ishara',
    order: 50,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('bhabhi-ka-chupke-se-ishara'),
  },
  {
    slug: 'office-ki-malikin-aur-driver',
    order: 51,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('office-ki-malikin-aur-driver'),
  },
  {
    slug: 'chhat-wali-mohabbat',
    order: 52,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('chhat-wali-mohabbat'),
  },
  {
    slug: 'saas-aur-damad',
    order: 53,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('saas-aur-damad'),
  },
  {
    slug: 'padosan-ne-aadhi-raat-ko-kaha',
    order: 54,
    minutes: 3,
    genre: 'romance',
    mature: true,
    ...storyAsset('padosan-ne-aadhi-raat-ko-kaha'),
  },
  {
    slug: 'dost-ki-girlfriend-ka-raaz',
    order: 55,
    minutes: 2,
    genre: 'romance',
    mature: true,
    ...storyAsset('dost-ki-girlfriend-ka-raaz'),
  },
];

export const manifestBySlug = new Map(manifest.map((entry) => [entry.slug, entry]));

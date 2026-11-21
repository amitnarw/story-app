/**
 * Feature flags.
 *
 * Keep these plain booleans so every branch is easy to audit.
 */
export const features = {
  /** Hidden 18+ gate — not used in Romantic Stories, kept for API compatibility. */
  ageGate: false,
  /** Show interstitial ads at natural breaks. */
  interstitialAds: true,
  /** Show banner ads in list footers. */
  bannerAds: true,
} as const;

export type FeatureKey = keyof typeof features;

/**
 * Ad provider interface. Romantic Stories uses AdMob test units by default.
 */

export type AdKind = 'banner' | 'interstitial' | 'rewarded' | 'appOpen';

export type AdOutcome =
  | { kind: 'ok' }
  | { kind: 'earned' }
  | { kind: 'no-fill'; zoneId: string }
  | { kind: 'error'; zoneId: string; message: string }
  | { kind: 'capped'; reason: 'frequency' | 'first-open' }
  | { kind: 'user-closed' };

export interface AdProvider {
  name: string;
  initialize(): Promise<void>;
  requestBanner(zoneId: string): Promise<AdOutcome>;
  showInterstitial(zoneId: string): Promise<AdOutcome>;
  showRewarded(zoneId: string): Promise<AdOutcome>;
  showAppOpen(zoneId: string): Promise<AdOutcome>;
}

export type AdCaps = {
  appOpenShown: boolean;
  interstitialCount: number;
  bannerCount: number;
};

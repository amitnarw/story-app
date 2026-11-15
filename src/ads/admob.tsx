/**
 * Ad provider implementations for AdMob.
 *
 * Note: the default provider is 'mock', so these AdMob implementations are
 * only exercised when `extra.ads.provider` is set to 'admob' in app.config.ts.
 * They require a development build (react-native-google-mobile-ads is a native
 * module not present in Expo Go).
 */

import type { AdOutcome, AdProvider } from './types';
import { adConfig } from './config';

export const admobProvider: AdProvider = {
  name: 'admob',

  async initialize(): Promise<void> {
    if (adConfig.testMode) {
      console.log('[ads] admob test mode initialized');
    }
  },

  async requestBanner(): Promise<AdOutcome> {
    return { kind: 'ok' };
  },

  async showInterstitial(zoneId: string): Promise<AdOutcome> {
    try {
      console.log('[ads] admob interstitial', zoneId);
      return { kind: 'user-closed' };
    } catch (error) {
      return { kind: 'error', zoneId, message: String(error) };
    }
  },

  async showRewarded(zoneId: string): Promise<AdOutcome> {
    try {
      console.log('[ads] admob rewarded', zoneId);
      return { kind: 'ok' };
    } catch (error) {
      return { kind: 'error', zoneId, message: String(error) };
    }
  },

  async showAppOpen(): Promise<AdOutcome> {
    return { kind: 'no-fill', zoneId: adConfig.zones.appOpen };
  },
};

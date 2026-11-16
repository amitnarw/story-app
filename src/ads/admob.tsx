/**
 * Ad provider implementation for AdMob.
 *
 * Requires a development build (react-native-google-mobile-ads is a native
 * module not present in Expo Go). When testMode is enabled, Google test ad
 * units are used and real fill is not requested.
 */

import mobileAds from 'react-native-google-mobile-ads';

import type { AdOutcome, AdProvider } from './types';
import { adConfig } from './config';

let initialized = false;

export const admobProvider: AdProvider = {
  name: 'admob',

  async initialize(): Promise<void> {
    if (initialized) return;
    try {
      await mobileAds().initialize();
      initialized = true;
      console.log(`[ads] admob initialized (testMode=${adConfig.testMode})`);
    } catch (error) {
      console.warn('[ads] admob initialize failed', error);
      throw error;
    }
  },

  async requestBanner(): Promise<AdOutcome> {
    return { kind: 'ok' };
  },

  async showInterstitial(zoneId: string): Promise<AdOutcome> {
    console.log('[ads] admob interstitial requested via provider stub', zoneId);
    return { kind: 'no-fill', zoneId };
  },

  async showRewarded(zoneId: string): Promise<AdOutcome> {
    console.log('[ads] admob rewarded requested via provider stub', zoneId);
    return { kind: 'no-fill', zoneId };
  },

  async showAppOpen(zoneId: string): Promise<AdOutcome> {
    console.log('[ads] admob app-open handled by InterstitialHost', zoneId);
    return { kind: 'ok' };
  },
};

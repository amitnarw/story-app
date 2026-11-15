/**
 * Local mock provider for development. Simulates fill/no-fill/latency
 * and logs impressions to the console. Safe to use without a dev build.
 */

import type { AdOutcome, AdProvider } from './types';

export const mockProvider: AdProvider = {
  name: 'mock',

  async initialize(): Promise<void> {
    console.log('[ads] mock provider initialized');
  },

  async requestBanner(): Promise<AdOutcome> {
    return { kind: 'ok' };
  },

  async showInterstitial(): Promise<AdOutcome> {
    console.log('[ads] mock interstitial shown');
    return { kind: 'user-closed' };
  },

  async showRewarded(): Promise<AdOutcome> {
    console.log('[ads] mock rewarded shown');
    return { kind: 'ok' };
  },

  async showAppOpen(): Promise<AdOutcome> {
    console.log('[ads] mock app-open shown');
    return { kind: 'user-closed' };
  },
};

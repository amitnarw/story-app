import { useCallback, useState } from 'react';

import { features } from '@/config/features';
import { useSettings } from '@/store/settings';
import { useUIStore } from '@/store/ui';
import { admobProvider } from './admob';
import { adConfig, type AdConfig } from './config';
import { mockProvider } from './mock';
import type { AdCaps, AdOutcome, AdProvider } from './types';

function resolveProvider(config: AdConfig): AdProvider {
  switch (config.provider) {
    case 'admob':
      return admobProvider;
    case 'webview':
      return mockProvider;
    case 'mock':
    default:
      return mockProvider;
  }
}

let provider: AdProvider | null = null;
let initPromise: Promise<void> | null = null;
const caps: AdCaps = { appOpenShown: false, interstitialCount: 0, bannerCount: 0 };

let interstitialTrigger: ((zoneId: string) => Promise<AdOutcome>) | null = null;
let rewardedShow: (() => Promise<AdOutcome>) | null = null;
let storyCloseCount = 0;
const INTERSTITIAL_EVERY_N_STORY_CLOSES = 2;

export function registerInterstitialTrigger(fn: ((zoneId: string) => Promise<AdOutcome>) | null) {
  interstitialTrigger = fn;
}

export function hasInterstitialTrigger() {
  return interstitialTrigger != null;
}

export function registerRewardedShow(fn: (() => Promise<AdOutcome>) | null) {
  rewardedShow = fn;
}

export function showRewarded(): Promise<AdOutcome> {
  if (!rewardedShow) {
    return Promise.resolve({ kind: 'no-fill', zoneId: 'rewarded' });
  }
  return rewardedShow();
}

export function initAds(): Promise<void> {
  if (initPromise) return initPromise;
  provider = resolveProvider(adConfig);
  initPromise = provider
    .initialize()
    .then(() => {
      console.log(`[ads] provider=${provider?.name} testMode=${adConfig.testMode}`);
    })
    .catch((error) => {
      console.warn('[ads] initialize failed', error);
    });
  return initPromise;
}

export function getProvider(): AdProvider | null {
  return provider;
}

export function recordBanner() {
  caps.bannerCount += 1;
}

export function canShowInterstitial({
  firstOpen,
  adsConsented,
}: {
  firstOpen: boolean;
  adsConsented: boolean;
}): boolean {
  if (!features.interstitialAds) return false;
  if (!adsConsented) return false;
  if (firstOpen && !adConfig.interstitialOnFirstOpen) return false;
  if (caps.interstitialCount >= adConfig.interstitialCapPerSession) return false;
  return true;
}

export function recordInterstitial() {
  caps.interstitialCount += 1;
}

export function getCaps(): AdCaps {
  return { ...caps };
}

/**
 * Natural break: the user leaves a story and returns to the feed. Ask the
 * Home screen to show an interstitial every few story completions — never on
 * first open, never on app launch/exit.
 *
 * The request is queued in the UI store instead of being dropped, so it still
 * resolves when the ad bridge finishes loading a moment later.
 */
export function markStoryClosedForInterstitial(): void {
  if (!features.interstitialAds) return;
  storyCloseCount += 1;
  const due = storyCloseCount % INTERSTITIAL_EVERY_N_STORY_CLOSES === 0;
  console.log(`[ads] story closed (${storyCloseCount}), due=${due}`);
  if (!due) return;
  if (!useSettings.getState().adsConsented) return;
  useUIStore.getState().requestInterstitial();
}

export const useInterstitial = ({
  firstOpen = false,
}: {
  firstOpen?: boolean;
} = {}) => {
  const [showing, setShowing] = useState(false);
  const adsConsented = useSettings((state) => state.adsConsented);

  const show = useCallback(
    async (zoneId: string): Promise<AdOutcome | undefined> => {
      if (!adsConsented) return;
      if (!interstitialTrigger) {
        console.log('[ads] interstitial trigger not ready');
        return { kind: 'error', zoneId, message: 'interstitial trigger not ready' };
      }
      if (!canShowInterstitial({ firstOpen, adsConsented })) {
        console.log('[ads] interstitial blocked by caps/consent/first-open');
        return;
      }
      setShowing(true);
      try {
        const outcome = await interstitialTrigger(zoneId);
        console.log('[ads] interstitial outcome', outcome?.kind, outcome);
        // Only a real impression should count against the session cap.
        if (outcome && outcome.kind !== 'error' && outcome.kind !== 'no-fill') {
          recordInterstitial();
        }
        return outcome;
      } finally {
        setShowing(false);
      }
    },
    [firstOpen, adsConsented],
  );

  return { show, showing };
};

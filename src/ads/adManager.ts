import { useCallback, useState } from 'react';

import { features } from '@/config/features';
import { useSettings } from '@/store/settings';
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

export function registerInterstitialTrigger(fn: ((zoneId: string) => Promise<AdOutcome>) | null) {
  interstitialTrigger = fn;
}

export function hasInterstitialTrigger() {
  return interstitialTrigger != null;
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

export function consumePendingInterstitial(): boolean {
  return false;
}

export function setPendingInterstitial(pending: boolean) {}

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
      if (!canShowInterstitial({ firstOpen, adsConsented })) return;
      setShowing(true);
      try {
        const outcome = await interstitialTrigger(zoneId);
        if (outcome?.kind !== 'error') {
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

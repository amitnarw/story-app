import { useEffect, useRef } from 'react';
import { TestIds, useAppOpenAdManager, useInterstitialAd } from 'react-native-google-mobile-ads';

import { registerInterstitialTrigger } from '@/ads/adManager';
import { adConfig } from '@/ads/config';
import type { AdOutcome } from '@/ads/types';
import { useSettings } from '@/store/settings';

/** How long the trigger waits for an ad to finish loading before giving up. */
const LOAD_WAIT_MS = 8000;
const LOAD_POLL_MS = 300;
/** How long to wait for the shown ad to be dismissed. */
const SHOW_WAIT_MS = 120_000;

function InterstitialBridge() {
  const adsConsented = useSettings((state) => state.adsConsented);
  const adUnitId =
    adConfig.testMode ? TestIds.INTERSTITIAL : adConfig.zones.interstitial || null;

  const { status, show, retry } = useInterstitialAd({
    adUnitId: adsConsented ? adUnitId : null,
    autoLoad: false,
  });

  // The trigger is registered once and reads live state through refs, so a
  // request queued while the ad is still loading is not silently dropped.
  const statusRef = useRef(status);
  const showRef = useRef(show);
  const retryRef = useRef(retry);

  useEffect(() => {
    statusRef.current = status;
    showRef.current = show;
    retryRef.current = retry;
  }, [status, show, retry]);

  useEffect(() => {
    if (adsConsented && status === 'idle') {
      retry();
    }
  }, [adsConsented, status, retry]);

  useEffect(() => {
    console.log('[ads] interstitial status', status);
  }, [status]);

  useEffect(() => {
    if (!adsConsented) {
      registerInterstitialTrigger(null);
      return;
    }

    const waitForStatus = (accept: (value: string) => boolean, timeoutMs: number) =>
      new Promise<string>((resolve) => {
        const startedAt = Date.now();
        const poll = () => {
          const current = statusRef.current;
          if (accept(current) || Date.now() - startedAt >= timeoutMs) {
            return resolve(current);
          }
          setTimeout(poll, LOAD_POLL_MS);
        };
        setTimeout(poll, LOAD_POLL_MS);
      });

    const trigger = async (zoneId: string): Promise<AdOutcome> => {
      if (statusRef.current !== 'loaded') {
        // Ask for a load, then wait for it. A cold start can still be loading
        // when the first story closes.
        if (statusRef.current === 'idle' || statusRef.current === 'closed') {
          retryRef.current();
        }
        const settled = await waitForStatus(
          (current) => current === 'loaded' || current === 'no-fill' || current === 'error',
          LOAD_WAIT_MS,
        );
        if (settled !== 'loaded') {
          return { kind: 'no-fill', zoneId };
        }
      }

      try {
        showRef.current();
      } catch (error) {
        return { kind: 'error', zoneId, message: String(error) };
      }

      // Resolve only when the ad is dismissed, so the outcome reflects a real
      // impression rather than an optimistic "shown".
      const settled = await waitForStatus(
        (current) => current === 'closed' || current === 'error',
        SHOW_WAIT_MS,
      );
      if (settled === 'error') {
        return { kind: 'error', zoneId, message: 'interstitial failed to show' };
      }
      return { kind: 'user-closed' };
    };

    registerInterstitialTrigger(trigger);
    return () => {
      registerInterstitialTrigger(null);
    };
  }, [adsConsented]);

  // Keep inventory warm without a request storm: reload quickly after a shown
  // ad closes, and back off after no-fill / error.
  useEffect(() => {
    if (status === 'closed') {
      const timer = setTimeout(() => retryRef.current(), 1200);
      return () => clearTimeout(timer);
    }
    if (status === 'no-fill' || status === 'error') {
      const timer = setTimeout(() => retryRef.current(), 30_000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [status]);

  return null;
}

export function InterstitialHost({ children }: { children: React.ReactNode }) {
  const adsConsented = useSettings((state) => state.adsConsented);
  const appOpenUnitId =
    adConfig.testMode ? TestIds.APP_OPEN : adConfig.zones.appOpen || null;

  useAppOpenAdManager({
    adUnitId: adsConsented ? appOpenUnitId : null,
  });

  return (
    <>
      <InterstitialBridge />
      {children}
    </>
  );
}

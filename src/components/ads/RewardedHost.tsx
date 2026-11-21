import { useEffect, useRef } from 'react';
import { TestIds, useRewardedAd } from 'react-native-google-mobile-ads';

import { adConfig } from '@/ads/config';
import { registerRewardedShow } from '@/ads/adManager';
import type { AdOutcome } from '@/ads/types';
import { useSettings } from '@/store/settings';

/**
 * Mounts once (in the root layout) and owns the rewarded ad placement.
 * Callers (the story audio unlock) request a rewarded ad through
 * `showRewarded()`; the returned promise resolves only after the user earns
 * the reward, closes the ad, or the placement fails.
 */
export function RewardedHost() {
  const adsConsented = useSettings((state) => state.adsConsented);

  const adUnitId = adConfig.testMode ? TestIds.REWARDED : adConfig.zones.rewarded || null;

  const { status, show, retry, earnedReward } = useRewardedAd({
    adUnitId: adsConsented ? adUnitId : null,
    autoLoad: true,
  });

  const pendingResolve = useRef<((outcome: AdOutcome) => void) | null>(null);
  const retriedRef = useRef(false);

  // One delayed retry after a real load failure. Never a retry loop.
  useEffect(() => {
    if (status !== 'error' || retriedRef.current) return;
    retriedRef.current = true;
    const timer = setTimeout(() => retry(), 5000);
    return () => clearTimeout(timer);
  }, [status, retry]);

  // Keep inventory warm so the next unlock tap shows an ad immediately.
  useEffect(() => {
    if (status !== 'closed') return;
    const timer = setTimeout(() => retry(), 1500);
    return () => clearTimeout(timer);
  }, [status, retry]);

  // Resolve the pending request: reward earned, ad closed, or show failed.
  useEffect(() => {
    const resolve = pendingResolve.current;
    if (!resolve) return;

    if (earnedReward) {
      pendingResolve.current = null;
      resolve({ kind: 'earned' });
      return;
    }

    if (status === 'closed') {
      pendingResolve.current = null;
      resolve({ kind: 'user-closed' });
      return;
    }

    if (status === 'error') {
      pendingResolve.current = null;
      resolve({
        kind: 'error',
        zoneId: adUnitId ?? '',
        message: 'rewarded ad failed to show',
      });
    }
  }, [earnedReward, status, adUnitId]);

  // Do not leave a caller waiting if the host unmounts.
  useEffect(
    () => () => {
      pendingResolve.current?.({ kind: 'user-closed' });
      pendingResolve.current = null;
    },
    [],
  );

  // Register the imperative show function used by the audio unlock flow.
  useEffect(() => {
    if (!adsConsented) {
      registerRewardedShow(null);
      return;
    }

    const showRewarded = (): Promise<AdOutcome> => {
      if (pendingResolve.current) {
        return Promise.resolve({ kind: 'user-closed' });
      }
      if (status !== 'loaded') {
        // Warm the placement so a later tap can succeed.
        retry();
        return Promise.resolve({ kind: 'no-fill', zoneId: adUnitId ?? '' });
      }
      return new Promise((resolve) => {
        pendingResolve.current = resolve;
        try {
          show();
        } catch (error) {
          pendingResolve.current = null;
          resolve({ kind: 'error', zoneId: adUnitId ?? '', message: String(error) });
        }
      });
    };

    registerRewardedShow(showRewarded);
    return () => registerRewardedShow(null);
  }, [adsConsented, status, adUnitId, retry, show]);

  return null;
}

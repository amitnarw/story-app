import { useEffect } from 'react';
import { TestIds, useAppOpenAdManager, useInterstitialAd } from 'react-native-google-mobile-ads';

import { registerInterstitialTrigger } from '@/ads/adManager';
import { adConfig } from '@/ads/config';
import type { AdOutcome } from '@/ads/types';
import { useSettings } from '@/store/settings';

function InterstitialBridge() {
  const adsConsented = useSettings((state) => state.adsConsented);
  const adUnitId =
    adConfig.testMode ? TestIds.INTERSTITIAL : adConfig.zones.interstitial || null;

  const { status, show, retry } = useInterstitialAd({
    adUnitId: adsConsented ? adUnitId : null,
    autoLoad: false,
  });

  useEffect(() => {
    if (adsConsented && status === 'idle') {
      retry();
    }
  }, [adsConsented, status, retry]);

  useEffect(() => {
    if (!adsConsented) {
      registerInterstitialTrigger(null);
      return;
    }

    const trigger = (_zoneId: string): Promise<AdOutcome> => {
      if (status === 'loaded') {
        try {
          show();
          return Promise.resolve({ kind: 'user-closed' });
        } catch (error) {
          return Promise.resolve({
            kind: 'error',
            zoneId: _zoneId,
            message: String(error),
          });
        }
      }

      if (status === 'no-fill') {
        return Promise.resolve({ kind: 'no-fill', zoneId: _zoneId });
      }

      if (status === 'error') {
        return Promise.resolve({
          kind: 'error',
          zoneId: _zoneId,
          message: 'interstitial failed to load',
        });
      }

      if (status === 'idle') {
        retry();
      }

      return Promise.resolve({
        kind: 'no-fill',
        zoneId: _zoneId,
      });
    };

    registerInterstitialTrigger(trigger);
    return () => {
      registerInterstitialTrigger(null);
    };
  }, [adsConsented, status, show, retry]);

  useEffect(() => {
    if (status === 'closed' || status === 'no-fill' || status === 'error') {
      retry();
    }
  }, [status, retry]);

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

import { useAppOpenAdManager } from 'react-native-google-mobile-ads';

import { adConfig } from '@/ads/config';

export function InterstitialHost({ children }: { children: React.ReactNode }) {
  useAppOpenAdManager({
    adUnitId: adConfig.zones.appOpen,
  });

  return <>{children}</>;
}

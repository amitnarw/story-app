import { useState } from 'react';
import { Platform, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { adConfig } from '@/ads/config';
import { cn } from '@/lib/cn';
import { useSettings } from '@/store/settings';

type AdSlotProps = {
  variant?: 'dock' | 'inline';
};

export function AdSlot({ variant = 'inline' }: AdSlotProps) {
  const adsConsented = useSettings((state) => state.adsConsented);
  const [failed, setFailed] = useState(false);
  const isDock = variant === 'dock';

  if (Platform.OS === 'web' || !adsConsented || failed) {
    return null;
  }

  const unitId = adConfig.testMode ? TestIds.BANNER : adConfig.zones.banner;
  if (!unitId) return null;

  const size = isDock ? BannerAdSize.BANNER : BannerAdSize.ANCHORED_ADAPTIVE_BANNER;

  return (
    <View
      className={cn('items-center bg-transparent')}
      accessibilityLabel="Advertisement"
      accessible={true}
      style={{ backgroundColor: 'transparent' }}>
      <BannerAd
        unitId={unitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdFailedToLoad={(error) => {
          console.warn('[ads] banner failed to load', error);
          setFailed(true);
        }}
      />
    </View>
  );
}

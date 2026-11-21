import { useEffect, useRef } from 'react';
import { Image, Platform, View } from 'react-native';
import {
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  TestIds,
  useNativeAd,
} from 'react-native-google-mobile-ads';

import { adConfig } from '@/ads/config';
import { AppText } from '@/components/ui/app-text';
import { useI18n } from '@/i18n';
import { useSettings } from '@/store/settings';
import { useTheme } from '@/theme/ThemeProvider';

type InlineNativeAdCardProps = {
  index: number;
};

export function InlineNativeAdCard({ index }: InlineNativeAdCardProps) {
  const adsConsented = useSettings((state) => state.adsConsented);
  const { colors } = useTheme();
  const { t } = useI18n();

  const adUnitId = adConfig.testMode ? TestIds.NATIVE : adConfig.zones.native || null;

  const { status, nativeAd, retry } = useNativeAd({
    adUnitId: adsConsented && Platform.OS !== 'web' ? adUnitId : null,
  });

  const retriesRef = useRef(0);
  useEffect(() => {
    if ((status === 'no-fill' || status === 'error') && adsConsented && retriesRef.current < 1) {
      retriesRef.current += 1;
      const timer = setTimeout(() => retry(), 30000);
      return () => clearTimeout(timer);
    }
  }, [status, retry, adsConsented]);

  if (Platform.OS === 'web' || !adsConsented || status !== 'loaded' || !nativeAd) {
    return null;
  }

  return (
    <View
      className="w-full overflow-hidden my-6"
      style={{ aspectRatio: Math.min(Math.max(nativeAd.mediaContent?.aspectRatio ?? 16 / 9, 1.2), 1.9) }}>
      <NativeAdView nativeAd={nativeAd} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <NativeMediaView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.surface2,
            }}
            resizeMode="cover"
          />

          <View className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <View className="flex-row items-center gap-1 mb-1">
              <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                <AppText variant="caption" font="sans-semibold" className="text-[8px] uppercase" style={{ color: '#FFFFFF' }}>
                  {t('ads.label')}
                </AppText>
              </View>
            </View>

            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <AppText
                variant="headline"
                tone="ink"
                numberOfLines={2}
                style={{ color: '#FFFFFF' }}
                className="text-[16px] leading-tight mb-1">
                {nativeAd.headline ?? t('ads.discoverTeaser')}
              </AppText>
            </NativeAsset>

            {nativeAd.body ? (
              <NativeAsset assetType={NativeAssetType.BODY}>
                <AppText
                  variant="caption"
                  numberOfLines={2}
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  className="mt-1 text-[12px]">
                  {nativeAd.body}
                </AppText>
              </NativeAsset>
            ) : null}

            {nativeAd.callToAction ? (
              <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
                <View
                  className="mt-3 self-start rounded-pill px-3 py-1.5"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <AppText
                    variant="caption"
                    font="sans-semibold"
                    style={{ color: '#FFFFFF' }}
                    className="text-[11px]">
                    {nativeAd.callToAction}
                  </AppText>
                </View>
              </NativeAsset>
            ) : null}
          </View>

          {nativeAd.icon?.url ? (
            <View className="absolute left-4 top-4 flex-row items-center gap-2" style={{ paddingRight: 4 }}>
              <NativeAsset assetType={NativeAssetType.ICON}>
                <Image
                  source={{ uri: nativeAd.icon.url }}
                  style={{ width: 24, height: 24, borderRadius: 12 }}
                />
              </NativeAsset>
              {nativeAd.advertiser && (
                <AppText
                  variant="caption"
                  font="sans-semibold"
                  style={{ color: '#FFFFFF', backgroundColor: 'rgba(0,0,0,0.45)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 }}>
                  {nativeAd.advertiser}
                </AppText>
              )}
            </View>
          ) : null}
        </View>
      </NativeAdView>
    </View>
  );
}

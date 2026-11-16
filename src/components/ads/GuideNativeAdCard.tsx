import { useEffect } from 'react';
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

type GuideNativeAdCardProps = {
  index: number;
};

export function GuideNativeAdCard({ index }: GuideNativeAdCardProps) {
  const adsConsented = useSettings((state) => state.adsConsented);
  const { colors } = useTheme();
  const { t } = useI18n();

  const adUnitId = adConfig.testMode ? TestIds.NATIVE : adConfig.zones.native || null;

  const { status, nativeAd, retry } = useNativeAd({
    adUnitId: adsConsented && Platform.OS !== 'web' ? adUnitId : null,
  });

  useEffect(() => {
    if ((status === 'no-fill' || status === 'error') && adsConsented) {
      const timer = setTimeout(() => retry(), 15000);
      return () => clearTimeout(timer);
    }
  }, [status, retry, adsConsented]);

  if (Platform.OS === 'web' || !adsConsented || status !== 'loaded' || !nativeAd) {
    return null;
  }

  return (
    <View
      className="w-full overflow-hidden"
      style={{ aspectRatio: nativeAd.mediaContent?.aspectRatio ?? 16 / 9 }}>
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

          <View
            className="absolute inset-x-0 bottom-0 px-6 pb-6"
            style={{ paddingTop: 56 }}>
            <View className="flex-row items-center gap-2 mb-1">
              <AppText
                variant="caption"
                tone="paper"
                className="text-[10px] uppercase"
                style={{ color: '#FFFFFF', opacity: 0.85 }}>
                {t('ads.label')}
              </AppText>
            </View>

            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <AppText
                variant="headline"
                tone="ink"
                numberOfLines={2}
                style={{ color: '#FFFFFF' }}
                className="text-[20px] leading-tight mb-2">
                {nativeAd.headline ?? t('ads.discoverTeaser')}
              </AppText>
            </NativeAsset>

            {nativeAd.body ? (
              <NativeAsset assetType={NativeAssetType.BODY}>
                <AppText
                  variant="caption"
                  numberOfLines={2}
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  className="mt-1 text-[13px]">
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
                    className="text-[12px]">
                    {nativeAd.callToAction}
                  </AppText>
                </View>
              </NativeAsset>
            ) : null}
          </View>

          {nativeAd.icon?.url ? (
            <View className="absolute left-4 top-4 overflow-hidden rounded-full">
              <NativeAsset assetType={NativeAssetType.ICON}>
                <Image
                  source={{ uri: nativeAd.icon.url }}
                  style={{ width: 28, height: 28, borderRadius: 14 }}
                />
              </NativeAsset>
            </View>
          ) : null}
        </View>
      </NativeAdView>
    </View>
  );
}

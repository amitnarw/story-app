import { Image, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { useTheme } from '@/theme/ThemeProvider';

type NativeAdMobCardProps = {
  index: number;
};

export function NativeAdMobCard({ index }: NativeAdMobCardProps) {
  const { colors } = useTheme();

  return (
    <View
      className="flex-row items-center gap-4 py-4 rounded-card bg-surface p-4 border border-line"
      style={{ aspectRatio: 1 }}
    >
      <View
        className="h-24 w-24 rounded-card overflow-hidden"
        style={{ backgroundColor: colors.surface2 }}
      />
      <View className="flex-1">
        <AppText variant="caption" tone="muted" className="text-[11px]">
          Advertisement
        </AppText>
        <AppText variant="subtitle" tone="ink" numberOfLines={2} className="text-[15px]">
          Discover your next favorite story
        </AppText>
      </View>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel="Advertisement"
        scaleTo={0.96}
        className="p-2"
      >
        <View className="h-8 w-8 rounded-full" style={{ backgroundColor: colors.control }} />
      </PressableScale>
    </View>
  );
}

import { Image, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { useTheme } from '@/theme/ThemeProvider';

type GuideNativeAdCardProps = {
  index: number;
};

export function GuideNativeAdCard({ index }: GuideNativeAdCardProps) {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-4 py-4 rounded-card bg-surface p-4 border border-line">
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          backgroundColor: colors.surface2,
        }}
      />
      <View className="flex-1">
        <AppText variant="caption" tone="muted" className="text-[11px]">
          Advertisement
        </AppText>
        <AppText variant="subtitle" tone="ink" numberOfLines={2} className="text-[15px]">
          A great book you might enjoy
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

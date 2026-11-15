import { View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/app-text';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type ConfirmSheetProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmSheet({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  onCancel,
  onConfirm,
}: ConfirmSheetProps) {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <View
      className="absolute inset-0 items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      pointerEvents="box-none"
    >
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        scaleTo={0.96}
        haptic="select"
        onPress={onCancel}
        className="absolute inset-0 z-1"
      >
        {' '}
      </PressableScale>
      <View
        className="w-11/12 max-w-[340px] rounded-sheet overflow-hidden"
        style={{ backgroundColor: colors.surface }}
        pointerEvents="auto"
      >
        <View className="px-6 pt-6 pb-1">
          <AppText variant="headline" tone="ink">
            {title}
          </AppText>
          <AppText variant="body" tone="soft" className="mt-2 max-w-[280px]">
            {message}
          </AppText>
        </View>
        <View className="flex-row px-6 pb-6">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            scaleTo={0.96}
            haptic="tap"
            onPress={onCancel}
            className="flex-1 items-center py-3 rounded-pill border border-line">
            <AppText variant="button" tone="ink">
              {cancelLabel}
            </AppText>
          </PressableScale>
          <View className="w-4" />
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
            scaleTo={0.96}
            haptic="tap"
            onPress={onConfirm}
            className="flex-1 items-center py-3 rounded-pill bg-clay">
            <AppText variant="button" tone="accentOn">
              {confirmLabel}
            </AppText>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}

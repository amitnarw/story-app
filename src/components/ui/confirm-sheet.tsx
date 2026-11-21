import { useEffect } from 'react';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/app-text';
import { useTheme } from '@/theme/ThemeProvider';

type ConfirmSheetProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** Disables both buttons while an async action is running. */
  busy?: boolean;
  /** Optional inline error shown above the buttons. */
  error?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmSheet({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  busy = false,
  error = null,
  onCancel,
  onConfirm,
}: ConfirmSheetProps) {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 220 });
    } else {
      opacity.value = withTiming(0, { duration: 180 });
    }
  }, [visible, opacity]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        },
        containerStyle,
      ]}
      pointerEvents="box-none"
    >
      {/* Blurred background, same style as bottom nav bar */}
      <BlurView
        tint={isDark ? 'dark' : 'light'}
        intensity={70}
        blurMethod="dimezisBlurView"
        style={{ position: 'absolute', inset: 0 }}
        pointerEvents="none"
      />
      {/* Dim overlay */}
      <View
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: isDark ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.3)',
        }}
        pointerEvents="none"
      />
      {/* Backdrop tap to cancel */}
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel="Cancel"
        scaleTo={0.96}
        haptic="select"
        onPress={onCancel}
        style={{ position: 'absolute', inset: 0 }}
      >
        {' '}
      </PressableScale>

      {/* Modal card */}
      <View
        style={{
          width: '90%',
          maxWidth: 340,
          borderRadius: 16,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          alignSelf: 'center',
        }}
        pointerEvents="auto">
        <View className="px-6 pt-6 pb-1">
          <AppText variant="headline" tone="ink">
            {title}
          </AppText>
          <AppText variant="body" tone="soft" className="mt-2 max-w-[280px]">
            {message}
          </AppText>
          {error ? (
            <AppText variant="small" tone="danger" className="mt-2 max-w-[280px]">
              {error}
            </AppText>
          ) : null}
        </View>
        <View className="flex-row px-6 pb-6">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            scaleTo={0.96}
            haptic="tap"
            disabled={busy}
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
            disabled={busy}
            onPress={onConfirm}
            className="flex-1 items-center py-3 rounded-pill bg-clay">
            <AppText variant="button" tone="accentOn">
              {confirmLabel}
            </AppText>
          </PressableScale>
        </View>
      </View>
    </Animated.View>
  );
}

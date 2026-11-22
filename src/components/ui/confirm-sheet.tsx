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
  title?: string;
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
          maxWidth: 350,
          borderRadius: 20,
          backgroundColor: colors.surface,
          overflow: 'hidden',
          alignSelf: 'center',
        }}
        pointerEvents="auto">
        <View className="px-6 pt-6 pb-2">
          {title ? (
            <AppText variant="headline" tone="ink" style={{ textAlign: 'center' }}>
              {title}
            </AppText>
          ) : null}
          <AppText
            variant="body"
            tone="ink"
            className={title ? 'mt-2 text-center' : 'text-[15.5px] leading-[23px] text-center'}
            style={{ textAlign: 'center' }}>
            {message}
          </AppText>
          {error ? (
            <AppText variant="small" tone="danger" className="mt-2 text-center">
              {error}
            </AppText>
          ) : null}
        </View>
        <View className="flex-row px-5 pb-6 gap-2.5 pt-4">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            scaleTo={0.96}
            haptic="tap"
            disabled={busy}
            onPress={onCancel}
            className="flex-1 items-center justify-center py-3 px-2 rounded-pill border border-line">
            <AppText
              variant="button"
              tone="ink"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              style={{ textAlign: 'center' }}>
              {cancelLabel}
            </AppText>
          </PressableScale>
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
            scaleTo={0.96}
            haptic="tap"
            disabled={busy}
            onPress={onConfirm}
            className="flex-1 items-center justify-center py-3 px-2 rounded-pill bg-clay">
            <AppText
              variant="button"
              tone="accentOn"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              style={{ textAlign: 'center' }}>
              {confirmLabel}
            </AppText>
          </PressableScale>
        </View>
      </View>
    </Animated.View>
  );
}

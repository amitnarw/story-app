import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
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
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';

  const opacity = useSharedValue(visible ? 1 : 0);
  const scale = useSharedValue(visible ? 1 : 0.8);

  if (visible) {
    opacity.value = withTiming(1, { duration: 180 });
    scale.value = withSpring(1, { damping: 18, stiffness: 140 });
  } else {
    opacity.value = withTiming(0, { duration: 180 });
    scale.value = withSpring(0.8, { damping: 18, stiffness: 140 });
  }

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
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
      <Animated.View
        style={[
          {
            width: '90%',
            maxWidth: 340,
            borderRadius: 16,
            backgroundColor: colors.surface,
            overflow: 'hidden',
            alignSelf: 'center',
          },
          cardStyle,
        ]}
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
      </Animated.View>
    </Animated.View>
  );
}

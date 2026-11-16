import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { haptics } from '@/lib/haptics';
import { useTheme } from '@/theme/ThemeProvider';

type ToggleProps = {
  value: boolean;
  label: string;
  onValueChange: (value: boolean) => void;
  className?: string;
};

const TRACK_W = 50;
const TRACK_H = 30;
const THUMB = 24;
const PADDING = 3;
const TRAVEL = TRACK_W - THUMB - PADDING * 2;

export function Toggle({ value, label, onValueChange }: ToggleProps) {
  const { colors } = useTheme();
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 180 });
  }, [value, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.control, colors.clay],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * TRAVEL }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => {
        haptics.select();
        onValueChange(!value);
      }}
      hitSlop={8}>
      <Animated.View
        style={[
          {
            width: TRACK_W,
            height: TRACK_H,
            borderRadius: TRACK_H / 2,
            padding: PADDING,
            justifyContent: 'center',
          },
          trackStyle,
        ]}>
        <Animated.View
          style={[
            {
              width: THUMB,
              height: THUMB,
              borderRadius: THUMB / 2,
              backgroundColor: colors.accentOn,
            },
            thumbStyle,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

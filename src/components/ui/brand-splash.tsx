import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { AppText } from './app-text';
import { APP_NAME } from '@/config/branding';
import { useTheme } from '@/theme/ThemeProvider';

const HOLD = 1300;
const FADE_OUT = 320;

const brandLogo = require('../../../assets/brand/romantic-stories-logo.jpeg');

type BrandSplashProps = {
  onFinish: () => void;
};

/**
 * In-app brand splash. The native Android 12+ splash always masks whatever
 * icon it is given, so the full photo and the app name are shown here instead,
 * on top of the app, then faded out.
 */
export function BrandSplash({ onFinish }: BrandSplashProps) {
  const { colors, scheme } = useTheme();
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(HOLD, withTiming(0, { duration: FADE_OUT }));
    const timer = setTimeout(onFinish, HOLD + FADE_OUT);
    return () => clearTimeout(timer);
  }, [opacity, onFinish]);

  const fadeStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const backgroundColor = scheme === 'dark' ? '#0F0D0C' : '#F7F2EA';

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor, zIndex: 1000, elevation: 1000 },
        fadeStyle,
      ]}
      pointerEvents="auto">
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={brandLogo}
          style={{ width: 260, height: 260, borderRadius: 24 }}
          contentFit="cover"
          accessibilityLabel={APP_NAME}
        />
        <View className="mt-5">
          <AppText
            variant="display"
            tone="ink"
            className="text-center text-[26px] leading-tight"
            style={{ color: colors.ink }}>
            {APP_NAME}
          </AppText>
        </View>
      </View>
    </Animated.View>
  );
}

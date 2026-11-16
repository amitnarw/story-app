import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type { ViewProps } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { cn } from '@/lib/cn';
import { layout } from '@/theme/scale';
import { useTheme } from '@/theme/ThemeProvider';

type ScreenProps = ViewProps & {
  children: ReactNode;
  scroll?: boolean;
  scrollRef?: any;
  padded?: boolean;
  edges?: Edge[];
  bottomSpace?: number;
  contentClassName?: string;
  gradient?: boolean;
};

function GradientLayer({ id, stops }: { id: string; stops: [string, string, string, string, string, string] }) {
  return (
    <Svg width="100%" height="100%">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={stops[0]} />
          <Stop offset="12%" stopColor={stops[1]} />
          <Stop offset="25%" stopColor={stops[2]} />
          <Stop offset="45%" stopColor={stops[3]} />
          <Stop offset="70%" stopColor={stops[4]} />
          <Stop offset="100%" stopColor={stops[5]} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

export function Screen({
  children,
  scroll = false,
  scrollRef,
  padded = false,
  edges = ['top', 'left', 'right'],
  bottomSpace = 0,
  className,
  contentClassName,
  gradient = true,
  ...rest
}: ScreenProps) {
  const { scheme } = useTheme();

  const darkOpacity = useSharedValue(scheme === 'dark' ? 1 : 0);

  useEffect(() => {
    darkOpacity.value = withTiming(scheme === 'dark' ? 1 : 0, { duration: 420 });
  }, [scheme, darkOpacity]);

  const darkStyle = useAnimatedStyle(() => ({ opacity: darkOpacity.value }));
  const lightStyle = useAnimatedStyle(() => ({ opacity: 1 - darkOpacity.value }));

  const body = (
    <View className={cn('flex-1', padded && 'px-5', contentClassName)} {...rest}>
      {children}
    </View>
  );

  return (
    <View className={cn('flex-1 bg-paper', className)} style={{ position: 'relative' }}>
      {gradient ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View style={[StyleSheet.absoluteFill, darkStyle]}>
            <GradientLayer
              id="screenBgGradDark"
              stops={['#060606', '#0C0B0A', '#221E1D', '#272220', '#231F1D', '#1C1817']}
            />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, lightStyle]}>
            <GradientLayer
              id="screenBgGradLight"
              stops={['#D4CABE', '#DED5CA', '#EFE8DE', '#F6F2EC', '#FBF9F5', '#FCFAF7']}
            />
          </Animated.View>
        </View>
      ) : null}
      <SafeAreaView edges={edges} style={{ flex: 1, backgroundColor: 'transparent' }}>
        {scroll ? (
          <ScrollView
            ref={scrollRef}
            className="flex-1"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: bottomSpace, flexGrow: 1 }}>
            {body}
          </ScrollView>
        ) : (
          body
        )}
      </SafeAreaView>
    </View>
  );
}

export { layout };

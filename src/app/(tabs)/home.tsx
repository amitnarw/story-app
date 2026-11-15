import { router, useFocusEffect } from 'expo-router';
import { Heart, Search, Sun, Moon } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { consumePendingInterstitial, useInterstitial } from '@/ads/adManager';
import { adConfig } from '@/ads/config';
import { GuideNativeAdCard } from '@/components/ads/GuideNativeAdCard';
import { StoryCard } from '@/components/stories/StoryCard';
import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { allStories, type Story } from '@/content';
import { useSettings } from '@/store/settings';
import { useTheme } from '@/theme/ThemeProvider';

type GridItem =
  | { kind: 'story'; story: Story }
  | { kind: 'native-ad'; id: string };

function padGridItems(items: GridItem[]): GridItem[] {
  return items.length % 2 === 0 ? items : [...items, { kind: 'native-ad', id: `spacer-${items.length}` }];
}

export default function HomeScreen() {
  const { colors, scheme } = useTheme();
  const setTheme = useSettings((state) => state.setTheme);
  const adsConsented = useSettings((state) => state.adsConsented);
  const { show } = useInterstitial({ firstOpen: false });
  const [scrollY] = useState(() => new Animated.Value(0));

  const topFadeOpacity = useMemo(
    () =>
      scrollY.interpolate({
        inputRange: [0, 24],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
    [scrollY],
  );

  const onScrollEvent = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: false,
      }),
    [scrollY],
  );

  const rest = allStories.slice(1);

  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = [];
    rest.forEach((story, idx) => {
      items.push({ kind: 'story', story });
      if (adsConsented && (idx + 1) % 6 === 0) {
        items.push({ kind: 'native-ad', id: `native-ad-${idx}` });
      }
    });
    return padGridItems(items);
  }, [rest, adsConsented]);

  useFocusEffect(
    useCallback(() => {
      if (!consumePendingInterstitial()) return;
      const zone = adConfig.zones.interstitial;
      if (zone) void show(zone);
    }, [show]),
  );

  const header = (
    <View className="px-5 pb-2 pt-2">
      <View className="flex-row items-center justify-between">
        <AppText variant="display" className="text-[32px] leading-[36px] font-display">
          Loom
        </AppText>

        <View className="flex-row items-center gap-2.5">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Search"
            scaleTo={0.9}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.line,
              borderWidth: 1,
            }}
            className="h-10 w-10 items-center justify-center rounded-full"
            onPress={() => router.push('/search' as any)}>
            <Search size={18} color={colors.ink} strokeWidth={1.9} />
          </PressableScale>

          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Saved stories"
            scaleTo={0.9}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.line,
              borderWidth: 1,
            }}
            className="h-10 w-10 items-center justify-center rounded-full"
            onPress={() => router.push('/favorites' as any)}>
            <Heart size={18} color={colors.ink} fill="transparent" strokeWidth={1.9} />
          </PressableScale>

          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Theme toggle"
            scaleTo={0.9}
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.line,
              borderWidth: 1,
            }}
            className="h-10 w-10 items-center justify-center rounded-full"
            onPress={() => setTheme(scheme === 'dark' ? 'light' : 'dark')}>
            {scheme === 'dark' ? (
              <Sun size={17} color={colors.ink} strokeWidth={1.9} />
            ) : (
              <Moon size={17} color={colors.ink} strokeWidth={1.9} />
            )}
          </PressableScale>
        </View>
      </View>

      <AppText variant="subtitle" tone="muted" className="mt-1 text-[13.5px]">
        Stories worth your time
      </AppText>
    </View>
  );

  const empty = (title: string, body: string) => (
    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28, paddingVertical: 40 }}>
      <AppText variant="headline" style={{ textAlign: 'center' }}>
        {title}
      </AppText>
      <AppText variant="body" tone="muted" style={{ textAlign: 'center', marginTop: 8, maxWidth: 280 }}>
        {body}
      </AppText>
    </View>
  );

  const topFadeColor = scheme === 'dark' ? '#141211' : '#E4DCD2';

  return (
    <Screen edges={['top', 'left', 'right']} className="flex-1">
      {header}

      <View className="flex-1 relative">
        <FlatList
          key="stories"
          data={gridItems}
          keyExtractor={(item, index) =>
            item.kind === 'story' ? `story-${item.story.slug}` : item.kind === 'native-ad' ? `ad-${item.id}` : `spacer-${index}`
          }
          numColumns={2}
          onScroll={onScrollEvent}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if (item.kind === 'story') {
              return <StoryCard story={item.story} index={index} />;
            }
            if (item.kind === 'native-ad') {
              return <GuideNativeAdCard index={index} />;
            }
            return <View className="flex-1" />;
          }}
          columnWrapperStyle={gridItems.length > 0 ? { gap: 12 } : undefined}
          contentContainerStyle={
            gridItems.length === 0
              ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 220 }
              : { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 220, gap: 12 }
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={empty('No stories yet', 'Check back soon for new stories.')}
        />

        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -14,
            left: 0,
            right: 0,
            height: 38,
            zIndex: 10,
            opacity: topFadeOpacity,
          }}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="homeTopFade" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={topFadeColor} stopOpacity="1" />
                <Stop offset="35%" stopColor={topFadeColor} stopOpacity="0.75" />
                <Stop offset="70%" stopColor={topFadeColor} stopOpacity="0.25" />
                <Stop offset="100%" stopColor={topFadeColor} stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#homeTopFade)" />
          </Svg>
        </Animated.View>
      </View>
    </Screen>
  );
}

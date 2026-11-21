import { router } from 'expo-router';
import { Heart, Search, Sun, Moon } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { GuideNativeAdCard } from '@/components/ads/GuideNativeAdCard';
import { StoryCard } from '@/components/stories/StoryCard';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { useStories, type Story } from '@/content';
import { useI18n } from '@/i18n';
import { useSettings } from '@/store/settings';
import { useTheme } from '@/theme/ThemeProvider';
import { APP_NAME } from '@/config/branding';

type ListItem =
  | { kind: 'story'; story: Story }
  | { kind: 'native-ad'; id: string };

/**
 * The Home page: header with actions and the story feed with native ads
 * interleaved. Rendered as a swipeable pager page — the host owns the screen
 * chrome (safe areas, background).
 */
export function HomeScreen() {
  const { scheme } = useTheme();
  const setTheme = useSettings((state) => state.setTheme);
  const adsConsented = useSettings((state) => state.adsConsented);
  const matureOn = useSettings((state) => state.mature);
  const { t } = useI18n();
  const allStories = useStories();
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

  const filteredStories = useMemo<Story[]>(
    () => (matureOn ? allStories : allStories.filter((s) => !s.mature)),
    [allStories, matureOn],
  );

  const listItems = useMemo<ListItem[]>(() => {
    const items: ListItem[] = [];
    filteredStories.forEach((story, idx) => {
      items.push({ kind: 'story', story });
      if (adsConsented && (idx + 1) % 4 === 0) {
        items.push({ kind: 'native-ad', id: `native-ad-${idx}` });
      }
    });
    return items;
  }, [filteredStories, adsConsented]);

  const header = (
    <View className="px-5 pb-2 pt-2">
      <View className="flex-row items-center justify-between">
        <AppText variant="display" className="text-[26px] leading-[32px]">
          {APP_NAME}
        </AppText>

        <View className="flex-row items-center gap-2.5">
          <IconButton
            icon={Search}
            label={t('home.a11ySearch')}
            size={18}
            onPress={() => router.push('/search' as any)}
          />
          <IconButton
            icon={Heart}
            label={t('home.a11ySaved')}
            size={18}
            onPress={() => router.push('/favorites' as any)}
          />
          <IconButton
            icon={scheme === 'dark' ? Sun : Moon}
            label={t('home.a11yTheme')}
            size={17}
            onPress={() => setTheme(scheme === 'dark' ? 'light' : 'dark')}
          />
        </View>
      </View>

      <AppText variant="subtitle" tone="muted" className="mt-1 text-[13.5px]">
        {t('home.subtitle')}
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

  const topFadeColor = scheme === 'dark' ? '#060606' : '#F8F6F2';

  return (
    <View className="flex-1">
      {header}

      <View className="flex-1 relative">
        <FlatList
          key="stories"
          data={listItems}
          keyExtractor={(item) =>
            item.kind === 'story' ? `story-${item.story.slug}` : `ad-${item.id}`
          }
          onScroll={onScrollEvent}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            if (item.kind === 'story') {
              return <StoryCard story={item.story} index={index} />;
            }
            return <GuideNativeAdCard index={index} />;
          }}
          contentContainerStyle={
            listItems.length === 0
              ? {
                  flexGrow: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingBottom: 220,
                }
              : { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 420, gap: 28 }
          }
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={empty(t('home.emptyTitle'), t('home.emptyBody'))}
        />

        {/* Top edge fade */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 24,
            zIndex: 10,
            opacity: topFadeOpacity,
          }}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="homeTopFade" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={topFadeColor} stopOpacity="0.85" />
                <Stop offset="55%" stopColor={topFadeColor} stopOpacity="0.35" />
                <Stop offset="100%" stopColor={topFadeColor} stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#homeTopFade)" />
          </Svg>
        </Animated.View>

        {/* Bottom edge fade */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 24,
            zIndex: 10,
          }}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="homeBottomFade" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={topFadeColor} stopOpacity="0" />
                <Stop offset="55%" stopColor={topFadeColor} stopOpacity="0.35" />
                <Stop offset="100%" stopColor={topFadeColor} stopOpacity="0.85" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#homeBottomFade)" />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}

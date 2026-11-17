import { Fragment, useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowUp, ChevronLeft, Heart } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AdSlot } from '@/components/ads/AdSlot';
import { InlineNativeAdCard } from '@/components/ads/InlineNativeAdCard';
import { StoryBlock } from '@/components/stories/StoryBlock';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Rule } from '@/components/ui/rule';
import { Screen } from '@/components/ui/screen';
import { useStory } from '@/content';
import { useIsFavorite, useLibrary } from '@/store/library';
import { useSettings } from '@/store/settings';
import { layout } from '@/theme/scale';
import { useTheme } from '@/theme/ThemeProvider';
import { useI18n } from '@/i18n';

function close() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/home');
  }
}

function NotFound() {
  const { t } = useI18n();
  return (
    <Screen edges={['top', 'bottom']} padded>
      <View className="pt-2">
        <IconButton icon={ChevronLeft} label={t('common.back')} onPress={close} />
      </View>
      <View className="flex-1 items-center justify-center pb-20">
        <AppText variant="title" font="display-italic" className="text-center">
          {t('story.notFoundTitle')}
        </AppText>
        <AppText variant="body" className="mt-3 max-w-[300px] text-center">
          {t('story.notFoundBody')}
        </AppText>
        <Button label={t('story.backToStories')} variant="secondary" onPress={close} className="mt-6" />
      </View>
    </Screen>
  );
}

export default function StoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const story = useStory(slug);
  const adsConsented = useSettings((state) => state.adsConsented);
  const { t } = useI18n();

  const scrollRef = useRef<any>(null);
  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);

  const saved = useIsFavorite(story?.slug ?? '');
  const toggleFavorite = useLibrary((state) => state.toggleFavorite);
  const setReadingProgress = useLibrary((state) => state.setReadingProgress);
  const { colors } = useTheme();

  // Running global block index across all chapters (resets per story).
  const chapterBlockCounts = useMemo(
    () => story?.chapters.map((ch) => ch.blocks.length) ?? [],
    [story?.chapters],
  );

  const chapterOffsets = useMemo(() => {
    return chapterBlockCounts.reduce((acc, n) => {
      acc.push(acc.length ? acc[acc.length - 1] + n : 0);
      return acc;
    }, [] as number[]);
  }, [chapterBlockCounts]);

  const onScroll = useCallback(
    (event: any) => {
      if (!story) return;
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      scrollY.value = contentOffset.y;
      const scrollable = Math.max(contentSize.height - layoutMeasurement.height, 1);
      progress.value = Math.min(1, Math.max(0, contentOffset.y / scrollable));
    },
    [story],
  );

  // Reset progress when story changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    progress.value = 0;
    // eslint-disable-next-line react-hooks/immutability
    scrollY.value = 0;
  }, [story?.slug]);

  // Throttled progress save — write no more than once per second.
  const lastSaveTime = useRef(0);
  useEffect(() => {
    if (!story) return;
    if (story.slug && progress.value > 0) {
      const now = Date.now();
      if (now - lastSaveTime.current > 1000) {
        lastSaveTime.current = now;
        setReadingProgress(story.slug, progress.value);
      }
    }
  }, [story, progress.value, setReadingProgress]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const animatedProgressStyle = useAnimatedStyle(
    () => ({
      width: `${progress.value * 100}%`,
    }),
    [progress],
  );

  if (!story) {
    return <NotFound />;
  }

  return (
    <Screen
      edges={['top', 'bottom']}
      gradient
      style={{ width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center' }}>
      {/* Sticky Top Header */}
      <View className="px-5 pt-2 pb-2">
        <View className="flex-row items-center justify-between">
          <IconButton icon={ChevronLeft} label={t('common.back')} onPress={close} />
          <View className="flex-row items-center gap-3">
            <AppText variant="caption" tone="muted">
              {t('story.minRead', { minutes: story.minutes })}
            </AppText>
            <IconButton
              icon={Heart}
              label={saved ? t('story.removeSaved') : t('story.saveStory')}
              selected={saved}
              onPress={() => toggleFavorite(story.slug)}
            />
          </View>
        </View>
        <View className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-line">
          <Animated.View style={[{ height: 2 }, animatedProgressStyle]} className="bg-clay" />
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}>
        <View className="px-5">
          {/* Cover Hero */}
          <Appear distance={16} className="mt-2">
            <View className="relative overflow-hidden" style={{ borderRadius: 20 }}>
              <ImageStory source={story.cover} alt={story.coverAlt} />
              {story.mature && (
                <View
                  className="absolute inset-0 flex-row items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
                  <AppText
                    variant="caption"
                    tone="accentOn"
                    font="sans-semibold"
                    className="text-[12px] uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
                    18+
                  </AppText>
                </View>
              )}
            </View>
            <AppText variant="label" className="mt-3">
              {t('story.storyNumber', {
                number: String(story.order).padStart(2, '0'),
                tags: story.tags.join(' · '),
              })}
            </AppText>
            <AppText variant="title" className="mt-2">
              {story.title}
            </AppText>
            <AppText variant="subtitle" className="mt-1">
              {t('story.byAuthor', { author: story.author })}
            </AppText>
            <AppText variant="body" className="mt-3 max-w-[600px]">
              {story.summary}
            </AppText>
          </Appear>

          <View className="mt-10">
            <Rule />
          </View>

          {/* Chapters */}
          {story.chapters.map((chapter, chapterIndex) => (
            <View key={chapterIndex}>
              {chapter.title && (
                <Appear delay={chapterIndex * 40} className="mt-10 mb-4">
                  <View className="flex-row items-center gap-2">
                    <View className="h-px w-8 bg-line" />
                    <AppText variant="headline" className="text-[20px]">
                      {chapter.title}
                    </AppText>
                    <View className="h-px flex-1 bg-line" />
                  </View>
                </Appear>
              )}
              <Appear delay={chapterIndex * 40 + 20}>
                {chapter.blocks.map((block, blockIndex) => {
                  const globalIndex = chapterOffsets[chapterIndex] + blockIndex;
                  return (
                    <Fragment key={globalIndex}>
                      <StoryBlock block={block} />
                      {adsConsented && globalIndex > 0 && globalIndex % 5 === 0 && (
                        <InlineNativeAdCard index={globalIndex} />
                      )}
                    </Fragment>
                  );
                })}
              </Appear>
            </View>
          ))}

          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={t('story.backToTopA11y')}
            scaleTo={0.98}
            onPress={scrollToTop}
            className="mt-6 flex-row items-center justify-center gap-2 py-4">
            <ArrowUp size={17} color={colors.muted} strokeWidth={1.6} />
            <AppText variant="small" tone="muted" font="sans-medium">
              {t('story.backToTop')}
            </AppText>
          </PressableScale>
        </View>
        </ScrollView>

      {/* Sticky Bottom Banner Ad */}
      <View className="items-center bg-surface">
        <AdSlot variant="dock" />
      </View>
    </Screen>
  );
}

function ImageStory({ source, alt }: { source: any; alt: string }) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  return (
    <Image
      source={source}
      style={{
        width: '100%',
        ...(isLandscape ? { aspectRatio: 16 / 9 } : { height: 320, maxHeight: 320 }),
      }}
      resizeMode="cover"
      accessibilityLabel={alt}
    />
  );
}

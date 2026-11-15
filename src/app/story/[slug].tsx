import { Image, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { AdSlot } from '@/components/ads/AdSlot';
import { StoryBlock } from '@/components/stories/StoryBlock';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Rule } from '@/components/ui/rule';
import { Screen } from '@/components/ui/screen';
import { useStory, useStories } from '@/content';
import { useIsFavorite, useLibrary } from '@/store/library';
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
  const allStories = useStories();
  const { t } = useI18n();

  const scrollY = useSharedValue(0);
  const [chapterHeights, setChapterHeights] = useState<number[]>([]);
  const progress = useSharedValue(0);

  const saved = useIsFavorite(story?.slug ?? '');
  const toggleFavorite = useLibrary((state) => state.toggleFavorite);
  const setReadingProgress = useLibrary((state) => state.setReadingProgress);
  const { colors } = useTheme();

  const totalBlocks = story
    ? story.chapters.reduce((sum, ch) => sum + ch.blocks.length, 0)
    : 0;

  const onScroll = useCallback(
    (event: any) => {
      if (!story) return;
      scrollY.value = event.nativeEvent.contentOffset.y;
      if (totalBlocks > 0 && chapterHeights.length > 0) {
        const totalHeight = chapterHeights.reduce((a, b) => a + b, 0);
        if (totalHeight > 0) {
          progress.value = Math.min(1, scrollY.value / totalHeight);
        }
      }
    },
    [story, totalBlocks, chapterHeights],
  );

  useEffect(() => {
    if (!story) return;
    if (story.slug) {
      setReadingProgress(story.slug, progress.value);
    }
  }, [story, progress.value, setReadingProgress]);

  const handleChapterLayout = (index: number) => (event: any) => {
    const height = event.nativeEvent.layout.height;
    setChapterHeights((prev) => {
      const next = [...prev];
      next[index] = height;
      return next;
    });
  };

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }), [progress]);

  if (!story) {
    return <NotFound />;
  }

  const index = allStories.findIndex((item) => item.slug === story.slug);
  const nextStory = index >= 0 ? allStories[index + 1] : undefined;

  return (
    <Screen
      scroll
      edges={['top', 'bottom']}
      padded
      bottomSpace={60}
      style={{ width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center' }}>
      {/* Sticky Top Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-2 z-20">
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

      {/* Reading progress bar */}
      <Animated.View
        style={[
          { position: 'absolute', top: 56, left: 0, right: 0, height: 2 },
          animatedProgressStyle,
        ]}
        className="bg-clay z-20"
      />

      {/* Cover Hero */}
      <Appear distance={16} className="mt-2">
        <View className="overflow-hidden rounded-card bg-surface">
          <ImageStory source={story.cover} alt={story.coverAlt} />
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
        <View key={chapterIndex} onLayout={handleChapterLayout(chapterIndex)}>
          {chapter.title && (
            <Appear delay={chapterIndex * 40} className="mt-8">
              <AppText variant="headline" className="mb-4">
                {chapter.title}
              </AppText>
            </Appear>
          )}
          <Appear delay={chapterIndex * 40 + 20}>
            {chapter.blocks.map((block, blockIndex) => (
              <StoryBlock key={blockIndex} block={block} />
            ))}
          </Appear>
        </View>
      ))}

      <View className="mt-16">
        <Rule />
      </View>

      {/* End of story */}
      {nextStory ? (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={t('story.nextA11y', { title: nextStory.title })}
          scaleTo={0.98}
          onPress={() =>
            router.replace({ pathname: '/story/[slug]', params: { slug: nextStory.slug } })
          }
          className="flex-row items-center gap-4 py-8 border-t border-line pt-8">
          <View className="flex-1">
            <AppText variant="label">{t('story.nextStory')}</AppText>
            <AppText variant="headline" className="mt-1.5 text-[22px]">
              {nextStory.title}
            </AppText>
            <AppText variant="caption" className="mt-1">
              {t('story.nextStoryMeta', {
                author: nextStory.author,
                minutes: nextStory.minutes,
              })}
            </AppText>
          </View>
          <ChevronRight size={17} color={colors.muted} strokeWidth={1.6} />
        </PressableScale>
      ) : (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={t('story.backHomeA11y')}
          scaleTo={0.98}
          onPress={() => router.replace('/home')}
          className="flex-row items-center gap-2 py-8 border-t border-line pt-8">
          <ChevronLeft size={17} color={colors.muted} strokeWidth={1.6} />
          <AppText variant="small" font="sans-medium">
            {t('story.backToAll')}
          </AppText>
        </PressableScale>
      )}

      {/* Sticky Bottom Banner Ad */}
      <View className="items-center pb-2 pt-1 bg-transparent">
        <AdSlot />
      </View>
    </Screen>
  );
}

function ImageStory({ source, alt }: { source: any; alt: string }) {
  return (
    <Image
      source={source}
      style={{
        width: '100%',
        height: 360,
        borderRadius: 16,
        backgroundColor: '#F2EFE9',
      }}
      resizeMode="cover"
      accessibilityLabel={alt}
    />
  );
}

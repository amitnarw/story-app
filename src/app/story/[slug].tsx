import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowUp, ChevronLeft, Heart } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { AdSlot } from '@/components/ads/AdSlot';
import { InlineNativeAdCard } from '@/components/ads/InlineNativeAdCard';
import { markStoryClosedForInterstitial, showRewarded } from '@/ads/adManager';
import { StoryAudioPlayer } from '@/components/stories/StoryAudioPlayer';
import { StoryBlock } from '@/components/stories/StoryBlock';
import { ConfirmSheet } from '@/components/ui/confirm-sheet';
import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Screen } from '@/components/ui/screen';
import { useStory } from '@/content';
import { useIsFavorite, useLibrary } from '@/store/library';
import { useSettings } from '@/store/settings';
import { layout } from '@/theme/scale';
import { useTheme } from '@/theme/ThemeProvider';
import { useI18n } from '@/i18n';
import { useImageSize } from '@/lib/use-image-size';
import { useNow } from '@/lib/use-now';

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
  const audioUnlockedUntil = useSettings(
    (state) => state.audioUnlockedUntil[story?.slug ?? ''],
  );
  const unlockAudio = useSettings((state) => state.unlockAudio);
  const now = useNow(30_000);
  const [unlockVisible, setUnlockVisible] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const { t } = useI18n();

  const scrollRef = useRef<any>(null);
  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);

  const saved = useIsFavorite(story?.slug ?? '');
  const toggleFavorite = useLibrary((state) => state.toggleFavorite);
  const setReadingProgress = useLibrary((state) => state.setReadingProgress);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

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

  // Native ads are spread through the story at roughly the 1/3 and 2/3 marks,
  // so every story shows two even when it is short. `total - 1` keeps the last
  // block ad-free.
  const adAfterIndexes = useMemo(() => {
    const total = chapterBlockCounts.reduce((sum, count) => sum + count, 0);
    if (total < 2) return new Set<number>();
    const slots = Math.min(2, total - 1);
    return new Set(
      Array.from({ length: slots }, (_, slot) =>
        Math.floor(((slot + 1) * total) / (slots + 1)),
      ),
    );
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

  // Count every exit from a story (header back, hardware back, swipe-down
  // dismiss) so the interstitial frequency check sees all natural breaks.
  useEffect(() => () => markStoryClosedForInterstitial(), []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const audioLocked = !audioUnlockedUntil || audioUnlockedUntil <= now;

  const requestAudioUnlock = () => {
    setUnlockError(null);
    setUnlockVisible(true);
  };

  const cancelAudioUnlock = () => {
    setUnlockVisible(false);
    setUnlockError(null);
  };

  const confirmAudioUnlock = async () => {
    if (!story || unlocking) return;
    setUnlocking(true);
    setUnlockError(null);
    const outcome = await showRewarded();
    setUnlocking(false);
    if (outcome?.kind === 'earned') {
      unlockAudio(story.slug, 7);
      setUnlockVisible(false);
      return;
    }
    if (outcome?.kind === 'user-closed') {
      setUnlockVisible(false);
      return;
    }
    setUnlockError(t('audio.unlockFailed'));
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
    <>
      <Screen
        edges={['top', 'bottom']}
        gradient
        style={{ width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center' }}>
      {/* Sticky Top Header — the tinted fill doubles as the scroll progress bar */}
      <View
        className="relative overflow-hidden"
        style={{ marginTop: -insets.top, paddingTop: insets.top }}>
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: colors.surface2,
            },
            animatedProgressStyle,
          ]}
        />
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
          {/* Title block at top */}
          <Appear distance={16} className="mt-2">
            <View className="flex-row items-center flex-wrap gap-2 mt-3">
              <AppText variant="label">
                {t('story.storyNumber', {
                  number: String(story.order).padStart(2, '0'),
                  tags: story.tags.join(' · '),
                })}
              </AppText>
            </View>
            <AppText variant="title" className="mt-2">
              {story.title}
            </AppText>

            {/* Audio player directly under the title */}
            {story.audio ? (
              <View className="mt-4">
                <StoryAudioPlayer
                  source={story.audio.source}
                  locked={audioLocked}
                  onRequestUnlock={requestAudioUnlock}
                />
              </View>
            ) : null}

            <AppText variant="body" className="mt-3 max-w-[600px]">
              {story.summary}
            </AppText>
          </Appear>

          {/* Chapters */}
          {story.chapters.map((chapter, chapterIndex) => (
            <View key={chapterIndex}>
              {chapter.title && (
                <Appear delay={chapterIndex * 40} className={chapterIndex === 0 ? 'mt-6 mb-4' : 'mt-10 mb-4'}>
                  <AppText variant="headline" className="text-[20px]">
                    {chapter.title}
                  </AppText>
                </Appear>
              )}
              <View>
                {chapter.blocks.map((block, blockIndex) => {
                  const globalIndex = chapterOffsets[chapterIndex] + blockIndex;
                  return (
                    <Fragment key={globalIndex}>
                      <StoryBlock block={block} />
                      {adsConsented && adAfterIndexes.has(globalIndex) && (
                        <InlineNativeAdCard index={globalIndex} />
                      )}
                    </Fragment>
                  );
                })}
              </View>
            </View>
          ))}

          {/* Cover thumbnail shown last */}
          <View className="mt-8">
            <ImageStory source={story.cover} alt={story.coverAlt} />
          </View>

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

      {unlockVisible && (
        <ConfirmSheet
          visible={unlockVisible}
          title={t('audio.unlockTitle')}
          message={t('audio.unlockBody')}
          confirmLabel={t('audio.unlockConfirm')}
          cancelLabel={t('audio.unlockCancel')}
          busy={unlocking}
          error={unlockError}
          onCancel={cancelAudioUnlock}
          onConfirm={confirmAudioUnlock}
        />
      )}
    </>
  );
}

function ImageStory({ source, alt }: { source: any; alt: string }) {
  const { size } = useImageSize(source);
  const { width: screenW } = useWindowDimensions();
  const { colors } = useTheme();
  const ratio = size.ratio > 0 && isFinite(size.ratio) ? size.ratio : 16 / 9;
  const contentW = Math.min(screenW, layout.maxWidth) - 40;
  const width = Math.max(0, contentW);
  const height = width > 0 ? Math.min(width / ratio, 480) : 0;
  return width > 0 ? (
    <Image
      source={source}
      style={{ width, height, borderRadius: 20, backgroundColor: colors.surface2 }}
      contentFit="cover"
      accessibilityLabel={alt}
    />
  ) : null;
}

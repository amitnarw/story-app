import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import { useImageSize } from '@/lib/use-image-size';
import { Heart } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear, staggerDelay } from '@/components/ui/reveal';
import type { Story } from '@/content';
import { useI18n } from '@/i18n';
import { useIsFavorite, useLibrary } from '@/store/library';
import { useTheme } from '@/theme/ThemeProvider';
import type { StyleProp, ViewStyle } from 'react-native';

const heartColor = '#FFFFFF';

/**
 * Home-page story card: landscape cover, title over a gradient scrim,
 * and an icon-only heart.
 */
export const StoryCard = function StoryCard({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const { colors } = useTheme();
  const saved = useIsFavorite(story.slug);
  const toggleFavorite = useLibrary((state) => state.toggleFavorite);
  const { t } = useI18n();

  const cardCoverSize = useImageSize(story.cardCover);
  const cardRatio = cardCoverSize.size.ratio ?? 16 / 9;

  const cardStyle: StyleProp<ViewStyle> = {
    aspectRatio: cardRatio,
    borderRadius: 22,
    backgroundColor: colors.surface,
  };

  return (
    <Appear delay={staggerDelay(index)} className="w-full">
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={story.title}
        accessibilityHint={t('story.byAuthor', { author: story.author })}
        scaleTo={0.965}
        haptic="none"
        onPress={() => router.push({ pathname: '/story/[slug]', params: { slug: story.slug } })}
        className="w-full overflow-hidden relative"
        style={cardStyle}>
        <Image
          source={story.cardCover as any}
          style={StyleSheet.absoluteFill as any}
          contentFit="contain"
          transition={120}
          alt={story.title}
        />
        {/* Gradient scrim: transparent at top, dark at bottom for text legibility */}
        <View
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to top,
              rgba(0,0,0,0.72),
              rgba(0,0,0,0.42) 35%,
              rgba(0,0,0,0.12) 65%,
              transparent)`,
          }}
        />
        <View
          pointerEvents="none"
          className="absolute inset-x-0 bottom-0 px-6 pb-2 items-start justify-end"
          style={{ paddingTop: 60 }}>
          <AppText
            variant="headline"
            numberOfLines={2}
            tone="ink"
            style={{ color: '#FFFFFF' }}
            className="w-full text-[20px] leading-tight mb-2">
            {story.title}
          </AppText>
        </View>

        <View className="absolute right-4 top-4">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={
              saved
                ? t('story.removeCardA11y', { title: story.title })
                : t('story.saveCardA11y', { title: story.title })
            }
            accessibilityState={{ selected: saved }}
            scaleTo={0.82}
            haptic="select"
            onPress={() => toggleFavorite(story.slug)}
            className="h-10 w-10 items-center justify-center">
            <View
              className="absolute inset-0 rounded-full bg-black/40"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
              }}
            />
            <Heart
              size={24}
              color={heartColor}
              fill={saved ? heartColor : 'transparent'}
              strokeWidth={1.8}
            />
          </PressableScale>
        </View>
      </PressableScale>
    </Appear>
  );
};

StoryCard.displayName = 'StoryCard';

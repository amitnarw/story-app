import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear, staggerDelay } from '@/components/ui/reveal';
import type { Story } from '@/content';
import { useIsFavorite, useLibrary } from '@/store/library';
import { useTheme } from '@/theme/ThemeProvider';
import type { StyleProp, ViewStyle } from 'react-native';

function openStory(slug: string) {
  router.push({ pathname: '/story/[slug]', params: { slug } });
}

/**
 * Home-page story card: cover image, title, author, and a heart to save.
 */
export const StoryCard = function StoryCard({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const { colors, scheme } = useTheme();
  const isDark = scheme === 'dark';
  const saved = useIsFavorite(story.slug);
  const toggleFavorite = useLibrary((state) => state.toggleFavorite);

  const heartColor = isDark ? '#FFFFFF' : colors.ink;
  const cardStyle: StyleProp<ViewStyle> = {
    aspectRatio: 2 / 3,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  };
  const titleColor = isDark ? '#FFFFFF' : colors.ink;
  const heartButtonStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
  };

  return (
    <Appear delay={staggerDelay(index)} className="flex-1">
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={story.title}
        accessibilityHint={`by ${story.author}`}
        scaleTo={0.965}
        haptic="none"
        onPress={() => openStory(story.slug)}
        className="flex-1 overflow-hidden relative"
        style={cardStyle}>
        <Image
          source={story.cover as any}
          style={StyleSheet.absoluteFill as any}
          resizeMode="cover"
        />
        <View
          pointerEvents="none"
          className="absolute inset-x-0 bottom-0 px-4 pb-4 items-start"
          style={{ height: 96 }}>
          <AppText
            variant="headline"
            numberOfLines={2}
            tone="ink"
            style={{ color: titleColor }}
            className="text-[17px] leading-tight font-display">
            {story.title}
          </AppText>
          <AppText variant="caption" tone="muted" className="mt-1 text-[12px]">
            by {story.author}
          </AppText>
        </View>

        <View className="absolute right-4 top-4">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={
              saved ? `Remove ${story.title} from saved` : `Save ${story.title}`
            }
            accessibilityState={{ selected: saved }}
            scaleTo={0.82}
            haptic="select"
            onPress={() => toggleFavorite(story.slug)}
            className="h-9 w-9 items-center justify-center"
            style={heartButtonStyle}>
            <Heart
              size={19}
              color={heartColor}
              fill={saved ? heartColor : 'transparent'}
              strokeWidth={1.7}
            />
          </PressableScale>
        </View>
      </PressableScale>
    </Appear>
  );
};

StoryCard.displayName = 'StoryCard';

import { Image, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Heart } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear, staggerDelay } from '@/components/ui/reveal';
import type { Story } from '@/content';
import { useI18n } from '@/i18n';
import { useIsFavorite, useLibrary } from '@/store/library';
import { useTheme } from '@/theme/ThemeProvider';

function openStory(slug: string) {
  router.push({ pathname: '/story/[slug]', params: { slug } });
}

/**
 * Compact story row for lists: cover thumbnail + title + author + heart.
 */
export const StoryRow = function StoryRow({
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

  return (
    <Appear delay={staggerDelay(index)}>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={t('story.rowA11y', { title: story.title, author: story.author })}
        scaleTo={0.975}
        haptic="none"
        onPress={() => openStory(story.slug)}
        style={{
          backgroundColor: colors.surface,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.line,
          minHeight: 100,
          paddingHorizontal: 18,
          paddingVertical: 16,
          justifyContent: 'center',
        }}
        className="flex-row items-center gap-4">
        <View
          style={{
            width: 68,
            height: 92,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: colors.surface2,
          }}>
          <Image
            source={story.cover}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 justify-center">
          <AppText
            variant="subtitle"
            numberOfLines={2}
            font="sans-semibold"
            className="text-[17px] leading-[22px]">
            {story.title}
          </AppText>
          <AppText variant="caption" className="mt-1 text-[12.5px]" numberOfLines={1}>
            {t('story.rowMeta', { author: story.author, minutes: story.minutes })}
          </AppText>
        </View>

        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={
            saved ? t('saved.removeFavorite') : t('saved.saveStory')
          }
          scaleTo={0.82}
          haptic="select"
          hitSlop={10}
          onPress={() => toggleFavorite(story.slug)}
          className="p-2">
          <Heart
            size={20}
            color={saved ? colors.ink : colors.muted}
            fill={saved ? colors.ink : 'transparent'}
            strokeWidth={1.7}
          />
        </PressableScale>
        <ChevronRight size={18} color={colors.muted} strokeWidth={1.8} />
      </PressableScale>
    </Appear>
  );
};

StoryRow.displayName = 'StoryRow';

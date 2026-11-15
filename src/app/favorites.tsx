import { router } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { FlatList, View } from 'react-native';

import { AdSlot } from '@/components/ads/AdSlot';
import { StoryCard } from '@/components/stories/StoryCard';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { allStories, type Story } from '@/content';
import { useLibrary } from '@/store/library';
import { useTheme } from '@/theme/ThemeProvider';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const favorites = useLibrary((state) => state.favorites);

  const savedStories = favorites
    .map((slug) => allStories.find((s) => s.slug === slug))
    .filter((story): story is Story => Boolean(story));

  return (
    <Screen edges={['top', 'bottom']} className="flex-1">
      <View className="px-5 pb-3 pt-2">
        <View className="flex-row items-center gap-3">
          <IconButton
            icon={ChevronLeft}
            label="Back"
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace('/home');
            }}
          />
          <View className="flex-1">
            <AppText variant="title" className="font-display">
              Saved
            </AppText>
          </View>
        </View>

        <AppText variant="subtitle" tone="muted" className="mt-2 text-[14px]">
          Your private collection of stories
        </AppText>
      </View>

      {savedStories.length === 0 ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 28,
            paddingBottom: 80,
          }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.surface2,
              marginBottom: 16,
            }}>
            <Heart size={26} color={colors.muted} strokeWidth={1.6} />
          </View>
          <AppText variant="headline" style={{ textAlign: 'center' }}>
            No saved stories yet
          </AppText>
          <AppText
            variant="body"
            tone="muted"
            style={{ textAlign: 'center', marginTop: 8, maxWidth: 280 }}>
            Tap the heart on any story card to keep it here.
          </AppText>
        </View>
      ) : (
        <FlatList
          key="saved-stories-list"
          data={savedStories}
          keyExtractor={(item) => item.slug}
          numColumns={2}
          renderItem={({ item, index }) => <StoryCard story={item} index={index} />}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 50,
            gap: 12,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View className="items-center pb-2 pt-1 bg-transparent">
        <AdSlot />
      </View>
    </Screen>
  );
}

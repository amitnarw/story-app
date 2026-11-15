import { useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Search as SearchIcon, X } from 'lucide-react-native';

import { AdSlot } from '@/components/ads/AdSlot';
import { StoryRow } from '@/components/stories/StoryRow';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { allStories, type Story } from '@/content';
import { useTheme } from '@/theme/ThemeProvider';

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

export default function SearchScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');

  const trimmed = query.trim().toLowerCase();

  const matchingStories = useMemo<Story[]>(() => {
    if (!trimmed) return [];
    return allStories.filter((story) => {
      const matchTitle = story.title.toLowerCase().includes(trimmed);
      const matchAuthor = story.author.toLowerCase().includes(trimmed);
      const matchTags = story.tags.some((tag) => tag.toLowerCase().includes(trimmed));
      const matchSummary = story.summary.toLowerCase().includes(trimmed);
      return matchTitle || matchAuthor || matchTags || matchSummary;
    });
  }, [trimmed]);

  const hasSearched = trimmed.length > 0;
  const hasResults = matchingStories.length > 0;

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
          <View
            className="flex-1 flex-row items-center rounded-full px-3.5 py-2"
            style={{
              backgroundColor: colors.surface,
              borderWidth: 0,
            }}>
            <SearchIcon size={18} color={colors.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search stories, authors, tags..."
              placeholderTextColor={colors.muted}
              autoFocus
              returnKeyType="search"
              clearButtonMode="while-editing"
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 15,
                color: colors.ink,
                paddingVertical: 0,
              }}
            />
            {query.length > 0 ? (
              <PressableScale
                accessibilityRole="button"
                accessibilityLabel="Clear search"
                scaleTo={0.9}
                onPress={() => setQuery('')}
                className="p-1">
                <X size={16} color={colors.muted} />
              </PressableScale>
            ) : null}
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 8,
          paddingBottom: 60,
          flexGrow: 1,
          justifyContent: !hasSearched || !hasResults ? 'center' : undefined,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {!hasSearched ? (
          <View className="items-center justify-center px-7 pb-16">
            <View
              className="items-center justify-center mb-4"
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.surface2,
              }}>
              <SearchIcon size={26} color={colors.muted} strokeWidth={1.6} />
            </View>
            <AppText variant="headline" style={{ textAlign: 'center' }}>
              Search Loom
            </AppText>
            <AppText
              variant="body"
              tone="muted"
              style={{ textAlign: 'center', marginTop: 8, maxWidth: 280 }}>
              Find stories by title, author, or tag across the library.
            </AppText>
          </View>
        ) : null}

        {hasSearched && !hasResults ? (
          <View className="items-center justify-center px-7 pb-16">
            <View
              className="items-center justify-center mb-4"
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.surface2,
              }}>
              <SearchIcon size={26} color={colors.muted} strokeWidth={1.6} />
            </View>
            <AppText variant="headline" style={{ textAlign: 'center' }}>
              No matches found
            </AppText>
            <AppText
              variant="body"
              tone="muted"
              style={{ textAlign: 'center', marginTop: 8, maxWidth: 280 }}>
              We could not find anything matching &quot;{query}&quot;. Try a different search term.
            </AppText>
          </View>
        ) : null}

        {hasSearched && matchingStories.length > 0 ? (
          <View>
            <AppText variant="label" className="mb-3">
              Stories ({matchingStories.length})
            </AppText>
            <View className="gap-3">
              {chunk(matchingStories, 2).map((row) => (
                <View key={row[0].slug} className="flex-row gap-3">
                  {row.map((story, index) => (
                    <StoryRow key={story.slug} story={story} index={index} />
                  ))}
                  {row.length === 1 ? <View className="flex-1" /> : null}
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View className="items-center pb-2 pt-1 bg-transparent">
        <AdSlot />
      </View>
    </Screen>
  );
}

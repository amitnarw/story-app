import { useCallback, useEffect, useRef, useState, type ComponentRef } from 'react';
import { ScrollView, useWindowDimensions, View, type ScrollViewInstance } from 'react-native';
import { BlurTargetView } from 'expo-blur';

import { consumePendingInterstitial, useInterstitial } from '@/ads/adManager';
import { adConfig } from '@/ads/config';
import { TabBar } from '@/components/nav/tab-bar';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { Screen } from '@/components/ui/screen';

/**
 * The `/home` route hosts the swipeable pager: Home and Settings are pages
 * you can swipe between, with a floating tab bar on top.
 */
export default function TabsPagerScreen() {
  const { width } = useWindowDimensions();
  const pagerRef = useRef<ScrollViewInstance | null>(null);
  const blurTargetRef = useRef<ComponentRef<typeof View> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { show } = useInterstitial({ firstOpen: false });

  // Same interstitial behavior the Home tab had on focus.
  useEffect(() => {
    if (activeIndex !== 0) return;
    if (!consumePendingInterstitial()) return;
    const zone = adConfig.zones.interstitial;
    if (zone) void show(zone);
  }, [activeIndex, show]);

  const onChangeTab = useCallback(
    (index: number) => {
      pagerRef.current?.scrollTo({ x: index * width, animated: true });
    },
    [width],
  );

  const onPagerScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const idx = Math.round(event.nativeEvent.contentOffset.x / width);
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    },
    [width],
  );

  return (
    <Screen edges={['top', 'left', 'right']} className="flex-1">
      <BlurTargetView ref={blurTargetRef} style={{ flex: 1 }}>
        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          className="flex-1"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onPagerScroll as never}
          onMomentumScrollEnd={onPagerScroll as never}>
          <View style={{ width }}>
            <HomeScreen />
          </View>
          <View style={{ width }}>
            <SettingsScreen />
          </View>
        </ScrollView>
      </BlurTargetView>

      <TabBar activeIndex={activeIndex} onChangeTab={onChangeTab} blurTarget={blurTargetRef} />
    </Screen>
  );
}

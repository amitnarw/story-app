import { useCallback, useEffect, useRef, useState, type ComponentRef } from 'react';
import { ScrollView, useWindowDimensions, View, type ScrollViewInstance } from 'react-native';
import { BlurTargetView } from 'expo-blur';
import { useIsFocused } from 'expo-router';

import { hasInterstitialTrigger, useInterstitial } from '@/ads/adManager';
import { adConfig } from '@/ads/config';
import { TabBar } from '@/components/nav/tab-bar';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { Screen } from '@/components/ui/screen';
import { useUIStore } from '@/store/ui';

/**
 * The `/home` route hosts the swipeable pager: Home and Settings are pages
 * you can swipe between, with a floating tab bar on top.
 */
export default function TabsPagerScreen() {
  const { width } = useWindowDimensions();
  const pagerRef = useRef<ScrollViewInstance | null>(null);
  const blurTargetRef = useRef<ComponentRef<typeof View> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setActiveTab = useUIStore((state) => state.setActiveTab);
  const interstitialRequestId = useUIStore((state) => state.interstitialRequestId);
  const interstitialHandledId = useUIStore((state) => state.interstitialHandledId);
  const markInterstitialHandled = useUIStore((state) => state.markInterstitialHandled);
  const { show } = useInterstitial({ firstOpen: false });
  const isFocused = useIsFocused();

  // Natural break: a story was closed. Show the interstitial once the pager is
  // on the Home tab, so it never interrupts a Settings swipe. A short delay
  // lets the story modal finish dismissing first, and a few quick retries
  // cover the ad bridge still registering after a cold start.
  useEffect(() => {
    if (interstitialRequestId === 0) return;
    if (interstitialRequestId === interstitialHandledId) return;
    if (activeIndex !== 0) return;
    if (!isFocused) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const tryShow = () => {
      if (cancelled) return;
      if (!hasInterstitialTrigger()) {
        attempts += 1;
        if (attempts <= 5) {
          timer = setTimeout(tryShow, 1000);
        } else {
          console.log('[ads] interstitial bridge never became ready');
        }
        return;
      }
      markInterstitialHandled(interstitialRequestId);
      const zone = adConfig.zones.interstitial;
      console.log('[ads] showing interstitial', zone);
      if (zone) void show(zone);
    };

    timer = setTimeout(tryShow, 400);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [
    interstitialRequestId,
    interstitialHandledId,
    activeIndex,
    isFocused,
    markInterstitialHandled,
    show,
  ]);

  const onChangeTab = useCallback(
    (index: number) => {
      if (index !== 0 && index !== 1) return;
      setActiveTab(index === 0 ? 0 : 1);
      pagerRef.current?.scrollTo({ x: index * width, animated: true });
    },
    [width, setActiveTab],
  );

  const onPagerScroll = useCallback(
    (event: { nativeEvent: { contentOffset: { x: number } } }) => {
      const idx = Math.round(event.nativeEvent.contentOffset.x / width);
      if (idx === 0 || idx === 1) {
        setActiveTab(idx === 0 ? 0 : 1);
      }
      setActiveIndex((prev) => (prev === idx ? prev : idx));
    },
    [width, setActiveTab],
  );

  const homeRequestId = useUIStore((state) => state.homeRequestId);

  // Hardware back on the Settings tab asks the pager to return to Home.
  // `onPagerScroll` syncs the local tab index while the pager animates.
  useEffect(() => {
    if (homeRequestId === 0) return;
    pagerRef.current?.scrollTo({ x: 0, animated: true });
  }, [homeRequestId]);

  return (
    <Screen edges={['top', 'left', 'right']} className="flex-1">
      <BlurTargetView ref={blurTargetRef} style={{ flex: 1 }}>
        <ScrollView
          ref={pagerRef}
          horizontal
          pagingEnabled
          nestedScrollEnabled
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

import '../global.css';

import { useFonts } from 'expo-font';
import {
  CardStyleInterpolators,
  Stack,
} from 'expo-router/js-stack';
import { usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Easing, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as TrackingTransparency from 'expo-tracking-transparency';

import { useIsOnline } from '@/lib/use-online';
import { useSettings } from '@/store/settings';
import { APP_NAME } from '@/config/branding';
import { useLibrary } from '@/store/library';
import { useUIStore } from '@/store/ui';
import { useI18n } from '@/i18n';
import { duration } from '@/theme/scale';
import { fontAssets } from '@/theme/fonts';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';
import { InterstitialHost } from '@/components/ads/InterstitialHost';
import { initAds } from '@/ads/adManager';
import { ConfirmSheet } from '@/components/ui/confirm-sheet';
import { BrandSplash } from '@/components/ui/brand-splash';
import { NoInternetScreen } from '@/components/ui/no-internet-screen';
import { RewardedHost } from '@/components/ads/RewardedHost';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 220, fade: true });

const slideIn = {
  animation: 'timing' as const,
  config: { duration: duration.enter, easing: Easing.bezier(0.16, 1, 0.3, 1) },
};

const slideOut = {
  animation: 'timing' as const,
  config: { duration: duration.exit, easing: Easing.bezier(0.4, 0, 1, 1) },
};

function RootNavigator() {
  const { colors, scheme } = useTheme();

  useEffect(() => {
    void initAds();
  }, []);

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <InterstitialHost>
        <Stack
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: colors.paper },
            cardShadowEnabled: false,
            cardOverlayEnabled: false,
            detachPreviousScreen: false,
            gestureEnabled: Platform.OS === 'ios',
            gestureDirection: 'horizontal',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: { open: slideIn, close: slideOut },
          }}>
          <Stack.Screen
            name="index"
            options={{
              animation: 'none',
              cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
            }}
          />
          <Stack.Screen
            name="get-in"
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          />
          <Stack.Screen
            name="(tabs)/home"
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            }}
          />
          <Stack.Screen
            name="story/[slug]"
            options={{
              presentation: 'modal',
              detachPreviousScreen: false,
              gestureDirection: 'vertical',
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
          <Stack.Screen
            name="favorites"
            options={{
              detachPreviousScreen: false,
            }}
          />
          <Stack.Screen
            name="search"
            options={{
              detachPreviousScreen: false,
            }}
          />
          <Stack.Screen name="privacy" />
        </Stack>
      </InterstitialHost>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const settingsHydrated = useSettings((state) => state.hydrated);
  const libraryHydrated = useLibrary((state) => state.hydrated);
  const { t } = useI18n();
  const isOnline = useIsOnline();
  const [forceReady, setForceReady] = useState(false);
  const [trackingRequested, setTrackingRequested] = useState(false);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [brandSplashDone, setBrandSplashDone] = useState(false);
  const pathname = usePathname();
  const ready =
    (fontsLoaded || Boolean(fontError)) && settingsHydrated && libraryHydrated;

  // Safety net: if hydration never completes (e.g. storage unavailable in a
  // release build), still proceed so the user isn't stuck on a blank screen.
  useEffect(() => {
    const timer = setTimeout(() => setForceReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const show = ready || forceReady;

  useEffect(() => {
    if (!show) return;
    SplashScreen.hide();
  }, [show]);

  const finishBrandSplash = useCallback(() => setBrandSplashDone(true), []);

  const activeTab = useUIStore((state) => state.activeTab);
  const requestHome = useUIStore((state) => state.requestHome);

  // Exit confirmation when the user presses back on the home tab.
  // From the settings tab, back switches to the home tab instead.
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (pathname !== '/(tabs)/home' && pathname !== '/home') {
        return false;
      }
      if (!brandSplashDone) {
        // The splash is still on screen; swallow the press.
        return true;
      }
      if (exitConfirm) {
        // Close the dialog itself, with the exit animation.
        setExitConfirm(false);
        setIsExiting(true);
        setTimeout(() => setIsExiting(false), 250);
        return true;
      }
      if (activeTab === 1) {
        // On settings tab: go back to the home tab, no dialog.
        setExitConfirm(false);
        setIsExiting(false);
        requestHome();
        return true;
      }
      // On home tab: show exit confirmation.
      setExitConfirm(true);
      return true;
    });
    return () => subscription.remove();
  }, [pathname, activeTab, requestHome, brandSplashDone, exitConfirm]);

  useEffect(() => {
    if (!trackingRequested && Platform.OS === 'ios' && ready) {
      (async () => {
        try {
          await TrackingTransparency.requestTrackingPermissionsAsync();
        } catch {
          // Denied or unavailable — ads still work, just less targeted.
        }
        setTrackingRequested(true);
      })();
    }
  }, [ready, trackingRequested]);

  if (!show) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          {isOnline ? <RootNavigator /> : <NoInternetScreen />}
          {isOnline ? <RewardedHost /> : null}
          {!brandSplashDone && <BrandSplash onFinish={finishBrandSplash} />}
          {(exitConfirm || isExiting) && (
            <ConfirmSheet
              visible={exitConfirm}
              title={t('common.exitTitle', { app: APP_NAME })}
              message={t('common.exitBody')}
              confirmLabel={t('common.exitYes')}
              cancelLabel={t('common.exitNo')}
              onCancel={() => {
                setExitConfirm(false);
                setIsExiting(true);
                setTimeout(() => setIsExiting(false), 250);
              }}
              onConfirm={() => {
                setExitConfirm(false);
                setIsExiting(true);
                setTimeout(() => {
                  setIsExiting(false);
                  BackHandler.exitApp();
                }, 220);
              }}
            />
          )}
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

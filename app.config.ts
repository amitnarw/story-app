import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Loom',
  slug: 'loom',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'loom',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#F7F2EA',
  platforms: ['ios', 'android'],
  ios: {
    icon: './assets/images/icon.png',
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#F7F2EA',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    package: 'com.loom.stories',
  },
  web: {
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    './plugins/with-release-build',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#F7F2EA',
        image: './assets/images/splash-icon.png',
        imageWidth: 96,
        dark: {
          backgroundColor: '#0F0D0C',
          image: './assets/images/splash-icon-dark.png',
        },
      },
    ],
    [
      'react-native-google-mobile-ads',
      {
        androidAppId: 'ca-app-pub-3940256099942544~3347511713',
        iosAppId: 'ca-app-pub-3940256099942544~1444665636',
      },
    ],
    './plugins/with-disable-native-ad-validator',
    'expo-tracking-transparency',
    [
      'expo-audio',
      {
        // Playback only: never ask for the microphone.
        microphonePermission: false,
        recordAudioAndroid: false,
        enableBackgroundRecording: false,
        // In-app listening only; no foreground service or notification.
        enableBackgroundPlayback: false,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    ads: {
      provider: 'admob',
      testMode: true,
      zones: {
        appOpen: 'ca-app-pub-3940256099942544/9257395921',
        interstitial: 'ca-app-pub-3940256099942544/1033173712',
        banner: 'ca-app-pub-3940256099942544/6300978111',
        native: 'ca-app-pub-3940256099942544/2247696110',
        rewarded: 'ca-app-pub-3940256099942544/5224354917',
      },
      interstitialCapPerSession: 3,
      interstitialOnFirstOpen: false,
    },
  },
};

export default config;

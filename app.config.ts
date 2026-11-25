import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Romantic Stories',
  slug: 'romantic-stories',
  version: '5.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'romanticstories',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#F7F2EA',
  platforms: ['ios', 'android'],
  ios: {
    icon: './assets/images/icon.png',
    supportsTablet: true,
  },
  android: {
    versionCode: 5,
    adaptiveIcon: {
      backgroundColor: '#F7F2EA',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    package: 'kahaniya_app_in_hindi_offline.story_app_in_english.kahaniya_app.kahaniya_hindi_free',
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
        imageWidth: 96,
        dark: {
          backgroundColor: '#0F0D0C',
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
      testMode: false,
      zones: {
        appOpen: 'ca-app-pub-9461789746935863/3923222506',
        interstitial: 'ca-app-pub-9461789746935863/4629783602',
        banner: 'ca-app-pub-9461789746935863/1888070190',
        native: 'ca-app-pub-9461789746935863/2937443897',
        rewarded: 'ca-app-pub-9461789746935863/8150226216',
      },
      interstitialCapPerSession: 3,
      interstitialOnFirstOpen: false,
    },
  },
};

export default config;

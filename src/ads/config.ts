import Constants from 'expo-constants';

export interface AdConfig {
  provider: 'mock' | 'admob' | 'webview';
  testMode: boolean;
  zones: {
    appOpen: string;
    interstitial: string;
    banner: string;
    native: string;
    rewarded: string;
  };
  interstitialCapPerSession: number;
  interstitialOnFirstOpen: boolean;
}

const defaults: AdConfig = {
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
};

const extra = (Constants.expoConfig?.extra?.ads ?? {}) as Partial<AdConfig> & {
  zones?: Partial<AdConfig['zones']>;
};

export const adConfig: AdConfig = {
  ...defaults,
  ...extra,
  zones: {
    ...defaults.zones,
    ...(extra.zones ?? {}),
  },
};

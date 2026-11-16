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

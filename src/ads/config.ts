export interface AdConfig {
  provider: 'mock' | 'admob' | 'webview';
  testMode: boolean;
  zones: {
    appOpen: string;
    interstitial: string;
    banner: string;
    rewarded: string;
  };
  interstitialCapPerSession: number;
  interstitialOnFirstOpen: boolean;
}

export const adConfig: AdConfig = {
  provider: 'mock',
  testMode: true,
  zones: {
    appOpen: 'ca-app-pub-3940256099942544/5662997125',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    banner: 'ca-app-pub-3940256099942544/6300978111',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
  interstitialCapPerSession: 3,
  interstitialOnFirstOpen: false,
};

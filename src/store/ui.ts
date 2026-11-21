import { create } from 'zustand';

export type TabIndex = 0 | 1;

type UIState = {
  activeTab: TabIndex;
  setActiveTab: (tab: TabIndex) => void;
  /** Increments whenever something asks the pager to go back to Home. */
  homeRequestId: number;
  requestHome: () => void;
  /** Increments whenever a natural break asks for an interstitial. */
  interstitialRequestId: number;
  /** Last request id the Home pager already acted on. */
  interstitialHandledId: number;
  requestInterstitial: () => void;
  markInterstitialHandled: (id: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTab: 0,
  setActiveTab: (tab: TabIndex) => set({ activeTab: tab }),
  homeRequestId: 0,
  requestHome: () =>
    set((state) => ({
      activeTab: 0,
      homeRequestId: state.homeRequestId + 1,
    })),
  interstitialRequestId: 0,
  interstitialHandledId: 0,
  requestInterstitial: () =>
    set((state) => ({
      interstitialRequestId: state.interstitialRequestId + 1,
    })),
  markInterstitialHandled: (id: number) => set({ interstitialHandledId: id }),
}));

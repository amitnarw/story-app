import Storage from 'expo-sqlite/kv-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { detectLanguage } from '@/i18n/detect';
import type { Language } from '@/i18n/types';

export type ThemePreference = 'system' | 'light' | 'dark';

export const SETTINGS_KEY = 'loom.settings';

/**
 * Deliberately tiny. Everything a new user needs is on by default; the only
 * real gate is the one-button welcome screen.
 */
type SettingsState = {
  hydrated: boolean;
  onboarded: boolean;
  adsConsented: boolean;
  mature: boolean;
  theme: ThemePreference;
  haptics: boolean;
  language: Language;
  enter: () => void;
  setAdsConsented: (consented: boolean) => void;
  setTheme: (theme: ThemePreference) => void;
  setHaptics: (enabled: boolean) => void;
  setLanguage: (language: Language) => void;
  setMature: (enabled: boolean) => void;
  resetAll: () => void;
  markHydrated: () => void;
};

const defaults = {
  onboarded: false,
  adsConsented: true,
  mature: true,
  theme: 'dark' as ThemePreference,
  haptics: true,
  language: detectLanguage(),
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      hydrated: false,
      enter: () => set({ onboarded: true }),
      setAdsConsented: (adsConsented: boolean) => set({ adsConsented }),
      setTheme: (theme) => set({ theme }),
      setHaptics: (haptics) => set({ haptics }),
      setLanguage: (language) => set({ language }),
      setMature: (mature) => set({ mature }),
      resetAll: () => {
        void Storage.removeItem(SETTINGS_KEY);
        set({ ...defaults, hydrated: true });
      },
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: SETTINGS_KEY,
      storage: createJSONStorage(() => Storage),
      partialize: ({ hydrated, ...rest }) => rest,
      onRehydrateStorage: () => (state) => {
        // Advertising is always enabled — ignore any previously saved value.
        state?.setAdsConsented?.(true);
        state?.markHydrated();
      },
    },
  ),
);

import Storage from 'expo-sqlite/kv-store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const LIBRARY_KEY = 'loom.library';

const HISTORY_LIMIT = 24;

type LibraryState = {
  hydrated: boolean;
  favorites: string[];
  history: string[];
  readingProgress: Record<string, number>;
  toggleFavorite: (slug: string) => void;
  recordView: (slug: string) => void;
  setReadingProgress: (slug: string, progress: number) => void;
  clearHistory: () => void;
  resetAll: () => void;
  markHydrated: () => void;
};

export const useLibrary = create<LibraryState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      favorites: [],
      history: [],
      readingProgress: {},
      toggleFavorite: (slug) => {
        const favorites = get().favorites;
        set({
          favorites: favorites.includes(slug)
            ? favorites.filter((item) => item !== slug)
            : [slug, ...favorites],
        });
      },
      recordView: (slug) => {
        const history = get().history.filter((item) => item !== slug);
        set({ history: [slug, ...history].slice(0, HISTORY_LIMIT) });
      },
      setReadingProgress: (slug, progress) => {
        set({ readingProgress: { ...get().readingProgress, [slug]: progress } });
      },
      clearHistory: () => set({ history: [] }),
      resetAll: () => {
        void Storage.removeItem(LIBRARY_KEY);
        set({ hydrated: true, favorites: [], history: [], readingProgress: {} });
      },
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: LIBRARY_KEY,
      storage: createJSONStorage(() => Storage),
      partialize: ({ hydrated, ...rest }) => rest,
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export function useIsFavorite(slug: string) {
  return useLibrary((state) => state.favorites.includes(slug));
}

export function useReadingProgress(slug: string) {
  return useLibrary((state) => state.readingProgress[slug] ?? 0);
}

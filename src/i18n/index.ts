import { useMemo } from 'react';

import { useSettings } from '@/store/settings';

import { en, type Messages } from './en';
import { hi } from './hi';
import { hinglish } from './hinglish';
import type { FormatParams, Language } from './types';

export { LANGUAGES } from './types';
export type { Language, FormatParams } from './types';

const dictionaries: Record<Language, Messages> = {
  en,
  hi,
  hinglish,
};

export { dictionaries };

/** Replace `{name}` placeholders in a template. */
export function format(template: string, params?: FormatParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  );
}

/** Dot-path type for translation keys, e.g. `settings.hapticsDesc`. */
export type TranslationKey<T> = T extends Record<string, unknown>
  ? { [K in keyof T & string]: T[K] extends string ? K : T[K] extends readonly string[] ? never : `${K}.${TranslationKey<T[K]>}` }[keyof T & string]
  : never;

export type Translator = (key: TranslationKey<Messages>, params?: FormatParams) => string;

function lookup(dict: unknown, path: string): unknown {
  let node: unknown = dict;
  for (const part of path.split('.')) {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return node;
}

function makeT(dict: Messages): Translator {
  return (key, params) => {
    const value = lookup(dict, key);
    if (typeof value === 'string') return format(value, params);
    if (__DEV__) console.warn(`[i18n] missing translation for "${key}"`);
    return key;
  };
}

/** The full message tree for the active language (for arrays and rich content). */
export function useMessages(): Messages {
  const language = useSettings((state) => state.language);
  return useMemo(() => dictionaries[language], [language]);
}

/** `{ language, t }` for the active language. Re-renders when it changes. */
export function useI18n() {
  const language = useSettings((state) => state.language);
  const messages = useMessages();
  const t = useMemo(() => makeT(messages), [messages]);
  return { language, t, messages };
}

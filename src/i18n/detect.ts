import { NativeModules } from 'react-native';

import type { Language } from './types';

/**
 * Best-effort device language detection without a native dependency.
 * Hermes exposes Intl, so resolving the active locale works on both
 * platforms. Anything that is not Hindi defaults to English — Hinglish is
 * always a deliberate choice, never an automatic one.
 */
export function detectLanguage(): Language {
  try {
    const locale =
      Intl.DateTimeFormat().resolvedOptions().locale ||
      NativeModules?.I18nManager?.localeIdentifier ||
      'en';
    const tag = String(locale).toLowerCase();
    if (tag.startsWith('hi')) return 'hi';
    return 'en';
  } catch {
    return 'en';
  }
}

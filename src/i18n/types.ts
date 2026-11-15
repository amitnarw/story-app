export type Language = 'en' | 'hi' | 'hinglish';

/**
 * Languages offered in the app. `label` is always shown in its own language so
 * readers can find their own before anything else is readable.
 */
export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'hinglish', label: 'Hinglish' },
];

export type FormatParams = Record<string, string | number>;

import { Fraunces_400Regular } from '@expo-google-fonts/fraunces/400Regular';
import { Fraunces_400Regular_Italic } from '@expo-google-fonts/fraunces/400Regular_Italic';
import { Fraunces_500Medium } from '@expo-google-fonts/fraunces/500Medium';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { Fraunces_700Bold } from '@expo-google-fonts/fraunces/700Bold';
import { Geist_400Regular } from '@expo-google-fonts/geist/400Regular';
import { Geist_500Medium } from '@expo-google-fonts/geist/500Medium';
import { Geist_600SemiBold } from '@expo-google-fonts/geist/600SemiBold';
import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_500Medium,
  NotoSansDevanagari_600SemiBold,
} from '@expo-google-fonts/noto-sans-devanagari';
import {
  NotoSerifDevanagari_400Regular,
  NotoSerifDevanagari_500Medium,
  NotoSerifDevanagari_600SemiBold,
  NotoSerifDevanagari_700Bold,
} from '@expo-google-fonts/noto-serif-devanagari';

export const fontAssets = {
  Fraunces_400Regular,
  Fraunces_400Regular_Italic,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Geist_400Regular,
  Geist_500Medium,
  Geist_600SemiBold,
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_500Medium,
  NotoSansDevanagari_600SemiBold,
  NotoSerifDevanagari_400Regular,
  NotoSerifDevanagari_500Medium,
  NotoSerifDevanagari_600SemiBold,
  NotoSerifDevanagari_700Bold,
};

/**
 * Font roles used by `AppText`. Latin roles use Geist/Fraunces; when the
 * active language is Hindi the Devanagari roles kick in instead (Fraunces and
 * Geist carry no Devanagari glyphs). Hinglish is romanized, so it stays on
 * the Latin faces.
 */
export type FontRole =
  | 'display'
  | 'display-regular'
  | 'display-medium'
  | 'display-semibold'
  | 'display-bold'
  | 'display-italic'
  | 'sans'
  | 'sans-medium'
  | 'sans-semibold';

export const latinFonts: Record<FontRole, string> = {
  display: 'Fraunces_600SemiBold',
  'display-regular': 'Fraunces_400Regular',
  'display-medium': 'Fraunces_500Medium',
  'display-semibold': 'Fraunces_600SemiBold',
  'display-bold': 'Fraunces_700Bold',
  'display-italic': 'Fraunces_400Regular_Italic',
  sans: 'Geist_400Regular',
  'sans-medium': 'Geist_500Medium',
  'sans-semibold': 'Geist_600SemiBold',
};

export const devanagariFonts: Record<FontRole, string> = {
  display: 'NotoSerifDevanagari_600SemiBold',
  'display-regular': 'NotoSerifDevanagari_400Regular',
  'display-medium': 'NotoSerifDevanagari_500Medium',
  'display-semibold': 'NotoSerifDevanagari_600SemiBold',
  'display-bold': 'NotoSerifDevanagari_700Bold',
  // Devanagari has no italic; the serif semibold stands in for quotes.
  'display-italic': 'NotoSerifDevanagari_600SemiBold',
  sans: 'NotoSansDevanagari_400Regular',
  'sans-medium': 'NotoSansDevanagari_500Medium',
  'sans-semibold': 'NotoSansDevanagari_600SemiBold',
};

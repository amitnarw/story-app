import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { cn } from '@/lib/cn';
import { useSettings } from '@/store/settings';
import {
  devanagariFonts,
  latinFonts,
  type FontRole,
} from '@/theme/fonts';

export type TextVariant =
  | 'display'
  | 'title'
  | 'headline'
  | 'subtitle'
  | 'body'
  | 'small'
  | 'caption'
  | 'label'
  | 'numeric'
  | 'quote'
  | 'button';

export type TextTone =
  | 'ink'
  | 'soft'
  | 'muted'
  | 'accent'
  | 'accentOn'
  | 'paper'
  | 'warm'
  | 'warmInk'
  | 'danger';

const variantClass: Record<TextVariant, string> = {
  display: 'font-display text-display',
  title: 'font-display text-title',
  headline: 'font-display text-headline',
  subtitle: 'font-sans-medium text-subtitle',
  body: 'font-sans text-body',
  small: 'font-sans text-small',
  caption: 'font-sans text-caption',
  label: 'font-sans-semibold text-label',
  numeric: 'font-sans-medium text-numeric tabular-nums',
  quote: 'font-display-italic text-headline',
  button: 'font-sans-semibold text-[14px] leading-5',
};

const toneClass: Record<TextTone, string> = {
  ink: 'text-ink',
  soft: 'text-ink-soft',
  muted: 'text-muted',
  accent: 'text-accent',
  accentOn: 'text-accent-on',
  paper: 'text-paper',
  warm: 'text-warm',
  warmInk: 'text-warm-ink',
  danger: 'text-danger',
};

const defaultTone: Record<TextVariant, TextTone> = {
  display: 'ink',
  title: 'ink',
  headline: 'ink',
  subtitle: 'ink',
  body: 'soft',
  small: 'muted',
  caption: 'muted',
  label: 'muted',
  numeric: 'muted',
  quote: 'soft',
  button: 'paper',
};

const maxScale: Partial<Record<TextVariant, number>> = {
  display: 1.1,
  title: 1.15,
  headline: 1.2,
};

const variantFont: Record<TextVariant, FontRole> = {
  display: 'display',
  title: 'display',
  headline: 'display',
  subtitle: 'sans-medium',
  body: 'sans',
  small: 'sans',
  caption: 'sans',
  label: 'sans-semibold',
  numeric: 'sans-medium',
  quote: 'display-italic',
  button: 'sans-semibold',
};

/**
 * Devanagari's serif face has a taller ascent/descent (1.55em) than the Latin
 * display sizes assume, so a tight CSS line-height clips the top of matras and
 * the shirorekha. These floors only apply to the Hindi display cuts.
 */
const hindiLineHeight: Partial<Record<TextVariant, number>> = {
  display: 63,
  title: 47,
  headline: 33,
  quote: 33,
};

const DEVANAGARI = /[\u0900-\u097F]/;

function hasDevanagari(node: ReactNode): boolean {
  if (typeof node === 'string') return DEVANAGARI.test(node);
  if (Array.isArray(node)) return node.some(hasDevanagari);
  return false;
}

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  /** Explicit font role, overriding the variant default. */
  font?: FontRole;
};

export function AppText({
  variant = 'body',
  tone,
  font,
  className,
  children,
  maxFontSizeMultiplier,
  style,
  ...rest
}: AppTextProps) {
  const language = useSettings((state) => state.language);
  const families = language === 'hi' ? devanagariFonts : latinFonts;
  const fontFamily = families[font ?? variantFont[variant]];
  const hindiLeading =
    language === 'hi' && hasDevanagari(children) ? hindiLineHeight[variant] : undefined;

  return (
    <Text
      className={cn(variantClass[variant], toneClass[tone ?? defaultTone[variant]], className)}
      style={[{ fontFamily }, hindiLeading ? { lineHeight: hindiLeading } : null, style]}
      maxFontSizeMultiplier={maxFontSizeMultiplier ?? maxScale[variant] ?? 1.35}
      {...rest}>
      {children}
    </Text>
  );
}

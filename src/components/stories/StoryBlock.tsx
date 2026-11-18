import { useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';

import { AppText } from '@/components/ui/app-text';
import { layout } from '@/theme/scale';
import { cn } from '@/lib/cn';
import { useImageSize } from '@/lib/use-image-size';
import { useTheme } from '@/theme/ThemeProvider';

type ParagraphProps = {
  text: string;
  dropCap?: boolean;
  className?: string;
};

const COMBINING = /[\p{Mn}\p{Mc}\p{Me}]/u;
const VIRAMA = 0x094d;

/**
 * The first grapheme-ish cluster of a string: base character plus any
 * combining marks (matras, nukta), and — when it ends on a virama — the
 * rest of the consonant cluster. This is what a drop cap must swallow so
 * the remainder still renders as valid script: "ट्रेन" → "ट्रे" + "न...".
 */
function firstCluster(text: string): string {
  if (text.length === 0) return '';
  let i = 1;
  while (i < text.length && COMBINING.test(text[i])) i += 1;
  while (text.charCodeAt(i - 1) === VIRAMA && i < text.length) {
    i += 1;
    while (i < text.length && COMBINING.test(text[i])) i += 1;
  }
  return text.slice(0, i);
}

export function ParagraphBlock({ text, dropCap, className }: ParagraphProps) {
  const { colors } = useTheme();

  if (dropCap) {
    const first = firstCluster(text);
    const rest = text.slice(first.length);
    return (
      <View className={cn('flex-row gap-2 mb-6', className)}>
        <AppText
          variant="display"
          tone="ink"
          font="display-bold"
          className="text-[56px] leading-none mt-2"
          style={{ color: colors.clay }}
        >
          {first}
        </AppText>
        <AppText variant="body" tone="soft" className="flex-1 leading-relaxed">
          {rest}
        </AppText>
      </View>
    );
  }

  return <AppText variant="body" tone="soft" className={cn('mb-6', className)}>{text}</AppText>;
}

type HeadingProps = {
  text: string;
  className?: string;
};

export function HeadingBlock({ text, className }: HeadingProps) {
  return (
    <AppText
      variant="headline"
      tone="ink"
      className={cn('mb-6 mt-4', className)}
    >
      {text}
    </AppText>
  );
}

type ImageBlockProps = {
  source: any;
  alt: string;
  caption?: string;
  className?: string;
};

export function ImageBlock({ source, alt, caption, className }: ImageBlockProps) {
  const { colors } = useTheme();
  const { size } = useImageSize(source);
  const { width: screenW } = useWindowDimensions();
  const ratio = size.ratio > 0 && isFinite(size.ratio) ? size.ratio : 16 / 9;
  const contentW = Math.min(screenW, layout.maxWidth) - 40;
  const width = Math.max(0, contentW);
  const height = width > 0 ? width / ratio : 0;

  return (
    <View className={cn('w-full mb-6 items-center', className)}>
      {width > 0 ? (
        <Image
          source={source as any}
          style={{ width, height, borderRadius: 20, backgroundColor: colors.surface2 }}
          contentFit="contain"
          accessibilityLabel={alt}
        />
      ) : null}
      {caption && (
        <AppText
          variant="caption"
          tone="muted"
          className="mt-3 text-[12px] text-center max-w-[560px]"
          numberOfLines={2}>
          {caption}
        </AppText>
      )}
    </View>
  );
}

type QuoteBlockProps = {
  text: string;
  cite?: string;
  className?: string;
};

export function QuoteBlock({ text, cite, className }: QuoteBlockProps) {
  return (
    <View className={cn('my-8 border-l border-clay pl-5', className)}>
      <AppText variant="quote" tone="ink" className="max-w-[560px] mb-4">
        {text}
      </AppText>
      {cite && (
        <AppText variant="small" tone="muted" className="mt-2">
          — {cite}
        </AppText>
      )}
    </View>
  );
}

export function DividerBlock({ className }: { className?: string }) {
  const { colors } = useTheme();
  return (
    <View
      className={cn('my-10 h-px', className)}
      style={{ backgroundColor: colors.line }}
    />
  );
}

export function StoryBlock({ block }: { block: any }) {
  if (block.kind === 'paragraph') {
    return <ParagraphBlock text={block.text} dropCap={block.dropCap} />;
  }
  if (block.kind === 'heading') {
    return <HeadingBlock text={block.text} />;
  }
  if (block.kind === 'image') {
    return <ImageBlock source={block.source} alt={block.alt} caption={block.caption} />;
  }
  if (block.kind === 'quote') {
    return <QuoteBlock text={block.text} cite={block.cite} />;
  }
  if (block.kind === 'divider') {
    return <DividerBlock />;
  }
  return null;
}

import { Image, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type ParagraphProps = {
  text: string;
  dropCap?: boolean;
  className?: string;
};

export function ParagraphBlock({ text, dropCap, className }: ParagraphProps) {
  const { colors } = useTheme();

  if (dropCap) {
    const first = text.charAt(0);
    const rest = text.slice(1);
    return (
      <View className={cn('flex-row gap-2', className)}>
        <AppText
          variant="display"
          tone="ink"
          className="text-[56px] leading-none font-display font-bold"
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

  return <AppText variant="body" tone="soft" className={className}>{text}</AppText>;
}

type HeadingProps = {
  text: string;
  className?: string;
};

export function HeadingBlock({ text, className }: HeadingProps) {
  return <AppText variant="headline" tone="ink" className={className}>{text}</AppText>;
}

type ImageBlockProps = {
  source: any;
  alt: string;
  caption?: string;
  className?: string;
};

export function ImageBlock({ source, alt, caption, className }: ImageBlockProps) {
  const { colors } = useTheme();
  return (
    <View className={cn('items-center', className)}>
      <Image
        source={source as any}
        style={{
          width: '100%',
          height: 360,
          borderRadius: 16,
          backgroundColor: colors.surface2,
        }}
        accessibilityLabel={alt}
      />
      {caption && (
        <AppText
          variant="caption"
          tone="muted"
          className="mt-2 text-[12px] text-center max-w-[560px]"
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
    <View className={cn('my-7 border-l border-clay pl-5', className)}>
      <AppText variant="quote" tone="ink" className="max-w-[560px]">
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

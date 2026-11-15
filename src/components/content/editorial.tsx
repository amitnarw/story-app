import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <AppText variant="headline" tone="ink" className={className}>
      {children}
    </AppText>
  );
}

type BulletListProps = {
  items: string[];
  className?: string;
};

export function BulletList({ items, className }: BulletListProps) {
  const { colors } = useTheme();
  return (
    <View className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <View key={index} className="flex-row items-start gap-2">
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.clay,
              marginTop: 7,
            }}
          />
          <AppText variant="body" tone="soft">
            {item}
          </AppText>
        </View>
      ))}
    </View>
  );
}

type NoteCardProps = {
  title: string;
  text: string;
  className?: string;
};

export function NoteCard({ title, text, className }: NoteCardProps) {
  const { colors } = useTheme();
  return (
    <View
      className={cn('my-6 border-l border-clay pl-4', className)}
      style={{ backgroundColor: colors.surface2, borderRadius: 8, padding: 14 }}
    >
      <AppText variant="small" tone="muted" font="sans-semibold" className="mb-2">
        {title}
      </AppText>
      <AppText variant="body" tone="soft">
        {text}
      </AppText>
    </View>
  );
}

type NumberedStepsProps = {
  items: string[];
  className?: string;
};

export function NumberedSteps({ items, className }: NumberedStepsProps) {
  return (
    <View className={cn('space-y-6', className)}>
      {items.map((item, index) => (
        <View key={index} className="flex-row items-baseline gap-3">
          <AppText font="display" className="text-[21px] text-muted">
            {String(index + 1).padStart(2, '0')}
          </AppText>
          <AppText variant="subtitle" className="flex-1">
            {item}
          </AppText>
        </View>
      ))}
    </View>
  );
}

import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type ReadingProgressProps = {
  progress: number;
  className?: string;
};

export function ReadingProgress({ progress, className }: ReadingProgressProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <View
      className={cn('h-2 w-full rounded-full overflow-hidden', className)}
      style={{ backgroundColor: colors.surface2 }}>
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          backgroundColor: colors.clay,
        }}
      />
    </View>
  );
}

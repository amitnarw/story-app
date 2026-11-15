import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type DotScaleProps = {
  active?: boolean;
  className?: string;
};

export function DotScale({ active = false, className }: DotScaleProps) {
  return (
    <View
      className={cn(
        'h-2 w-2 rounded-full',
        active ? 'bg-clay' : 'bg-line',
        className,
      )}
    />
  );
}

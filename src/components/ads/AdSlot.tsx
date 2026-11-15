import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type AdSlotProps = {
  variant?: 'dock' | 'inline';
};

export function AdSlot({ variant = 'inline' }: AdSlotProps) {
  const { colors } = useTheme();
  const isDock = variant === 'dock';

  return (
    <View
      className={cn('items-center pb-2 pt-1 bg-transparent')}
      style={{ backgroundColor: 'transparent' }}>
      <View
        style={[
          {
            width: isDock ? 320 : undefined,
            height: isDock ? 50 : undefined,
            backgroundColor: colors.control,
            borderRadius: 4,
          },
        ] as any}
        accessibilityLabel="Advertisement"
        accessible={true}
      />
      {!isDock && (
        <View className="h-4" />
      )}
    </View>
  );
}

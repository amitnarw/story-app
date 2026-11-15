import { View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/app-text';
import { cn } from '@/lib/cn';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

type ToggleProps = {
  value: boolean;
  label: string;
  onValueChange: (value: boolean) => void;
  className?: string;
};

export function Toggle({ value, label, onValueChange, className }: ToggleProps) {
  const { colors } = useTheme();

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      scaleTo={0.96}
      haptic="select"
      onPress={() => onValueChange(!value)}
      className={cn('flex-row items-center justify-between gap-3 px-3 py-2 rounded-full', className)}
      style={{
        backgroundColor: value ? colors.clay : colors.control,
        borderWidth: value ? 0 : StyleSheet.hairlineWidth,
        borderColor: colors.line,
      }}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 999,
          backgroundColor: value ? colors.accentOn : colors.ink,
          transform: [{ translateX: value ? 18 : 0 }],
        }}
      />
      <AppText variant="small" tone={value ? 'ink' : 'muted'} font="sans-medium">
        {label}
      </AppText>
    </PressableScale>
  );
}

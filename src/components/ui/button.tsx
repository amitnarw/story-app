import { PressableScale } from '@/components/ui/pressable-scale';
import { AppText } from '@/components/ui/app-text';
import { cn } from '@/lib/cn';
import { useTheme } from '@/theme/ThemeProvider';

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onPress: () => void;
  className?: string;
  disabled?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  onPress,
  className,
  disabled = false,
}: ButtonProps) {
  const { colors } = useTheme();

  const base = 'flex-row items-center justify-center rounded-pill px-6 py-3';
  let style: Record<string, unknown> = {};
  let tone: string = 'paper';

  if (variant === 'primary') {
    style.backgroundColor = colors.clay;
    tone = 'accentOn';
  } else if (variant === 'danger') {
    style.borderWidth = 1;
    style.borderColor = colors.danger;
    tone = 'danger';
  } else {
    style.backgroundColor = colors.surface2;
    style.borderWidth = 1;
    style.borderColor = colors.line;
    tone = 'ink';
  }

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      scaleTo={0.96}
      haptic="tap"
      onPress={onPress}
      disabled={disabled}
      className={cn(base, className)}
      style={[style, disabled && { opacity: 0.5 }]}>
      <AppText variant="button" tone={tone as any} className="font-sans-semibold">
        {label}
      </AppText>
    </PressableScale>
  );
}

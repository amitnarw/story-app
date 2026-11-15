import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';

type RuleProps = {
  className?: string;
};

export function Rule({ className }: RuleProps) {
  const { colors } = useTheme();
  return (
    <View
      style={{ height: StyleSheet.hairlineWidth, backgroundColor: colors.line }}
      className={className}
    />
  );
}

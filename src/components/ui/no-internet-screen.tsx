import NetInfo from '@react-native-community/netinfo';
import { WifiOff } from 'lucide-react-native';

import { useI18n } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';
import { AppText } from './app-text';
import { PressableScale } from './pressable-scale';
import { Screen } from './screen';

/**
 * Full-screen online-only gate. Shown at launch and as a blocking overlay
 * when the connection drops.
 */
export function NoInternetScreen() {
  const { t } = useI18n();
  const { colors } = useTheme();

  return (
    <Screen
      edges={['top', 'bottom', 'left', 'right']}
      contentClassName="items-center justify-center px-6">
      <WifiOff size={44} color={colors.muted} strokeWidth={1.5} />
      <AppText variant="title" className="mt-6 text-center">
        {t('offline.title')}
      </AppText>
      <AppText variant="body" tone="muted" className="mt-3 max-w-[300px] text-center">
        {t('offline.body')}
      </AppText>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={t('offline.retry')}
        scaleTo={0.98}
        onPress={() => {
          void NetInfo.fetch().catch(() => {});
        }}
        className="mt-8 rounded-pill bg-clay px-6 py-3">
        <AppText variant="button" tone="accentOn">
          {t('offline.retry')}
        </AppText>
      </PressableScale>
    </Screen>
  );
}

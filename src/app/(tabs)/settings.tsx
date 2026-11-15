import Constants from 'expo-constants';
import { router } from 'expo-router';
import { ChevronRight, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { ConfirmSheet } from '@/components/ui/confirm-sheet';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Screen } from '@/components/ui/screen';
import { Segmented } from '@/components/ui/segmented';
import { Toggle } from '@/components/ui/toggle';
import { useI18n, type Language } from '@/i18n';
import { LANGUAGES } from '@/i18n/types';
import { useLibrary } from '@/store/library';
import { useSettings } from '@/store/settings';
import { useTheme } from '@/theme/ThemeProvider';

function SettingRow({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between gap-4 py-4">
      <View className="flex-1">
        <AppText variant="subtitle" className="text-[17px]">
          {title}
        </AppText>
        {description ? (
          <AppText variant="small" className="mt-1">
            {description}
          </AppText>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export default function SettingsScreen() {
  const { colors } = useTheme();
  const theme = useSettings((state) => state.theme);
  const hapticsOn = useSettings((state) => state.haptics);
  const adsConsented = useSettings((state) => state.adsConsented);
  const language = useSettings((state) => state.language);
  const setTheme = useSettings((state) => state.setTheme);
  const setHaptics = useSettings((state) => state.setHaptics);
  const setAdsConsented = useSettings((state) => state.setAdsConsented);
  const setLanguage = useSettings((state) => state.setLanguage);
  const { t } = useI18n();

  const version = Constants.expoConfig?.version ?? '1.0.0';
  const [confirming, setConfirming] = useState(false);

  const resetEverything = () => {
    setConfirming(false);
    useSettings.getState().resetAll();
    useLibrary.getState().resetAll();
    router.replace('/get-in');
  };

  return (
    <Screen scroll edges={['top', 'left', 'right']} padded bottomSpace={220}>
      <Appear>
        <View className="pb-1 pt-2">
          <AppText variant="display" className="pb-1.5" style={{ lineHeight: 46 }}>
            {t('settings.title')}
          </AppText>
          <AppText variant="subtitle" tone="muted" className="mt-1 text-[15px]">
            {t('settings.subtitle')}
          </AppText>
        </View>
      </Appear>

      <Appear delay={60} className="mt-8">
        <AppText variant="label">{t('settings.appearance')}</AppText>
        <Segmented
          className="mt-3"
          value={theme}
          options={[
            { value: 'system', label: t('settings.themeSystem') },
            { value: 'light', label: t('settings.themeLight') },
            { value: 'dark', label: t('settings.themeDark') },
          ]}
          onChange={setTheme}
        />
      </Appear>

      <Appear delay={90} className="mt-7">
        <AppText variant="label">{t('settings.language')}</AppText>
        <Segmented
          className="mt-3"
          value={language}
          options={LANGUAGES.map((item) => ({ value: item.value, label: item.label }))}
          onChange={(next: Language) => setLanguage(next)}
        />
      </Appear>

      <Appear delay={110} className="mt-7">
        <AppText variant="label">{t('settings.preferences')}</AppText>

        <View className="mt-3 overflow-hidden rounded-card bg-surface px-4">
          <SettingRow
            title={t('settings.haptics')}
            description={t('settings.hapticsDesc')}
            right={
              <Toggle
                value={hapticsOn}
                label={t('settings.haptics')}
                onValueChange={setHaptics}
              />
            }
          />
          <View className="h-px bg-line" />
          <SettingRow
            title={t('settings.ads')}
            description={t('settings.adsDesc')}
            right={
              <Toggle
                value={adsConsented}
                label={t('settings.ads')}
                onValueChange={setAdsConsented}
              />
            }
          />
          <View className="h-px bg-line" />
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={t('settings.privacyA11y')}
            scaleTo={0.98}
            onPress={() => router.push('/privacy')}
            className="flex-row items-center gap-3 py-4">
            <ShieldCheck size={19} color={colors.ink} strokeWidth={1.6} />
            <AppText variant="subtitle" className="flex-1 text-[17px]">
              {t('settings.privacy')}
            </AppText>
            <ChevronRight size={18} color={colors.muted} strokeWidth={1.6} />
          </PressableScale>
        </View>
      </Appear>

      <Appear delay={140}>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={t('settings.resetA11y')}
          scaleTo={0.98}
          onPress={() => setConfirming(true)}
          className="mt-9 h-12 items-center justify-center rounded-pill border border-danger">
          <AppText variant="button" tone="danger">
            {t('settings.reset')}
          </AppText>
        </PressableScale>

        <AppText variant="caption" tone="muted" className="mt-6 text-center">
          {t('settings.versionNote', { version })}
        </AppText>
      </Appear>

      <ConfirmSheet
        visible={confirming}
        title={t('settings.resetTitle')}
        message={t('settings.resetMessage')}
        confirmLabel={t('settings.resetConfirm')}
        cancelLabel={t('settings.cancel')}
        onCancel={() => setConfirming(false)}
        onConfirm={resetEverything}
      />
    </Screen>
  );
}

import { Image, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Screen } from '@/components/ui/screen';
import { Segmented } from '@/components/ui/segmented';
import { Toggle } from '@/components/ui/toggle';
import { useFeatured } from '@/content';
import { useI18n, type Language } from '@/i18n';
import { LANGUAGES } from '@/i18n/types';
import { useSettings } from '@/store/settings';

/**
 * The first-run experience: language choice, an age confirmation for mature
 * stories, and one button to enter the library.
 */
export default function GetInScreen() {
  const enter = useSettings((state) => state.enter);
  const setMature = useSettings((state) => state.setMature);
  const language = useSettings((state) => state.language);
  const setLanguage = useSettings((state) => state.setLanguage);
  const { t } = useI18n();
  const featured = useFeatured();

  const [matureConfirmed, setMatureConfirmed] = useState(false);

  const start = () => {
    setMature(true);
    enter();
    router.replace('/home');
  };

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']} padded>
      <View className="flex-1 justify-between py-8">
        <Appear distance={10}>
          <AppText variant="label">{t('onboarding.eyebrow')}</AppText>
        </Appear>

        <Appear delay={70} distance={16} className="items-center">
          <View
            className="w-full max-w-[300px] overflow-hidden rounded-sheet"
            style={{ aspectRatio: 2 / 3 }}
          >
            <Image
              source={featured.cover}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
          </View>
          <AppText variant="display" className="mt-9 text-center text-[56px]">
            Loom
          </AppText>
          <AppText variant="body" className="mt-3 max-w-[300px] text-center">
            {t('onboarding.tagline')}
          </AppText>
        </Appear>

        <Appear delay={150} distance={10}>
          <AppText variant="label" className="mb-2">
            {t('onboarding.ageTitle')}
          </AppText>
          <AppText variant="body" tone="muted" className="mb-6 max-w-[300px] text-center">
            {t('onboarding.ageBody')}
          </AppText>

          <View className="flex-row items-center justify-center gap-3">
            <Toggle
              value={matureConfirmed}
              label={t('onboarding.ageConfirm')}
              onValueChange={setMatureConfirmed}
            />
          </View>

          <Segmented
            className="mb-5 mt-6"
            value={language}
            options={LANGUAGES.map((item) => ({ value: item.value, label: item.label }))}
            onChange={(next: Language) => setLanguage(next)}
          />
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={t('onboarding.getStarted')}
            scaleTo={0.97}
            disabled={!matureConfirmed}
            onPress={start}
            className="h-13 w-full items-center justify-center rounded-pill bg-ink">
            <AppText variant="button" tone="paper">
              {t('onboarding.getStarted')}
            </AppText>
          </PressableScale>
          <AppText variant="caption" tone="muted" className="mt-4 text-center">
            {t('onboarding.caption')}
          </AppText>
        </Appear>
      </View>
    </Screen>
  );
}

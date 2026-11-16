import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { View } from 'react-native';

import { BulletList, SectionTitle } from '@/components/content/editorial';
import { AppText } from '@/components/ui/app-text';
import { IconButton } from '@/components/ui/icon-button';
import { Rule } from '@/components/ui/rule';
import { Screen } from '@/components/ui/screen';
import { useI18n } from '@/i18n';
import { layout } from '@/theme/scale';
export default function PrivacyScreen() {
  const { t, messages } = useI18n();

  const goBack = () => {
    router.back();
  };

  return (
    <Screen
      scroll
      edges={['top', 'bottom']}
      padded
      bottomSpace={40}
      style={{ width: '100%', maxWidth: layout.maxWidth, alignSelf: 'center' }}>
      <View className="flex-row items-center pt-2 pb-4">
        <View className="w-11 items-start">
          <IconButton icon={ChevronLeft} label={t('common.back')} onPress={goBack} />
        </View>
        <View className="flex-1" />
        <View className="w-11" />
      </View>

      <View className="mt-6">
        <AppText variant="title" className="max-w-[560px]">
          {t('privacy.title')}
        </AppText>
        <AppText variant="body" className="mt-4 max-w-[560px]">
          {t('privacy.intro')}
        </AppText>
      </View>

      <Rule className="mt-10" />

      <View>
        <SectionTitle className="mt-6">{t('privacy.deviceTitle')}</SectionTitle>
        <AppText variant="body" className="max-w-[560px]">
          {t('privacy.deviceBody')}
        </AppText>
      </View>

      <View>
        <SectionTitle>{t('privacy.adsTitle')}</SectionTitle>
        <AppText variant="body" className="max-w-[560px]">
          {t('privacy.adsBody')}
        </AppText>
        <BulletList className="mt-4" items={[...messages.privacy.adsBullets]} />
      </View>

      <View>
        <SectionTitle>{t('privacy.childrenTitle')}</SectionTitle>
        <AppText variant="body" className="max-w-[560px]">
          {t('privacy.childrenBody')}
        </AppText>
      </View>

      <View>
        <SectionTitle>{t('privacy.contactTitle')}</SectionTitle>
        <AppText variant="body" className="max-w-[560px]">
          {t('privacy.contactBody')}
        </AppText>
      </View>

      <Rule className="mt-12 mb-4" />
    </Screen>
  );
}

import { Tabs } from 'expo-router/js-tabs';

import { TabBar } from '@/components/nav/tab-bar';
import { useI18n } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: false,
        animation: 'shift',
        sceneStyle: { backgroundColor: colors.paper },
      }}>
      <Tabs.Screen name="home" options={{ title: t('tabs.home') }} />
      <Tabs.Screen name="settings" options={{ title: t('tabs.settings') }} />
    </Tabs>
  );
}

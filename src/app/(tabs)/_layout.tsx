import { TopTabs } from 'expo-router/js-top-tabs';

import { TabBar } from '@/components/nav/tab-bar';
import { useTheme } from '@/theme/ThemeProvider';
import type { MaterialTopTabBarProps } from 'expo-router/js-top-tabs';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <TopTabs
      tabBarPosition="bottom"
      tabBar={(props: MaterialTopTabBarProps) => <TabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        lazy: false,
        sceneStyle: { backgroundColor: colors.paper },
      }}>
      <TopTabs.Screen name="home" options={{ title: 'Home' }} />
      <TopTabs.Screen name="settings" options={{ title: 'Settings' }} />
    </TopTabs>
  );
}

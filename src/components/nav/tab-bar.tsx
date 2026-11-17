import { BlurView } from 'expo-blur';
import { BookOpen, House, type LucideIcon } from 'lucide-react-native';
import { useEffect, useState, type ComponentRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AdSlot } from '@/components/ads/AdSlot';
import { AppText } from '@/components/ui/app-text';
import { haptics } from '@/lib/haptics';
import { useI18n } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';

type TabMeta = { icon: LucideIcon; key: 'tabs.home' | 'tabs.settings' };

const TABS: TabMeta[] = [
  { icon: House, key: 'tabs.home' },
  { icon: BookOpen, key: 'tabs.settings' },
];

type TabBarProps = {
  activeIndex: number;
  onChangeTab: (index: number) => void;
  /** Ref to the view rendered behind the bar — its content is what gets blurred. */
  blurTarget?: React.RefObject<ComponentRef<typeof View> | null>;
};

/**
 * Floating pill tab bar for the swipeable Home/Settings pager. Tapping a tab
 * scrolls the pager; swiping the pager moves the pill.
 */
export function TabBar({ activeIndex, onChangeTab, blurTarget }: TabBarProps) {
  const { colors, scheme } = useTheme();
  const { t } = useI18n();
  const isDark = scheme === 'dark';
  const insets = useSafeAreaInsets();
  const [rowWidth, setRowWidth] = useState(0);
  const pillX = new Animated.Value(0);

  const routeCount = Math.max(TABS.length, 1);
  const cell = rowWidth / routeCount;
  const pillWidth = cell * 0.92;
  const pillInset = (cell - pillWidth) / 2;
  const targetPillX = activeIndex * cell + pillInset;

  useEffect(() => {
    if (cell <= 0) return;
    Animated.timing(pillX, {
      toValue: targetPillX,
      duration: 220,
      useNativeDriver: false,
    }).start();
  }, [activeIndex, cell, pillInset]);

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 9999,
        paddingBottom: Math.max(insets.bottom, 8),
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          width: '90%',
          maxWidth: 390,
          borderRadius: 999,
          overflow: 'hidden',
          backgroundColor: isDark ? 'rgba(28, 23, 21, 0.65)' : 'rgba(255, 255, 255, 0.7)',
          borderWidth: 0,
          paddingHorizontal: 4,
          paddingVertical: 4,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 0.1,
          shadowRadius: 16,
          elevation: 12,
        }}>
        <BlurView
          intensity={85}
          tint={isDark ? 'dark' : 'light'}
          blurMethod="dimezisBlurView"
          blurTarget={blurTarget ?? undefined}
          style={[StyleSheet.absoluteFill, { borderRadius: 999 }]}
        />

        <View
          className="relative flex-row"
          style={{ height: 50 }}
          onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}>
          {cell > 0 ? (
            <Animated.View
              pointerEvents="none"
              style={{
                position: 'absolute',
                top: 2,
                bottom: 2,
                left: 0,
                width: pillWidth,
                borderRadius: 999,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : '#FFFFFF',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.06)',
                transform: [{ translateX: pillX }],
              }}
            />
          ) : null}

          {TABS.map((tab, index) => {
            const focused = activeIndex === index;
            const Icon = tab.icon;
            const label = t(tab.key);

            return (
              <Pressable
                key={tab.key}
                accessibilityRole="tab"
                accessibilityLabel={label}
                accessibilityState={{ selected: focused }}
                onPress={() => {
                  haptics.select();
                  onChangeTab(index);
                }}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-full"
                style={{ overflow: 'hidden' }}>
                <Icon
                  size={19}
                  color={focused ? colors.ink : colors.muted}
                  strokeWidth={focused ? 1.9 : 1.6}
                />
                <AppText
                  variant="small"
                  tone={focused ? 'ink' : 'muted'}
                  font={focused ? 'sans-semibold' : 'sans-medium'}>
                  {label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <AdSlot variant="dock" />
    </View>
  );
}

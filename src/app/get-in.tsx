import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Appear } from '@/components/ui/reveal';
import { Screen } from '@/components/ui/screen';
import { featured } from '@/content';
import { useSettings } from '@/store/settings';

/**
 * The first-run experience: one promise, one button.
 */
export default function GetInScreen() {
  const enter = useSettings((state) => state.enter);

  const start = () => {
    enter();
    router.replace('/home');
  };

  return (
    <Screen edges={['top', 'bottom', 'left', 'right']} padded>
      <View className="flex-1 justify-between py-8">
        <Appear distance={10}>
          <AppText variant="label">A library of stories</AppText>
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
            Read stories. One chapter at a time.
          </AppText>
        </Appear>

        <Appear delay={150} distance={10}>
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel="Get started"
            scaleTo={0.97}
            onPress={start}
            className="h-13 w-full items-center justify-center rounded-pill bg-ink">
            <AppText variant="button" tone="paper">
              Get started
            </AppText>
          </PressableScale>
          <AppText variant="caption" tone="muted" className="mt-4 text-center">
            Your library stays on this device.
          </AppText>
        </Appear>
      </View>
    </Screen>
  );
}

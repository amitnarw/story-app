import * as Haptics from 'expo-haptics';

export const haptics = {
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  select: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  press: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
};

import { Redirect } from 'expo-router';

import { useSettings } from '@/store/settings';

export default function Index() {
  const onboarded = useSettings((state) => state.onboarded);

  if (!onboarded) {
    return <Redirect href="/get-in" />;
  }

  return <Redirect href="/home" />;
}

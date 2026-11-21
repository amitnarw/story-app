import { useEffect, useState } from 'react';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

function isOnlineState(state: NetInfoState): boolean {
  // `null` means "still checking"; treat it as online so we don't block the
  // app before the first connectivity result arrives.
  return state.isConnected !== false && state.isInternetReachable !== false;
}

/**
 * True while the device has a usable internet connection. The app is online
 * only: when this goes false, the UI is blocked until the connection returns.
 */
export function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const update = (state: NetInfoState) => setIsOnline(isOnlineState(state));
    const unsubscribe = NetInfo.addEventListener(update);
    void NetInfo.fetch().then(update).catch(() => {});
    return unsubscribe;
  }, []);

  return isOnline;
}

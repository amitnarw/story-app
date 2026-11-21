import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import type { AudioSource } from 'expo-audio';
import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { Pause, Play } from 'lucide-react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { useIsOnline } from '@/lib/use-online';
import { useI18n } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';

const SKIP_SECONDS = 15;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  return `${minutes}:${String(total % 60).padStart(2, '0')}`;
}

type StoryAudioPlayerProps = {
  source: AudioSource;
  /** True when this story's narration is still locked. */
  locked: boolean;
  /** Called when the user taps play while locked. */
  onRequestUnlock: () => void;
};

/**
 * Narration player shown as a card under the story title. Play/pause and a
 * draggable seek line. The player is owned by this component, so leaving the
 * story releases it and stops playback.
 */
export function StoryAudioPlayer({
  source,
  locked,
  onRequestUnlock,
}: StoryAudioPlayerProps) {
  const { t } = useI18n();
  const { colors } = useTheme();

  const isOnline = useIsOnline();
  const player = useAudioPlayer(source, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  const [trackWidth, setTrackWidth] = useState(0);
  const [scrub, setScrub] = useState<number | null>(null);
  const scrubRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);
  const pendingPlayRef = useRef(false);

  const duration = Number.isFinite(status.duration) ? status.duration : 0;
  const position = scrub ?? status.currentTime;
  const ratio = duration > 0 ? Math.min(1, Math.max(0, position / duration)) : 0;

  useEffect(() => {
    void setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    }).catch(() => {});
  }, []);

  const seekTo = useCallback(
    (seconds: number, resume = false) => {
      void player
        .seekTo(seconds)
        .then(() => {
          if (resume) player.play();
        })
        .catch(() => {});
    },
    [player],
  );

  const toggle = useCallback(() => {
    if (status.playing) {
      player.pause();
      return;
    }
    if (locked) {
      // Ask first; the parent unlocks and `locked` flips, which auto-plays.
      pendingPlayRef.current = true;
      onRequestUnlock();
      return;
    }
    if (status.didJustFinish || (duration > 0 && status.currentTime >= duration - 0.2)) {
      void seekTo(0, true);
      return;
    }
    player.play();
  }, [
    player,
    seekTo,
    locked,
    onRequestUnlock,
    status.playing,
    status.didJustFinish,
    status.currentTime,
    duration,
  ]);

  // Start playback as soon as the story's audio becomes unlocked.
  useEffect(() => {
    if (locked || !pendingPlayRef.current) return;
    pendingPlayRef.current = false;
    player.play();
  }, [locked, player]);

  // The app is online only: pause narration when the connection drops.
  useEffect(() => {
    if (!isOnline && status.playing) {
      player.pause();
    }
  }, [isOnline, status.playing, player]);

  const skip = useCallback(
    (delta: number) => {
      const base = scrubRef.current ?? status.currentTime;
      const target = Math.min(Math.max(base + delta, 0), duration || base + delta);
      void seekTo(target);
    },
    [seekTo, status.currentTime, duration],
  );

  const seekFromX = useCallback(
    (x: number) => {
      if (!trackWidth || !duration) return;
      const nextRatio = Math.min(1, Math.max(0, x / trackWidth));
      const next = nextRatio * duration;
      scrubRef.current = next;
      setScrub(next);
    },
    [trackWidth, duration],
  );

  const beginScrub = useCallback(
    (x: number) => {
      wasPlayingRef.current = status.playing;
      if (status.playing) player.pause();
      seekFromX(x);
    },
    [player, seekFromX, status.playing],
  );

  const commitSeek = useCallback(() => {
    const value = scrubRef.current;
    const shouldResume = wasPlayingRef.current;
    scrubRef.current = null;
    wasPlayingRef.current = false;
    setScrub(null);
    if (value === null) return;
    void seekTo(value, shouldResume);
  }, [seekTo]);

  const responder = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event) => beginScrub(event.nativeEvent.locationX),
        onPanResponderMove: (event) => seekFromX(event.nativeEvent.locationX),
        onPanResponderRelease: () => commitSeek(),
        onPanResponderTerminate: () => commitSeek(),
      }),
    [beginScrub, seekFromX, commitSeek],
  );

  return (
    <View className="mb-4">
      <View className="flex-row items-center gap-4 py-1">
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={status.playing ? t('audio.pause') : t('audio.play')}
          scaleTo={0.9}
          onPress={toggle}
          className="h-[52px] w-[52px] items-center justify-center rounded-full bg-clay"
          style={{ backgroundColor: colors.clay }}>
          {status.playing ? (
            <Pause size={22} color={colors.accentOn} fill={colors.accentOn} />
          ) : (
            <Play size={22} color={colors.accentOn} fill={colors.accentOn} />
          )}
        </PressableScale>

        <View className="flex-1 min-w-0">
          <AppText variant="label" tone="ink" numberOfLines={1} className="text-[13px]">
            {t('audio.listen')}
          </AppText>
          <View className="mt-1 flex-row items-center gap-2">
            <AppText variant="caption" tone="muted" className="text-[11px] tabular-nums">
              {formatTime(position)} / {formatTime(duration)}
            </AppText>
            <View className="shrink-0 rounded-full bg-control px-2 py-[1px]">
              <AppText
                variant="caption"
                tone="muted"
                numberOfLines={1}
                className="text-[10px]">
                {t('audio.hindi')}
              </AppText>
            </View>
          </View>

          <View
            {...responder.panHandlers}
            accessible
            accessibilityRole="adjustable"
            accessibilityLabel={t('audio.seek')}
            accessibilityValue={{
              min: 0,
              max: Math.round(duration),
              now: Math.round(position),
            }}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={(event) =>
              skip(event.nativeEvent.actionName === 'increment' ? SKIP_SECONDS : -SKIP_SECONDS)
            }
            onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
            className="mt-2 h-6 justify-center pr-1">
            <View
              pointerEvents="none"
              className="h-[3px] w-full overflow-hidden rounded-full bg-line">
              <View
                style={{
                  width: `${ratio * 100}%`,
                  height: '100%',
                  backgroundColor: colors.clay,
                }}
              />
            </View>
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: `${ratio * 100}%`,
                marginLeft: -5,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.clay,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

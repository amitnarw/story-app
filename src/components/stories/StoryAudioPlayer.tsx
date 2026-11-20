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
};

/**
 * Narration bar pinned under the reader header. Play/pause and a draggable
 * seek line (screen readers can still jump ±15s). The player is owned by this
 * component, so leaving the story releases it and stops playback.
 */
export function StoryAudioPlayer({ source }: StoryAudioPlayerProps) {
  const { t } = useI18n();
  const { colors } = useTheme();

  const player = useAudioPlayer(source, { updateInterval: 250 });
  const status = useAudioPlayerStatus(player);

  const [trackWidth, setTrackWidth] = useState(0);
  const [scrub, setScrub] = useState<number | null>(null);
  const scrubRef = useRef<number | null>(null);
  const wasPlayingRef = useRef(false);

  const duration = Number.isFinite(status.duration) ? status.duration : 0;
  const position = scrub ?? status.currentTime;
  const ratio = duration > 0 ? Math.min(1, Math.max(0, position / duration)) : 0;

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
      interruptionMode: 'doNotMix',
    }).catch(() => {});
  }, []);

  const seekTo = useCallback(
    (seconds: number, resume = false) => {
      player
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
    if (status.didJustFinish || (duration > 0 && status.currentTime >= duration - 0.2)) {
      seekTo(0, true);
      return;
    }
    player.play();
  }, [player, seekTo, status.playing, status.didJustFinish, status.currentTime, duration]);

  const skip = useCallback(
    (delta: number) => {
      const base = scrubRef.current ?? status.currentTime;
      const target = Math.min(Math.max(base + delta, 0), duration || base + delta);
      seekTo(target);
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
    seekTo(value, shouldResume);
  }, [seekTo]);

  const responder = useMemo(
    () =>
      // The callbacks below only read `scrubRef` from native gesture events,
      // never during render.
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
    <View className="px-5 pb-2">
      <View className="pt-2 pb-1">
        <View className="flex-row items-center gap-3">
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={status.playing ? t('audio.pause') : t('audio.play')}
            scaleTo={0.9}
            onPress={toggle}
            className="h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.ink }}>
            {status.playing ? (
              <Pause size={17} color={colors.paper} fill={colors.paper} />
            ) : (
              <Play size={17} color={colors.paper} fill={colors.paper} />
            )}
          </PressableScale>

          <View className="flex-1">
            <AppText variant="label" tone="ink" numberOfLines={1} className="text-[13px]">
              {t('audio.listen')}
            </AppText>
            <View className="flex-row items-center gap-2">
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
          className="mt-1 h-6 justify-center">
          <View pointerEvents="none" className="h-[3px] w-full overflow-hidden rounded-full bg-line">
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
  );
}

import { Image } from 'react-native';
import { useCallback, useMemo, useState } from 'react';

export type ImageSize = { width: number; height: number; ratio: number };

/**
 * Resolve an image's natural pixel dimensions.
 *
 * 1. Tries Image.resolveAssetSource (instant for required assets).
 * 2. Falls back to the onLoad native event (needed on web, where the decoder
 *    reports the real size only after the image loads).
 *
 * Returns { width, height, ratio } plus an onLoad handler to attach to the
 * <Image> so web keeps updating once the bitmap is decoded.
 */
export function useImageSize(source: any): {
  size: ImageSize;
  onLoad: (e: any) => void;
} {
  const [measured, setMeasured] = useState<ImageSize | null>(null);

  // Authoritative dimensions for bundled assets (and any source that carries
  // them). This is the only source we trust for layout, so a bad onLoad event
  // (e.g. reporting the view's own layout size) can never feed back into the
  // rendered size.
  const natural = useMemo(() => {
    try {
      const asset = Image.resolveAssetSource(source);
      const w = asset?.width ?? 0;
      const h = asset?.height ?? 0;
      if (w > 0 && h > 0) {
        return { width: w, height: h, ratio: w / h };
      }
    } catch {
      // ignore — fall through to measured/onLoad default
    }
    return null;
  }, [source]);

  // Web-only fallback: the decoder reports real dimensions only after load.
  // Accept only sane ratios so a degenerate event can't produce a giant box.
  const onLoad = useCallback(
    (e: any) => {
      const ev = e.nativeEvent ?? {};
      const w = ev.width ?? ev.naturalWidth ?? ev.source?.width ?? 0;
      const h = ev.height ?? ev.naturalHeight ?? ev.source?.height ?? 0;
      if (w > 0 && h > 0) {
        const ratio = w / h;
        if (ratio > 0.2 && ratio < 5) {
          setMeasured({ width: w, height: h, ratio });
        }
      }
    },
    []
  );

  // Never let a measured value override a known natural one; never fall back
  // to a 1:1 square (that's what produced the oversized boxes before).
  const size = natural ?? measured ?? { width: 16, height: 9, ratio: 16 / 9 };
  return { size, onLoad };
}

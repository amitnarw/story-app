import { useEffect, useState } from 'react';

/**
 * Returns a timestamp that updates every `intervalMs`. Used to re-evaluate
 * time-limited unlocks while a screen is open.
 */
export function useNow(intervalMs = 30_000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return now;
}

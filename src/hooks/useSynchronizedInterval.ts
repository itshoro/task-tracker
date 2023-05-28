"use client";
import { useCallback, useEffect } from "react";

let interval: NodeJS.Timer | undefined = undefined;
const subscribers = new Set<(now: number) => void>();

function useSynchronizedInterval() {
  const subscribe = useCallback(
    (cb: (now: number) => void) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    [subscribers]
  );

  useEffect(() => {
    if (interval !== undefined) return;
    interval = setInterval(() => {
      const now = Date.now();

      subscribers.forEach((cb) => {
        cb(now);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      interval = undefined;
    };
  }, [subscribe, interval]);

  return {
    subscribe,
  };
}

export { useSynchronizedInterval };

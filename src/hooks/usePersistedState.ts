"use client";
import { useEffect, useRef, useState } from "react";

function usePersistedState<TValue>(
  key: string,
  defaultValue: TValue,
  isPersistedDataValid?: (persisted: any) => persisted is TValue
) {
  const pending = useRef(true);
  const [value, setValue] = useState<TValue>(defaultValue);

  useEffect(() => {
    const persistedValue = localStorage.getItem(key);
    if (persistedValue === null) return;

    try {
      const parsed = JSON.parse(persistedValue);

      if (isPersistedDataValid === undefined) {
        console.warn("Persisted value couldn't be validated.");
        setValue(() => {
          pending.current = false;
          return parsed;
        });
      } else if (isPersistedDataValid(parsed)) {
        setValue(() => {
          pending.current = false;
          return parsed;
        });
      } else {
        throw new Error(
          "Data is not valid or has been potentially tampered with."
        );
      }
    } catch {
      console.error("Persisted data was not valid.", persistedValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [pending.current, value, setValue] as const;
}

export default usePersistedState;

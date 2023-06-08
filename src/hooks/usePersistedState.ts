"use client";
import { useEffect, useState } from "react";

function usePersistedState<TValue>(
  key: string,
  defaultValue: TValue,
  isPersistedDataValid?: (persisted: any) => persisted is TValue,
  storeRaw?: boolean
) {
  const [pending, setPending] = useState(true);
  const [value, setValue] = useState<TValue>(defaultValue);

  useEffect(() => {
    const persistedValue = localStorage.getItem(key);
    if (persistedValue === null) {
      setPending(false);
      setValue(defaultValue);
      return;
    }

    try {
      const parsed = storeRaw ? persistedValue : JSON.parse(persistedValue);

      if (isPersistedDataValid === undefined) {
        console.warn("Persisted value couldn't be validated.");
        setPending(false);
        setValue(parsed);
      } else if (isPersistedDataValid(parsed)) {
        setPending(false);
        setValue(parsed);
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
    if (!pending) {
      localStorage.setItem(
        key,
        storeRaw ? (value as string) : JSON.stringify(value)
      );
    }
  }, [key, value, pending]);

  return [pending, value, setValue] as const;
}

export default usePersistedState;

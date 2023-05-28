import { useEffect } from "react";

function useWindowEvent<TType extends keyof WindowEventMap>(
  type: TType,
  listener: (this: Window, e: WindowEventMap[TType]) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => window.removeEventListener(type, listener, options);
  }, [type, listener]);
}

export { useWindowEvent };

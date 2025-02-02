import debounce from "lodash/debounce";
import { useRef, useEffect, useMemo } from "react";

export const useDebounce = (callback: any) => {
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

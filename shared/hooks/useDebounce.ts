import { useDeferredValue, useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number = 500) => {
  const deferredValue = useDeferredValue(value);
  const [debounceValue, setDebounceValue] = useState(deferredValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(deferredValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [deferredValue, delay]);

  return debounceValue;
};

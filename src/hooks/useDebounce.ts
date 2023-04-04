import { useState, useEffect } from 'react';

export default function useDebounce(value: string | undefined, delay: number | undefined) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );

  return debouncedValue;
}

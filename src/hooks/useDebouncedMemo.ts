import { useState, useEffect } from 'react';

export function useDebouncedMemo<T>(
  factory: () => T,
  deps: ReadonlyArray<any>,
  delay: number
): T {
  const [value, setValue] = useState<T>(factory);

  useEffect(() => {
    const handler = setTimeout(() => setValue(factory), delay);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);

  return value;
}

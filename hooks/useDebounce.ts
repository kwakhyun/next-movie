import { useEffect, useState, useRef } from 'react';
import lodash from 'lodash';

function useDebounce<Value>(value: Value, wait = 250) {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);
  const changeHandlerRef = useRef<ReturnType<typeof lodash['debounce']>>();

  useEffect(() => {
    changeHandlerRef.current = lodash.debounce(
      (newValue) => setDebouncedValue(newValue),
      wait,
    );

    return () => changeHandlerRef.current?.cancel();
  }, [wait]);

  useEffect(() => {
    changeHandlerRef.current?.(value);
  }, [value]);

  return debouncedValue;
}

export default useDebounce;

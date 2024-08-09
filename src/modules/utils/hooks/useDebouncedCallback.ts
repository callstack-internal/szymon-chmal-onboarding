import {DependencyList, useEffect, useMemo, useRef} from 'react';
import debounce from 'lodash/debounce';

export interface DebouncedCallback<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}

export const useDebouncedCallback = <T extends (...args: any[]) => unknown>(
  cb: T,
  deps: DependencyList,
  debounceTime = 200,
): DebouncedCallback<T> => {
  const capturedDebounceTime = useRef(debounceTime);

  const debouncedCallback = useMemo(
    () =>
      debounce(cb, capturedDebounceTime.current, {
        leading: false,
        trailing: true,
      }),
    // Dependencies should be defined by user
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );

  /** Cancel on change or unmount */
  useEffect(
    () => () => {
      debouncedCallback.cancel();
    },
    [debouncedCallback],
  );

  return debouncedCallback;
};

import {useCallback, useState} from 'react';

export type UseRefreshControlReturn = {
  isRefreshing: boolean;
  onRefresh: () => void;
};

export const useRefreshControl = (
  refresh: () => Promise<unknown>,
): UseRefreshControlReturn => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    refresh().finally(() => {
      setIsRefreshing(false);
    });
  }, [refresh]);

  return {isRefreshing, onRefresh};
};

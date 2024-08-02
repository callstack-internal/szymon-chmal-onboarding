import {QueryClient} from '@tanstack/react-query';
import {isRunningInJest} from '../../utils.ts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: !isRunningInJest,
      gcTime: isRunningInJest ? Infinity : undefined,
    },
  },
});

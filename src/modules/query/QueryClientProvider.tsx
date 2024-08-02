import React from 'react';
import {QueryClientProvider as ReactQueryClientProvider} from '@tanstack/react-query';
import {queryClient} from './client';

export type QueryClientProviderProps = {
  children: React.ReactNode;
};

export const QueryClientProvider = ({
  children,
}: QueryClientProviderProps): React.JSX.Element => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

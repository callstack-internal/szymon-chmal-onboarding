import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@/modules/navigation';
import {QueryClientProvider} from '@/modules/query';

export const App = (): React.JSX.Element => {
  return (
    <QueryClientProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

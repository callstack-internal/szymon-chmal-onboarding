import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@/modules/navigation';
import {QueryClientProvider} from '@/modules/query';
import {MswProvider} from '@/modules/msw';

export const App = (): React.JSX.Element => {
  return (
    <MswProvider>
      <QueryClientProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </MswProvider>
  );
};

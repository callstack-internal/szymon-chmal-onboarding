import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@/modules/navigation';

export const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

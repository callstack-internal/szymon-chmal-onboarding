import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@/modules/navigation';
import {QueryClientProvider} from '@/modules/query';
import {MswProvider} from '@/modules/msw';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <MswProvider>
        <QueryClientProvider>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <RootNavigator />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </MswProvider>
    </GestureHandlerRootView>
  );
};

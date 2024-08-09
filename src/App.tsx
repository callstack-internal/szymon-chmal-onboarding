import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from '@/modules/navigation';
import {QueryClientProvider} from '@/modules/query';
import {MswProvider} from '@/modules/msw';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {RealmProvider} from '@realm/react';
import {BookmarkedCity} from '@/modules/weather';
import {StyleSheet} from 'react-native';

export const App = (): React.JSX.Element => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <MswProvider>
        <RealmProvider schema={[BookmarkedCity]}>
          <QueryClientProvider>
            <NavigationContainer>
              <BottomSheetModalProvider>
                <RootNavigator />
              </BottomSheetModalProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </RealmProvider>
      </MswProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

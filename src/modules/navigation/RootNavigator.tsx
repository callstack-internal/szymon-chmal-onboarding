import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailsScreen, HomeScreen} from '../weather';
import {RootStackParamList} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootNavigatorProps = {
  initialRouteName?: keyof RootStackParamList;
};

export const RootNavigator = ({
  initialRouteName = 'Home',
}: RootNavigatorProps): React.JSX.Element => {
  return (
    <RootStack.Navigator initialRouteName={initialRouteName}>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Details" component={DetailsScreen} />
    </RootStack.Navigator>
  );
};

import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {RootStackScreenProps} from '@/modules/navigation';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

export const HomeScreen = ({
  navigation,
}: HomeScreenProps): React.JSX.Element => {
  return (
    <View>
      <Text>Hello world!</Text>
      <Pressable onPress={() => navigation.push('Details', {cityId: ''})}>
        <Text>Go to details</Text>
      </Pressable>
    </View>
  );
};

import React from 'react';
import {View, Text} from 'react-native';

export type WeatherDetailListItemProps = {
  name: string;
  value: string;
};

export const WeatherDetailListItem = ({
  name,
  value,
}: WeatherDetailListItemProps): React.JSX.Element => {
  return (
    <View className="flex-row justify-between align-center px-1 py-2">
      <Text>{name}</Text>
      <Text>{value}</Text>
    </View>
  );
};

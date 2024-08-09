import React from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';

export type WeatherListItemProps = {
  cityName: string;
  weather: string;
  tempMin: number;
  tempMax: number;
  tempCurrent: number;
  onPress?: (event: GestureResponderEvent) => void;
};

export const WeatherListItem = ({
  cityName,
  weather,
  tempMin,
  tempMax,
  tempCurrent,
  onPress,
}: WeatherListItemProps): React.JSX.Element => {
  return (
    <Pressable
      className="bg-white p-3 rounded-sm shadow flex-row justify-between"
      accessibilityLabel={`${cityName}, ${weather}, between ${tempMin}° and ${tempMax}°, currently ${tempCurrent}°, tap to show details`}
      testID={`weather-${cityName}`}
      onPress={onPress}>
      <View className="justify-between">
        <Text className="text-xl">{cityName}</Text>
        <Text>{weather}</Text>
      </View>
      <View className="justify-end">
        <Text className="text-4xl text-right">{tempCurrent}°</Text>
        <Text>
          {tempMin}° to {tempMax}°
        </Text>
      </View>
    </Pressable>
  );
};

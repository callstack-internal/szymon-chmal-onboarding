import React from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useWeather} from '../../api/useWeather';
import {RootStackScreenProps} from '@/modules/navigation';
import {WeatherDetailListItem} from './WeatherDetailListItem';
import {FullscreenDisclaimer} from '@/modules/components';

export type DetailsScreenProps = RootStackScreenProps<'Details'>;

export const DetailsScreen = ({
  route,
}: DetailsScreenProps): React.JSX.Element | null => {
  const {
    params: {cityId},
  } = route;
  const {data} = useWeather([cityId]);

  if (!data) {
    return (
      <FullscreenDisclaimer>
        <ActivityIndicator />
      </FullscreenDisclaimer>
    );
  }

  const weather = data[0];

  return (
    <ScrollView className="flex-1">
      <View className="py-6 px-4 items-center">
        <Text className="text-2xl">{weather.name}</Text>
        <Text className="my-2 text-4xl">{weather.main.temp}°</Text>
        <Text className="text-sm">{weather.weather[0].main}</Text>
        <Text className="text-sm">
          {weather.main.temp_min}° to {weather.main.temp_max}°
        </Text>
      </View>

      <View className="mx-4">
        <View className="bg-white p-3 rounded">
          <WeatherDetailListItem
            name="Humidity"
            value={`${weather.main.humidity} %`}
          />
          <WeatherDetailListItem
            name="Pressure"
            value={`${weather.main.pressure} hPa`}
          />
          <WeatherDetailListItem
            name="Wind speed"
            value={`${weather.wind.speed} m/s`}
          />
          <WeatherDetailListItem
            name="Cloudiness"
            value={`${weather.clouds.all} %`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

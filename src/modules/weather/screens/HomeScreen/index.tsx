import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackScreenProps} from '@/modules/navigation';
import {useUserCities} from '../../persistence/useUserCities';
import {WeatherListItem} from './WeatherListItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useWeather} from '../../api/useWeather';
import {FullscreenDisclaimer} from '@/modules/components';
import {useRefreshControl} from '@/modules/utils';
import {WeatherData} from '../../model/weather-data';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

const ItemSeparator = () => <View className="h-4" />;

export const HomeScreen = ({
  navigation,
}: HomeScreenProps): React.JSX.Element => {
  const userCities = useUserCities();
  const safeInsets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();
  const {data: weatherData, error, refetch, isLoading} = useWeather(userCities);
  const {isRefreshing, onRefresh} = useRefreshControl(refetch);

  const renderItem = useCallback<ListRenderItem<WeatherData>>(
    ({item}) => {
      return (
        <WeatherListItem
          weather={item.weather[0].main}
          cityName={item.name}
          tempMin={item.main.temp_min}
          tempMax={item.main.temp_max}
          tempCurrent={item.main.temp}
          onPress={() => navigation.push('Details', {weather: item})}
        />
      );
    },
    [navigation],
  );

  const keyExtractor = useCallback(
    (item: WeatherData) => item.id.toString(),
    [],
  );

  if (isLoading) {
    return (
      <FullscreenDisclaimer>
        <ActivityIndicator />
      </FullscreenDisclaimer>
    );
  }

  if (error) {
    return (
      <FullscreenDisclaimer>
        <Text className="text-3xl">Wooops!</Text>
        <Text>Something went wrong!</Text>

        <Pressable className="mt-2" onPress={() => refetch()}>
          <Text>Try again</Text>
        </Pressable>
      </FullscreenDisclaimer>
    );
  }

  return (
    <FlashList
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingLeft: safeInsets.left + 16,
        paddingTop: Math.max(safeInsets.top, 16),
        paddingRight: safeInsets.right + 16,
        paddingBottom: safeInsets.bottom + 16,
      }}
      ItemSeparatorComponent={ItemSeparator}
      data={weatherData}
      estimatedItemSize={100}
      estimatedListSize={{
        height,
        width,
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
};

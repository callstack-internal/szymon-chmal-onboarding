import React, {useCallback, useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {RootStackScreenProps} from '@/modules/navigation';
import {WeatherListItem} from './WeatherListItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {FullscreenDisclaimer} from '@/modules/components';
import {useRefreshControl} from '@/modules/utils';
import {WeatherData} from '../../model/weather-data';
import {useWeatherList} from './useWeatherList.ts';

export type HomeScreenProps = RootStackScreenProps<'Home'>;

const ItemSeparator = () => <View className="h-4" />;

const ListEmpty = () => (
  <FullscreenDisclaimer>
    <Text>No cities found.</Text>
  </FullscreenDisclaimer>
);

export const HomeScreen = ({
  navigation,
}: HomeScreenProps): React.JSX.Element => {
  const {data, refetch, onSearch, isLoading, error} = useWeatherList();
  const safeInsets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();

  const {isRefreshing, onRefresh} = useRefreshControl(refetch);

  /** Show searchbar and wire it up */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => onSearch(event.nativeEvent.text),
        hideWhenScrolling: false,
      },
    });
  }, [navigation, onSearch]);

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
        paddingLeft: 16,
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
      }}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={ListEmpty}
      data={data}
      estimatedItemSize={100}
      estimatedListSize={{
        height,
        width,
      }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

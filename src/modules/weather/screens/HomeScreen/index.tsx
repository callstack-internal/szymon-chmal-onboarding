import React, {useCallback, useLayoutEffect, useRef} from 'react';
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
import {FullscreenDisclaimer, IconButton} from '@/modules/components';
import {useRefreshControl} from '@/modules/utils';
import {WeatherData} from '../../model/weather-data';
import {useWeatherList} from './useWeatherList.ts';
import {AddCityBottomSheetModal} from '@/modules/weather/screens/HomeScreen/AddCityBottomSheetModal.tsx';
import {CirclePlus} from 'lucide-react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

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
  const addCityModalRef = useRef<BottomSheetModal | null>(null);
  const {data, refetch, onSearch, isLoading, error, removeCity} =
    useWeatherList();
  const safeInsets = useSafeAreaInsets();
  const {height, width} = useWindowDimensions();

  const {isRefreshing, onRefresh} = useRefreshControl(refetch);

  const onAddCityPress = useCallback(() => {
    addCityModalRef.current?.present();
  }, []);

  /** Show searchbar and wire it up */
  useLayoutEffect(() => {
    navigation.setOptions({
      // Will not update options, safe to define component as inlined
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <IconButton className="mt-1" onPress={onAddCityPress}>
          <CirclePlus color="black" />
        </IconButton>
      ),
    });
  }, [navigation, onSearch, onAddCityPress]);

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
          onRemove={() => removeCity(item.id)}
        />
      );
    },
    [navigation, removeCity],
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
    <>
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

      <AddCityBottomSheetModal ref={addCityModalRef} />
    </>
  );
};

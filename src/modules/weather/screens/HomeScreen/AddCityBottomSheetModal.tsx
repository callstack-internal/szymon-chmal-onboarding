import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ActivityIndicator, Text, View} from 'react-native';
import {useUserCities} from '../../persistence/useUserCities.ts';
import {Button, Input} from '@/modules/components';
import {useSearchCity} from '@/modules/weather/api/useSearchCity.ts';
import {WeatherListItem} from '@/modules/weather/screens/HomeScreen/WeatherListItem.tsx';
import {useDebouncedCallback} from '@/modules/utils';

const CustomBottomSheetBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
);

export const AddCityBottomSheetModal = forwardRef<BottomSheetModal, unknown>(
  function AddCityBottomSheetModal(_, ref) {
    const {addCity} = useUserCities();
    const [searchValue, setSearchValue] = useState('');
    const modalRef = useRef<BottomSheetModal | null>(null);
    const {data, isLoading} = useSearchCity(searchValue, {
      enabled: searchValue !== '',
    });

    const onSearch = useDebouncedCallback(setSearchValue, []);

    const handleRef = useCallback(
      (newRef: BottomSheetModal) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(newRef);
          } else {
            ref.current = newRef;
          }
        }

        modalRef.current = newRef;
      },
      [ref],
    );

    const onAddPress = () => {
      if (!data) {
        return;
      }

      addCity(data.id).then(() => {
        modalRef.current?.close();
      });
    };

    const onDismiss = () => {
      setSearchValue('');
    };

    return (
      <BottomSheetModal
        ref={handleRef}
        backdropComponent={CustomBottomSheetBackdrop}
        enableDynamicSizing
        onDismiss={onDismiss}>
        <BottomSheetView>
          <View className="py-2 px-4">
            <Text className="text-center mb-4">
              What's the city you want to add?
            </Text>
            <Input
              className="mb-4"
              rightAdornment={isLoading && <ActivityIndicator />}
              onChangeText={onSearch}
            />

            {data ? (
              <View className="mb-4">
                <WeatherListItem
                  cityName={data.name}
                  weather={data.weather[0].main}
                  tempMin={data.main.temp_min}
                  tempMax={data.main.temp_max}
                  tempCurrent={data.main.temp}
                  isRemovable={false}
                />
              </View>
            ) : null}

            <Button enabled={!!data} onPress={onAddPress}>
              Add
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

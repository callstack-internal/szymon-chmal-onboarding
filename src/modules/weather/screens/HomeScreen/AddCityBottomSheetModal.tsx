import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {useBookmarkedCities} from '../../hooks/useBookmarkedCities';
import {Button, Input, InputProps} from '@/modules/components';
import {useSearchCity} from '../../api/useSearchCity';
import {WeatherListItem} from './WeatherListItem';
import {useDebouncedCallback} from '@/modules/utils';

const CustomBottomSheetInput = ({onFocus, onBlur, ...other}: InputProps) => {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );

  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );

  return <Input onFocus={handleOnFocus} onBlur={handleOnBlur} {...other} />;
};

const CustomBottomSheetBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop disappearsOnIndex={-1} {...props} />
);

export const AddCityBottomSheetModal = forwardRef<BottomSheetModal, unknown>(
  function AddCityBottomSheetModal(_, ref) {
    const {addCity} = useBookmarkedCities();
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
        keyboardBehavior="interactive"
        keyboardBlurBehavior="none"
        android_keyboardInputMode="adjustResize"
        enableDynamicSizing
        onDismiss={onDismiss}>
        <BottomSheetView>
          <View className="py-2 px-4">
            <Text className="text-center mb-4">
              What's the city you want to add?
            </Text>
            <CustomBottomSheetInput
              className="mb-4"
              rightAdornment={isLoading && <ActivityIndicator />}
              autoFocus
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

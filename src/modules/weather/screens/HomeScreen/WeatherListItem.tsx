import React, {useCallback, useEffect, useRef} from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';
import Swipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

export type WeatherListItemProps = {
  cityName: string;
  weather: string;
  tempMin: number;
  tempMax: number;
  tempCurrent: number;
  isRemovable?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onRemove?: (event: GestureResponderEvent) => void;
};

export const WeatherListItem = ({
  cityName,
  weather,
  tempMin,
  tempMax,
  tempCurrent,
  isRemovable = true,
  onPress,
  onRemove,
}: WeatherListItemProps): React.JSX.Element => {
  const onRemoveLatest = useRef(onRemove);
  const swipeableRow = useRef<SwipeableMethods>(null);

  /** Update onRemoveLatest */
  useEffect(() => {
    onRemoveLatest.current = onRemove;
  }, [onRemove]);

  const RightAction = useCallback(function RightAction(
    _: SharedValue<number>,
    drag: SharedValue<number>,
    swipeable: SwipeableMethods,
  ) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{translateX: drag.value + 70}],
      };
    });

    return (
      <Animated.View style={styleAnimation}>
        <Pressable
          className="flex-1 bg-red-600 w-[70] h-[70] justify-center items-center"
          onPress={event => {
            onRemoveLatest.current?.(event);
            swipeable.close();
          }}>
          <Text className="text-white">Remove</Text>
        </Pressable>
      </Animated.View>
    );
  },
  []);

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      rightThreshold={50}
      renderRightActions={RightAction}
      enabled={isRemovable}>
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
    </Swipeable>
  );
};

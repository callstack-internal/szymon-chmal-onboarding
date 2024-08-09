import {Position, useCurrentLocation} from '@/modules/location';
import {useWeatherByPosition} from '../../api/useWeatherByPosition.ts';
import {keepPreviousData} from '@tanstack/react-query';

export const useLocalWeather = () => {
  const {location} = useCurrentLocation();

  // Safe to cast as 'enabled' will prevent execution when null
  return useWeatherByPosition(location as Position, {
    enabled: !!location,
    placeholderData: keepPreviousData,
  });
};

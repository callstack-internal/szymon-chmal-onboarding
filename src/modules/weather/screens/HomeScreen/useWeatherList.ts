import {
  useUserCities,
  UseUserCitiesReturn,
} from '../../persistence/useUserCities.ts';
import {useCallback, useMemo, useState} from 'react';
import {useWeather} from '../../api/useWeather.ts';
import {WeatherData} from '../../model/weather-data.ts';
import {useDebouncedCallback} from '@/modules/utils';

export type UseWeatherListReturn = {
  data: WeatherData[] | undefined;
  error: unknown;
  refetch: () => Promise<unknown>;
  isLoading: boolean;
  onSearch: (text: string) => void;
} & Pick<UseUserCitiesReturn, 'addCity' | 'removeCity'>;

export const useWeatherList = (): UseWeatherListReturn => {
  const {userCities, addCity, removeCity} = useUserCities();
  const [searchTerm, setSearchTerm] = useState('');
  const {data: weatherData, error, refetch, isLoading} = useWeather(userCities);

  const data = useMemo(() => {
    if (searchTerm === '') {
      return weatherData;
    }

    return weatherData?.filter(item => item.name.includes(searchTerm));
  }, [weatherData, searchTerm]);

  const debouncedOnSearch = useDebouncedCallback(setSearchTerm, []);

  const onSearch = useCallback(
    (text: string) => {
      // Make clearing immediate
      if (text === '') {
        setSearchTerm('');
        debouncedOnSearch.cancel();
        return;
      }

      debouncedOnSearch(text);
    },
    [debouncedOnSearch],
  );

  return {
    data,
    error,
    refetch,
    isLoading,
    onSearch,
    addCity,
    removeCity,
  };
};

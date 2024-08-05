import {useUserCities} from '../../persistence/useUserCities.ts';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useWeather} from '../../api/useWeather.ts';
import debounce from 'lodash/debounce';
import {WeatherData} from '../../model/weather-data.ts';

const DEBOUNCE_TIME: number = 200;

export type UseWeatherListReturn = {
  data: WeatherData[] | undefined;
  error: unknown;
  refetch: () => Promise<unknown>;
  isLoading: boolean;
  onSearch: (text: string) => void;
};

export const useWeatherList = (): UseWeatherListReturn => {
  const userCities = useUserCities();
  const [searchTerm, setSearchTerm] = useState('');
  const {data: weatherData, error, refetch, isLoading} = useWeather(userCities);

  const data = useMemo(() => {
    if (searchTerm === '') {
      return weatherData;
    }

    return weatherData?.filter(item => item.name.includes(searchTerm));
  }, [weatherData, searchTerm]);

  const debouncedOnSearch = useMemo(
    () =>
      debounce(setSearchTerm, DEBOUNCE_TIME, {leading: false, trailing: true}),
    [],
  );

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

  /** Cancel debounced action on unmount */
  useEffect(
    () => () => {
      debouncedOnSearch.cancel();
    },
    [debouncedOnSearch],
  );

  return {
    data,
    error,
    refetch,
    isLoading,
    onSearch,
  };
};

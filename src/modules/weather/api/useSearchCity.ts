import {getConfig} from '@/modules/config';
import {useQuery, UseQueryOptions} from '@/modules/query';
import {URL} from 'react-native-url-polyfill';
import {WeatherData} from '../model/weather-data.ts';
import {WeatherUnits} from '../model/weather-units.ts';
import {parse, InferOutput} from 'valibot';

const SearchCityResponse = WeatherData;

type SearchCityResponse = InferOutput<typeof SearchCityResponse>;

export const SEARCH_CITY_URL =
  'https://api.openweathermap.org/data/2.5/weather';

const searchCity = async (
  query: string,
  units?: WeatherUnits,
): Promise<WeatherData | null> => {
  const url = new URL(SEARCH_CITY_URL);
  url.searchParams.append('q', query);
  url.searchParams.append('appid', getConfig('OPEN_WEATHER_KEY'));
  url.searchParams.append('units', units ?? ('metric' as WeatherUnits));

  const response = await fetch(url);

  if (response.status === 404) {
    return null;
  }

  const json = await response.json();
  return parse(SearchCityResponse, json);
};

export type UseSearchCityOptions = Omit<
  UseQueryOptions<WeatherData | null, Error, WeatherData | null>,
  'queryKey' | 'queryFn'
>;

export const useSearchCity = (
  query: string,
  options?: UseSearchCityOptions,
) => {
  return useQuery({
    ...options,
    queryKey: ['search-city', query],
    queryFn: () => searchCity(query),
  });
};

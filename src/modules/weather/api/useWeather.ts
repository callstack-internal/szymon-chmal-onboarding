import {getConfig} from '@/modules/config';
import {useQuery, UseQueryOptions} from '@/modules/query';
import {URL} from 'react-native-url-polyfill';
import {WeatherData} from '../model/weather-data.ts';
import {WeatherUnits} from '../model/weather-units.ts';
import {array, object, parse, InferOutput, number} from 'valibot';

const GetWeatherResponse = object({
  cnt: number(),
  list: array(WeatherData),
});

type GetWeatherResponse = InferOutput<typeof GetWeatherResponse>;

const getWeather = async (
  id: number[],
  units?: WeatherUnits,
): Promise<WeatherData[]> => {
  const url = new URL('https://api.openweathermap.org/data/2.5/group');
  url.searchParams.append('id', id.join(','));
  url.searchParams.append('appid', getConfig('OPEN_WEATHER_KEY'));
  url.searchParams.append('units', units ?? ('metric' as WeatherUnits));

  const response = await fetch(url);
  const json = await response.json();
  return parse(GetWeatherResponse, json).list;
};

export type UseWeatherOptions = Omit<
  UseQueryOptions<WeatherData[], Error, WeatherData[]>,
  'queryKey' | 'queryFn'
>;

export const useWeather = (id: number[], options?: UseWeatherOptions) => {
  return useQuery({
    ...options,
    queryKey: ['weather', id],
    queryFn: () => getWeather(id),
  });
};

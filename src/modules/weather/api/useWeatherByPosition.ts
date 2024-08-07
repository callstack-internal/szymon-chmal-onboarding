import {getConfig} from '@/modules/config';
import {useQuery, UseQueryOptions} from '@/modules/query';
import {URL} from 'react-native-url-polyfill';
import {WeatherData} from '../model/weather-data.ts';
import {WeatherUnits} from '../model/weather-units.ts';
import {parse, InferOutput} from 'valibot';
import {Position} from '@/modules/location';

const GetWeatherByPosition = WeatherData;
type GetWeatherByPosition = InferOutput<typeof GetWeatherByPosition>;

export const GET_WEATHER_BY_POSITION_URL =
  'https://api.openweathermap.org/data/2.5/weather';

const getWeatherByPosition = async (
  position: Position,
  units?: WeatherUnits,
): Promise<GetWeatherByPosition> => {
  const url = new URL(GET_WEATHER_BY_POSITION_URL);
  url.searchParams.append('lat', position.lat.toString());
  url.searchParams.append('lon', position.lng.toString());
  url.searchParams.append('appid', getConfig('OPEN_WEATHER_KEY'));
  url.searchParams.append('units', units ?? ('metric' as WeatherUnits));

  const response = await fetch(url);
  const json = await response.json();
  return parse(GetWeatherByPosition, json);
};

export type UseWeatherOptions = Omit<
  UseQueryOptions<GetWeatherByPosition, Error, GetWeatherByPosition>,
  'queryKey' | 'queryFn'
>;

export const useWeatherByPosition = (
  position: Position,
  options?: UseWeatherOptions,
) => {
  return useQuery({
    ...options,
    queryKey: ['weather-by-position', position],
    queryFn: () => getWeatherByPosition(position),
  });
};

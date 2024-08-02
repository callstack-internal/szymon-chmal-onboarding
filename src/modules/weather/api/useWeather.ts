import {getConfig} from '@/modules/config';
import {useQuery, UseQueryOptions} from '@/modules/query';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level: number;
    grnd_level: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  rain: {
    '3h': number;
  };
  snow: {
    '3h': number;
  };
  dt: number;
  id: number;
  name: string;
};

type GetWeatherResponse = {
  cod: string;
  list: WeatherData[];
};

type WeatherUnits = 'imperial' | 'metric';

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

  if (json.cod !== '200') {
    // TODO: Better error handling
    throw new Error('');
  }

  return (json as GetWeatherResponse).list;
};

export type UseWeatherOptions = Omit<
  UseQueryOptions<WeatherData[], Error, WeatherData[]>,
  'queryKey' | 'queryFn'
>;

export const useWeather = (id: number[], options?: UseWeatherOptions) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    ...options,
    queryKey: ['weather', id],
    queryFn: () => getWeather(id),
  });
  const {data} = query;

  useEffect(() => {
    if (!data) {
      return;
    }

    data.forEach(item => {
      queryClient.setQueryData(['weather', [item.id]], () => [item]);
    });
  }, [queryClient, data]);

  return query;
};

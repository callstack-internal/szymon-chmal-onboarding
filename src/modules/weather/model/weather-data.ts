import {array, InferOutput, number, object, optional, string} from 'valibot';

export const WeatherData = object({
  coord: object({
    lon: number(),
    lat: number(),
  }),
  weather: array(
    object({
      id: number(),
      main: string(),
      description: string(),
      icon: string(),
    }),
  ),
  main: object({
    temp: number(),
    pressure: number(),
    humidity: number(),
    temp_min: number(),
    temp_max: number(),
    sea_level: number(),
    grnd_level: number(),
  }),
  wind: object({
    speed: number(),
    deg: number(),
  }),
  clouds: object({
    all: number(),
  }),
  rain: optional(
    object({
      '3h': number(),
    }),
  ),
  snow: optional(
    object({
      '3h': number(),
    }),
  ),
  dt: number(),
  id: number(),
  name: string(),
});

export type WeatherData = InferOutput<typeof WeatherData>;

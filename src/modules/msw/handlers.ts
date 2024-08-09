import {http, HttpResponse} from 'msw';
import {GET_WEATHER_URL} from '@/modules/weather/api/useWeather.ts';

export const handlers = [
  http.get(GET_WEATHER_URL, () => {
    return HttpResponse.json({
      cnt: 11,
      list: [
        {
          coord: {lon: 30.5167, lat: 50.4333},
          sys: {
            country: 'UA',
            timezone: 10800,
            sunrise: 1722825111,
            sunset: 1722879357,
          },
          weather: [
            {id: 801, main: 'Clouds', description: 'few clouds', icon: '02d'},
          ],
          main: {
            temp: 27.07,
            feels_like: 27.55,
            temp_min: 26.48,
            temp_max: 27.07,
            pressure: 1010,
            sea_level: 1010,
            grnd_level: 995,
            humidity: 51,
          },
          visibility: 10000,
          wind: {speed: 0.45, deg: 294},
          clouds: {all: 24},
          dt: 1722852549,
          id: 703448,
          name: 'Kyiv',
        },
        {
          coord: {lon: 34.8003, lat: 50.9216},
          sys: {
            country: 'UA',
            timezone: 10800,
            sunrise: 1722823982,
            sunset: 1722878430,
          },
          weather: [
            {
              id: 804,
              main: 'Clouds',
              description: 'overcast clouds',
              icon: '04d',
            },
          ],
          main: {
            temp: 23.51,
            feels_like: 23.04,
            temp_min: 23.51,
            temp_max: 23.51,
            pressure: 1009,
            sea_level: 1009,
            grnd_level: 992,
            humidity: 43,
          },
          visibility: 10000,
          wind: {speed: 3.03, deg: 19},
          clouds: {all: 85},
          dt: 1722852549,
          id: 692194,
          name: 'Sumy',
        },
      ],
    });
  }),
];

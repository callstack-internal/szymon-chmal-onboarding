import Config from 'react-native-config';

type ConfigSchema = {
  OPEN_WEATHER_KEY: string;
  USE_MSW: string;
};

export const getConfig = <TKey extends keyof ConfigSchema>(
  key: TKey,
): ConfigSchema[TKey] => Config[key] as ConfigSchema[TKey];

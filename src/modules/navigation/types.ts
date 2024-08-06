import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WeatherData} from '@/modules/weather';

export type RootStackParamList = {
  Home: undefined;
  Details: {weather: WeatherData};
};

export type RootStackScreenProps<TKey extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, TKey>;

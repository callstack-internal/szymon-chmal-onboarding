import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {cityId: string};
};

export type RootStackScreenProps<TKey extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, TKey>;

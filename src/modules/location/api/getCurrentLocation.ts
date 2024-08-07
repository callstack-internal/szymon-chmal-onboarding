import {NativeModules} from 'react-native';
import {Position} from '../model/Position.ts';

export const getCurrentLocation = (): Promise<Position> => {
  return NativeModules.LocationModule.getLocation();
};

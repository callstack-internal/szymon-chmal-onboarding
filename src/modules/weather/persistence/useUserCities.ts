import {useState, useSyncExternalStore} from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';

const HARDCODED_CITIES: number[] = [
  703448, // Kyiv, UA
  692194, // Sumy, UA
  756135, // Warsaw, PL
  3081368, // Wrocław, PL
  3067696, // Prague, CZ
  3077916, // České Budějovice, CZ
  2950159, // Berlin, DE
  2867714, // Munich, DE
  3247449, // Aachen, DE
  5815135, // Washington, US
  5128581, // New York City, US
];

export type UseUserCitiesReturn = {
  userCities: number[];
  addCity: (id: number) => Promise<void>;
  removeCity: (id: number) => Promise<void>;
};

const memoryStore = {
  _data: HARDCODED_CITIES,
  _listeners: new Set<(data: any) => void>(),
  onChange(cb: (data: (typeof this)['_data']) => void): () => void {
    this._listeners.add(cb);
    return () => this._listeners.delete(cb);
  },
  setState(state: (typeof this)['_data']) {
    this._data = state;

    this._listeners.forEach(listener => listener(this._data));
  },
  getState(): (typeof this)['_data'] {
    return this._data;
  },
};

export const useUserCities = (): UseUserCitiesReturn => {
  const userCities = useSyncExternalStore(
    cb => memoryStore.onChange(cb),
    () => memoryStore.getState(),
  );

  const removeCity = async (id: number): Promise<void> => {
    const newState = memoryStore.getState().filter(item => item !== id);
    memoryStore.setState(newState);
  };

  const addCity = async (id: number): Promise<void> => {
    const stateSet = new Set(memoryStore.getState());
    stateSet.add(id);
    memoryStore.setState(Array.from(stateSet));
  };

  return {
    userCities,
    addCity,
    removeCity,
  };
};

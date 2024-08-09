declare module 'react-native' {
  export interface NativeModulesStatic {
    LocationModule: {
      getLocation(): Promise<{lat: number; lng: number}>;
    };
  }
}

export {};

import {Position} from '../model/Position';
import {useCallback, useState} from 'react';
import {getCurrentLocation} from '../api/getCurrentLocation';
import {useFocusEffect} from '@react-navigation/native';

export type useCurrentLocationReturn = {
  location: Position | null;
  error: unknown | null;
};

export const useCurrentLocation = (): useCurrentLocationReturn => {
  const [location, setLocation] = useState<Position | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
      setLocation(null);
      setError(null);

      getCurrentLocation()
        .then(location => {
          if (isMounted) {
            // Do not cause update if location is the same
            setLocation(oldLocation => {
              if (!oldLocation) {
                return location;
              }

              return oldLocation.lat === location.lat &&
                oldLocation.lng === location.lng
                ? oldLocation
                : location;
            });
          }
        })
        .catch(error => {
          if (isMounted) {
            setError(error);
          }
        });

      return () => {
        isMounted = false;
      };
    }, []),
  );

  return {
    location,
    error,
  };
};

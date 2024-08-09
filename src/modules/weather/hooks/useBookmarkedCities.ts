import {Results, UpdateMode} from 'realm';
import {useQuery, useRealm} from '@realm/react';
import {BookmarkedCity} from '../model/bookmarked-city.ts';

export type UseBookmarkedCitiesReturn = {
  data: Results<BookmarkedCity>;
  addCity: (id: number) => Promise<void>;
  removeCity: (id: number) => Promise<void>;
};

export const useBookmarkedCities = (): UseBookmarkedCitiesReturn => {
  const realm = useRealm();
  const data = useQuery({
    type: BookmarkedCity,
    query: collection => {
      return collection;
    },
  });

  const removeCity = async (id: number): Promise<void> => {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey(BookmarkedCity, id));
    });
  };

  const addCity = async (id: number): Promise<void> => {
    realm.write(() => {
      realm.create(BookmarkedCity, {_id: id}, UpdateMode.All);
    });
  };

  return {
    data,
    addCity,
    removeCity,
  };
};

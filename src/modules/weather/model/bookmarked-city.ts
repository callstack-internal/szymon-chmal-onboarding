import Realm from 'realm';

export class BookmarkedCity extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'City',
    primaryKey: '_id',
    properties: {
      _id: 'int',
    },
  };

  _id!: number;
}

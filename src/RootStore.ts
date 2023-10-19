import {types} from 'mobx-state-tree';
import {LikesStoreModel} from './LikesStore';

export const RootStoreModel = types.model('RootStore').props({
  likesStore: types.optional(LikesStoreModel, {}),
});

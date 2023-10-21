import {types} from 'mobx-state-tree';
import {LikesStoreModel} from './LikesStore';

export const RootStoreModel = types.model('RootStore').props({
  likesStore: types.optional(LikesStoreModel, {}),
});

export type RootStore = typeof RootStoreModel.Type;
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType;

// Create the Root Store Instance
export const rootStore = RootStoreModel.create({});

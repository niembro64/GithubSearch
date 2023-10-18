import {LikesModel} from './LikesStore';
import {Instance, SnapshotOut, types} from 'mobx-state-tree';
/**
 * The RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    likesStore: types.optional(LikesModel, {}),
  })
  .actions(() => ({
    // afterCreate() {
    //   setupApiClient(self);
    // },
  }));

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

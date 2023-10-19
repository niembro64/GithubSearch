import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Repo} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    searchResults: types.optional(types.array(types.frozen<Repo>()), []),
    likes: types.optional(types.array(types.frozen<Repo>()), []),
  })
  .actions(self => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResults(repos: Repo[]) {
      self.searchResults.replace(repos);
    },
    ///////////////////////////////////////////////
    // LIKES GITHUB
    ///////////////////////////////////////////////
    setLikes(likes: Repo[]) {
      self.likes.replace(likes);
    },
    addLike(newLike: Repo) {
      self.likes.push(newLike);
    },
    removeLIke(likeId: string) {
      const index = self.likes.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likes.splice(index, 1);
      }
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

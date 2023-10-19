import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RepoGithub} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    searchResults: types.optional(types.array(types.frozen<RepoGithub>()), []),
    likes: types.optional(types.array(types.frozen<RepoGithub>()), []),
  })
  .actions(self => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResults(repos: RepoGithub[]) {
      self.searchResults.replace(repos);
    },
    ///////////////////////////////////////////////
    // LIKES GITHUB
    ///////////////////////////////////////////////
    setLikes(likes: RepoGithub[]) {
      self.likes.replace(likes);
    },
    addLike(newLike: RepoGithub) {
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

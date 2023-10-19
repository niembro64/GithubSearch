import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {GitHubRepo, ServerRepo} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    likes: types.optional(types.array(types.frozen<GitHubRepo>()), []),
    serverLikes: types.optional(types.array(types.frozen<ServerRepo>()), []),
    allowLikes: types.optional(types.boolean, true),
    isLoading: types.optional(types.boolean, false),
    searchResults: types.optional(types.array(types.frozen<ServerRepo>()), []),
  })
  .actions(self => ({
    setSearchResults(repos: GitHubRepo[]) {
      // @ts-ignore
      self.searchResults = repos;
    },
    addLike(newLike: GitHubRepo) {
      self.likes.push(newLike);
    },
    removeLike(likeId: string) {
      const index = self.likes.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likes.splice(index, 1);
      }
    },
    addServerLike(newLike: ServerRepo) {
      self.serverLikes.push(newLike);
    },
    setServerLikes(likes: ServerRepo[]) {
      // @ts-ignore
      self.serverLikes = likes;
    },
    removeServerLike(likeId: string) {
      const index = self.serverLikes.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.serverLikes.splice(index, 1);
      }
    },
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    toggleAllowLikes() {
      self.allowLikes = !self.allowLikes;
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

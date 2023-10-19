import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RepoGithub, RepoServer} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    likesGithub: types.optional(types.array(types.frozen<RepoGithub>()), []),
    serverLikes: types.optional(types.array(types.frozen<RepoServer>()), []),
    allowLikes: types.optional(types.boolean, true),
    isLoading: types.optional(types.boolean, false),
    searchResults: types.optional(types.array(types.frozen<RepoServer>()), []),
  })
  .actions(self => ({
    setSearchResults(repos: RepoGithub[]) {
      // @ts-ignore
      self.searchResults = repos;
    },
    addLike(newLike: RepoGithub) {
      self.likesGithub.push(newLike);
    },
    removeLike(likeId: string) {
      const index = self.likesGithub.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likesGithub.splice(index, 1);
      }
    },
    setLikesGithub(likes: RepoGithub[]) {
      // @ts-ignore
      self.likesGithub = likes;
    },
    addServerLike(newLike: RepoServer) {
      self.serverLikes.push(newLike);
    },
    setServerLikes(likes: RepoServer[]) {
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

import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RepoGithub, RepoServer} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    likesGithub: types.optional(types.array(types.frozen<RepoGithub>()), []),
    likesServer: types.optional(types.array(types.frozen<RepoServer>()), []),
    allowLikes: types.optional(types.boolean, true),
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
      self.likesServer.push(newLike);
    },
    setServerLikes(likes: RepoServer[]) {
      // @ts-ignore
      self.likesServer = likes;
    },
    removeServerLike(likeId: string) {
      const index = self.likesServer.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likesServer.splice(index, 1);
      }
    },
    toggleAllowLikes() {
      self.allowLikes = !self.allowLikes;
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

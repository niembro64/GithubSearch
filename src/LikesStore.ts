import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RepoGithub, RepoServer} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    searchResults: types.optional(types.array(types.frozen<RepoServer>()), []),
    likesGithub: types.optional(types.array(types.frozen<RepoGithub>()), []),
    likesServer: types.optional(types.array(types.frozen<RepoServer>()), []),
    allowLikesGithub: types.optional(types.boolean, true),
  })
  .actions(self => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResults(repos: RepoGithub[]) {
      // @ts-ignore
      self.searchResults = repos;
    },
    ///////////////////////////////////////////////
    // LIKES GITHUB
    ///////////////////////////////////////////////
    setLikesGithub(likes: RepoGithub[]) {
      // @ts-ignore
      self.likesGithub = likes;
    },
    addLikeGithub(newLike: RepoGithub) {
      self.likesGithub.push(newLike);
    },
    removeLikeGithub(likeId: string) {
      const index = self.likesGithub.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likesGithub.splice(index, 1);
      }
    },
    setAllowLikesGithub(allowLikesGithub: boolean) {
      // @ts-ignore
      self.allowLikesGithub = allowLikesGithub;
    },
    ///////////////////////////////////////////////
    // LIKES SERVER
    ///////////////////////////////////////////////
    setLikesServer(likes: RepoServer[]) {
      // @ts-ignore
      self.likesServer = likes;
    },
    addServerLike(newLike: RepoServer) {
      self.likesServer.push(newLike);
    },
    removeServerLike(likeId: string) {
      const index = self.likesServer.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likesServer.splice(index, 1);
      }
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

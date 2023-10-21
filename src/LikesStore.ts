import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {RepoGithub, RepoServer} from './types';
import axios from 'axios';
// @ts-ignore
import {myIp} from './constants';
export const LikesStoreModel = types
  .model('LikesStore', {
    searchResults: types.optional(types.array(types.frozen<RepoServer>()), []),
    likesGithub: types.optional(types.array(types.frozen<RepoGithub>()), []),
    likesServer: types.optional(types.array(types.frozen<RepoServer>()), []),
    allowLikes: types.optional(types.boolean, true),
    isLoading: types.optional(types.boolean, false),
    error: types.optional(types.frozen<any>(), null),
  })
  .actions(self => ({
    ///////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////
    setSearchResults(repos: RepoGithub[]) {
      // @ts-ignore
      self.searchResults = repos;
    },
    ///////////////////////////////
    // LIKES GITHUB
    ///////////////////////////////
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
    ///////////////////////////////
    // LIKES SERVER
    ///////////////////////////////
    setLikesServer(likes: RepoServer[]) {
      // @ts-ignore
      self.likesServer = likes;
    },
    addLikeServer(newLike: RepoServer) {
      self.likesServer.push(newLike);
    },
    removeServerLike(likeId: string) {
      const index = self.likesServer.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likesServer.splice(index, 1);
      }
    },
    ///////////////////////////////
    // REPOS SERVER
    ///////////////////////////////
    fetchReposServer: async () => {
      axios
        .get(`http://${myIp}:8080/repo/`)
        .then(response => {
          if (response?.data?.repos && Array.isArray(response.data.repos)) {
            // @ts-ignore
            self.setLikesServer(response.data.repos as any);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    ///////////////////////////////
    // CETERA
    ///////////////////////////////
    setIsLoading(isLoading: boolean) {
      self.isLoading = isLoading;
    },
    toggleAllowLikes() {
      self.allowLikes = !self.allowLikes;
    },
    setError(error: any) {
      console.log(error);
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

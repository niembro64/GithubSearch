// RepoStore.ts
import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {GitHubRepoExtended} from '../types';

export const LikesModel = types
  .model('RepoStore')
  .props({
    searchResults: types.optional(
      types.array(types.frozen<GitHubRepoExtended>()),
      [],
    ),
  })
  .actions(store => ({
    setSearchResults(results: GitHubRepoExtended[]) {
      // @ts-ignore
      store.searchResults = results;
    },

    likeRepo(repoName: string) {
      const repo = store.searchResults.find(r => r.name === repoName);
      if (repo) {
        repo.liked = true;
      }
    },

    dislikeRepo(repoName: string) {
      const repo = store.searchResults.find(r => r.name === repoName);
      if (repo) {
        repo.liked = false;
      }
    },
  }));

export interface LikesStore extends Instance<typeof LikesModel> {}
export interface LikesStoreSnapshot extends SnapshotOut<typeof LikesModel> {}

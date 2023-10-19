import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Repo} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    textInput: types.optional(types.string, ''),
    textQuery: types.optional(types.string, ''),
    searchResults: types.optional(types.array(types.frozen<Repo>()), []),
    likes: types.optional(types.array(types.frozen<Repo>()), []),
  })
  .actions(self => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResults(repos: Repo[]) {
      // Add isLiked property to each repo
      const newSearchResults = repos.map(repo => {
        const isLiked: boolean =
          self.likes.findIndex(like => like.id === repo.id) > -1;
        return {...repo, like: isLiked};
      });

      self.searchResults.replace(newSearchResults);
    },
    ///////////////////////////////////////////////
    // LIKES GITHUB
    ///////////////////////////////////////////////
    setLikes(likes: Repo[]) {
      // Add like property to each like
      const likesPlusLike: Repo[] = likes.map((l: Repo) => {
        return {
          ...l,
          like: true,
        };
      });

      self.likes.replace(likesPlusLike);

      // Update search results with new likes
      const newSearchResults = self.searchResults.map(repo => {
        const isLiked = self.likes.findIndex(like => like.id === repo.id) > -1;
        return {...repo, isLiked};
      });

      self.searchResults.replace(newSearchResults);
    },
    addLike(newLike: Repo) {
      self.likes.push(newLike);
    },
    pressThumb(repo: Repo) {
      console.log('PRESSED STATUS', !!repo?.like);
      if (repo?.like) {
      }
    },
    removeLIke(likeId: string) {
      const index = self.likes.findIndex(like => like.id === likeId);
      if (index > -1) {
        self.likes.splice(index, 1);
      }
    },
    setTextInput(text: string) {
      self.textInput = text;
    },
    setTextQuery(text: string) {
      self.textQuery = text;
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Alert} from 'react-native';
import {serverLikeDelete, serverLikeSave} from './helpers';
import {Repo} from './types';

export const LikesStoreModel = types
  .model('LikesStore', {
    textInput: types.optional(types.string, 'web_smashed'),
    textQuery: types.optional(types.string, 'web_smashed'),
    searchResults: types.optional(types.array(types.frozen<Repo>()), []),
    likes: types.optional(types.array(types.frozen<Repo>()), []),
  })
  .actions(self => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResultsApp(repos: Repo[]) {
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
    setLikesApp(likes: Repo[]) {
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
    addLikeBoth(newLike: Repo) {
      (async () => {
        const res = await serverLikeSave(newLike);

        if (!res) {
          Alert.alert('Error', 'Error saving like');
          return;
        }
        self.likes.push(newLike);
      })();
    },
    pressThumbBoth(repo: Repo) {
      (async () => {
        console.log('PRESSED STATUS', !!repo?.like);
        if (repo?.like) {
          ////////////////////
          // DELETE LIKE
          ////////////////////
          const res = await serverLikeDelete(repo.id);

          if (!res) {
            Alert.alert('Error', 'Error deleting like');
            return;
          }

          const index = self.likes.findIndex(like => like.id === repo.id);

          if (index > -1) {
            const newLikes = self.likes.filter(like => like.id !== repo.id);

            this.setLikesApp(newLikes);
          }
        } else {
          ////////////////////
          // ADD LIKE
          ////////////////////
          const res = await serverLikeSave(repo);

          if (!res) {
            Alert.alert('Error', 'Error saving like');
            return;
          }

          this.setLikesApp([...self.likes, repo]);
        }
      })();
    },
    removeLikeBoth(likeId: string) {
      (async () => {
        const res = await serverLikeDelete(likeId);

        if (!res) {
          Alert.alert('Error', 'Error deleting like');
          return;
        }

        const index = self.likes.findIndex(like => like.id === likeId);
        if (index > -1) {
          const newLikes = self.likes.filter(like => like.id !== likeId);

          self.likes.replace(newLikes);
        }
      })();
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

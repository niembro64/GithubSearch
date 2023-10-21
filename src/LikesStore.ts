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
    storeNumber: types.optional(types.number, 0),
  })
  .actions(store => ({
    ///////////////////////////////////////////////
    // SEARCH RESULTS
    ///////////////////////////////////////////////
    setSearchResultsApp(repos: Repo[]) {
      // Add isLiked property to each repo
      const newSearchResults = repos.map(repo => {
        const isLiked: boolean =
          store.likes.findIndex(like => like.id === repo.id) > -1;
        return {...repo, like: isLiked};
      });

      this.setSearchResults(newSearchResults);
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

      console.log('---');
      store.likes.forEach(l => {
        console.log('LIKES BEFORE REPLACE', l?.like);
      });
      console.log('---');
      store.likes.replace(likesPlusLike);
      store.likes.forEach(l => {
        console.log('LIKES AFTER REPLACE', l?.like);
      });
      console.log('---');

      // Update search results with new likes
      const newSearchResults = store.searchResults.map(repo => {
        const isLiked = store.likes.findIndex(like => like.id === repo.id) > -1;
        return {...repo, isLiked};
      });

      this.setSearchResults(newSearchResults);
    },
    addLikeBoth(newLike: Repo) {
      (async () => {
        const res = await serverLikeSave(newLike);

        if (!res) {
          Alert.alert('Error', 'Error saving like');
          return;
        }
        store.likes.push(newLike);
      })();
    },
    setSearchResults(repos: Repo[]) {
      store.searchResults = repos;
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

          const index = store.likes.findIndex(like => like.id === repo.id);

          if (index > -1) {
            const newLikes = store.likes.filter(like => like.id !== repo.id);

            this.setLikesApp(newLikes);
          }
        } else {
          ////////////////////
          // ADD LIKE
          ////////////////////

          console.log('REPO BEFORE LIKE', repo?.like);

          const likeWithLike = {...repo, like: true};

          console.log('REPO AFTER LIKE', likeWithLike?.like);
          const res = await serverLikeSave(likeWithLike);

          if (!res) {
            Alert.alert('Error', 'Error saving like');
            return;
          }

          this.setLikesApp([...store.likes, likeWithLike]);
        }

        // Update search results with new likes
        const newSearchResults = store.searchResults.map(repo => {
          const isLiked =
            store.likes.findIndex(like => like.id === repo.id) > -1;
          return {...repo, isLiked};
        });

        store.searchResults.replace(newSearchResults);
      })();
    },

    removeLikeBoth(likeId: string) {
      (async () => {
        const res = await serverLikeDelete(likeId);

        if (!res) {
          Alert.alert('Error', 'Error deleting like');
          return;
        }

        const index = store.likes.findIndex(like => like.id === likeId);
        if (index > -1) {
          const newLikes = store.likes.filter(like => like.id !== likeId);

          store.likes.replace(newLikes);
        }
      })();
    },
    setTextInput(text: string) {
      store.textInput = text;
    },
    setTextQuery(text: string) {
      store.textQuery = text;
    },
    setStoreNumber(num: number) {
      store.storeNumber = num;
    },
  }));

export interface LikesStore extends Instance<typeof LikesStoreModel> {}
export interface LikesStoreSnapshot
  extends SnapshotOut<typeof LikesStoreModel> {}

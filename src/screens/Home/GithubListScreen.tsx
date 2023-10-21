/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../colors';
import {spacing} from '../../styles';
import {RepoGithub, RepoServer} from '../../types';
import {ListItem} from './ListItem';
import {inject, observer} from 'mobx-react';
import {myIp} from '../../YOUR_IP_HERE';

type GithubListScreenProps = {
  navigation: any;
  rootStore: any;
};

const GithubListScreen = inject('rootStore')(
  observer(({navigation, rootStore}: GithubListScreenProps) => {
    if (!rootStore) {
      return null;
    }

    // const {
    //   likesStore: {searchResults, setSearchResults, isLoading, setIsLoading},
    // } = rootStore;

    const [searchResults, setSearchResults] = useState<RepoGithub[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<any>(null);
    const [inputValue, setInputValue] = useState<string>('web_smashed');
    const [searchingValue, setSearchingValue] = useState<string>('web_smashed');
    const [likesGithub, setLikesGithub] = useState<RepoGithub[]>([]);
    const [likesServer, setLikesServer] = useState<RepoServer[]>([]);
    const [allowLikes, setAllowLikes] = useState<boolean>(true);

    useEffect(() => {
      console.log('serverLikes.length', likesServer.length);

      // @ts-ignore
      const likesFromServerFormatted: RepoGithub[] = likesServer.map(
        (repo: RepoServer, index: number) => {
          const x: RepoGithub = {
            id: repo.id,
            full_name: repo.fullName,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazersCount,
          };

          console.log('index', index, 'x', x);

          return x;
        },
      );

      setLikesGithub(likesFromServerFormatted);
    }, [likesServer]);

    useEffect(() => {
      if (likesGithub.length > 9) {
        setAllowLikes(false);
      } else {
        setAllowLikes(true);
      }
    }, [likesGithub]);

    useEffect(() => {
      const handler = setTimeout(() => {
        setSearchingValue(inputValue);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }, [inputValue]);

    const getRepositories = () => {
      if (searchingValue) {
        setIsLoading(true);
        setSearchResults([]);

        axios
          .get(`https://api.github.com/search/repositories?q=${searchingValue}`)
          .then(response => {
            setSearchResults(response.data.items.slice(0, 10));
          })
          .catch(err => {
            console.error(err);
            setError('Error fetching GitHub repositories');
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };

    useEffect(() => {
      if (searchingValue) {
        getRepositories();
      }
    }, [searchingValue]);

    const saveToServer = useCallback((repo: RepoGithub) => {
      axios
        .post(`http://${myIp}:8080/repo/`, {
          id: repo?.id.toString() || '',
          fullName: repo?.full_name || '',
          createdAt: repo?.created_at || '',
          stargazersCount: repo?.stargazers_count || 0,
          language: repo?.language || '',
          url: repo?.html_url || '',
        })
        .catch(err => {
          console.error('Error saving repo to server:', err);
          Alert.alert('Error', 'Failed to save repository to server.');
        });
    }, []);

    const deleteFromServer = useCallback((repoId: string) => {
      axios.delete(`http://${myIp}:8080/repo/${repoId}`).catch(err => {
        console.error('Error deleting repo from server:', err);
        Alert.alert('Error', 'Failed to delete repository from server.');
      });
    }, []);

    const fetchSavedRepos = useCallback(() => {
      axios
        .get(`http://${myIp}:8080/repo/`)
        .then(response => {
          if (response?.data?.repos && Array.isArray(response.data.repos)) {
            setLikesServer(response.data.repos);
          }
        })
        .catch(err => {
          console.error('Error fetching saved repos from server:', err);
        });
    }, []);

    useEffect(() => {
      fetchSavedRepos();
    }, [fetchSavedRepos]);

    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        // NEED TO ACCOUNT FOR HEADER BEING USED
        keyboardVerticalOffset={72}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {error && <Text>Error: {error}</Text>}
          {!error && (
            <FlatList
              data={searchResults}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getRepositories}
                />
              }
              contentContainerStyle={{
                marginTop: spacing.xxl,
                width: '100%',
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item: repo}) => (
                <ListItem
                  repo={repo}
                  likesGithub={likesGithub}
                  allowLikes={allowLikes}
                  onLikeToggle={() => {
                    const isThisLiked = likesGithub.find(
                      (r: RepoGithub) => r.id === repo.id,
                    );

                    if (!isThisLiked && !allowLikes) {
                      Alert.alert(
                        'Maximum number of likesGithub reached',
                        'Please unlike some repositories to like more',
                      );
                      return;
                    }
                    const newLikes = [...likesGithub];
                    const likeFound = newLikes.findIndex(
                      (r: RepoGithub) => r.id === repo.id,
                    );
                    if (likeFound > -1) {
                      newLikes.splice(likeFound, 1);
                      deleteFromServer(repo.id.toString());
                    } else {
                      newLikes.push(repo);
                      saveToServer(repo);
                    }
                    setLikesGithub(newLikes);
                  }}
                />
              )}
            />
          )}

          {/* ////////////////////////////////// */}
          {/* SEARCH BAR */}
          {/* ////////////////////////////////// */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.palette.gray400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: spacing.md,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  marginHorizontal: spacing.md,
                  backgroundColor:
                    likesGithub.length > 0
                      ? colors.palette.blue200
                      : colors.palette.gray200,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: spacing.sm,
                  padding: spacing.sm,
                  paddingHorizontal: spacing.md,
                }}
                // @ts-ignore
                onPress={() => navigation.navigate('Likes')}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      likesGithub.length > 0
                        ? colors.palette.blue600
                        : colors.palette.gray400,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                  }}>
                  {likesGithub.length}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      likesGithub.length > 0
                        ? colors.palette.blue600
                        : colors.palette.gray400,
                  }}>
                  {likesGithub.length === 1 ? ' Like' : ' Likes'}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                Search Repositories
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.xl,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderColor: colors.palette.gray400,
                  borderWidth: 1,
                  borderRadius: spacing.sm,
                  paddingLeft: spacing.md,
                  paddingRight: spacing.md,
                  marginRight: spacing.md,
                  marginLeft: spacing.md,
                  paddingVertical: 0,
                }}
                placeholder="Search GitHub repositories..."
                onChangeText={text => setInputValue(text)}
                value={inputValue}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }),
);

export default GithubListScreen;

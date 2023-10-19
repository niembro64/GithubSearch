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
import {GitHubRepo, ServerRepo} from '../../types';
import {ListItem} from './ListItem';
import {useNavigation} from '@react-navigation/native';

type GithubListScreenProps = {
  navigation: any;
};

const GithubListScreen: React.FC<GithubListScreenProps> = () => {
  const navigation = useNavigation();
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('web_smashed');
  const [searchingValue, setSearchingValue] = useState<string>('web_smashed');
  const [likes, setLikes] = useState<GitHubRepo[]>([]);
  const [serverLikes, setServerLikes] = useState<ServerRepo[]>([]);
  const [allowLikes, setAllowLikes] = useState<boolean>(true);

  useEffect(() => {
    console.log('serverLikes.length', serverLikes.length);

    // @ts-ignore
    const likesFromServerFormatted: GitHubRepo[] = serverLikes.map(
      (repo: ServerRepo, index: number) => {
        // @ts-ignore
        const x: GitHubRepo = {
          id: repo.id,
          name: repo.fullName,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazersCount,
        };

        console.log('index', index, 'x', x);

        return x;
      },
    );

    setLikes(likesFromServerFormatted);
  }, [serverLikes]);

  useEffect(() => {
    if (likes.length > 9) {
      setAllowLikes(false);
    } else {
      setAllowLikes(true);
    }
  }, [likes]);

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

  const saveToServer = useCallback((repo: GitHubRepo) => {
    axios
      .post('http://192.168.1.19:8080/repo/', {
        id: repo.id.toString(),
        fullName: repo.full_name,
        createdAt: repo.created_at,
        stargazersCount: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
      })
      .catch(err => {
        console.error('Error saving repo to server:', err);
        Alert.alert('Error', 'Failed to save repository to server.');
      });
  }, []);

  const deleteFromServer = useCallback((repoId: string) => {
    axios.delete(`http://192.168.1.19:8080/repo/${repoId}`).catch(err => {
      console.error('Error deleting repo from server:', err);
      Alert.alert('Error', 'Failed to delete repository from server.');
    });
  }, []);

  const fetchSavedRepos = useCallback(() => {
    axios
      .get('http://192.168.1.19:8080/repo/')
      .then(response => {
        if (response?.data?.repos && Array.isArray(response.data.repos)) {
          setServerLikes(response.data.repos);
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
      // keyboardVerticalOffset={72}
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
                likes={likes}
                allowLikes={allowLikes}
                onLikeToggle={() => {
                  const isThisLiked = likes.find(
                    (r: GitHubRepo) => r.id === repo.id,
                  );

                  if (!isThisLiked && !allowLikes) {
                    Alert.alert(
                      'Maximum number of likes reached',
                      'Please unlike some repositories to like more',
                    );
                    return;
                  }
                  const newLikes = [...likes];
                  const likeFound = newLikes.findIndex(
                    (r: GitHubRepo) => r.id === repo.id,
                  );
                  if (likeFound > -1) {
                    newLikes.splice(likeFound, 1);
                    deleteFromServer(repo.id.toString());
                  } else {
                    newLikes.push(repo);
                    saveToServer(repo);
                  }
                  setLikes(newLikes);
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
            padding: spacing.md,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              marginBottom: spacing.md,
            }}>
            Search GitHub Repositories
          </Text>
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
            <TouchableOpacity
              style={{
                height: 40,
                marginRight: spacing.md,
                backgroundColor: colors.palette.blue200,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: spacing.sm,
                padding: spacing.sm,
              }}
              // @ts-ignore
              onPress={() => navigation.navigate('Likes')}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: colors.palette.blue600,
                }}>
                Likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GithubListScreen;

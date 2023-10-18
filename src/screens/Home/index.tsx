/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {spacing} from '../../styles';
import {GitHubRepo, GitHubRepoExtended} from '../../types';
import {ListItem} from './ListItem';

export const Home = () => {
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([]);
  const [extendedResults, setExtendedResults] = useState<GitHubRepoExtended[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('web_smashed');
  const [searchingValue, setSearchingValue] = useState<string>('web_smashed');
  const [likes, setLikes] = useState<GitHubRepoExtended[]>([]);
  const [allowLikes, setAllowLikes] = useState<boolean>(true);

  useEffect(() => {
    console.log('searchResults', JSON.stringify(searchResults, null, 2));

    if (Array.isArray(searchResults) && searchResults.length > 0) {
      const extended: GitHubRepoExtended[] = searchResults.map(
        (repo: GitHubRepo) => ({
          ...repo,
          liked: !!likes.find((r: GitHubRepoExtended) => r.id === repo.id),
        }),
      );

      setExtendedResults(extended);
    }
  }, [searchResults, likes]);

  useEffect(() => {
    if (likes.length > 9) {
      setAllowLikes(false);
    } else {
      setAllowLikes(true);
    }
  }, [likes]);

  useEffect(() => {
    console.log('inputValue', inputValue);
    const handler = setTimeout(() => {
      setSearchingValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    console.log('debouncedValue', searchingValue);
  }, [searchingValue]);

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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {error && <Text>Error: {error}</Text>}
        {!error && (
          <FlatList
            data={extendedResults}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={getRepositories}
              />
            }
            contentContainerStyle={{
              width: '100%',
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item: repo}) => (
              <ListItem
                repo={repo}
                allowLikes={allowLikes}
                onLikeToggle={() => {
                  if (!allowLikes) {
                    Alert.alert(
                      'Maximum number of likes reached',
                      'Please unlike some repositories to like more',
                    );
                    return;
                  }
                  const newLikes = [...likes];
                  const likeFound = newLikes.findIndex(
                    (r: GitHubRepoExtended) => r.id === repo.id,
                  );
                  if (likeFound > -1) {
                    newLikes.splice(likeFound, 1);
                  } else {
                    newLikes.push(repo);
                  }
                  setLikes(newLikes);
                  const newExtendedResults = [...extendedResults];
                  const extendedIndex = newExtendedResults.findIndex(
                    (r: GitHubRepoExtended) => r.id === repo.id,
                  );
                  if (extendedIndex > -1) {
                    newExtendedResults[extendedIndex].liked =
                      !newExtendedResults[extendedIndex].liked;
                  }
                  setExtendedResults(newExtendedResults);
                }}
              />
            )}
          />
        )}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: spacing.md,
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
            }}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                borderColor: '#999',
                borderWidth: 1,
                borderRadius: spacing.sm,
                paddingLeft: spacing.md,
                paddingRight: spacing.md,
                marginRight: spacing.md,
                paddingVertical: 0,
              }}
              placeholder="Search GitHub repositories..."
              onChangeText={text => setInputValue(text)}
              value={inputValue}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#ccc',
                height: 40,
                width: 80,
                borderRadius: spacing.md,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={getRepositories}>
              <Text>Search</Text>
            </TouchableOpacity>
          </View>
          <Text>{inputValue}</Text>
          <Text>{searchingValue}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

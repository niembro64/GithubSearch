/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, getColorFromLanguage} from '../../colors';
import {GitHubId, GitHubRepo, GitHubRepoExtended} from '../../types';
import {truncateString} from '../../helpers';
import {spacing} from '../../styles';

const insetCalc = (insets: EdgeInsets) => ({
  paddingTop: Math.max(insets.top, 16),
  paddingBottom: Math.max(insets.bottom, 16),
  paddingLeft: Math.max(insets.left, 16),
  paddingRight: Math.max(insets.right, 16),
});

export const Home = () => {
  const insets = useSafeAreaInsets();
  const style = useMemo(() => insetCalc(insets), [insets]);

  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([]);
  const [extendedResults, setExtendedResults] = useState<GitHubRepoExtended[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('web_smashed');
  const [searchingValue, setSearchingValue] = useState<string>('web_smashed');
  const [likes, setLikes] = useState<GitHubId[]>([]);

  useEffect(() => {
    console.log('searchResults', JSON.stringify(searchResults, null, 2));

    if (Array.isArray(searchResults) && searchResults.length > 0) {
      const extended: GitHubRepoExtended[] = searchResults.map(
        (repo: GitHubRepo) => ({
          ...repo,
          liked: likes.indexOf(repo.id) > -1,
        }),
      );

      setExtendedResults(extended);
    }
  }, [searchResults, likes]);

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

  return (
    <View style={style}>
      <Text>Search GitHub repos...</Text>
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
          onPress={() => {
            if (searchingValue) {
              setIsLoading(true);
              setSearchResults([]);
              axios
                .get(
                  `https://api.github.com/search/repositories?q=${searchingValue}`,
                )
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
          }}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      <Text>{inputValue}</Text>
      <Text>{searchingValue}</Text>
      <ScrollView>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {!isLoading &&
          !error &&
          Array.isArray(extendedResults) &&
          extendedResults.map((repo: GitHubRepoExtended, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: spacing.md,
                padding: spacing.md,

                borderRadius: spacing.md,
                backgroundColor: getColorFromLanguage(repo?.language),
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: spacing.md,
                }}
                key={index}>
                <Text>{repo?.name}</Text>
                <Text>{truncateString(repo?.description, 40)}</Text>
                <Text>{repo?.language}</Text>
                <Text>{repo?.stargazers_count}</Text>
              </View>

              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: spacing.md,
                  borderRadius: spacing.md,
                  backgroundColor: repo.liked
                    ? colors.palette.green500
                    : colors.palette.gray300,
                }}
                onPress={() => {
                  const newLikes = [...likes];
                  const likeIndex = newLikes.indexOf(repo.id);
                  if (likeIndex > -1) {
                    newLikes.splice(likeIndex, 1);
                  } else {
                    newLikes.push(repo.id);
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
                }}>
                <Text
                  style={{
                    color: repo.liked
                      ? colors.palette.white
                      : colors.palette.gray800,
                  }}>
                  {repo.liked ? 'YES' : 'NO'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

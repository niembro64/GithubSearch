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
import {getColorFromLanguage} from '../../colors';
import {GitHubRepo} from '../../types';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchingValue, setSearchingValue] = useState<string>('');

  useEffect(() => {
    console.log('searchResults', JSON.stringify(searchResults, null, 2));
  }, [searchResults]);

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
            borderRadius: 8,
            paddingLeft: 8,
            paddingRight: 8,
            marginRight: 8,
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
            borderRadius: 8,
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
          Array.isArray(searchResults) &&
          searchResults.map((repo: GitHubRepo, index: number) => (
            <View
              style={{
                backgroundColor: getColorFromLanguage(repo?.language),
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 8,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                key={index}>
                <Text>{repo.name}</Text>
                <Text>{repo.language}</Text>
                <Text>{repo.stargazers_count}</Text>
                <Text>{repo.url}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

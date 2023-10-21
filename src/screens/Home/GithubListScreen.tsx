/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {useAtom} from 'jotai';
import {observer} from 'mobx-react';
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
import {myIp} from '../../YOUR_IP_HERE';
import {colors} from '../../colors';
import {
  likesGithubAtom,
  searchResultsAtom,
  textInputAtom,
  textQueryAtom,
} from '../../state';
import {spacing} from '../../styles';
import {RepoGithub} from '../../types';
import {ListItem} from './ListItem';
import {ConfettiCannon} from '../../components/ConfettiCannon';
import {joinJsonPath} from 'mobx-state-tree';

type GithubListScreenProps = {
  navigation: any;
};

const GithubListScreen = observer(({navigation}: GithubListScreenProps) => {
  const [likes, setLikes] = useAtom(likesGithubAtom);

  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [textInput, setTextInput] = useAtom(textInputAtom);
  const [textQuery, setTextQuery] = useAtom(textQueryAtom);

  useEffect(() => {
    if (likes.length === 10) {
      Alert.alert(
        'Congratulations!',
        'You have liked 10 repositories! 🎉',
        [
          {
            text: 'OK',
            onPress: () => {
              // console.log('OK Pressed');
            },
          },
        ],
        {cancelable: false},
      );
    }
  }, [likes]);

  useEffect(() => {
    console.log('searchResults', searchResults);
  }, [searchResults]);

  useEffect(() => {
    const handler = setTimeout(() => {
      // @ts-ignore
      setTextQuery(textInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [textInput]);

  const getSearchResults = () => {
    console.log('textQuery', textQuery);

    if (textQuery === '' || textQuery === null || textQuery === undefined) {
      setSearchResults([]);
    } else {
      setIsLoading(true);

      axios
        .get(`https://api.github.com/search/repositories?q=${textQuery}`)
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
    getSearchResults();
  }, [textQuery]);

  const fetchSavedRepos = useCallback(() => {
    axios
      .get(`http://${myIp}:8080/repo/`)
      .then(response => {
        if (response?.data?.repos && Array.isArray(response.data.repos)) {
          setLikes(response.data.repos);
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
    <>
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
                  onRefresh={getSearchResults}
                />
              }
              contentContainerStyle={{
                marginTop: spacing.xxl,
                width: '100%',
              }}
              keyExtractor={item => item.id.toString()}
              renderItem={({item: repo}) => <ListItem repo={repo} />}
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
                    likes.length > 0
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
                      likes.length > 0
                        ? colors.palette.blue600
                        : colors.palette.gray400,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                  }}>
                  {likes.length}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      likes.length > 0
                        ? colors.palette.blue600
                        : colors.palette.gray400,
                  }}>
                  {likes.length === 1 ? ' Like' : ' Likes'}
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
                onChangeText={text => setTextInput(text)}
                value={textInput}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {likes?.length === 10 && <ConfettiCannon />}
    </>
  );
});

export default GithubListScreen;

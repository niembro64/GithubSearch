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
import {myIp, maxLikes, maxResults} from '../../YOUR_IP_HERE';
import {colors} from '../../colors';
import {ConfettiCannon} from '../../components/ConfettiCannon';
import {
  likesAtom,
  resultsAtom,
  textInputAtom,
  textQueryAtom,
} from '../../state';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
import {keyboardVerticalOffsetIOS} from '../../helpers';
import {NumLikesState, RepoGithub, RepoGithubFull} from '../../types';

type GithubListScreenProps = {
  navigation: any;
};

const GithubListScreen = observer(({navigation}: GithubListScreenProps) => {
  const [results, setResults] = useAtom(resultsAtom);
  const [likes, setLikes] = useAtom(likesAtom);
  const [numLikesState, setNumLikesState] = useState<NumLikesState>('zero');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [textInput, setTextInput] = useAtom(textInputAtom);
  const [textQuery, setTextQuery] = useAtom(textQueryAtom);

  useEffect(() => {
    const handler = setTimeout(() => {
      setTextQuery(textInput);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [textInput]);

  const githubGetSearchResults = useCallback(async () => {
    if (textQuery === '') {
      setResults([]);
    } else {
      setIsLoading(true);
      setResults([]);

      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${textQuery}`,
        );

        if (!response?.data?.items) {
          setResults([]);
          Alert.alert('Error', 'Failed to fetch GitHub repositories.');
          return;
        }
        const resItems: RepoGithubFull[] = response.data.items.slice(
          0,
          maxResults,
        );

        const smallerResItems: RepoGithub[] = resItems.map(
          (item: RepoGithubFull) => {
            return {
              id: item.id,
              full_name: item.full_name,
              description: item.description,
              language: item.language,
              stargazers_count: item.stargazers_count,
              isLiked: likes.some(like => '' + like.id === '' + item.id),
            };
          },
        );

        setResults(smallerResItems);
      } catch (err) {
        setResults([]);
        Alert.alert('Error', 'Failed to fetch GitHub repositories.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [textQuery, setTextQuery, setResults]);

  const serverGetLikes = () => {
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
  };

  useEffect(() => {
    githubGetSearchResults();
  }, [textQuery]);

  useEffect(() => {
    serverGetLikes();
  }, []);

  useEffect(() => {
    switch (likes.length) {
      case 0:
        setNumLikesState('zero');
        break;
      case 1:
        setNumLikesState('one');
        break;
      case maxLikes:
        setNumLikesState('max');
        break;
      default:
        setNumLikesState('many');
        break;
    }
  }, [likes]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        // NEED TO ACCOUNT FOR HEADER BEING USED
        keyboardVerticalOffset={keyboardVerticalOffsetIOS}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {error && <Text>Error: {error}</Text>}
          {!error && (
            <FlatList
              data={results}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={githubGetSearchResults}
                />
              }
              contentContainerStyle={{
                marginTop: spacing.xxl,
                width: '100%',
              }}
              keyExtractor={item => '' + item.id}
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
                  flex: 1,
                  marginHorizontal: spacing.md,
                  backgroundColor:
                    numLikesState === 'zero'
                      ? colors.palette.gray100
                      : numLikesState === 'one'
                      ? colors.palette.blue200
                      : numLikesState === 'many'
                      ? colors.palette.blue200
                      : colors.palette.green200,
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
                      numLikesState === 'zero'
                        ? colors.palette.gray300
                        : numLikesState === 'one'
                        ? colors.palette.blue600
                        : numLikesState === 'many'
                        ? colors.palette.blue600
                        : colors.palette.green600,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                  }}>
                  {likes.length === maxLikes ? '' : likes.length}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      numLikesState === 'zero'
                        ? colors.palette.gray300
                        : numLikesState === 'one'
                        ? colors.palette.blue600
                        : numLikesState === 'many'
                        ? colors.palette.blue600
                        : colors.palette.green600,
                  }}>
                  {numLikesState === 'zero'
                    ? ' Likes'
                    : numLikesState === 'one'
                    ? ' Like'
                    : numLikesState === 'many'
                    ? ' Likes'
                    : 'Max Likes'}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  flex: 2,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                }}>
                Search Github
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
                  borderColor:
                    textQuery === textInput && !isLoading
                      ? colors.palette.gray400
                      : colors.palette.blue500,
                  borderWidth: 2,
                  borderRadius: spacing.sm,
                  paddingLeft: spacing.md,
                  paddingRight: spacing.md,
                  marginRight: spacing.md,
                  marginLeft: spacing.md,
                  paddingVertical: 0,
                }}
                placeholder="Enter a Github repo name..."
                placeholderTextColor={colors.palette.gray400}
                onChangeText={text => setTextInput(text)}
                value={textInput}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      {likes?.length === maxLikes && <ConfettiCannon />}
    </>
  );
});

export default GithubListScreen;

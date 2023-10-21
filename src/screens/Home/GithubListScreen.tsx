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
import {myIp, numAllowedLikes, numSearchResults} from '../../YOUR_IP_HERE';
import {colors} from '../../colors';
import {ConfettiCannon} from '../../components/ConfettiCannon';
import {
  likesGithubAtom,
  searchResultsAtom,
  textInputAtom,
  textQueryAtom,
} from '../../state';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
import {keyboardVerticalOffsetIOS} from '../../helpers';
import {NumLikesState} from '../../types';

type GithubListScreenProps = {
  navigation: any;
};

const GithubListScreen = observer(({navigation}: GithubListScreenProps) => {
  const [likes, setLikes] = useAtom(likesGithubAtom);
  const [numLikesState, setNumLikesState] = useState<NumLikesState>('zero');

  const [searchResults, setSearchResults] = useAtom(searchResultsAtom);

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
      setSearchResults([]);
    } else {
      setIsLoading(true);
      setSearchResults([]);

      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${textQuery}`,
        );

        if (!response?.data?.items) {
          setSearchResults([]);
          Alert.alert('Error', 'Failed to fetch GitHub repositories.');
          return;
        }
        setSearchResults(response.data.items.slice(0, numSearchResults));
      } catch (err) {
        setSearchResults([]);
        Alert.alert('Error', 'Failed to fetch GitHub repositories.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [textQuery, setTextQuery, setSearchResults]);

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
    console.log('likes', likes);

    switch (likes.length) {
      case 0:
        setNumLikesState('zero');
        break;
      case 1:
        setNumLikesState('one');
        break;
      case numAllowedLikes:
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
              data={searchResults}
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
                    numLikesState === 'zero'
                      ? colors.palette.gray100
                      : numLikesState === 'one'
                      ? colors.palette.blue200
                      : numLikesState === 'many'
                      ? colors.palette.blue200
                      : colors.palette.red200,
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
                        : colors.palette.red600,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                  }}>
                  {likes.length === numAllowedLikes ? '' : likes.length}
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
                        : colors.palette.red600,
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

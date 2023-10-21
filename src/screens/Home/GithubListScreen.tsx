/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
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
import {githubGetRepos, serverLikesGet} from '../../helpers';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
import {Repo} from '~/types';

type GithubListScreenProps = {
  navigation: any;
  rootStore: any;
};

const GithubListScreen = inject('rootStore')(
  observer(({navigation, rootStore}: GithubListScreenProps) => {
    if (!rootStore) {
      return null;
    }

    const {
      likesStore: {
        textInput,
        setTextInput,
        textQuery,
        setTextQuery,
        searchResults,
        setSearchResultsApp,
        likes,
        pressThumbBoth,
        storeNumber,
        setStoreNumber,
        setLikesApp,
      },
    } = rootStore;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [renderHelper, setRenderHelper] = useState<boolean>(false);

    //////////////////////////////
    // POPULATE LIKES
    //////////////////////////////
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        setLikesApp(await serverLikesGet());
        setIsLoading(false);
      })();
    }, []);

    //////////////////////////////
    // SEARCH RESULTS
    //////////////////////////////
    useEffect(() => {
      if (textQuery) {
        (async () => {
          setIsLoading(true);
          setSearchResultsApp(await githubGetRepos(textQuery));
          setIsLoading(false);
        })();
      }
    }, [textQuery]);

    //////////////////////////////
    // TEXT DEBOUNCING
    //////////////////////////////
    useEffect(() => {
      const handler = setTimeout(() => {
        setTextQuery(textInput);
      }, 1000);

      return () => {
        clearTimeout(handler);
      };
    }, [textInput]);

    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        //////////////////////////////
        // NEED TO ACCOUNT FOR HEADER BEING USED
        //////////////////////////////
        keyboardVerticalOffset={72}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {
            <FlatList
              data={searchResults}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={async () => {
                    if (textQuery) {
                      setIsLoading(true);
                      setSearchResultsApp(await githubGetRepos(textQuery));
                      setIsLoading(false);
                    }
                  }}
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
                  rootStore={rootStore}
                  likes={likes}
                  pressThumbBoth={async function (r: Repo): Promise<void> {
                    await pressThumbBoth(repo);
                    setRenderHelper(!renderHelper);
                    setStoreNumber(storeNumber + 1);
                  }}
                />
              )}
            />
          }

          <Text
            style={{
              color: 'black',
              marginTop: spacing.sm,
            }}>
            {storeNumber}
          </Text>

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
    );
  }),
);

export default GithubListScreen;

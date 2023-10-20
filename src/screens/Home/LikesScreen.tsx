/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {serverLikesGet} from '../../helpers';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
import {Repo} from '~/types';

type LikesScreenProps = {
  navigation: any;
  likesStore: any;
};

const LikesScreen = inject('likesStore')(
  observer(({navigation, likesStore}: LikesScreenProps) => {
    if (!likesStore) {
      return null;
    }

    const {
      textInput,
      setTextInput,
      rootStore,
      pressThumbBoth,
      likes,
      setLikesApp,
      setSearchResultsApp,
      textQuery,
      searchResults,
      setTextQuery,
    } = likesStore;
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        //////////////////////////////
        // NEED TO ACCOUNT FOR HEADER BEING USED
        //////////////////////////////
        keyboardVerticalOffset={72}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <FlatList
          data={likes}
          style={{
            width: '100%',
          }}
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
              }}
            />
          )}
        />
      </KeyboardAvoidingView>
    );
  }),
);

export default LikesScreen;

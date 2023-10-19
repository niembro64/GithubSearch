/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {serverLikesGet} from '../../helpers';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';

type LikesScreenProps = {
  navigation: any;
  rootStore: any;
};

const LikesScreen = inject('rootStore')(
  observer(({navigation, rootStore}: LikesScreenProps) => {
    if (!rootStore) {
      return null;
    }

    const {
      likesStore: {likes, setLikes},
    } = rootStore;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    //////////////////////////////
    // POPULATE LIKES
    //////////////////////////////
    useEffect(() => {
      (async () => {
        setIsLoading(true);
        setLikes(await serverLikesGet());
        setIsLoading(false);
      })();
    }, []);
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        // NEED TO ACCOUNT FOR HEADER BEING USED
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
            <ListItem repo={repo} rootStore={rootStore} />
          )}
        />
      </KeyboardAvoidingView>
    );
  }),
);

export default LikesScreen;

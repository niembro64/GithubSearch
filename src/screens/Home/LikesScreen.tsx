/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {spacing} from '../../styles';
import {Repo} from '../../types';
import {ListItem} from './ListItem';
// import {useNavigation} from '@react-navigation/native';

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

    const deleteFromServer = (repoId: string) => {
      axios.delete(`http://192.168.1.19:8080/repo/${repoId}`).catch(err => {
        console.error('Error deleting repo from server:', err);
        Alert.alert('Error', 'Failed to delete repository from server.');
      });
    };

    const fetchSavedRepos = () => {
      axios
        .get('http://192.168.1.19:8080/repo/')
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
      fetchSavedRepos();
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
            <ListItem
              repo={repo}
              onLikeToggle={() => {
                deleteFromServer(repo.id.toString());
                const newLikes = likes.filter((r: Repo) => r.id !== repo.id);
                setLikes(newLikes);
              }}
              rootStore={rootStore}
            />
          )}
        />
      </KeyboardAvoidingView>
    );
  }),
);

export default LikesScreen;

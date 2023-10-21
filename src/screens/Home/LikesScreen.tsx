/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {observer} from 'mobx-react';
import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myIp} from '../../YOUR_IP_HERE';
import {colors} from '../../colors';
import {spacing} from '../../styles';
import {RepoGithub, RepoServer} from '../../types';
import {ListItem} from './ListItem';
// import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {likesGithubAtom} from '../../state';

type LikesScreenProps = {
  navigation: any;
};

const LikesScreen = observer(({navigation}: LikesScreenProps) => {
  const [likesGithub, setLikesGithub] = useAtom(likesGithubAtom);
  const [likesServer, setLikesServer] = React.useState<RepoServer[]>([]);

  const deleteFromServer = useCallback((repoId: string) => {
    axios.delete(`http://${myIp}:8080/repo/${repoId}`).catch(err => {
      console.error('Error deleting repo from server:', err);
      Alert.alert('Error', 'Failed to delete repository from server.');
    });
  }, []);

  useEffect(() => {
    const likesFromServerFormatted: RepoGithub[] = likesServer.map(
      (repo: RepoServer) => {
        // @ts-ignore
        const x: RepoGithub = {
          id: repo.id,
          name: repo.fullName,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazersCount,
        };
        return x;
      },
    );
    setLikesGithub(likesFromServerFormatted);
  }, [likesServer]);

  const fetchReposServer = useCallback(() => {
    axios
      .get(`http://${myIp}:8080/repo/`)
      .then(response => {
        if (response?.data?.repos && Array.isArray(response.data.repos)) {
          setLikesServer(response.data.repos);
        }
      })
      .catch(err => {
        console.error('Error fetching saved repos from server:', err);
      });
  }, []);

  useEffect(() => {
    fetchReposServer();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      // NEED TO ACCOUNT FOR HEADER BEING USED
      keyboardVerticalOffset={72}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <FlatList
        data={likesGithub}
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
            likesGithub={likesGithub}
            allowLikes={false}
            onLikeToggle={() => {
              deleteFromServer(repo.id.toString());
              const newLikes = likesGithub.filter(
                (r: RepoGithub) => r.id !== repo.id,
              );
              setLikesGithub(newLikes);
            }}
          />
        )}
      />
      {/* ////////////////////////////////// */}
      {/* SEARCH BAR */}
      {/* ////////////////////////////////// */}
      <View
        style={{
          width: '100%',
          borderTopWidth: 1,
          borderTopColor: colors.palette.gray400,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 0,
          padding: spacing.md,
          marginBottom: spacing.xl,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              marginLeft: spacing.md,
              backgroundColor: colors.palette.blue200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: spacing.sm,
              padding: spacing.sm,
            }}
            onPress={() => {
              // @ts-ignore
              navigation.canGoBack() && navigation.goBack();
              // navigation.navigate('Home');
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: colors.palette.blue600,
              }}>
              Home
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          Liked Repositories
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
});
export default LikesScreen;

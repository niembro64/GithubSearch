/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../colors';
import {spacing} from '../../styles';
import {GitHubRepo, ServerRepo} from '../../types';
import {ListItem} from './ListItem';

const LikesScreen = () => {
  const [likes, setLikes] = useState<GitHubRepo[]>([]);
  const [serverLikes, setServerLikes] = useState<ServerRepo[]>([]);

  const deleteFromServer = useCallback((repoId: string) => {
    axios.delete(`http://192.168.1.19:8080/repo/${repoId}`).catch(err => {
      console.error('Error deleting repo from server:', err);
      Alert.alert('Error', 'Failed to delete repository from server.');
    });
  }, []);

  useEffect(() => {
    const likesFromServerFormatted: GitHubRepo[] = serverLikes.map(
      (repo: ServerRepo) => {
        // @ts-ignore
        const x: GitHubRepo = {
          id: repo.id,
          name: repo.fullName,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazersCount,
        };
        return x;
      },
    );
    setLikes(likesFromServerFormatted);
  }, [serverLikes]);

  const fetchSavedRepos = useCallback(() => {
    axios
      .get('http://192.168.1.19:8080/repo/')
      .then(response => {
        if (response?.data?.repos && Array.isArray(response.data.repos)) {
          setServerLikes(response.data.repos);
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
    <View style={styles.container}>
      <Text>Likes Screen</Text>
      <FlatList
        data={likes}
        contentContainerStyle={{width: '100%'}}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: repo}) => (
          <ListItem
            repo={repo}
            likes={likes}
            allowLikes={false}
            onLikeToggle={() => {
              deleteFromServer(repo.id.toString());
              const newLikes = likes.filter(r => r.id !== repo.id);
              setLikes(newLikes);
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 0,
          padding: spacing.md,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: spacing.md,
          }}>
          Liked Repositories
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing.xl,
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              marginRight: spacing.md,
              backgroundColor: colors.palette.blue200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: spacing.sm,
              padding: spacing.sm,
            }}
            // @ts-ignore
            onPress={() => navigation.navigate('Home')}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default LikesScreen;

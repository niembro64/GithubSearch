/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
// ListItem.tsx
import axios from 'axios';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {maxLikes, myIp} from '../../YOUR_IP_HERE';
import {colors, getColorFromLanguage} from '../../colors';
import {truncateString} from '../../helpers';
import {likesAtom, resultsAtom} from '../../state';
import {spacing} from '../../styles';
import {RepoGithub, RepoServer} from '../../types';

interface ListItemProps {
  repo: RepoGithub;
}

export const ListItem: React.FC<ListItemProps> = ({repo}) => {
  const [repoIsLiked, setRepoIsLiked] = useState<boolean>(false);

  const [results, setResults] = useAtom(resultsAtom);
  const [likes, setLikes] = useAtom(likesAtom);
  const numStars = repo?.stargazers_count || 0;

  const deleteLike = useCallback(async () => {
    let res = null;

    try {
      res = await axios.delete(`http://${myIp}:8080/repo/${repo.id}`);

      console.log('res', res?.data);

      setLikes([...likes.filter(like => '' + like.id !== '' + repo.id)]);
    } catch (err) {
      console.error('Error deleting repo from server:', err);
      Alert.alert('Error', 'Failed to delete repository from server.');
    }
  }, [likes, setLikes, repo]);

  const addLike = useCallback(async () => {
    let res = null;

    const newObjectToServer: RepoServer = {
      id: repo?.id.toString() || '',
      fullName: repo?.full_name || '',
      description: repo?.description || '',
      language: repo?.language || '',
      stargazersCount: repo?.stargazers_count || 0,
    };

    try {
      res = await axios.post(`http://${myIp}:8080/repo/`, newObjectToServer);

      console.log('res', res?.data);

      setLikes([...likes, repo]);
    } catch (err) {
      console.error('Error saving repo to server:', err);
      Alert.alert('Error', 'Failed to save repository to server.');
    }
  }, [likes, setLikes, repo]);

  const onThumbPress = useCallback(() => {
    console.log(
      'repo',
      repo.full_name,
      'repoLiked',
      repoIsLiked ? '___YES___' : '___NO___',
    );

    if (repoIsLiked) {
      deleteLike();
    } else {
      if (likes.length < maxLikes) {
        addLike();
      } else if (likes.length >= maxLikes) {
        Alert.alert('Error', 'You can only like 10 repositories.');
      }
    }
  }, [repo.full_name, repoIsLiked, deleteLike, likes.length, addLike]);

  useEffect(() => {
    const found = likes.find(like => '' + like.id === '' + repo.id);

    if (found) {
      setRepoIsLiked(true);
    } else {
      setRepoIsLiked(false);
    }
  }, [repo, likes, results, setResults]);

  useEffect(() => {
    console.log('repo', JSON.stringify(repo, null, 2));
  }, [repo]);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.xs,
        marginHorizontal: spacing.md,
        borderRadius: spacing.md,
        backgroundColor: colors.transparent,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: spacing.md,
          backgroundColor: colors.palette.slate300,
          padding: spacing.md,
        }}>
        <Text style={{fontSize: 22, color: 'black'}}>
          {truncateString(repo?.full_name, 20)}
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: spacing.sm,
          }}>
          {truncateString(repo?.description, 30)}
        </Text>
        <View
          style={{
            marginTop: spacing.sm,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 35,
              backgroundColor: getColorFromLanguage(repo?.language),
              borderRadius: spacing.sm,
              display: 'flex',
              justifyContent: 'center',
              paddingHorizontal: spacing.md,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: 'white',
                fontSize: 16,
              }}>
              {repo?.language}
            </Text>
          </View>
          <View
            style={{
              height: 35,
              backgroundColor: colors.palette.blue600,
              borderRadius: spacing.sm,
              display: 'flex',
              justifyContent: 'center',
              paddingHorizontal: spacing.md,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: 'white',
                fontSize: 16,
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
              }}>
              {numStars + ' ' + '⭐'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          height: 100,
          width: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: spacing.md,
          borderRadius: 50,
        }}
        onPress={onThumbPress}>
        <Image
          source={require('../../../assets/images/like-button.png')}
          style={{
            width: 40,
            height: 40,
            tintColor: repoIsLiked
              ? colors.palette.blue600
              : likes.length < maxLikes
              ? colors.palette.gray300
              : colors.transparent,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

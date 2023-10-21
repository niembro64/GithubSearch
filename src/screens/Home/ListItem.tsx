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
import {myIp} from '../../YOUR_IP_HERE';
import {colors, getColorFromLanguage} from '../../colors';
import {truncateString} from '../../helpers';
import {likesGithubAtom} from '../../state';
import {spacing} from '../../styles';
import {RepoGithub} from '../../types';
interface ListItemProps {
  repo: RepoGithub;
}

export const ListItem: React.FC<ListItemProps> = ({repo}) => {
  const numStars = repo?.stargazers_count || 0;
  const [likes, setLikes] = useAtom(likesGithubAtom);
  const [repoLiked, setRepoLiked] = useState<boolean>(false);

  const deleteFromServer = useCallback(
    async (repoId: string) => {
      let res = null;

      try {
        res = await axios.delete(`http://${myIp}:8080/repo/${repoId}`);

        if (res?.data) {
          setLikes([...likes.filter(like => like.id !== repo.id)]);
        }
      } catch (err) {
        console.error('Error deleting repo from server:', err);
        Alert.alert('Error', 'Failed to delete repository from server.');
      }
    },
    [likes, setLikes, repo.id],
  );

  const saveToServer = useCallback(
    async (repo: RepoGithub) => {
      let res = null;

      try {
        res = await axios.post(`http://${myIp}:8080/repo/`, {
          id: repo?.id.toString() || '',
          full_name: repo?.full_name || '',
          description: repo?.description || '',
          language: repo?.language || '',
          stargazers_count: repo?.stargazers_count || 0,
        });

        if (res?.data) {
          setLikes([...likes, repo]);
        }
      } catch (err) {
        console.error('Error saving repo to server:', err);
        Alert.alert('Error', 'Failed to save repository to server.');
      }
    },
    [likes, setLikes],
  );

  const onThumbPress = useCallback(
    (repo: RepoGithub) => {
      if (repoLiked) {
        //////////////////////////
        // remove from likes
        //////////////////////////
        const newLikes = likes.filter(like => like.id !== repo.id);
        setLikes(newLikes);
        deleteFromServer(repo.id.toString());
      } else {
        //////////////////////////
        // add to likes
        //////////////////////////
        if (likes.length < 10) {
          saveToServer(repo);
        } else if (likes.length >= 10) {
          Alert.alert('Error', 'You can only like 10 repositories.');
        }
      }
    },
    [likes, repoLiked, deleteFromServer, saveToServer, setLikes],
  );

  useEffect(() => {
    const found = likes.find(like => like.id === repo.id);
    if (found) {
      setRepoLiked(true);
    } else {
      setRepoLiked(false);
    }
  }, [repo, likes]);

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
        onPress={() => onThumbPress(repo)}>
        <Image
          source={require('../../../assets/images/like-button.png')}
          style={{
            width: 40,
            height: 40,
            tintColor: repoLiked
              ? colors.palette.blue600
              : likes.length < 10
              ? colors.palette.gray300
              : colors.transparent,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
// ListItem.tsx
import React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {colors, getColorFromLanguage} from '../../colors';
import {truncateString} from '../../helpers';
import {spacing} from '../../styles';
import {GitHubRepo} from '../../types';

interface ListItemProps {
  repo: GitHubRepo;
  likes: GitHubRepo[];
  allowLikes: boolean;
  onLikeToggle: (repo: GitHubRepo) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  repo,
  likes,
  allowLikes,
  onLikeToggle,
}) => {
  const repoLiked = likes.find((r: GitHubRepo) => r.id == repo.id);

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
          {truncateString(repo?.name, 20)}
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
              {repo?.stargazers_count + ' ' + '⭐'}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{
          height: 80,
          width: 80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: spacing.md,
          borderRadius: spacing.md,
        }}
        onPress={() => onLikeToggle(repo)}>
        <Image
          source={require('../../../assets/images/like-button.png')}
          style={{
            width: 40,
            height: 40,
            tintColor: repoLiked
              ? colors.palette.blue600
              : allowLikes
              ? colors.palette.gray300
              : colors.palette.gray300,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

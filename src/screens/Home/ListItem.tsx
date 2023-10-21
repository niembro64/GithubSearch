/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
// ListItem.tsx
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {colors, getColorFromLanguage} from '../../colors';
import {truncateString} from '../../helpers';
import {spacing} from '../../styles';
import {Repo} from '../../types';

interface ListItemProps {
  repo: Repo;
  rootStore: any;
  likes: Repo[];
  pressThumbBoth: (repo: Repo) => Promise<void>;
}

export const ListItem: React.FC<ListItemProps> = observer(
  ({repo, rootStore, likes, pressThumbBoth}) => {
    if (!rootStore) {
      return null;
    }

    const [forceRender, setForceRender] = useState<number>(0);

    const [internalRepo, setInternalRepo] = useState<Repo>(repo);

    useEffect(() => {
      console.log('repo.like', repo.like);
      setForceRender(prev => (prev += 1));
      setInternalRepo(repo);
    }, [repo]);

    const numStars = repo?.stargazers_count || 0;

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
            {internalRepo.like ? '❤️' : '🤍'}
          </Text>
          <Text style={{fontSize: 22, color: 'black'}}>{forceRender}</Text>
          <Text style={{fontSize: 22, color: 'black'}}>
            {truncateString(internalRepo?.full_name, 20)}
          </Text>
          <Text
            style={{
              color: 'black',
              marginTop: spacing.sm,
            }}>
            {truncateString(internalRepo?.description, 30)}
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
                backgroundColor: getColorFromLanguage(internalRepo?.language),
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
                {internalRepo?.language}
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
            height: 80,
            width: 80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: spacing.md,
            borderRadius: spacing.md,
          }}
          onPress={() => {
            pressThumbBoth(internalRepo);
          }}>
          <Image
            source={require('../../../assets/images/like-button.png')}
            style={{
              width: 40,
              height: 40,
              tintColor: internalRepo.like
                ? colors.palette.blue600
                : likes.length < 10
                ? colors.palette.gray300
                : colors.transparent,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
// ListItem.tsx
import axios from 'axios';
import {useAtom} from 'jotai';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Linking,
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
import {RepoGithubSmall, RepoServer} from '../../types';

interface ListItemProps {
  repo: RepoGithubSmall;
}

export const ListItem: React.FC<ListItemProps> = ({repo}) => {
  const scaleValue = new Animated.Value(1);
  const [repoIsLiked, setRepoIsLiked] = useState<boolean>(false);
  const isLoadingRef = useRef(false);

  const [results, setResults] = useAtom(resultsAtom);
  const [likes, setLikes] = useAtom(likesAtom);
  const [numStarsTotal, setNumStarsTotal] = useState<number | null>(null);
  const [incrementAmount, setIncrementAmount] = useState<number>(999);
  const [numStars, setNumStars] = useState<number>(0);
  const [languageBuilderIndex, setLanguageBuilderIndex] = useState<number>(0);
  const [languageBuilder, setLanguageBuilder] = useState<string>('');

  useEffect(() => {
    setNumStarsTotal(repo?.stargazers_count || 0);
  }, [repo]);

  useEffect(() => {
    if (numStarsTotal !== null) {
      setIncrementAmount(Math.ceil(numStarsTotal / 10));
    }
  }, [numStarsTotal]);

  const springNumber: any = Animated.spring(scaleValue, {
    toValue: 1,
    friction: 2,
    velocity: 3,
    tension: 200,
    useNativeDriver: true,
  });

  useEffect(() => {
    // Define the interval function here
    const incrementStars = () => {
      if (numStars < (numStarsTotal || 0)) {
        setNumStars(prev => prev + incrementAmount);
      } else {
        clearInterval(interval);
        setNumStars(numStarsTotal || 0);
      }
    };

    // Set the interval
    const interval = setInterval(incrementStars, 100); // adjust the interval time (50ms) as needed

    // Clear the interval when component unmounts or numStars reaches numStarsTotal
    return () => clearInterval(interval);
  }, [numStars, incrementAmount, numStarsTotal]);

  useEffect(() => {
    const incrementLanguageBuilder = () => {
      if (languageBuilderIndex < repo?.language.length || 0) {
        setLanguageBuilderIndex(prev => prev + 1);
      } else {
        clearInterval(interval);
      }
    };

    const interval = setInterval(incrementLanguageBuilder, 100);
  }, [repo.language, languageBuilderIndex]);

  useEffect(() => {
    setLanguageBuilder(repo?.language.slice(0, languageBuilderIndex));
  }, [languageBuilderIndex, repo]);

  const openGitHubURL = () => {
    if (repo?.html_url) {
      Linking.openURL(repo.html_url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  const deleteLike = useCallback(async () => {
    isLoadingRef.current = true;
    let res = null;

    try {
      res = await axios.delete(`http://${myIp}:8080/repo/${repo.id}`);

      console.log('res', res?.data);

      setLikes([...likes.filter(like => '' + like.id !== '' + repo.id)]);
    } catch (err) {
      console.error('Error deleting repo from server:', err);
      Alert.alert('Error', 'Failed to delete repository from server.');
    } finally {
      isLoadingRef.current = false;
    }
  }, [likes, setLikes, repo]);

  const addLike = useCallback(async () => {
    isLoadingRef.current = true;
    let res = null;

    const newObjectToServer: RepoServer = {
      id: repo?.id.toString() || '',
      fullName: repo?.full_name || '',
      description: repo?.description || 'no description',
      language: repo?.language || '',
      stargazersCount: repo?.stargazers_count || 0,
      createdAt: repo?.created_at || '',
      html_url: repo?.html_url || '',
    };

    try {
      res = await axios.post(`http://${myIp}:8080/repo/`, newObjectToServer);

      console.log('res', res?.data);

      const newObjectToLikes: RepoGithubSmall = {
        id: repo?.id.toString() || '',
        full_name: repo?.full_name || '',
        description: repo?.description || 'no description',
        language: repo?.language || '',
        stargazers_count: repo?.stargazers_count || 0,
        created_at: repo?.created_at || '',
        html_url: repo?.html_url || '',
      };

      setLikes([...likes, newObjectToLikes]);
    } catch (err) {
      console.error('Error saving repo to server:', err);
      Alert.alert('Error', 'Failed to save repository to server.');
    } finally {
      isLoadingRef.current = false;
    }
  }, [likes, setLikes, repo]);

  const onThumbPress = useCallback(async () => {
    if (isLoadingRef.current) {
      Alert.alert(
        'Slow Down!',
        'Please wait for the previous action to complete.',
      );
      return;
    }

    console.log(
      'repo',
      repo.full_name,
      'repoLiked',
      repoIsLiked ? '___YES___' : '___NO___',
    );

    if (repoIsLiked) {
      // This is the new part, prompting the user
      Alert.alert(
        'Confirmation',
        'Are you sure you want to remove this like?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Yes',
            onPress: async () => {
              await deleteLike();
            },
          },
        ],
      );
    } else {
      if (likes.length < maxLikes) {
        springNumber.start();
        await addLike();
      } else if (likes.length >= maxLikes) {
        Alert.alert(
          'Error',
          'You can only like ' + maxLikes + ' repositories.',
        );
      }
    }
  }, [
    springNumber,
    repo.full_name,
    repoIsLiked,
    deleteLike,
    likes.length,
    addLike,
  ]);

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

  useEffect(() => {
    if (isLoadingRef.current === false) {
      return;
    }
  }, [isLoadingRef]);

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
      <TouchableOpacity
        onPress={openGitHubURL}
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
              {languageBuilder}
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
      </TouchableOpacity>

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
        <Animated.Image
          source={require('../../../assets/images/like-button.png')}
          style={{
            transform: [{scale: scaleValue}],
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

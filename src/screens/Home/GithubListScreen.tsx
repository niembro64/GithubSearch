/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import {useAtom} from 'jotai';
import {debounce, set} from 'lodash';
import {observer} from 'mobx-react';
import RNModal from 'react-native-modal/dist/modal';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import {maxLikes, maxResults, myIp} from '../../YOUR_IP_HERE';
import {colors} from '../../colors';
import {ConfettiCannon} from '../../components/ConfettiCannon';
import {
  keyboardVerticalOffsetIOS,
  sortResults,
  vibrationDouble,
} from '../../helpers';
import {
  hasSeenMaxMessageAtom,
  likesAtom,
  resultsAtom,
  sortStarsAtom,
  textInputAtom,
  textQueryAtom,
} from '../../state';
import {spacing} from '../../styles';
import {
  NumLikesState,
  RepoGithubFull,
  RepoGithubSmall,
  RepoServer,
} from '../../types';
import {ListItem} from './ListItem';

type GithubListScreenProps = {
  navigation: any;
};

const GithubListScreen = observer(({navigation}: GithubListScreenProps) => {
  //////////////////////////////////////////////////
  // STORES
  //////////////////////////////////////////////////
  const [sortStars, setSortStars] = useAtom(sortStarsAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [likes, setLikes] = useAtom(likesAtom);
  const [textInput, setTextInput] = useAtom(textInputAtom);
  const [textQuery, setTextQuery] = useAtom(textQueryAtom);
  const [hasSeenMaxMessage, setHasSeenMaxMessages] = useAtom(
    hasSeenMaxMessageAtom,
  );

  //////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////
  const [numLikesState, setNumLikesState] = useState<NumLikesState>('zero');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [borderActive, setBorderActive] = useState<boolean>(false);

  //////////////////////////////////////////////////
  // ANIMATION
  //////////////////////////////////////////////////
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleValue = new Animated.Value(1);
  const colorGray = new Animated.Value(0);

  const fadeInOut = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const debouncedSetQuery = useCallback(
    debounce((newQuery: string | ((prev: string) => string)) => {
      setTextQuery(newQuery);
    }, 700),
    [],
  );

  const springNumber: any = Animated.spring(scaleValue, {
    toValue: 1,
    friction: 2,
    velocity: 3,
    tension: 200,
    useNativeDriver: true,
  });

  const loopGray: any = Animated.loop(
    Animated.sequence([
      Animated.timing(colorGray, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(colorGray, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]),
  );

  const interpolatedGray = colorGray.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  //////////////////////////////////////////////////
  // FUNCTIONS
  //////////////////////////////////////////////////
  const githubGetSearchResults = useCallback(async () => {
    if (textQuery === '') {
      setResults([]);
    } else {
      setIsLoading(true);
      setResults([]);

      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=${textQuery}`,
        );

        if (!response?.data?.items) {
          setResults([]);
          Alert.alert('Error', 'Failed to fetch GitHub repositories.');
          return;
        }
        const resItems: RepoGithubFull[] = response.data.items.slice(
          0,
          maxResults,
        );

        const smallerResItems: RepoGithubSmall[] = resItems.map(
          (item: RepoGithubFull) => {
            const obj: RepoGithubSmall = {
              id: item.id,
              full_name: item?.full_name || '',
              description: item?.description || '',
              language: item?.language || '',
              stargazers_count: item?.stargazers_count || 0,
              created_at: item?.created_at || '',
              html_url: item?.html_url || '',
            };

            return obj;
          },
        );

        const sorted: RepoGithubSmall[] = sortResults(
          smallerResItems,
          sortStars,
        );

        setResults(sorted);
        vibrationDouble();
      } catch (err) {
        setResults([]);
        Alert.alert('Error', 'Failed to fetch GitHub repositories.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [textQuery, setTextQuery, setResults]);

  const serverGetLikes = () => {
    axios
      .get(`http://${myIp}:8080/repo/`)
      .then(response => {
        if (!response?.data?.repos) {
          setLikes([]);
          Alert.alert('Error', 'Failed to fetch saved repositories.');
          return;
        }

        console.log('response', JSON.stringify(response.data, null, 2));

        const smallerResItems: RepoGithubSmall[] = response.data.repos.map(
          (item: RepoServer) => {
            const obj: RepoGithubSmall = {
              id: item.id.toString() || '',
              full_name: item.fullName || '',
              description: item?.description || 'no description',
              language: item.language || '',
              stargazers_count: item.stargazersCount || 0,
              html_url: item.html_url || '',
              created_at: item.createdAt || '',
            };

            return obj;
          },
        );

        setLikes(smallerResItems);
      })
      .catch(err => {
        console.error('Error fetching saved repos from server:', err);
      });
  };

  /////////////////////////////////////////////////
  // EFFECTS
  /////////////////////////////////////////////////
  useEffect(() => {
    if (isLoading) {
      fadeInOut();
    } else {
      // Reset the opacity to 0 when isLoading becomes false
      fadeAnim.setValue(1);
    }
  }, [isLoading]);

  useEffect(() => {
    debouncedSetQuery(textInput);
  }, [textInput, debouncedSetQuery]);

  useEffect(() => {
    sortResults(results, sortStars);
  }, [sortStars]);

  useEffect(() => {
    githubGetSearchResults();
  }, [textQuery]);

  useEffect(() => {
    if (likes.length) {
      return;
    }
    serverGetLikes();
  }, []);

  useEffect(() => {
    switch (likes.length) {
      case 0:
        setNumLikesState('zero');
        break;
      case 1:
        setNumLikesState('one');
        break;
      case maxLikes:
        setNumLikesState('max');
        break;
      default:
        setNumLikesState('many');
        break;
    }
  }, [likes]);

  useEffect(() => {
    let t: string | number | NodeJS.Timeout | null | undefined = null;

    if (borderActive) {
      loopGray.start();
    } else {
      t = setTimeout(() => {
        loopGray.stop();
      }, 300);
    }

    return () => {
      if (t) {
        clearTimeout(t);
      }
    };
  }, [borderActive]);

  useEffect(() => {
    if (textQuery !== textInput) {
      if (borderActive) {
        return;
      }
      console.log('setting border active true');
      setBorderActive(true);
    } else {
      if (!borderActive) {
        return;
      }
      console.log('setting border active false');
      setBorderActive(false);
    }
  }, [textInput, textQuery, isLoading]);

  useEffect(() => {
    switch (numLikesState) {
      case 'zero':
        springNumber.stop();
        break;
      case 'one':
        springNumber.start();
        break;
      case 'max':
        if (!hasSeenMaxMessageAtom) {
          setHasSeenMaxMessages(true);

          // Celebration alert

          Alert.alert(
            'Congratulations!',
            `You have liked ${maxLikes} repositories!`,
          );
        }
        springNumber.start();
        break;
      default:
        springNumber.start();
        break;
    }
  }, [numLikesState]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        // NEED TO ACCOUNT FOR HEADER BEING USED
        keyboardVerticalOffset={keyboardVerticalOffsetIOS}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          {error && <Text>Error: {error}</Text>}
          {!error && (
            <FlatList
              data={results}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={githubGetSearchResults}
                />
              }
              contentContainerStyle={{
                marginTop: spacing.xxl,
                width: '100%',
              }}
              keyExtractor={item => '' + item.id}
              renderItem={({item: repo}) => <ListItem repo={repo} />}
            />
          )}

          {/* ////////////////////////////////// */}
          {/* SEARCH BAR */}
          {/* ////////////////////////////////// */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.palette.gray400,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: spacing.md,
              }}>
              <Animated.View
                style={{
                  transform: [{scale: scaleValue}],
                  flex: 1,
                  marginHorizontal: spacing.md,
                  backgroundColor:
                    numLikesState === 'zero'
                      ? colors.palette.gray100
                      : numLikesState === 'one'
                      ? colors.palette.blue200
                      : numLikesState === 'many'
                      ? colors.palette.blue200
                      : colors.palette.green200,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: spacing.sm,
                  padding: spacing.sm,
                  paddingHorizontal: spacing.md,
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      numLikesState === 'zero'
                        ? colors.palette.gray300
                        : numLikesState === 'one'
                        ? colors.palette.blue600
                        : numLikesState === 'many'
                        ? colors.palette.blue600
                        : colors.palette.green600,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
                  }}>
                  {likes.length === maxLikes ? '' : likes.length}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color:
                      numLikesState === 'zero'
                        ? colors.palette.gray300
                        : numLikesState === 'one'
                        ? colors.palette.blue600
                        : numLikesState === 'many'
                        ? colors.palette.blue600
                        : colors.palette.green600,
                  }}>
                  {numLikesState === 'zero'
                    ? ' Likes'
                    : numLikesState === 'one'
                    ? ' Like'
                    : numLikesState === 'many'
                    ? ' Likes'
                    : 'Max Likes'}
                </Text>
              </Animated.View>
              <Animated.Text
                style={{
                  flex: 2,
                  textAlign: 'center',
                  fontSize: 22,
                  fontWeight: 'bold',
                  opacity: fadeAnim,
                }}>
                Search Github
              </Animated.Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.xl,
              }}>
              <View
                style={[
                  {
                    flex: 1,
                    height: 50,
                    borderWidth: 2,
                    borderRadius: spacing.sm,
                    marginRight: spacing.md,
                    marginLeft: spacing.md,
                    paddingLeft: spacing.md,
                    paddingRight: spacing.md,
                  },

                  {
                    borderColor: borderActive
                      ? colors.palette.blue600
                      : colors.palette.gray400,
                  },
                ]}>
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 18,
                    borderRadius: spacing.sm,
                    paddingVertical: 0,
                  }}
                  placeholder="Enter a Github repo name..."
                  placeholderTextColor={colors.palette.gray400}
                  onChangeText={text => setTextInput(text)}
                  value={textInput}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* ////////////////////////////////////////////////// */}
      {/* MODAL */}
      {/* ////////////////////////////////////////////////// */}
      <RNModal
        style={{zIndex: 0}}
        isVisible={numLikesState === 'max' && !hasSeenMaxMessage}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => {
          setHasSeenMaxMessages(true);
        }}
        onSwipeComplete={() => {
          setHasSeenMaxMessages(true);
        }}
        swipeDirection={['down', 'left', 'right', 'up']}
        onBackButtonPress={() => {
          setHasSeenMaxMessages(true);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: '30%',
              backgroundColor: 'white',
              borderRadius: spacing.md,
              padding: spacing.md,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: colors.palette.green600,
                textAlign: 'center',
                marginBottom: spacing.md,
              }}>
              Congratulations!
            </Text>
            <Text
              style={{
                textAlign: 'center',
              }}>
              You have liked {maxLikes} repositories!
            </Text>
          </View>
        </View>

        {/* ////////////////////////////////////////////////// */}
        {/* CONFETTI */}
        {/* ////////////////////////////////////////////////// */}
        {numLikesState === 'max' && !hasSeenMaxMessage && <ConfettiCannon />}
      </RNModal>
    </>
  );
});

export default GithubListScreen;

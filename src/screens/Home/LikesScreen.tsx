/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../colors';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
// import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {likesGithubAtom, searchResultsAtom} from '../../state';
import {keyboardVerticalOffsetIOS} from '../../helpers';

type LikesScreenProps = {
  navigation: any;
};

const LikesScreen = observer(({navigation}: LikesScreenProps) => {
  const [likes, setLikes] = useAtom(likesGithubAtom);

  useEffect(() => {
    console.log('likes', likes);
  }, [likes]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      // NEED TO ACCOUNT FOR HEADER BEING USED
      keyboardVerticalOffset={keyboardVerticalOffsetIOS}
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
        renderItem={({item: repo}) => <ListItem repo={repo} />}
      />
    </KeyboardAvoidingView>
  );
});
export default LikesScreen;

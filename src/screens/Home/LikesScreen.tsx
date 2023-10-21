/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {spacing} from '../../styles';
import {ListItem} from './ListItem';
// import {useNavigation} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {keyboardVerticalOffsetIOS, sortResults} from '../../helpers';
import {likesAtom, sortStarsAtom} from '../../state';

type LikesScreenProps = {
  navigation: any;
};

const LikesScreen = observer(({navigation}: LikesScreenProps) => {
  const [likes, setLikes] = useAtom(likesAtom);
  const [sortStars, setSortStars] = useAtom(sortStarsAtom);

  useEffect(() => {
    sortResults(likes, sortStars);
  }, [sortStars]);

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
        keyExtractor={item => '' + item.id}
        renderItem={({item: repo}) => <ListItem repo={repo} />}
      />
    </KeyboardAvoidingView>
  );
});
export default LikesScreen;

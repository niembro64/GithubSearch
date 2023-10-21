/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {observer} from 'mobx-react';
import React from 'react';
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

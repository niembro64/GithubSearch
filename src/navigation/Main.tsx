/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import GithubListScreen from '../screens/Home/GithubListScreen';
import LikesScreen from '../screens/Home/LikesScreen';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Likes">
        <Stack.Screen
          name="Github"
          component={GithubListScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Likes')}
                title="Likes"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="Likes"
          component={LikesScreen}
          options={({navigation}) => ({
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Github')}
                title="Github"
                color="#000"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

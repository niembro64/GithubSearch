/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import GithubListScreen from '../screens/Home/GithubListScreen';
import LikesScreen from '../screens/Home/LikesScreen';
import {colors} from '../colors';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Github">
        <Stack.Screen
          name="Github"
          component={GithubListScreen}
          options={({navigation}) => ({
            /////////////////////////////////
            // NAV IS ACTING WONKY
            // SO KEEPING THIS HERE
            /////////////////////////////////
            headerLeft: () => (
              <Button onPress={() => {}} title="" color={colors.transparent} />
            ),
            headerRight: () => (
              <Button
                onPress={() => navigation.push('Likes')}
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
            headerLeft: () => (
              <Button
                onPress={() => navigation.push('Github')}
                title="Github"
                color="#000"
              />
            ),
            /////////////////////////////////
            // NAV IS ACTING WONKY
            // SO KEEPING THIS HERE
            /////////////////////////////////
            headerRight: () => (
              <Button onPress={() => {}} title="" color={colors.transparent} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

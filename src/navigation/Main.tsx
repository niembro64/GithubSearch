/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'mobx-react';
import React from 'react';
import {Button} from 'react-native';
// import {RootStoreModel} from '../RootStore';
import {LikesStoreModel} from '../LikesStore';
import {colors} from '../colors';
import GithubListScreen from '../screens/Home/GithubListScreen';
import LikesScreen from '../screens/Home/LikesScreen';

// const rootStore = RootStoreModel.create();
const likesStore = LikesStoreModel.create();

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  return (
    <Provider likesStore={likesStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Github">
          <Stack.Screen
            name="Github"
            component={GithubListScreen as any}
            options={({navigation}) => ({
              /////////////////////////////////
              // NAV IS ACTING WONKY
              // SO KEEPING THIS HERE
              /////////////////////////////////
              headerLeft: () => (
                <Button
                  onPress={() => {}}
                  title=""
                  color={colors.transparent}
                />
              ),
              /////////////////////////////////
              // NAV IS ACTING WONKY
              // NORMALLLY CAN DO navigation.goBack() and navigation.navigate("Likes")
              // BUT IT IS NOT WORKING
              /////////////////////////////////
              headerRight: () => (
                <Button
                  onPress={() => navigation.push('Likes')}
                  title="Likes ›"
                  color={colors.palette.blue500}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Likes"
            component={LikesScreen as any}
            options={({navigation}) => ({
              headerLeft: () => (
                /////////////////////////////////
                // NAV IS ACTING WONKY
                // NORMALLLY CAN DO navigation.goBack() and navigation.navigate("Github")
                // BUT IT IS NOT WORKING
                /////////////////////////////////
                <Button
                  onPress={() => navigation.push('Github')}
                  title="‹ Github"
                  color={colors.palette.blue500}
                />
              ),
              /////////////////////////////////
              // NAV IS ACTING WONKY
              // SO KEEPING THIS HERE
              /////////////////////////////////
              headerRight: () => (
                <Button
                  onPress={() => {}}
                  title=""
                  color={colors.transparent}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button} from 'react-native';
import {colors} from '../colors';
import GithubListScreen from '../screens/Home/GithubListScreen';
import LikesScreen from '../screens/Home/LikesScreen';
import {sortStarsAtom} from '../state';
import {useAtom} from 'jotai';

const Stack = createNativeStackNavigator();

export const MainNavigator: React.FC = () => {
  const [sortStars, setSortStars] = useAtom(sortStarsAtom);

  const arrow = sortStars === 'none' ? '↕️' : sortStars === 'asc' ? '⬆️' : '⬇️';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Github">
        <Stack.Screen
          name="Github"
          component={GithubListScreen as any}
          options={({navigation}) => ({
            headerLeft: () => (
              <Button
                onPress={() => {
                  switch (sortStars) {
                    case 'none':
                      setSortStars('asc');
                      break;
                    case 'asc':
                      setSortStars('desc');
                      break;
                    case 'desc':
                      setSortStars('none');
                      break;
                    default:
                      throw new Error('sortStars is not a valid value');
                  }
                }}
                title={arrow + ' Sort by ⭐️'}
                color={colors.palette.blue500}
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
                onPress={() => {
                  switch (sortStars) {
                    case 'none':
                      setSortStars('asc');
                      break;
                    case 'asc':
                      setSortStars('desc');
                      break;
                    case 'desc':
                      setSortStars('none');
                      break;
                    default:
                      throw new Error('sortStars is not a valid value');
                  }
                }}
                title={arrow + ' Sort by ⭐️'}
                color={colors.palette.blue500}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

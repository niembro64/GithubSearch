/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'jotai';
import {MainNavigator} from './src/navigation/Main';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): JSX.Element {
  /////////////////////////////////////////////////////////
  // DISABLE YELLOW BOX FOR AESTHETICS
  // I would normally never do this in a production app
  /////////////////////////////////////////////////////////
  // @ts-ignore
  console.disableYellowBox = true;

  return (
    <Provider>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

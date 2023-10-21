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
import {RootStoreContext} from './src/RootStoreContext';
import {rootStore} from './src/RootStore';

function App(): JSX.Element {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <Provider>
        <SafeAreaProvider>
          <MainNavigator />
        </SafeAreaProvider>
      </Provider>
    </RootStoreContext.Provider>
  );
}

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {RootStoreModel} from './src/RootStore';
// import {Provider} from 'jotai';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainNavigator} from './src/navigation/Main';
import {Provider} from 'mobx-react';

const rootStore = RootStoreModel.create();

function App(): JSX.Element {
  return (
    <Provider rootStore={rootStore}>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

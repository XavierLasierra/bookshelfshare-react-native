import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './src/navigators/MainNavigator/MainNavigator';

import configureStore from './src/redux/store';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </Provider>
  );
}

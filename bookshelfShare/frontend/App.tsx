import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';

import MainNavigator from './src/navigators/MainNavigator/MainNavigator';

import configureStore from './src/redux/store';

export default function App() {
  return (
    <Provider store={configureStore()}>
      <MenuProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}

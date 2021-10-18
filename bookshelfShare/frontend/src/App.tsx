import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {MenuProvider} from 'react-native-popup-menu';
import SplashScreen from 'react-native-splash-screen';

import MainNavigator from './navigators/MainNavigator/MainNavigator';
import Notification from './components/Notification/Notification';

import configureStore from './redux/store';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={configureStore()}>
      <MenuProvider>
        <NavigationContainer>
          <MainNavigator />
          <Notification />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}

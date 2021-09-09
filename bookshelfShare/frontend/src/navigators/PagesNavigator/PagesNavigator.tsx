import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useSelector } from 'react-redux';
import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import Main from '../../components/Main/Main';
import Following from '../../components/Following/Following';
import Shelf from '../../components/Shelf/Shelf';
import ProfileNavigator from '../ProfileNavigator/ProfileNavigator';
import BarCodeScanner from '../../components/BarCodeScanner/BarCodeScanner';
import BookSearchNavigator from '../BookSearchNavigator/BookSearchNavigator';
import { storeToken } from '../../services/asyncStorage';

export default function PagesNavigator() {
  const Tab = createBottomTabNavigator();
  const { refreshToken } = useSelector((store:any) => store.tokens);
  const { userData } = useSelector((store:any) => store.loggedUser);

  useEffect(() => {
    if (userData) {
      // eslint-disable-next-line no-underscore-dangle
      storeToken(refreshToken, userData._id);
    }
  }, [userData]);

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        unmountOnBlur: true
      }}
      tabBar={({ state, navigation }) => (
        <CustomTabBar
          state={state}
          navigation={navigation}
        />
      )}
    >
      <Tab.Screen
        name="Main"
        component={Main}
      />
      <Tab.Screen
        name="Following"
        component={Following}
      />
      <Tab.Screen
        name="Shelf"
        component={Shelf}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
      <Tab.Screen
        name="BarCodeScanner"
        component={BarCodeScanner}
      />
      <Tab.Screen
        name="BookSearchNavigator"
        component={BookSearchNavigator}
      />
    </Tab.Navigator>
  );
}

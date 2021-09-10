import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import Main from '../../components/Main/Main';
import ProfileNavigator from '../ProfileNavigator/ProfileNavigator';
import FollowingNavigator from '../FollowingNavigator/FollowingNavigator';
import BarCodeScanner from '../../components/BarCodeScanner/BarCodeScanner';
import ShelfNavigator from '../ShelfNavigator/ShelfNavigator';
import BookSearchNavigator from '../BookSearchNavigator/BookSearchNavigator';

import { storeToken } from '../../services/asyncStorage';

export default function PagesNavigator() {
  const Tab = createBottomTabNavigator();
  const { refreshToken } = useSelector((store:any) => store.tokens);
  const { userData } = useSelector((store:any) => store.loggedUser);

  useEffect(() => {
    if (userData && refreshToken) {
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
        name="FollowingNavigator"
        component={FollowingNavigator}
      />
      <Tab.Screen
        name="ShelfNavigator"
        component={ShelfNavigator}
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

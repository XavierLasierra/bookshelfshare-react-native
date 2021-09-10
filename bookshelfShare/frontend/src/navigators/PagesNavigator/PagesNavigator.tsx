import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import Main from '../../components/Main/Main';
import ProfileNavigator from '../ProfileNavigator/ProfileNavigator';
import FollowingNavigator from '../FollowingNavigator/FollowingNavigator';
import BarCodeScanner from '../../components/BarCodeScanner/BarCodeScanner';
import ShelfNavigator from '../ShelfNavigator/ShelfNavigator';
import BookSearchNavigator from '../BookSearchNavigator/BookSearchNavigator';

export default function PagesNavigator() {
  const Tab = createBottomTabNavigator();

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

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../../components/CustomTabBar/CustomTabBar';
import Main from '../../components/Main/Main';
import Following from '../../components/Following/Following';
import Shelf from '../../components/Shelf/Shelf';
import Profile from '../../components/Profile/Profile';
import BarCodeScanner from '../../components/BarCodeScanner/BarCodeScanner';

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="InitialLoading"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
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
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        name="BarCodeScanner"
        component={BarCodeScanner}
      />
    </Tab.Navigator>
  );
}

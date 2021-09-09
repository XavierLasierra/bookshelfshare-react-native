import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Following from '../../components/Following/Following';
import UsersList from '../../components/UsersList/UsersList';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';

export default function FollowingNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Following"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}
    >
      <Stack.Screen
        name="Following"
        component={Following}
      />
      <Stack.Screen
        name="UsersList"
        component={UsersList}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
      />
    </Stack.Navigator>
  );
}

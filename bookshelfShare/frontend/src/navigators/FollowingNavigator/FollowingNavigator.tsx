import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Following from '../../components/Following/Following';
import UsersList from '../../components/UsersList/UsersList';
import ProfileDetail from '../../components/ProfileDetail/ProfileDetail';
import BookResults from '../../components/BookResults/BookResults';
import BookDetail from '../../components/BookDetail/BookDetail';

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
      <Stack.Screen
        name="BookResults"
        component={BookResults}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
      />
    </Stack.Navigator>
  );
}

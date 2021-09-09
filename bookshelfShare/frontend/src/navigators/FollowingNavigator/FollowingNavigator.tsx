import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Following from '../../components/Following/Following';

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
    </Stack.Navigator>
  );
}

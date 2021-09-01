import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { CardStyleInterpolators } from '@react-navigation/stack';

import InitialLoading from '../../components/InitialLoading/InitialLoading';
import AuthenticationNavigator from '../AuthenticationNavigator/AuthenticationNavigator';
import PagesNavigator from '../PagesNavigator/PagesNavigator';

export default function MainNavigator() {
  const Stack = createSharedElementStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="InitialLoading"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
      }}
    >
      <Stack.Screen
        name="InitialLoading"
        component={InitialLoading}
      />
      <Stack.Screen
        name="AuthenticationNavigator"
        component={AuthenticationNavigator}
        sharedElements={() => ['mainIcon']}
      />
      <Stack.Screen
        name="PagesNavigator"
        component={PagesNavigator}
      />
    </Stack.Navigator>
  );
}

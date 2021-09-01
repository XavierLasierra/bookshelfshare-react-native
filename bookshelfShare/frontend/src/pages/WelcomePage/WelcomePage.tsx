import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';

import InitialLoading from '../../components/InitialLoading/InitialLoading';
import Authenticate from '../../components/Authenticate/Authenticate';

export default function WelcomePage() {
  const Stack = createSharedElementStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
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
          name="Authenticate"
          component={Authenticate}
          sharedElements={() => ['mainIcon']}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

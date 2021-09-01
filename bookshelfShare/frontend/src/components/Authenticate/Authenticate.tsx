import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Login from '../Login/Login';
import Register from '../Register/Register';

export default function Authenticate() {
  const NestedStack = createStackNavigator();
  return (
    <NestedStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}
    >
      <NestedStack.Screen
        name="Login"
        component={Login}
      />
      <NestedStack.Screen
        name="Register"
        component={Register}
      />
    </NestedStack.Navigator>
  );
}

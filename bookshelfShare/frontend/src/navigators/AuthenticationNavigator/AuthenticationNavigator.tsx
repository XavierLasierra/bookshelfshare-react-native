import React, { useEffect } from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

export default function Authenticate({ navigation }:any) {
  const NestedStack = createStackNavigator();
  const { isAuthenticated } = useSelector((store: any) => store.loggedUser);
  useEffect(() => {
    if (isAuthenticated) {
      navigation.push('PagesNavigator');
    }
  });
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

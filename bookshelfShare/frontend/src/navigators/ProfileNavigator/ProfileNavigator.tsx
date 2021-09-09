import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Profile from '../../components/Profile/Profile';
import BookResults from '../../components/BookResults/BookResults';
import BookDetail from '../../components/BookDetail/BookDetail';

export default function BookSearchNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
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

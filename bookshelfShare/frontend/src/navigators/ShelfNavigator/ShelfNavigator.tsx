import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import UserShelfList from '../../components/UserShelfList/UserShelfList';
import NewShelf from '../../components/NewShelf/NewShelf';
import ShelfDetail from '../../components/ShelfDetail/ShelfDetail';
import BookDetail from '../../components/BookDetail/BookDetail';

export default function ShelfNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="UserShelfList"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}
    >
      <Stack.Screen
        name="UserShelfList"
        component={UserShelfList}
      />
      <Stack.Screen
        name="NewShelf"
        component={NewShelf}
      />
      <Stack.Screen
        name="ShelfDetail"
        component={ShelfDetail}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
      />
    </Stack.Navigator>
  );
}

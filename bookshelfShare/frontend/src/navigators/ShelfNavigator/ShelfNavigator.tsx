import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import UserShelfList from '../../components/UserShelfList/UserShelfList';
import BookResults from '../../components/BookResults/BookResults';
import BookDetail from '../../components/BookDetail/BookDetail';
import UsersList from '../../components/UsersList/UsersList';
import OtherUserProfile from '../../components/OtherUserProfile/OtherUserProfile';

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
        name="BookResults"
        component={BookResults}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
      />
      <Stack.Screen
        name="UsersList"
        component={UsersList}
      />
      <Stack.Screen
        name="OtherUserProfile"
        component={OtherUserProfile}
      />
    </Stack.Navigator>
  );
}

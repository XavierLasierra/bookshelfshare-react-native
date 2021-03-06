import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Following from '../../components/Following/Following';
import UsersList from '../../components/UsersList/UsersList';
import OtherUserProfile from '../../components/OtherUserProfile/OtherUserProfile';
import BookResults from '../../components/BookResults/BookResults';
import BookDetail from '../../components/BookDetail/BookDetail';
import AddToShelf from '../../components/AddToShelf/AddToShelf';

export default function FollowingNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Following"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}>
      <Stack.Screen name="Following" component={Following} />
      <Stack.Screen name="UsersList" component={UsersList} />
      <Stack.Screen name="OtherUserProfile" component={OtherUserProfile} />
      <Stack.Screen name="BookResults" component={BookResults} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
      <Stack.Screen name="AddToShelf" component={AddToShelf} />
    </Stack.Navigator>
  );
}

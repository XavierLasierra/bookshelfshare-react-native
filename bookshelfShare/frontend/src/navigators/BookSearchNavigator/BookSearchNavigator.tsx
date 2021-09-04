import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import BookSearch from '../../components/BookSearch/BookSearch';
import BookResults from '../../components/BookResults/BookResults';

interface Props {
    route: Route
}
interface Route {
  params: Params
}
interface Params {
  isbn?: string
}
export default function BookSearchNavigator({ route: { params } }: Props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="BookSearch"
      screenOptions={{
        headerShown: false,
        cardShadowEnabled: false,
        cardOverlayEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter
      }}
    >
      <Stack.Screen
        name="BookSearch"
      >
        {() => <BookSearch isbnFromCamera={params?.isbn || ''} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        component={BookResults}
      />
    </Stack.Navigator>
  );
}

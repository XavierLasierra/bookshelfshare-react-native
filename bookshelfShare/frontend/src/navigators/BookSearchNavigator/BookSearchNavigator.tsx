import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import BookSearch from '../../components/BookSearch/BookSearch';
import BookResults from '../../components/BookResults/BookResults';

interface Props {
    isbn?: string
}

export default function BookSearchNavigator({ isbn }: Props) {
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
        {() => <BookSearch isbn={isbn || ''} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        component={BookResults}
      />
    </Stack.Navigator>
  );
}

BookSearchNavigator.defaultProps = {
  isbn: ''
};

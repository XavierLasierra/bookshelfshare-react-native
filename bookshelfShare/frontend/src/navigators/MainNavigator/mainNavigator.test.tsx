import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import MainNavigator from './MainNavigator';
import { render } from '../../utils/test.utils';

jest.mock('../../redux/actions/loggedUser.creator', () => ({
  automaticLogin: () => ({ type: '' })
}));

jest.useFakeTimers();

describe('Given a MainNavigator component', () => {
  describe('When it is rendered', () => {
    describe('And the user is not authenticated', () => {
      test('Then should match the snapshot', () => {
        const initialState = { loggedUser: { isAuthenticated: false, needsLogin: false } };
        const screen = render(
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>,
          initialState
        );
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And the user is authenticated', () => {
      test('Then should match the snapshot', () => {
        const initialState = { loggedUser: { isAuthenticated: true } };
        const screen = render(
          <NavigationContainer>
            <MenuProvider>
              <MainNavigator />
            </MenuProvider>
          </NavigationContainer>,
          initialState
        );

        expect(screen).toMatchSnapshot();
      });
    });
  });
});

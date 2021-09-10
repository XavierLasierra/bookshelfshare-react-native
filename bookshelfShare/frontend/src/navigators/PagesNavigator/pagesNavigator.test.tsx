import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import PagesNavigator from './PagesNavigator';
import { render } from '../../utils/test.utils';
import { storeToken } from '../../services/asyncStorage';

jest.mock('../../services/asyncStorage', () => ({
  storeToken: jest.fn()
}));

jest.useFakeTimers();

describe('Given a PagesNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(
        <NavigationContainer>
          <MenuProvider>
            <PagesNavigator />
          </MenuProvider>
        </NavigationContainer>
      );
      expect(screen).toMatchSnapshot();
    });
    describe('And there is not userData or refreshToken', () => {
      test('Then storeToken should not have been called', () => {
        render(
          <NavigationContainer>
            <MenuProvider>
              <PagesNavigator />
            </MenuProvider>
          </NavigationContainer>
        );
        expect(storeToken).not.toHaveBeenCalled();
      });
    });

    describe('And there is userData and refreshToken', () => {
      test('Then storeToken should have been called with the userId and the refreshToken', () => {
        const initialState = {
          loggedUser: { userData: { _id: 'userId' } },
          tokens: { refreshToken: 'refreshToken' }
        };
        render(
          <NavigationContainer>
            <MenuProvider>
              <PagesNavigator />
            </MenuProvider>
          </NavigationContainer>,
          initialState
        );
        expect(storeToken).toHaveBeenCalledWith('refreshToken', 'userId');
      });
    });
  });
});

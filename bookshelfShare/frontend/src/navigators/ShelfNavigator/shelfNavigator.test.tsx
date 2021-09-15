import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ShelfNavigator from './ShelfNavigator';
import { render } from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';

jest.useFakeTimers();

describe('Given a ShelfNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const initialState = {
        loggedUser: { userData: loggedUserMock.user }
      };
      const screen = render(
        <NavigationContainer>
          <ShelfNavigator />
        </NavigationContainer>,
        initialState
      );
      expect(screen).toMatchSnapshot();
    });
  });
});

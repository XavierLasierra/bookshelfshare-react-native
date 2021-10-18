import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProfileNavigator from './ProfileNavigator';
import {render} from '../../utils/test.utils';
import loggedUserMock from '../../mocks/loggedUser.mock';
import userBooksMock from '../../mocks/userBooks.mock';

jest.useFakeTimers();

describe('Given a ProfileNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const initialState = {
        loggedUser: {userData: loggedUserMock.user},
        userBooks: userBooksMock,
      };
      const screen = render(
        <NavigationContainer>
          <ProfileNavigator />
        </NavigationContainer>,
        initialState,
      );
      expect(screen).toMatchSnapshot();
    });
  });
});

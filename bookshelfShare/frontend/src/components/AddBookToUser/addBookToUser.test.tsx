import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import {render} from '../../utils/test.utils';

import AddBookToUser from './AddBookToUser';

import userBooksMock from '../../mocks/userBooks.mock';
import navigationMock from '../../mocks/navigation.mock';

describe('Given an AddBookToUser component', () => {
  describe('When it is rendered', () => {
    describe('And isbn is Not found', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <AddBookToUser
            bookIsbn="Not found"
            token="token"
            refreshToken="refreshToken"
            userId="userId"
            logo="logo"
            navigation={navigationMock}
          />,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And isbn is defined', () => {
      test('Then should match the snapshot', () => {
        const initialState = {userBooks: userBooksMock};
        const screen = render(
          <MenuProvider>
            <AddBookToUser
              bookIsbn="1234"
              token="token"
              refreshToken="refreshToken"
              userId="userId"
              logo="logo"
              navigation={navigationMock}
            />
          </MenuProvider>,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

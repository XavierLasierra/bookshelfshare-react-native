import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import ListMenu from './ListMenu';
import {render} from '../../utils/test.utils';
import userBooksMock from '../../mocks/userBooks.mock';

const initialState = {userBooks: userBooksMock};

describe('Given a ListMenu component', () => {
  describe('When it is rendered', () => {
    describe('And userBooks does not include bookIsbn', () => {
      test('Then screen should match the snapshot', () => {
        const screen = render(
          <MenuProvider>
            <ListMenu
              bookIsbn="0"
              userId="1"
              token="token"
              refreshToken="refreshToken"
            />
          </MenuProvider>,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });

    [
      {
        listName: 'read',
        bookIsbn: '1',
      },
      {
        listName: 'reading',
        bookIsbn: '2',
      },
      {
        listName: 'toRead',
        bookIsbn: '3',
      },
      {
        listName: 'wishlist',
        bookIsbn: '4',
      },
    ].forEach(({listName, bookIsbn}: any) => {
      describe(`And userBooks does include bookIsbn in ${listName}`, () => {
        test('Then screen should match the snapshot', () => {
          const screen = render(
            <MenuProvider>
              <ListMenu
                bookIsbn={bookIsbn}
                userId="1"
                token="token"
                refreshToken="refreshToken"
              />
            </MenuProvider>,
            initialState,
          );
          expect(screen).toMatchSnapshot();
        });
      });
    });
  });
});

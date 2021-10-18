import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import ShelfMenu from './ShelfMenu';
import {render} from '../../utils/test.utils';
import shelfMock from '../../mocks/shelf.mock';

const navigation = {
  push: jest.fn(),
};

describe('Given a ShelfMenu component', () => {
  describe('When it is rendered', () => {
    describe('And shelves does not include bookIsbn', () => {
      test('Then should match the snapshot', () => {
        const initialState = {userShelves: [shelfMock]};
        const screen = render(
          <MenuProvider>
            <ShelfMenu navigation={navigation} bookIsbn="0" />
          </MenuProvider>,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And shelves does not include bookIsbn', () => {
      test('Then should match the snapshot', () => {
        const initialState = {userShelves: [shelfMock]};
        const screen = render(
          <MenuProvider>
            <ShelfMenu navigation={navigation} bookIsbn="1" />
          </MenuProvider>,
          initialState,
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

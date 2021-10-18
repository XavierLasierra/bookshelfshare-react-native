import React from 'react';
import ShelfDetail from './ShelfDetail';
import {render, fireEvent} from '../../utils/test.utils';
import shelfMock from '../../mocks/shelf.mock';

const navigation = {};
const route = {
  params: {
    logo: '',
  },
};

describe('Given a ShelfDetail component', () => {
  describe('When it is rendered', () => {
    describe('And shelf is not loaded', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <ShelfDetail navigation={navigation} route={route} />,
        );

        expect(screen).toMatchSnapshot();
      });
    });
    describe('And shelf is loaded', () => {
      let screen: any;
      beforeEach(() => {
        const initialState = {currentShelf: {shelf: shelfMock, results: true}};
        screen = render(
          <ShelfDetail navigation={navigation} route={route} />,
          initialState,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And you click listPageButton', () => {
        beforeEach(() => {
          const listPageButton = screen.getByTestId('listPageButton');
          fireEvent.press(listPageButton);
        });
        test('Then should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you click again', () => {
          test('Then should match the snapshot', () => {
            const listPageButton = screen.getByTestId('listPageButton');
            fireEvent.press(listPageButton);

            expect(screen).toMatchSnapshot();
          });
        });

        describe('And you click shelfPageButton', () => {
          test('Then should match the snapshot', () => {
            const shelfPageButton = screen.getByTestId('shelfPageButton');
            fireEvent.press(shelfPageButton);
            expect(screen).toMatchSnapshot();
          });
        });
      });

      describe('And you click shelfPageButton', () => {
        test('Then should match the snapshot', () => {
          const shelfPageButton = screen.getByTestId('shelfPageButton');
          fireEvent.press(shelfPageButton);
          expect(screen).toMatchSnapshot();
        });
      });

      describe('And you type in filterInput', () => {
        test('Then should match the snapshot', () => {
          const filterInput = screen.getByTestId('filterInput');
          fireEvent.changeText(filterInput, 'a');
          expect(screen).toMatchSnapshot();
        });
      });

      describe('And you click on one shelfBox', () => {
        test('Then should match the snapshot', () => {
          const shelfBoxButton = screen.getByTestId('shelf-0-0');
          fireEvent.press(shelfBoxButton);
          expect(screen).toMatchSnapshot();
        });
      });
    });
  });
});

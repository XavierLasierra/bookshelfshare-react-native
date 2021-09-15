import React from 'react';
import ShelfListElement from './ShelfListElement';
import { render, fireEvent } from '../../utils/test.utils';
import shelfMock from '../../mocks/shelf.mock';
import { loadCurrentShelf } from '../../redux/actions/currentShelf.creator';

jest.mock('../../redux/actions/currentShelf.creator');

const navigation = {
  push: jest.fn()
};

describe('Given a ShelfListElement component', () => {
  describe('When it is rendered', () => {
    describe('And the shelf has 1 book', () => {
      let screen: any;
      beforeEach(() => {
        (loadCurrentShelf as jest.Mock).mockReturnValue({ type: '' });
        screen = render(<ShelfListElement
          shelf={{ ...shelfMock, books: ['book'] }}
          navigation={navigation}
        />);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And you click in shelfDetailPageButton', () => {
        beforeEach(() => {
          const shelfDetailPageButton = screen.getByTestId('shelfDetailPageButton');
          fireEvent.press(shelfDetailPageButton);
        });
        test('Then loadCurrentShelf should have been called', () => {
          expect(loadCurrentShelf).toHaveBeenCalled();
        });
        test('Then navigation.push should have been called', () => {
          expect(navigation.push).toHaveBeenCalled();
        });
      });
    });
    describe('And the shelf has 0 books', () => {
      test('Then should match the snapshot', () => {
        const screen = render(<ShelfListElement shelf={{ ...shelfMock, books: [] }} />);
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

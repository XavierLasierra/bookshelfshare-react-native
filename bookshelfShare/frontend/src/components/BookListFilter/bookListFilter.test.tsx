import React from 'react';
import BookListFilter from './BookListFilter';
import { render, fireEvent } from '../../utils/test.utils';

describe('Given a BookListFilter component', () => {
  describe('When it is rendered', () => {
    let setFilteredBooks: any;
    let screen: any;
    beforeEach(() => {
      setFilteredBooks = jest.fn();
      screen = render(<BookListFilter listName="to read" books={[]} setFilteredBooks={setFilteredBooks} />);
    });

    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And filterInput is changed', () => {
      test('Then setFilteredBooks should have been called', () => {
        const filterInput = screen.getByTestId('filterInput');
        fireEvent.changeText(filterInput, 'a');

        expect(setFilteredBooks).toHaveBeenCalled();
      });
    });
  });
});

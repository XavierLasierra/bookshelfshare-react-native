import React from 'react';
import BookElementSearch from './BookElementSearch';
import { render, fireEvent } from '../../utils/test.utils';
import bookDetailsMock from '../../mocks/bookDetails.mock';

const navigation = {
  push: jest.fn()
};

describe('Given a BookElementSearch component', () => {
  describe('When it is rendered', () => {
    describe('And the book has a thumbnail and less than 3 authors', () => {
      let screen: any;
      beforeEach(() => {
        screen = render(
          <BookElementSearch bookData={bookDetailsMock[0]} navigation={navigation} />
        );
      });

      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And bookDetail Button is clicked', () => {
        test('Then should call navigation.push with BookDetail and the book data', () => {
          const bookDetailButton = screen.getByTestId('bookDetailButton');
          fireEvent.press(bookDetailButton);
          expect(navigation.push).toHaveBeenCalledWith('BookDetail', { bookData: bookDetailsMock[0] });
        });
      });
    });
    describe('And the book has not a thumbnail and 3 authors or more', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <BookElementSearch bookData={bookDetailsMock[1]} navigation={navigation} />
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

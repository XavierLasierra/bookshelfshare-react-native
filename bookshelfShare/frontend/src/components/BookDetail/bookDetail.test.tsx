import React from 'react';
import BookDetail from './BookDetail';
import { render } from '../../utils/test.utils';
import bookDetailMock from '../../mocks/bookDetails.mock';
import { getRatings } from '../../redux/actions/books.creator';
import booksActions from '../../redux/actions/books.actions';
import ratingsMock from '../../mocks/ratings.mock';

jest.mock('../../redux/actions/books.creator', () => ({
  ...jest.requireActual('../../redux/actions/books.creator'),
  getRatings: jest.fn()
}));

const navigation = {
  push: jest.fn()
};

describe('Given an BookDetail component', () => {
  describe('When it is rendered', () => {
    describe('And ratings are not loaded', () => {
      test('Then should match the snapshot', () => {
        const route = {
          params: {
            bookData: bookDetailMock[0]
          }
        };
        (getRatings as jest.Mock).mockReturnValue({ type: '' });
        const screen = render(<BookDetail navigation={navigation} route={route} />);
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And ratings are loaded', () => {
      let screen: any;
      beforeEach(() => {
        const route = {
          params: {
            bookData: bookDetailMock[0]
          }
        };
        (getRatings as jest.Mock).mockReturnValue({
          type: booksActions.LOAD_RATINGS,
          data: ratingsMock
        });
        screen = render(<BookDetail navigation={navigation} route={route} />);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      test('Then the number of ratings should be 3', () => {
        expect(screen.getByTestId('numberOfRatings').props.children).toBe(3);
      });
    });

    describe('And the book rendered has not thumbnail and has 3 authors and categories', () => {
      test('Then should match the snapshot', () => {
        const route = {
          params: {
            bookData: bookDetailMock[1]
          }
        };
        (getRatings as jest.Mock).mockReturnValue({ type: '' });
        const screen = render(<BookDetail navigation={navigation} route={route} />);
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

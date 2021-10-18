import React from 'react';
import BookElementSearch from './BookElementSearch';
import {render, fireEvent} from '../../utils/test.utils';
import bookDetailsMock from '../../mocks/bookDetails.mock';
import navigationMock from '../../mocks/navigation.mock';

describe('Given a BookElementSearch component', () => {
  describe('When it is rendered', () => {
    describe('And the book has a thumbnail and less than 3 authors', () => {
      let screen: any;
      let navigation: any;
      beforeEach(() => {
        navigation = {
          ...navigationMock,
          push: jest.fn(),
        };

        screen = render(
          <BookElementSearch
            bookData={bookDetailsMock[0]}
            navigation={navigation}
            logo="logo"
          />,
        );
      });

      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And bookDetail Button is clicked', () => {
        test('Then should call navigation.push with BookDetail and the book data', () => {
          const bookDetailButton = screen.getByTestId('bookDetailButton');
          fireEvent.press(bookDetailButton);
          expect(navigation.push).toHaveBeenCalledWith('BookDetail', {
            bookData: bookDetailsMock[0],
            logo: 'logo',
          });
        });
      });
    });
    describe('And the book has not a thumbnail and 3 authors or more', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <BookElementSearch
            bookData={bookDetailsMock[1]}
            navigation={navigationMock}
            logo="logo"
          />,
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

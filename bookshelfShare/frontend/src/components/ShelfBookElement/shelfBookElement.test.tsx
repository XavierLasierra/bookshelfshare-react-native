import React from 'react';
import ShelfBookElement from './ShelfBookElement';
import { render, fireEvent } from '../../utils/test.utils';
import bookDetailsMock from '../../mocks/bookDetails.mock';
import navigationMock from '../../mocks/navigation.mock';

describe('Given a ShelfBookElement component', () => {
  describe('When it is rendered', () => {
    describe('And bookData has tumbnail and less than 3 authors', () => {
      let screen: any;
      let navigation: any;
      beforeEach(() => {
        navigation = {
          ...navigationMock,
          push: jest.fn()
        };
        screen = render(<ShelfBookElement
          navigation={navigation}
          bookData={bookDetailsMock[0]}
          location={[0, 0]}
          shelfName="My shelf"
          logo="logo"
        />);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And you click on bookDetailButton', () => {
        test('Then navigation.push should have been called', () => {
          const bookDetailButton = screen.getByTestId('bookDetailButton');
          fireEvent.press(bookDetailButton);

          expect(navigation.push).toHaveBeenCalled();
        });
      });
    });
    describe('And bookData has no tumbnail and 3 authors', () => {
      test('Then should match the snapshot', () => {
        const screen = render(<ShelfBookElement
          navigation={navigationMock}
          bookData={bookDetailsMock[1]}
          location={[0, 0]}
          shelfName="My shelf"
          logo="logo"
        />);
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

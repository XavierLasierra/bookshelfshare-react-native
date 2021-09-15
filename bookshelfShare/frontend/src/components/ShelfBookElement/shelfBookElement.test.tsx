import React from 'react';
import ShelfBookElement from './ShelfBookElement';
import { render, fireEvent } from '../../utils/test.utils';
import bookDetailsMock from '../../mocks/bookDetails.mock';

const navigation = {
  push: jest.fn()
};

describe('Given a ShelfBookElement component', () => {
  describe('When it is rendered', () => {
    describe('And bookData has tumbnail and less than 3 authors', () => {
      let screen: any;
      beforeEach(() => {
        screen = render(<ShelfBookElement
          navigation={navigation}
          bookData={bookDetailsMock[0]}
          location={[0, 0]}
          shelfName="My shelf"
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
          navigation={navigation}
          bookData={bookDetailsMock[1]}
          location={[0, 0]}
          shelfName="My shelf"
        />);
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

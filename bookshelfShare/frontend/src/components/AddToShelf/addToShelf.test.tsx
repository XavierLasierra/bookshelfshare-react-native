import React from 'react';
import AddToShelf from './AddToShelf';
import { render, fireEvent } from '../../utils/test.utils';
import shelfMock from '../../mocks/shelf.mock';
import { addToShelf } from '../../redux/actions/userShelves.creator';
import userShelvesActions from '../../redux/actions/userShelves.actions';

const navigation = {
  pop: jest.fn()
};

const route = {
  params: {
    shelf: shelfMock
  }
};

jest.mock('../../redux/actions/userShelves.creator');

describe('Given an AddToShelf component', () => {
  describe('When it is rendered', () => {
    describe('And isbn is Not found', () => {
      let screen: any;
      beforeEach(() => {
        (addToShelf as jest.Mock).mockReturnValue({ type: '' });

        screen = render(
          <AddToShelf navigation={navigation} route={route} />
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And addButton is clicked without selecting any shelf', () => {
        test('Then should render a Text with testId invalidShelf', () => {
          const addButton = screen.getByTestId('addButton');
          fireEvent.press(addButton);

          expect(screen.queryByTestId('invalidShelf')).not.toBe(null);
        });
      });

      describe('And addButton is clicked after selecting one shelf', () => {
        describe('And the updated shelf is loading', () => {
          beforeEach(() => {
            const shelfButton = screen.getByTestId('shelf-0-0');
            const addButton = screen.getByTestId('addButton');
            fireEvent.press(shelfButton);
            fireEvent.press(addButton);
          });

          test('Then shoud call addToShelf function', () => {
            expect(addToShelf).toHaveBeenCalled();
          });

          test('Then shoud render an ActivityIndicator with testID loadingIndicator', () => {
            expect(screen.queryByTestId('loadingIndicator')).not.toBe(null);
          });
        });

        describe('And the updated shelf is resolved', () => {
          test('Then should call navigation.pop', () => {
            (addToShelf as jest.Mock).mockReturnValue({
              type: userShelvesActions.ADD_BOOK_TO_SHELF,
              data: shelfMock
            });

            screen = render(
              <AddToShelf navigation={navigation} route={route} />
            );

            const shelfButton = screen.getByTestId('shelf-0-0');
            const addButton = screen.getByTestId('addButton');
            fireEvent.press(shelfButton);
            fireEvent.press(addButton);

            expect(navigation.pop).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

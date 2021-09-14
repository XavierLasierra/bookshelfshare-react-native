import React from 'react';
import NewShelf from './NewShelf';
import { render, fireEvent } from '../../utils/test.utils';
import { createShelf } from '../../redux/actions/userShelves.creator';
import userShelvesActions from '../../redux/actions/userShelves.actions';

jest.mock('../../redux/actions/userShelves.creator');

const navigation = {
  pop: jest.fn()
};

const route = {
  params: {
    loggedUserId: '1'
  }
};

describe('Given a NewShelf component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      (createShelf as jest.Mock).mockReturnValue({ type: '' });
      screen = render(
        <NewShelf navigation={navigation} route={route} />
      );
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And createButton is clicked with an empty name', () => {
      beforeEach(() => {
        const createButton = screen.getByTestId('createButton');
        fireEvent.press(createButton);
      });
      test('Then should render a text with testId invalidShelfName', () => {
        expect(screen.queryByTestId('invalidShelfName')).not.toBe(null);
      });

      describe('And you focus on nameInput', () => {
        test('Then should not render a text with testId invalidShelfName', () => {
          const nameInput = screen.getByTestId('nameInput');
          fireEvent(nameInput, 'focus');

          expect(screen.queryByTestId('invalidShelfName')).toBe(null);
        });
      });
    });

    describe('And you type on nameInput', () => {
      beforeEach(() => {
        const nameInput = screen.getByTestId('nameInput');
        fireEvent(nameInput, 'focus');
        fireEvent.changeText(nameInput, 'name');
      });
      describe('And createButton is clicked', () => {
        beforeEach(() => {
          const createButton = screen.getByTestId('createButton');
          fireEvent.press(createButton);
        });
        test('Then should render a text with testId invalidShelfSize', () => {
          expect(screen.queryByTestId('invalidShelfSize')).not.toBe(null);
        });

        describe('And you focus on rowsInput', () => {
          test('Then should not render a text with testId invalidShelfSize', () => {
            const rowsInput = screen.getByTestId('rowsInput');
            fireEvent(rowsInput, 'focus');

            expect(screen.queryByTestId('invalidShelfSize')).toBe(null);
          });
        });

        describe('And you focus on columnsInput', () => {
          test('Then should not render a text with testId invalidShelfSize', () => {
            const columnsInput = screen.getByTestId('columnsInput');
            fireEvent(columnsInput, 'focus');

            expect(screen.queryByTestId('invalidShelfSize')).toBe(null);
          });
        });
      });
    });

    describe('And you type on nameInput and rowsInput', () => {
      beforeEach(() => {
        const nameInput = screen.getByTestId('nameInput');
        fireEvent(nameInput, 'focus');
        fireEvent.changeText(nameInput, 'name');
        const rowsInput = screen.getByTestId('rowsInput');
        fireEvent(rowsInput, 'focus');
        fireEvent.changeText(rowsInput, '2');
      });
      describe('And createButton is clicked', () => {
        beforeEach(() => {
          const createButton = screen.getByTestId('createButton');
          fireEvent.press(createButton);
        });
        test('Then should render a text with testId invalidShelfSize', () => {
          expect(screen.queryByTestId('invalidShelfSize')).not.toBe(null);
        });
      });
    });

    describe('And you type on nameInput, rowsInput and columnsInput', () => {
      describe('And createButton is clicked', () => {
        describe('And shelves update is loading', () => {
          beforeEach(() => {
            const nameInput = screen.getByTestId('nameInput');
            fireEvent(nameInput, 'focus');
            fireEvent.changeText(nameInput, 'name');
            const rowsInput = screen.getByTestId('rowsInput');
            fireEvent.changeText(rowsInput, '2');
            const columnsInput = screen.getByTestId('columnsInput');
            fireEvent.changeText(columnsInput, '3');

            const createButton = screen.getByTestId('createButton');
            fireEvent.press(createButton);
          });

          test('Then should call createShelf with the first parameter containing shelvesInfomation', () => {
            expect((createShelf as jest.Mock).mock.calls[0][0]).toEqual({ name: 'name', users: ['1'], shelf: [3, 3] });
          });

          test('Then should render an ActivityIndicator with testId activityIndicator', () => {
            expect(screen.queryByTestId('activityIndicator')).not.toBe(null);
          });
        });
        describe('And shelves update is resolved', () => {
          test('Then navigation.pop should have been called', () => {
            (createShelf as jest.Mock).mockReturnValue({ type: userShelvesActions.ADD_NEW_SHELF });
            const newScreen = render(
              <NewShelf navigation={navigation} route={route} />
            );

            const nameInput = newScreen.getByTestId('nameInput');
            fireEvent(nameInput, 'focus');
            fireEvent.changeText(nameInput, 'name');
            const rowsInput = newScreen.getByTestId('rowsInput');
            fireEvent.changeText(rowsInput, '2');
            const columnsInput = newScreen.getByTestId('columnsInput');
            fireEvent.changeText(columnsInput, '3');

            const createButton = newScreen.getByTestId('createButton');
            fireEvent.press(createButton);

            expect(navigation.pop).toHaveBeenCalled();
          });
        });
      });
    });
  });
});

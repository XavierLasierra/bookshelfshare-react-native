import React from 'react';
import ShelfBox from './ShelfBox';
import {render, fireEvent} from '../../utils/test.utils';

describe('Given a ShelfBox component', () => {
  describe('When it is rendered', () => {
    describe('And activeShelf is different from [row,column]', () => {
      describe('And numberOfBooks is 1', () => {
        test('Then should match the snapshot', () => {
          const clickCallback = jest.fn();
          const screen = render(
            <ShelfBox
              width={100}
              clickCallback={clickCallback}
              row={0}
              column={0}
              numberOfBooks={1}
              activeShelf={[1, 1]}
            />,
          );
          expect(screen).toMatchSnapshot();
        });
      });
      describe('And numberOfBooks 2', () => {
        test('Then should match the snapshot', () => {
          const clickCallback = jest.fn();
          const screen = render(
            <ShelfBox
              width={100}
              clickCallback={clickCallback}
              row={0}
              column={0}
              numberOfBooks={2}
              activeShelf={[1, 1]}
            />,
          );
          expect(screen).toMatchSnapshot();
        });
      });
    });
    describe('And activeShelf is equal to [row,column]', () => {
      let clickCallback: any;
      let screen: any;
      beforeEach(() => {
        clickCallback = jest.fn();
        screen = render(
          <ShelfBox
            width={100}
            clickCallback={clickCallback}
            row={0}
            column={0}
            numberOfBooks={1}
            activeShelf={[0, 0]}
          />,
        );
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And the rendered element is pressed', () => {
        test('Then clickCallback should be called with [row, column]', () => {
          const currentBoxButton = screen.getByTestId('shelf-0-0');
          fireEvent.press(currentBoxButton);

          expect(clickCallback).toHaveBeenCalledWith([0, 0]);
        });
      });
    });
  });
});

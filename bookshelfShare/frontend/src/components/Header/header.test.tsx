import React from 'react';
import Header from './Header';
import { render, fireEvent } from '../../utils/test.utils';

const navigation = {
  pop: jest.fn()
};

describe('Given a Header component', () => {
  describe('When it is rendered', () => {
    describe('And the prop BackButton is false', () => {
      test('Then should match the snapshot', () => {
        const screen = render(<Header Logo="Logo" />);
        expect(screen).toMatchSnapshot();
      });
    });

    describe('And the prop BackButton is true', () => {
      let screen: any;
      beforeEach(() => {
        screen = render(<Header Logo="Logo" BackButton navigation={navigation} />);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And backButton is clicked', () => {
        test('Then navigation.pop should have been called', () => {
          const backButton = screen.getByTestId('backButton');
          fireEvent.press(backButton);
          expect(navigation.pop).toHaveBeenCalled();
        });
      });
    });
  });
});

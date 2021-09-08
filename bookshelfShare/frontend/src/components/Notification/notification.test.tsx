import React from 'react';
import Notification from './Notification';
import { render, fireEvent } from '../../utils/test.utils';

jest.mock('react-native', () => {
  const reactNativeMock = jest.requireActual('react-native');

  reactNativeMock.Animated.timing = (value: any, config: any) => ({
    start: (callback: any) => {
      value.setValue(config.toValue);
      callback({ finished: true });
    }
  });

  return reactNativeMock;
});

describe('Given a Notification component', () => {
  describe('When it is rendered', () => {
    describe('And there is not a notification in store', () => {
      test('Then should match the snapshot', () => {
        const screen = render(<Notification />);
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And there is a notification in store', () => {
      let screen: any;
      beforeEach(() => {
        const initialState = { notifications: ['Hi'] };
        screen = render(<Notification />, initialState);
      });
      test('Then should match the snapshot', () => {
        expect(screen).toMatchSnapshot();
      });

      describe('And you click on closeSnackbarButton button', () => {
        test('Then should match the snapshot', () => {
          const closeSnackbarButton = screen.getByTestId('closeSnackbarButton');
          fireEvent.press(closeSnackbarButton);
          expect(screen).toMatchSnapshot();
        });
      });
    });
  });
});

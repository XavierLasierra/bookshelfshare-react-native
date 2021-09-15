import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import App from './App';
import { render } from './utils/test.utils';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn()
}));

jest.useFakeTimers();

describe('Given an App component', () => {
  describe('When it is triggered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(<App />);
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    test('Then SplashScreen.hide should have been called', () => {
      expect(SplashScreen.hide).toHaveBeenCalled();
    });
  });
});

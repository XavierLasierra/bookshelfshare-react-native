import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import PagesNavigator from './PagesNavigator';
import { render } from '../../utils/test.utils';

jest.useFakeTimers();

describe('Given a PagesNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(
        <NavigationContainer>
          <MenuProvider>
            <PagesNavigator />
          </MenuProvider>
        </NavigationContainer>
      );
      expect(screen).toMatchSnapshot();
    });
  });
});

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BookSearchNavigator from './BookSearchNavigator';
import {render} from '../../utils/test.utils';

jest.useFakeTimers();

const route: any = {
  params: {},
};

const navigation = {
  setParams: jest.fn(),
};

describe('Given a BookSearchNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(
        <NavigationContainer>
          <BookSearchNavigator route={route} navigation={navigation} />
        </NavigationContainer>,
      );
      expect(screen).toMatchSnapshot();
    });

    describe('And the component unmounts without the property isbn in params', () => {
      test('Then setParams should not be called', () => {
        render(
          <NavigationContainer>
            <BookSearchNavigator route={route} navigation={navigation} />
          </NavigationContainer>,
        );
        expect(navigation.setParams).not.toHaveBeenCalled();
      });
    });

    describe('And the component unmounts without the property isbn in params', () => {
      test('Then setParams should not be called', () => {
        route.params.isbn = '1';
        render(
          <NavigationContainer>
            <BookSearchNavigator route={route} navigation={navigation} />
          </NavigationContainer>,
        );
        expect(navigation.setParams).toHaveBeenCalled();
      });
    });
  });
});

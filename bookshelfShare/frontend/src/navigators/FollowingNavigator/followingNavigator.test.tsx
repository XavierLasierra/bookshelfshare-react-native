import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import FollowingNavigator from './FollowingNavigator';
import {render} from '../../utils/test.utils';

jest.useFakeTimers();

describe('Given a FollowingNavigator component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(
        <NavigationContainer>
          <FollowingNavigator />
        </NavigationContainer>,
      );
      expect(screen).toMatchSnapshot();
    });
  });
});

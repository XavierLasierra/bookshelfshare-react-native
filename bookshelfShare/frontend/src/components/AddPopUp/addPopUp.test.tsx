import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import AddPopUp from './AddPopUp';
import { render } from '../../utils/test.utils';

const navigation = {
  push: jest.fn()
};

describe('Given an AddPopUp component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(
        <MenuProvider>
          <AddPopUp navigation={navigation} />
        </MenuProvider>
      );
      expect(screen).toMatchSnapshot();
    });
  });
});

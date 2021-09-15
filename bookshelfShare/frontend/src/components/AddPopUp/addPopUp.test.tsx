import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import AddPopUp from './AddPopUp';
import { render } from '../../utils/test.utils';

const navigation = {
  push: jest.fn()
};

describe('Given an AddPopUp component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(
        <MenuProvider>
          <AddPopUp navigation={navigation} />
        </MenuProvider>
      );
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });
  });
});

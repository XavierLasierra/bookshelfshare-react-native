import React from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import AddPopUp from './AddPopUp';
import {render} from '../../utils/test.utils';
import navigationMock from '../../mocks/navigation.mock';

describe('Given an AddPopUp component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(
        <MenuProvider>
          <AddPopUp navigation={navigationMock} />
        </MenuProvider>,
      );
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });
  });
});

import React from 'react';
import BarCodeScanner from './BarCodeScanner';
import { render } from '../../utils/test.utils';
import navigationMock from '../../mocks/navigation.mock';

describe('Given an BarCodeScanner component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(<BarCodeScanner navigation={navigationMock} />);
      expect(screen).toMatchSnapshot();
    });
  });
});

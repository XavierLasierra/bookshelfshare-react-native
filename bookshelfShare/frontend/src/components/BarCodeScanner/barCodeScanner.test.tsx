import React from 'react';
import BarCodeScanner from './BarCodeScanner';
import { render } from '../../utils/test.utils';

const navigation = {
  push: jest.fn()
};

describe('Given an BarCodeScanner component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(<BarCodeScanner navigation={navigation} />);
      expect(screen).toMatchSnapshot();
    });
  });
});

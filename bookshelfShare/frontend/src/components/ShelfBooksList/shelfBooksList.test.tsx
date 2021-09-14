import React from 'react';
import ShelfBooksList from './ShelfBooksList';
import { render } from '../../utils/test.utils';
import shelfMock from '../../mocks/shelf.mock';

const navigation = {
  push: jest.fn()
};

describe('Given a ShelfBooksList component', () => {
  describe('When it is rendered', () => {
    test('Then should match the snapshot', () => {
      const screen = render(<ShelfBooksList
        shelfData={shelfMock.books}
        shelfName="My shelf"
        navigation={navigation}
      />);
      expect(screen).toMatchSnapshot();
    });
  });
});

import React from 'react';
import ShelfSimulation from './ShelfSimulation';
import { render } from '../../utils/test.utils';
import treatedShelfDataMock from '../../mocks/treatedShelfData.mock';

jest.useFakeTimers();

describe('Given a ShelfSimulation component', () => {
  describe('When it is rendered', () => {
    describe('And there are more rows or equal than columns', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <ShelfSimulation
            clickCallback={jest.fn()}
            shelfSize={[2, 2]}
            shelfData={treatedShelfDataMock}
          />
        );
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And there are less rows than columns', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <ShelfSimulation
            clickCallback={jest.fn()}
            shelfSize={[1, 4]}
            shelfData={treatedShelfDataMock}
          />
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

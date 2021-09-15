import React from 'react';
import ProfileDetail from './ProfileDetail';
import { render, fireEvent } from '../../utils/test.utils';
import userBooksMock from '../../mocks/userBooks.mock';
import shelfMock from '../../mocks/shelf.mock';

describe('Given a ProfileDetail component', () => {
  describe('When it is rendered', () => {
    let handleBookResultsPage: any;
    let screen: any;
    beforeEach(() => {
      handleBookResultsPage = jest.fn();
      screen = render(<ProfileDetail
        handleBookResultsPage={handleBookResultsPage}
        userBooks={userBooksMock}
        shelves={[shelfMock]}
      />);
    });

    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    ['readingButton', 'readButton', 'toReadButton', 'wishlistButton']
      .forEach((testId) => {
        describe(`And you press ${testId}`, () => {
          test('Then handleBookresultsPage should have been called', () => {
            const button = screen.getByTestId(testId);
            fireEvent.press(button);

            expect(handleBookResultsPage).toHaveBeenCalled();
          });
        });
      });
  });
});

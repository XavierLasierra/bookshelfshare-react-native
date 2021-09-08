import React from 'react';
import loggedUserMock from '../../mocks/loggedUser.mock';
import ratingsMock from '../../mocks/ratings.mock';
import { render, fireEvent } from '../../utils/test.utils';
import UsersRatings from './UsersRatings';

describe('Given a UsersRatings component', () => {
  describe('When it is rendered', () => {
    let screen: any;
    beforeEach(() => {
      screen = render(
        <UsersRatings ratings={ratingsMock.ratings} userData={loggedUserMock.user} />
      );
    });
    test('Then should match the snapshot', () => {
      expect(screen).toMatchSnapshot();
    });

    describe('And you click on 3ratingButton (0 review)', () => {
      beforeEach(() => {
        const ratingButton = screen.getByTestId('3ratingButton');
        fireEvent.press(ratingButton);
      });
      test('Then should render a Text with testId noRatings', () => {
        expect(screen.queryByTestId('noRatings')).not.toBe(null);
      });

      describe('And you click seeAllReviewsButton', () => {
        test('Then should render all the ratings', () => {
          const seeAllReviewsButton = screen.getByTestId('seeAllReviewsButton');
          fireEvent.press(seeAllReviewsButton);

          expect(screen.queryAllByTestId('ratingElement').length).toBe(ratingsMock.ratings.length);
        });
      });
    });
  });
});

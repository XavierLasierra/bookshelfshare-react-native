import React from 'react';
import RatingElement from './RatingElement';
import {render} from '../../utils/test.utils';
import ratingsMock from '../../mocks/ratings.mock';

describe('Given an RatingElement component', () => {
  describe('When it is rendered', () => {
    describe('And the rating is not yours', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <RatingElement rating={ratingsMock.ratings[0]} />,
        );
        expect(screen).toMatchSnapshot();
      });
    });
    describe('And the rating is yours', () => {
      test('Then should match the snapshot', () => {
        const screen = render(
          <RatingElement rating={ratingsMock.ratings[0]} yours />,
        );
        expect(screen).toMatchSnapshot();
      });
    });
  });
});

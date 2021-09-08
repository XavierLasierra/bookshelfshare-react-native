import React from 'react';
import Rating from './Rating';
import { render, fireEvent } from '../../utils/test.utils';
import ratingsMock from '../../mocks/ratings.mock';
import loggedUserMock from '../../mocks/loggedUser.mock';
import { saveRating } from '../../redux/actions/books.creator';

jest.mock('../../redux/actions/books.creator', () => ({
  saveRating: jest.fn()
}));

describe('Given a Rating component', () => {
  describe('When it is rendered', () => {
    describe('And isbn is different from Not found', () => {
      describe('And there is not a rating from the user logged', () => {
        let screen: any;
        beforeEach(() => {
          screen = render(<Rating ratings={ratingsMock.ratings} isbn={ratingsMock.bookIsbn} token="token" refreshToken="refreshToken" />);
        });
        test('Then screen should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you type in ratingInput', () => {
          test('Then the text typed should be rendered', () => {
            const ratingInput = screen.getByTestId('ratingInput');
            fireEvent.changeText(ratingInput, 'review');

            expect(screen.queryByDisplayValue('review')).not.toBe(null);
          });
        });

        describe('And you click saveButton without giving a rate', () => {
          test('Then should render a Text with testId canNotSave', () => {
            const saveButton = screen.getByTestId('saveButton');
            fireEvent.press(saveButton);
            expect(screen.queryByTestId('canNotSave')).not.toBe(null);
          });
        });
      });

      describe('And there is a rating from the user logged', () => {
        let screen: any;
        beforeEach(() => {
          const initialState = { loggedUser: { userData: loggedUserMock.user } };
          screen = render(
            <Rating ratings={ratingsMock.ratings} isbn={ratingsMock.bookIsbn} token="token" refreshToken="refreshToken" />,
            initialState
          );
        });

        test('Then screen should match the snapshot', () => {
          expect(screen).toMatchSnapshot();
        });

        describe('And you click editButton', () => {
          beforeEach(() => {
            const editButton = screen.getByTestId('editButton');
            fireEvent.press(editButton);
          });
          test('Then screen should match the snapshot', () => {
            expect(screen).toMatchSnapshot();
          });

          describe('And you click on saveButton', () => {
            beforeEach(() => {
              (saveRating as jest.Mock).mockReturnValue({ type: '' });
              const saveButton = screen.getByTestId('saveButton');
              fireEvent.press(saveButton);
            });
            describe('And save action is loading', () => {
              test('Then should render a component with testId savingIndicator', () => {
                expect(screen.queryByTestId('savingIndicator')).not.toBe(null);
              });
            });
          });
        });
      });
    });
  });
});

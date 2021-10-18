import notificationsActions from '../actions/notifications.actions';
import booksReducer from './books.reducer';
import initialState from '../../constants/booksInitialState.constant';

describe('Given a booksReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type ISBN_ERROR', () => {
      test('Then should return an object with results true and books []', () => {
        const result = booksReducer(initialState, {
          type: notificationsActions.ISBN_ERROR,
        });
        expect(result).toEqual({results: true, books: []});
      });
    });
    describe('And its called with an action with a type LOAD_BOOKS_ERROR', () => {
      test('Then should return an object with results true and books []', () => {
        const result = booksReducer(initialState, {
          type: notificationsActions.LOAD_BOOKS_ERROR,
        });
        expect(result).toEqual({results: true, books: []});
      });
    });
  });
});

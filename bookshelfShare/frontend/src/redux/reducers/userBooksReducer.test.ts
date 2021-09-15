import userBooksReducer from './userBooks.reducer';
import initialState from '../../constants/userBooksInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';
import userBooksActions from '../actions/userBooks.actions';

describe('Given a userBooksReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOG_USER', () => {
      test('Then should return the property books of the user returned', () => {
        const result = userBooksReducer(
          initialState,
          {
            type: loggedUserActions.LOG_USER,
            data: { user: { books: [] } }
          }
        );
        expect(result).toEqual([]);
      });
    });

    describe('And its called with an action with a type LOAD_USER_BOOKS', () => {
      test('Then should return the data returned', () => {
        const result = userBooksReducer(
          initialState,
          {
            type: userBooksActions.LOAD_USER_BOOKS,
            data: []
          }
        );
        expect(result).toEqual([]);
      });
    });
  });
});

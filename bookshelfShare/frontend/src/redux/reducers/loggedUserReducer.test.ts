import loggedUserReducer from './loggedUser.reducer';
import initialState from '../../constants/userLoggedInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';

describe('Given a loggedUserReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOG_USER', () => {
      test('Then should return an object with isAuthenticated true and userData {}', () => {
        const result = loggedUserReducer(initialState, {
          type: loggedUserActions.LOG_USER,
          data: {user: {}},
        });
        expect(result).toEqual({isAuthenticated: true, userData: {}});
      });
    });
  });
});

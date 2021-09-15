import userSocialsReducer from './userSocials.reducer';
import initialState from '../../constants/userSocialsInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';

describe('Given a userSocialsReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOG_USER', () => {
      test('Then should return an object with isAuthenticated true and userData {}', () => {
        const result = userSocialsReducer(
          initialState,
          {
            type: loggedUserActions.LOG_USER,
            data: {
              user: {
                following: ['following'],
                followers: ['followers']
              }
            }
          }
        );
        expect(result).toEqual({ following: ['following'], followers: ['followers'] });
      });
    });
  });
});

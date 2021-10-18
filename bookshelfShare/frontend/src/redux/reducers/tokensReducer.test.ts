import tokensReducer from './tokens.reducer';
import initialState from '../../constants/tokensInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';
import tokenActions from '../actions/token.actions';

describe('Given a tokensReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOG_USER', () => {
      test('Then should return an object with the token and refreshToken', () => {
        const result = tokensReducer(initialState, {
          type: loggedUserActions.LOG_USER,
          data: {
            token: 'token',
            refreshToken: 'refreshToken',
          },
        });
        expect(result).toEqual({token: 'token', refreshToken: 'refreshToken'});
      });
    });

    describe('And its called with an action with a type REFRESH_TOKEN', () => {
      test('Then should return an object containing the new token', () => {
        const result = tokensReducer(initialState, {
          type: tokenActions.REFRESH_TOKEN,
          data: {
            token: 'newToken',
          },
        });
        expect(result).toEqual({token: 'newToken', refreshToken: ''});
      });
    });

    describe('And its called with an action with a type SAVE_REFRESH_TOKEN', () => {
      test('Then should return an object containing the new refreshToken', () => {
        const result = tokensReducer(initialState, {
          type: tokenActions.SAVE_REFRESH_TOKEN,
          data: 'newRefreshToken',
        });
        expect(result).toEqual({token: '', refreshToken: 'newRefreshToken'});
      });
    });
  });
});

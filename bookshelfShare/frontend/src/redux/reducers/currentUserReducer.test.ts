import notificationsActions from '../actions/notifications.actions';
import currentUserReducer from './currentUser.reducer';
import initialState from '../../constants/currentUserInitialState.constant';
import currentUserActions from '../actions/currentUser.actions';

describe('Given a currentUserReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOAD_OTHER_USER', () => {
      test('Then should return an object with results true and user data', () => {
        const result = currentUserReducer(initialState, {
          type: currentUserActions.LOAD_OTHER_USER,
          data: 'data',
        });
        expect(result).toEqual({results: true, user: 'data'});
      });
    });
    describe('And its called with an action with a type LOAD_CURRENT_SHELF_ERROR', () => {
      test('Then should return an object with results true and books []', () => {
        const result = currentUserReducer(initialState, {
          type: notificationsActions.LOAD_USER_ERROR,
        });
        expect(result).toEqual({results: true, user: {}});
      });
    });
  });
});

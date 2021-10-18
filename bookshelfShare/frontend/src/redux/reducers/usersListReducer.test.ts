import usersListReducer from './usersList.reducer';
import initialState from '../../constants/usersListInitialState.constant';
import notificationsActions from '../actions/notifications.actions';

describe('Given a usersListReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOAD_USER_LIST_ERROR', () => {
      test('Then should return an object with results true and users []', () => {
        const result = usersListReducer(initialState, {
          type: notificationsActions.LOAD_USER_LIST_ERROR,
        });
        expect(result).toEqual({results: true, users: []});
      });
    });
  });
});

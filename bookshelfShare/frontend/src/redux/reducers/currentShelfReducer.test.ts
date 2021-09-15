import notificationsActions from '../actions/notifications.actions';
import currentShelfReducer from './currentShelf.reducer';
import initialState from '../../constants/currentShelfInitialState.constant';
import currentShelfActions from '../actions/currentShelf.actions';

describe('Given a currentShelfReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOAD_CURRENT_SHELF', () => {
      test('Then should return an object with results true and shelf data', () => {
        const result = currentShelfReducer(initialState, {
          type: currentShelfActions.LOAD_CURRENT_SHELF,
          data: 'data'
        });
        expect(result).toEqual({ results: true, shelf: 'data' });
      });
    });
    describe('And its called with an action with a type LOAD_CURRENT_SHELF_ERROR', () => {
      test('Then should return an object with results true and books []', () => {
        const result = currentShelfReducer(initialState, {
          type: notificationsActions.LOAD_CURRENT_SHELF_ERROR,
          data: 'data'
        });
        expect(result).toEqual({ results: true, shelf: {} });
      });
    });
  });
});

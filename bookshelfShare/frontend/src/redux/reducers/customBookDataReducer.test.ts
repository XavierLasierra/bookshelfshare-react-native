import customBookDataReducer from './customBookData.reducer';
import initialState from '../../constants/customBookDataInitialState.constant';
import notificationsActions from '../actions/notifications.actions';

describe('Given a customBookDataReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOAD_RATINGS_ERROR', () => {
      test('Then should return an object with results true and ratings []', () => {
        const result = customBookDataReducer(
          initialState,
          {
            type: notificationsActions.LOAD_RATINGS_ERROR
          }
        );
        expect(result).toEqual({ isLoaded: true, ratings: [] });
      });
    });
    describe('And its called with an action with a type SAVE_RATING_ERROR', () => {
      test('Then should return an object with isLoaded true and ratings []', () => {
        const result = customBookDataReducer(
          initialState,
          {
            type: notificationsActions.SAVE_RATING_ERROR
          }
        );
        expect(result).toEqual({ isLoaded: true, ratings: [] });
      });
    });
  });
});

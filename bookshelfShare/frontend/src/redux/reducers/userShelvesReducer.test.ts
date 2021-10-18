import userShelvesReducer from './userShelves.reducer';
import userShelvesActions from '../actions/userShelves.actions';
import notificationsActions from '../actions/notifications.actions';

describe('Given a userShelvesReducer function', () => {
  describe('When it is triggered', () => {
    describe('And its called with an action with a type LOAD_USER_SHELVES', () => {
      test('Then should return an object with action.data', () => {
        const result = userShelvesReducer([], {
          type: userShelvesActions.LOAD_USER_SHELVES,
          data: ['data'],
        });
        expect(result).toEqual(['data']);
      });
    });

    describe('And its called with an action with a type DELETE_BOOK_FROM_SHELF', () => {
      test('Then should return an array containing the new book', () => {
        const result = userShelvesReducer(
          [
            {_id: '1', name: 'c'},
            {_id: '2', name: 'b'},
          ],
          {
            type: userShelvesActions.DELETE_BOOK_FROM_SHELF,
            data: {_id: '1', name: 'a'},
          },
        );
        expect(result).toEqual([
          {_id: '1', name: 'a'},
          {_id: '2', name: 'b'},
        ]);
      });
    });

    describe('And its called with an action with a type ADD_TO_SHELF_ERROR', () => {
      test('Then should return an array containing the new book', () => {
        const result = userShelvesReducer(
          [
            {_id: '1', name: 'c'},
            {_id: '2', name: 'b'},
          ],
          {
            type: notificationsActions.ADD_TO_SHELF_ERROR,
            data: {_id: '1', name: 'a'},
          },
        );
        expect(result).toEqual([
          {_id: '2', name: 'b'},
          {_id: '1', name: 'c'},
        ]);
      });
    });
  });
});

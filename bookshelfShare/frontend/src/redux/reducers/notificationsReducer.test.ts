import booksActions from '../actions/books.actions';
import notificationsActions from '../actions/notifications.actions';
import notificationsReducer from './notifications.reducer';

describe('Given a notificationsReducer function', () => {
  describe('When it is triggered', () => {
    [
      {
        action: { type: notificationsActions.LOGIN_ERROR },
        returnValue: ['Invalid email or password']
      },
      {
        action: { type: notificationsActions.SERVER_ERROR },
        returnValue: ['Server error']
      },
      {
        action: { type: notificationsActions.REGISTER_USER },
        returnValue: ['User correctly registered']
      },
      {
        action: { type: notificationsActions.REGISTER_ERROR },
        returnValue: ['User already registered']
      },
      {
        action: { type: notificationsActions.ISBN_ERROR },
        returnValue: ['Book not found']
      },
      {
        action: { type: booksActions.UPDATE_RATINGS },
        returnValue: ['Review saved']
      },
      {
        action: { type: notificationsActions.REVIEW_ISBN_NOT_FOUND },
        returnValue: ['Can not review a book without ISBN']
      },
      {
        action: { type: notificationsActions.SAVE_ERROR },
        returnValue: ['Could not save']
      },
      {
        action: { type: notificationsActions.LOAD_USER_ERROR },
        returnValue: ['Could not load user']
      },
      {
        action: { type: notificationsActions.LOAD_RATINGS_ERROR },
        returnValue: ['Could not load ratings']
      },
      {
        action: { type: notificationsActions.SAVE_RATING_ERROR },
        returnValue: ['Could not save rating']
      },
      {
        action: { type: notificationsActions.LOAD_BOOKS_ERROR },
        returnValue: ['Could not load books data']
      },
      {
        action: { type: notificationsActions.LOAD_USER_LIST_ERROR },
        returnValue: ['Could not load users']
      },
      {
        action: { type: notificationsActions.LOAD_USER_SHELVES_ERROR },
        returnValue: ['Could not load user shelves']
      },
      {
        action: { type: notificationsActions.CREATE_SHELF_ERROR },
        returnValue: ['Could not create new shelf']
      },
      {
        action: { type: notificationsActions.LOAD_CURRENT_SHELF_ERROR },
        returnValue: ['Could not get shelf data']
      },
      {
        action: { type: notificationsActions.ADD_TO_SHELF_ERROR },
        returnValue: ['Could not modify shelf']
      },
      {
        action: { type: notificationsActions.ADD_DELETE_FOLLOWING_ERROR },
        returnValue: ['Could not add/delete following user']
      }
    ].forEach(({ action, returnValue }: any) => {
      describe(`And its called with an action with a type ${action.type}`, () => {
        test(`Then should return ${returnValue[0]}`, () => {
          const result = notificationsReducer([], action);
          expect(result).toEqual(returnValue);
        });
      });
    });
  });
});

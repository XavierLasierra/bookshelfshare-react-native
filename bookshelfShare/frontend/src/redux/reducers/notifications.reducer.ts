import notificationsActions from '../actions/notifications.actions';
import booksActions from '../actions/books.actions';

interface Action {
    type: string
}

function notificationsReducer(notification = [], action: Action): string[] {
  let newNotification: string[] = notification;
  switch (action.type) {
    case notificationsActions.LOGIN_ERROR:
      newNotification = ['Invalid email or password'];
      break;
    case notificationsActions.SERVER_ERROR:
      newNotification = ['Server error'];
      break;
    case notificationsActions.REGISTER_USER:
      newNotification = ['User correctly registered'];
      break;
    case notificationsActions.REGISTER_ERROR:
      newNotification = ['User already registered'];
      break;
    case notificationsActions.ISBN_ERROR:
      newNotification = ['Book not found'];
      break;
    case booksActions.UPDATE_RATINGS:
      newNotification = ['Review saved'];
      break;
    case notificationsActions.REVIEW_ISBN_NOT_FOUND:
      newNotification = ['Can not review a book without ISBN'];
      break;
    case notificationsActions.SAVE_ERROR:
      newNotification = ['Could not save'];
      break;
    case notificationsActions.LOAD_USER_ERROR:
      newNotification = ['Could not load user'];
      break;
    case notificationsActions.LOAD_RATINGS_ERROR:
      newNotification = ['Could not load ratings'];
      break;
    case notificationsActions.SAVE_RATING_ERROR:
      newNotification = ['Could not save rating'];
      break;
    case notificationsActions.LOAD_BOOKS_ERROR:
      newNotification = ['Could not load books data'];
      break;
    case notificationsActions.LOAD_USER_LIST_ERROR:
      newNotification = ['Could not load users'];
      break;
    case notificationsActions.LOAD_USER_SHELVES_ERROR:
      newNotification = ['Could not load user shelves'];
      break;
    case notificationsActions.CREATE_SHELF_ERROR:
      newNotification = ['Could not create new shelf'];
      break;
    default:
      break;
  }

  return newNotification;
}

export default notificationsReducer;

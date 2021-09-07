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
    default:
      break;
  }

  return newNotification;
}

export default notificationsReducer;
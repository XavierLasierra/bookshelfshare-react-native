import { combineReducers } from 'redux';
import loggedUser from './loggedUser.reducer';
import tokens from './tokens.reducer';
import notifications from './notifications.reducer';
import books from './books.reducer';

export default combineReducers({
  loggedUser,
  tokens,
  notifications,
  books
});

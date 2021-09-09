import { combineReducers } from 'redux';
import loggedUser from './loggedUser.reducer';
import tokens from './tokens.reducer';
import notifications from './notifications.reducer';
import books from './books.reducer';
import customBookData from './customBookData.reducer';
import shelves from './shelves.reducer';
import userBooks from './userBooks.reducer';
import userSocials from './userSocialsreducer';

export default combineReducers({
  userBooks,
  userSocials,
  loggedUser,
  tokens,
  notifications,
  books,
  customBookData,
  shelves
});

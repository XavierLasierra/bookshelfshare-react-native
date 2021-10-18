import {combineReducers} from 'redux';
import loggedUser from './loggedUser.reducer';
import tokens from './tokens.reducer';
import notifications from './notifications.reducer';
import books from './books.reducer';
import customBookData from './customBookData.reducer';
import userShelves from './userShelves.reducer';
import userBooks from './userBooks.reducer';
import userSocials from './userSocials.reducer';
import usersList from './usersList.reducer';
import currentUser from './currentUser.reducer';
import currentShelf from './currentShelf.reducer';

export default combineReducers({
  userBooks,
  userSocials,
  loggedUser,
  tokens,
  notifications,
  books,
  customBookData,
  userShelves,
  usersList,
  currentUser,
  currentShelf,
});

import booksActions from '../actions/books.actions';
import initialState from '../../constants/booksInitialState.constant';
import notificationsActions from '../actions/notifications.actions';

interface Action {
    type: string,
    data: any
}

function booksReducer(books = initialState, action: Action): any[] {
  let newBooks: any = books;
  switch (action.type) {
    case booksActions.LOAD_BOOKS:
      newBooks = {
        results: true,
        books: action.data
      };
      break;
    case booksActions.CLEAR_BOOKS:
      newBooks = initialState;
      break;
    case notificationsActions.ISBN_ERROR:
    case notificationsActions.LOAD_BOOKS_ERROR:
      newBooks = {
        results: true,
        books: []
      };
      break;
    default:
      break;
  }
  return newBooks;
}

export default booksReducer;

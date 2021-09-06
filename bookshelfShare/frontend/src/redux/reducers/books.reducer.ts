import booksActions from '../actions/books.actions';
import initialState from '../../constants/booksInitialState.constant';
import notificationsActions from '../actions/notifications.actions';

interface Action {
    type: string,
    data: any
}

function Reducer(books = initialState, action: Action): any[] {
  let newBooks: any = books;
  switch (action.type) {
    case booksActions.LOAD_BOOKS:
      newBooks = {
        results: true,
        books: action.data
      };
      console.log(newBooks);
      break;
    case booksActions.CLEAR_BOOKS:
      newBooks = initialState;
      break;
    case notificationsActions.ISBN_ERROR:
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

export default Reducer;

import booksActions from '../actions/books.actions';

interface Action {
    type: string,
    data: any
}

function Reducer(books = [], action: Action): any[] {
  let newBooks: any = books;
  switch (action.type) {
    case booksActions.LOAD_BOOKS:
      newBooks = action.data;
      break;
    default:
      break;
  }
  return newBooks;
}

export default Reducer;

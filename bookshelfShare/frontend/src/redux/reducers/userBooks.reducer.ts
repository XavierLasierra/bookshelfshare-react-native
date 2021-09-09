import initialState from '../../constants/userBooksInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';
import userBooksActions from '../actions/userBooks.actions';

function userBooksReducer(userBooks = initialState, action: any): any {
  let newUserBooks: any = userBooks;

  switch (action.type) {
    case loggedUserActions.LOG_USER:
      newUserBooks = action.data.user.books;
      break;
    case userBooksActions.LOAD_USER_BOOKS:
      newUserBooks = action.data;
      break;
    default:
      break;
  }
  return newUserBooks;
}
export default userBooksReducer;

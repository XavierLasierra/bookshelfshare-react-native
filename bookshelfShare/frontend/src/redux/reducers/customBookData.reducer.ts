import initialState from '../../constants/customBookDataInitialState.constant';
import booksActions from '../actions/books.actions';
import notificationsActions from '../actions/notifications.actions';

interface Action {
    type: string,
    data: any
}

function customBookDataReducer(customBookData = initialState, action: Action): any[] {
  let newCustomData: any = customBookData;
  switch (action.type) {
    case booksActions.LOAD_RATINGS:
    case booksActions.UPDATE_RATINGS:
      newCustomData = {
        ...newCustomData,
        isLoaded: true,
        ratings: action.data.ratings
      };
      break;
    case booksActions.CLEAR_BOOK:
      newCustomData = initialState;
      break;
    case notificationsActions.LOAD_RATINGS_ERROR:
    case notificationsActions.SAVE_RATING_ERROR:
      newCustomData = {
        ...newCustomData,
        ratings: [],
        isLoaded: true
      };
      break;
    default:
      break;
  }
  return newCustomData;
}

export default customBookDataReducer;

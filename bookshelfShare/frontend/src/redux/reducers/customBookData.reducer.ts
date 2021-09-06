import initialState from '../../constants/customBookDataInitialState.constant';
import booksActions from '../actions/books.actions';

interface Action {
    type: string,
    data: any
}

function customBookDataReducer(customBookData = initialState, action: Action): any[] {
  let newCustomData: any = customBookData;
  switch (action.type) {
    case booksActions.LOAD_RATINGS:
      newCustomData = {
        ...newCustomData,
        isLoaded: true,
        ratings: action.data.ratings
      };
      break;
    case booksActions.CLEAR_BOOK:
      newCustomData = initialState;
      break;
    default:
      break;
  }
  return newCustomData;
}

export default customBookDataReducer;

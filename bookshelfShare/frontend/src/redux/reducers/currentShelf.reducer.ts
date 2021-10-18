import currentShelfActions from '../actions/currentShelf.actions';
import initialState from '../../constants/currentShelfInitialState.constant';
import notificationsActions from '../actions/notifications.actions';

interface Action {
  type: string;
  data: any;
}

function currentShelfReducer(shelf = initialState, action: Action): any {
  let newCurrentShelf: any = shelf;
  switch (action.type) {
    case currentShelfActions.LOAD_CURRENT_SHELF:
      newCurrentShelf = {
        results: true,
        shelf: action.data,
      };
      break;
    case currentShelfActions.CLEAR_CURRENT_SHELF:
      newCurrentShelf = initialState;
      break;
    case notificationsActions.LOAD_CURRENT_SHELF_ERROR:
      newCurrentShelf = {
        results: true,
        shelf: {},
      };
      break;
    default:
      break;
  }
  return newCurrentShelf;
}

export default currentShelfReducer;

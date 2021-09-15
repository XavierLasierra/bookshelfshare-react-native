import initialState from '../../constants/currentUserInitialState.constant';
import currentUserActions from '../actions/currentUser.actions';
import notificationsActions from '../actions/notifications.actions';

interface Action {
    type: string,
    data?: any
}

function currentUserReducer(currentUser = initialState, action: Action): any {
  let newCurrentUser: any = currentUser;
  switch (action.type) {
    case currentUserActions.LOAD_OTHER_USER:
      newCurrentUser = {
        results: true,
        user: action.data
      };
      break;
    case notificationsActions.LOAD_USER_ERROR:
      newCurrentUser = {
        results: true,
        user: {}
      };
      break;
    case currentUserActions.CLEAR_OTHER_USER:
      newCurrentUser = initialState;
      break;
    default:
      break;
  }
  return newCurrentUser;
}

export default currentUserReducer;

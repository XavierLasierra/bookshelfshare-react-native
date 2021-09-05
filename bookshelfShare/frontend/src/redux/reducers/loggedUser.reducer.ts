import initialState from '../../constants/userLoggedInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';

interface Action {
    type: string,
    data: any
}

interface LoggedUser {
  isAuthenticated?: boolean,
  needsLogin?:boolean,
  userData?: any
}

function loggedUserReducer(loggedUser = initialState, action: Action): LoggedUser {
  let newLoggedUser: LoggedUser = loggedUser;
  switch (action.type) {
    case loggedUserActions.LOG_USER:
    case loggedUserActions.LOAD_USER_DATA:
      newLoggedUser = {
        userData: action.data.user,
        isAuthenticated: true
      };
      break;
    case loggedUserActions.USER_NOT_LOGGED:
      newLoggedUser = {
        isAuthenticated: false,
        needsLogin: true
      };
      break;
    default:
      break;
  }
  return newLoggedUser;
}

export default loggedUserReducer;

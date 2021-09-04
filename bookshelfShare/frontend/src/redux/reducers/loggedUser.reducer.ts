import loggedUserActions from '../actions/loggedUser.actions';
import initialState from '../../constants/loggedUserInitialState.constant';

interface Action {
    type: string,
    data: any
}

interface LoggedUser {
  isAuthenticated: boolean,
  userData?: any
}

function loggedUserReducer(loggedUser = initialState, action: Action): LoggedUser {
  let newLoggedUser: LoggedUser = loggedUser;
  switch (action.type) {
    case loggedUserActions.LOG_USER:
      newLoggedUser = {
        userData: action.data,
        isAuthenticated: true
      };
      break;
    default:
      break;
  }
  return newLoggedUser;
}

export default loggedUserReducer;

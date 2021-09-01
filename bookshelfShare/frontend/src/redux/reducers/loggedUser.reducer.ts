import loggedUserActions from '../actions/loggedUser.actions';

interface Action {
    type: string,
    data: any
}

function loggedUserReducer(loggedUser = {
  isAuthenticated: false
}, action: Action) {
  let newLoggedUser = loggedUser;
  switch (action.type) {
    case loggedUserActions.LOG_USER:
      newLoggedUser = {
        ...action.data,
        isAuthenticated: true
      };
      break;
    default:
      break;
  }

  return newLoggedUser;
}

export default loggedUserReducer;

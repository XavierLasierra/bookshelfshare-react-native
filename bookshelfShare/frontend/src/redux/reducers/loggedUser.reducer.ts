import loggedUserActions from '../actions/loggedUser.actions';

interface Action {
    type: string,
    data: any
}

function loggedUserReducer(loggedUser = [], action: Action) {
  const newLoggedUser = loggedUser;
  switch (action.type) {
    case loggedUserActions.LOG_USER:
      break;
    default:
      break;
  }

  return newLoggedUser;
}

export default loggedUserReducer;

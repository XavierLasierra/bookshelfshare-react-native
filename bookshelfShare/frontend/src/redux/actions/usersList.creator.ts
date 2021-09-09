import usersListActions from './usersList.actions';

export function getUsers() {
  return async (dispatch: any) => {
    console.log('hehehe');
    dispatch();
  };
}

export function loadLocalUsers(data: any) {
  return {
    type: usersListActions.LOAD_USERS_LIST,
    data
  };
}

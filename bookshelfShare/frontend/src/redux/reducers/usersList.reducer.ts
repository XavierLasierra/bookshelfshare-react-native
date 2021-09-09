import initialState from '../../constants/usersListInitialState.constant';
import usersListActions from '../actions/usersList.actions';

function userListReducer(users = initialState, action: any): any {
  let newUsers: any = users;

  switch (action.type) {
    case usersListActions.LOAD_USERS_LIST:
      newUsers = {
        results: true,
        users: action.data
      };
      break;
    case usersListActions.CLEAR_USERS_LIST:
      newUsers = initialState;
      break;
    default:
      break;
  }
  return newUsers;
}
export default userListReducer;

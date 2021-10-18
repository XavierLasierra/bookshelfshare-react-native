import initialState from '../../constants/usersListInitialState.constant';
import notificationsActions from '../actions/notifications.actions';
import usersListActions from '../actions/usersList.actions';

function userListReducer(users = initialState, action: any): any {
  let newUsers: any = users;

  switch (action.type) {
    case usersListActions.LOAD_USERS_LIST:
      newUsers = {
        results: true,
        users: action.data,
      };
      break;
    case usersListActions.CLEAR_USERS_LIST:
      newUsers = initialState;
      break;
    case notificationsActions.LOAD_USER_LIST_ERROR:
      newUsers = {
        results: true,
        users: [],
      };
      break;
    default:
      break;
  }
  return newUsers;
}
export default userListReducer;

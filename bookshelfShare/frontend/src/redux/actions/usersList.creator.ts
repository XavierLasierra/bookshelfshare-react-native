import {BOOKSS_API} from '@env';
import axios from 'axios';
import notificationsActions from './notifications.actions';
import refreshUserToken from './tokens.creator';
import usersListActions from './usersList.actions';

export function getUsers(text: string, token: string, refreshToken: string) {
  return async (dispatch: any) => {
    try {
      const {data} = await axios.get(
        BOOKSS_API.concat(`/users?email=${text}&username=${text}`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      dispatch({
        type: usersListActions.LOAD_USERS_LIST,
        data,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(getUsers(text, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR,
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.LOAD_USER_LIST_ERROR,
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR,
        });
      }
    }
  };
}

export function loadLocalUsers(data: any) {
  return {
    type: usersListActions.LOAD_USERS_LIST,
    data,
  };
}

export function clearUsersList() {
  return {
    type: usersListActions.CLEAR_USERS_LIST,
  };
}

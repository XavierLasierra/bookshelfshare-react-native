import {BOOKSS_API} from '@env';
import axios from 'axios';
import currentUserActions from './currentUser.actions';
import notificationsActions from './notifications.actions';
import refreshUserToken from './tokens.creator';

interface Dispatch {
  // eslint-disable-next-line no-unused-vars
  (action: any): void;
}

export function clearCurrentUser() {
  return {
    type: currentUserActions.CLEAR_OTHER_USER,
  };
}

export function loadCurrentUser(
  userId: string,
  token: string,
  refreshToken: string,
) {
  return async (dispatch: Dispatch) => {
    try {
      const {data} = await axios.get(BOOKSS_API.concat(`/users/${userId}`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: currentUserActions.LOAD_OTHER_USER,
        data,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(loadCurrentUser(userId, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR,
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.LOAD_USER_ERROR,
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR,
        });
      }
    }
  };
}

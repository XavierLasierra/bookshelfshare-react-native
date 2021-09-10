import { BOOKSS_API } from '@env';
import axios from 'axios';
import notificationsActions from './notifications.actions';
import refreshUserToken from './tokens.creator';
import userShelvesActions from './userShelves.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: any): void
}

export function loadUserShelves(userId: string, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(BOOKSS_API.concat(`/shelves?users=${userId}`), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: userShelvesActions.LOAD_USER_SHELVES,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(loadUserShelves(userId, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.LOAD_USER_SHELVES_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function updateShelves() {

}

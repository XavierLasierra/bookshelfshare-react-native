import axios from 'axios';
import { BOOKSS_API } from '@env';
import currentShelfActions from './currentShelf.actions';
import refreshUserToken from './tokens.creator';
import notificationsActions from './notifications.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: any): void
}

export function loadCurrentShelf(shelfId: string, token: string, refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get(BOOKSS_API.concat(`/shelves/${shelfId}`), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: currentShelfActions.LOAD_CURRENT_SHELF,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(loadCurrentShelf(shelfId, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.LOAD_CURRENT_SHELF_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function clearCurrentShelf() {
  return {
    type: currentShelfActions.CLEAR_CURRENT_SHELF
  };
}

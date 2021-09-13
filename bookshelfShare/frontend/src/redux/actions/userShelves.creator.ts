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

export function createShelf(
  shelfInformation: any, token: string, refreshToken: string
) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(BOOKSS_API.concat('/shelves'),
        shelfInformation,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      dispatch({
        type: userShelvesActions.ADD_NEW_SHELF,
        data
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(createShelf(shelfInformation, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.CREATE_SHELF_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function addToShelf(
  deleteFrom: string, addTo: string, bookIsbn: string,
  customInformation: any, token: string, refreshToken: string
) {
  return async (dispatch: Dispatch) => {
    try {
      if (deleteFrom) {
        const { data } = await axios.put(BOOKSS_API.concat(`/shelves/book/${deleteFrom}`),
          {
            actionType: 'DELETE',
            bookIsbn
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        dispatch({
          type: userShelvesActions.DELETE_BOOK_FROM_SHELF,
          data
        });
      }
      if (addTo) {
        const { data } = await axios.put(BOOKSS_API.concat(`/shelves/book/${addTo}`), {
          actionType: 'ADD',
          bookIsbn,
          customInformation
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        dispatch({
          type: userShelvesActions.ADD_BOOK_TO_SHELF,
          data
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(addToShelf(
            deleteFrom, addTo, bookIsbn, customInformation, newToken, refreshToken
          ));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ADD_TO_SHELF_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

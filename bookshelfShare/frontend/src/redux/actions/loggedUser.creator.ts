import axios from 'axios';
import { BOOKSS_API } from '@env';
import loggedUserActions from './loggedUser.actions';
import notificationsActions from './notifications.actions';
import { clearStorage, getSavedData, storeToken } from '../../services/asyncStorage';
import refreshUserToken from './tokens.creator';
import tokenActions from './token.actions';
import userBooksActions from './userBooks.actions';
import { loadUserShelves } from './userShelves.creator';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: Action | any): void
}

interface Action {
    type: string,
    data?: any
}

interface LoginInformation {
    email: string,
    password: string
}

interface RegisterInformation {
  username: string,
    email: string,
    password: string
}

export function loginUser(userInfo: LoginInformation) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(BOOKSS_API.concat('/auth/login'), userInfo);

      dispatch({
        type: loggedUserActions.LOG_USER,
        data
      });
      // eslint-disable-next-line no-underscore-dangle
      dispatch(loadUserShelves(data.user._id, data.token, data.refreshToken));
      // eslint-disable-next-line no-underscore-dangle
      storeToken(data.refreshToken, data.user._id);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        dispatch({
          type: notificationsActions.LOGIN_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function registerUser(userInfo: RegisterInformation) {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(BOOKSS_API.concat('/auth/register'), userInfo);
      dispatch({
        type: notificationsActions.REGISTER_USER
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        dispatch({
          type: notificationsActions.REGISTER_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function automaticLogin() {
  return async (dispatch: Dispatch) => {
    try {
      const userData = await getSavedData();
      if (!userData) throw new Error('User not logged');

      const newToken = await refreshUserToken(userData?.refreshToken, dispatch);
      if (!newToken) throw new Error('User not logged');

      dispatch({
        type: tokenActions.SAVE_REFRESH_TOKEN,
        data: userData.refreshToken
      });

      const { data } = await axios.get(BOOKSS_API.concat(`/users/${userData?.userId}`), {
        headers: {
          Authorization: `Bearer ${newToken}`
        }
      });
      dispatch({
        type: loggedUserActions.LOAD_CURRENT_USER,
        data: { user: data }
      });
      // eslint-disable-next-line no-underscore-dangle
      dispatch(loadUserShelves(data._id, newToken, userData.refreshToken));
    } catch (error: any) {
      dispatch({
        type: loggedUserActions.USER_NOT_LOGGED
      });
    }
  };
}

export function logoutUser(refreshToken: string) {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(BOOKSS_API.concat('/auth/logout'), { refreshToken });
      await clearStorage();

      dispatch({
        type: loggedUserActions.USER_NOT_LOGGED
      });
    } catch (error: any) {
      dispatch({
        type: notificationsActions.SERVER_ERROR
      });
    }
  };
}

export function updateUserBooks(
  userId: string, updateAction: any, token: string, refreshToken: string
) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.put(BOOKSS_API.concat(`/users/books/${userId}`), updateAction, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      dispatch({
        type: userBooksActions.LOAD_USER_BOOKS,
        data: data.books
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(updateUserBooks(userId, updateAction, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.SAVE_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function addUserFollowing(
  followingId: string, userId: string, token: string, refreshToken: string
) {
  return async (dispatch: any) => {
    try {
      const { data } = await axios.post(BOOKSS_API.concat(`/users/following/${userId}`),
        { followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      dispatch({
        type: loggedUserActions.UPDATE_USER_FOLLOWING,
        data: data.following
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(addUserFollowing(followingId, userId, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ADD_DELETE_FOLLOWING_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

export function deleteUserFollowing(
  followingId: string, userId: string, token: string, refreshToken: string
) {
  return async (dispatch: any) => {
    try {
      const { data } = await axios.put(BOOKSS_API.concat(`/users/following/${userId}`),
        { followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      dispatch({
        type: loggedUserActions.UPDATE_USER_FOLLOWING,
        data: data.following
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          const newToken = await refreshUserToken(refreshToken, dispatch);
          if (!newToken) throw new Error('Server error');

          dispatch(deleteUserFollowing(followingId, userId, newToken, refreshToken));
        } catch {
          dispatch({
            type: notificationsActions.SERVER_ERROR
          });
        }
      } else if (error?.response?.status === 500) {
        dispatch({
          type: notificationsActions.ADD_DELETE_FOLLOWING_ERROR
        });
      } else {
        dispatch({
          type: notificationsActions.SERVER_ERROR
        });
      }
    }
  };
}

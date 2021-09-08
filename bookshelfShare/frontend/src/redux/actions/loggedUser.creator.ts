import axios from 'axios';
import { BOOKSS_API } from '@env';
import loggedUserActions from './loggedUser.actions';
import notificationsActions from './notifications.actions';
import { clearStorage, getSavedData } from '../../services/asyncStorage';
import refreshUserToken from './tokens.creator';
import tokenActions from './token.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: Action): void
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
      const { data } = await axios.post(BOOKSS_API.concat('/auth/register'), userInfo);

      if (data) {
        dispatch({
          type: notificationsActions.REGISTER_USER
        });
      }
    } catch (error: any) {
      if (error?.response?.status === 500) {
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
        type: loggedUserActions.LOAD_USER_DATA,
        data: { user: data }
      });
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

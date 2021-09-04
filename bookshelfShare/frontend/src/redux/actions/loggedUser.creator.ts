import axios from 'axios';
import { BOOKSS_API } from '@env';
import loggedUserActions from './loggedUser.actions';
import notificationsActions from './notifications.actions';

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

      dispatch({
        type: loggedUserActions.LOG_USER,
        data
      });
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

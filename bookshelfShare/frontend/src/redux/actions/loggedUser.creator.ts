import axios from 'axios';
import { BOOKSS_API } from '@env';
import loggedUserActions from './loggedUser.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: Action): void
}

interface Action {
    type: string,
    data: any
}

interface LoginInformation {
    email: string,
    password: string
}

export default function loginUser(userInfo: LoginInformation) {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(BOOKSS_API.concat('/auth/login'), userInfo);
      dispatch({
        type: loggedUserActions.LOG_USER,
        data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
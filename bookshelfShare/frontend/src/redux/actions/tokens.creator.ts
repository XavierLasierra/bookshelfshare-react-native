import { BOOKSS_API } from '@env';
import axios from 'axios';
import tokenActions from './token.actions';

interface Dispatch {
    // eslint-disable-next-line no-unused-vars
    (action: Action): void
}

interface Action {
    type: string,
    data?: any
}

export default async function refreshUserToken(refreshToken: string, dispatch: Dispatch) {
  try {
    const { data } = await axios.post(BOOKSS_API.concat('/auth/refreshToken'), { refreshToken });

    dispatch({
      type: tokenActions.REFRESH_TOKEN,
      data
    });

    return data.token;
  } catch (error: any) {
    return false;
  }
}

import tokenActions from '../actions/token.actions';
import loggedUserActions from '../actions/loggedUser.actions';
import initialState from '../../constants/tokensInitialState.constant';

interface Action {
    type: string,
    data: any
}

interface Tokens {
  token?: string,
  refreshToken?: string
}

function tokensReducer(tokens = initialState, action: Action): Tokens {
  let newTokens: Tokens = tokens;
  switch (action.type) {
    case loggedUserActions.LOG_USER:
      newTokens = {
        token: action.data.token,
        refreshToken: action.data.refreshToken
      };
      break;
    case tokenActions.REFRESH_TOKEN:
      newTokens = {
        ...newTokens,
        token: action.data.token
      };
      break;
    case tokenActions.SAVE_REFRESH_TOKEN:
      newTokens = {
        ...newTokens,
        refreshToken: action.data
      };
      break;
    default:
      break;
  }
  return newTokens;
}

export default tokensReducer;

import tokenActions from '../actions/token.actions';
import loggedUserActions from '../actions/loggedUser.actions';

interface Action {
    type: string,
    data: any
}

interface Tokens {
  token?: string,
  refreshToken?: string
}

function tokensReducer(tokens = {}, action: Action): Tokens {
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
    default:
      break;
  }
  return newTokens;
}

export default tokensReducer;

import initialState from '../../constants/userSocialsInitialState.constant';
import loggedUserActions from '../actions/loggedUser.actions';

function userSocialsReducer(socials = initialState, action: any): any {
  let newSocials: any = socials;

  switch (action.type) {
    case loggedUserActions.LOG_USER:
    case loggedUserActions.LOAD_CURRENT_USER:
      newSocials = {
        following: action.data.user.following,
        followers: action.data.user.followers
      };
      break;
    default:
      break;
  }
  return newSocials;
}
export default userSocialsReducer;

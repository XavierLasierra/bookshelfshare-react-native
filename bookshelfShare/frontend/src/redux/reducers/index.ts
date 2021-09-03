import { combineReducers } from 'redux';
import loggedUser from './loggedUser.reducer';
import notifications from './notifications.reducer';

export default combineReducers({
  loggedUser,
  notifications
});

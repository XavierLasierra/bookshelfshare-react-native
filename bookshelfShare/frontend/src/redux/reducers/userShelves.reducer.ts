import notificationsActions from '../actions/notifications.actions';
import userShelvesActions from '../actions/userShelves.actions';

interface Action {
    type: string,
    data: any
}

function userShelvesReducer(shelves = [], action: Action): any {
  let newShelves: any = shelves;
  switch (action.type) {
    case userShelvesActions.LOAD_USER_SHELVES:
      newShelves = action.data;
      break;
    case userShelvesActions.ADD_NEW_SHELF:
      newShelves = [...newShelves, action.data];
      break;
    case userShelvesActions.DELETE_BOOK_FROM_SHELF:
    case userShelvesActions.ADD_BOOK_TO_SHELF:
      newShelves = [
        // eslint-disable-next-line no-underscore-dangle
        ...newShelves.filter(({ _id }: any) => _id !== action.data._id),
        action.data
      ];
      break;
    case notificationsActions.ADD_TO_SHELF_ERROR:
      newShelves = [...newShelves];
      break;
    default:
      break;
  }
  newShelves.sort((a: any, b: any) => a?.name.localeCompare(b?.name));
  return newShelves;
}

export default userShelvesReducer;

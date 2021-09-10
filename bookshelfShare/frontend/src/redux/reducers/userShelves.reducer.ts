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
    default:
      break;
  }
  return newShelves;
}

export default userShelvesReducer;

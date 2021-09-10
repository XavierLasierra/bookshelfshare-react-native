interface Action {
    type: string,
    data: any
}

function userShelvesReducer(shelves = [], action: Action): any {
  let newShelves: any = shelves;
  if (action) {
    newShelves = [];
  }
  return newShelves;
}

export default userShelvesReducer;

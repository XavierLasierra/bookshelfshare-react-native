const List = require('../models/list.model');

async function getLists({ query }, res) {
  try {
    const foundLists = await List.find(query);

    res.json(foundLists);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function createList({ body }, res) {
  try {
    const alreadyExistingList = await List.findOne(body);

    if (alreadyExistingList) return res.sendStatus(409);

    const createdList = await List.create(body);

    return res.json(createdList);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function getListById({ params: { listId } }, res) {
  try {
    const foundList = await List.findById(listId);

    if (!foundList) return res.sendStatus(404);

    return res.json(foundList);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}
async function deleteListById({ params: { listId }, body: { user } }, res) {
  try {
    const listToDelete = await List.findById(listId);

    if (!listToDelete) return res.sendStatus(404);

    if (listToDelete.users.length <= 1) {
      listToDelete.delete();
    } else {
      listToDelete.users = listToDelete.users.filter((userFromList) => `${userFromList}` !== user);
      listToDelete.save();
    }

    res.status(200);
    return res.send();
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}
async function updateListById({ params: { listId }, body }, res) {
  try {
    const updatedList = await List.findByIdAndUpdate(
      listId,
      body,
      { new: true }
    );

    res.json(updatedList);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function updateUsersList({ params: { listId }, body: { user } }, res) {
  try {
    const foundList = await List.findById(listId);

    if (!foundList) return res.sendStatus(404);
    if (foundList.users.some((userFromList) => `${userFromList}` === user)) return res.sendStatus(409);

    foundList.users.push(user);
    foundList.save();

    return res.json(foundList);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

async function updateBooksFromList({ params: { listId }, body }, res) {
  try {
    const listToUpdate = await List.findById(listId);

    if (!listToUpdate) return res.sendStatus(404);

    if (body.actionType === 'ADD') {
      const bookToUpdate = listToUpdate.books.find(({ bookISBN }) => bookISBN === body.bookISBN);
      if (bookToUpdate) {
        bookToUpdate.customInformation = body.customInformation;
      } else {
        listToUpdate.books.push({
          bookISBN: body.bookISBN,
          customInformation: body.customInformation
        });
      }
    } else if (body.actionType === 'DELETE') {
      listToUpdate.books = listToUpdate.books.filter(({ bookISBN }) => bookISBN !== body.bookISBN);
    }

    listToUpdate.save();

    return res.json(listToUpdate);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

module.exports = {
  getLists,
  createList,
  getListById,
  deleteListById,
  updateListById,
  updateUsersList,
  updateBooksFromList
};

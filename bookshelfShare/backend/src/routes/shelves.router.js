const { Router } = require('express');
const passport = require('passport');
const {
  getLists,
  createList,
  getListById,
  deleteListById,
  updateListById,
  updateListUsers,
  updateBooksFromList
} = require('../controllers/shelves.controller');

const listsRouter = new Router();

listsRouter
  .route('/addUser/:shelfId')
  .all(passport.authenticate('jwt', { session: false }))
  .put(updateListUsers);

listsRouter
  .route('/book/:shelfId')
  .all(passport.authenticate('jwt', { session: false }))
  .put(updateBooksFromList);

listsRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getLists)
  .post(createList);

listsRouter
  .route('/:shelfId')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getListById)
  .delete(deleteListById)
  .put(updateListById);

module.exports = listsRouter;

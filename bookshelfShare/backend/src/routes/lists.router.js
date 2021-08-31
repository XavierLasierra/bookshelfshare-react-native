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
} = require('../controllers/lists.controller');

const listsRouter = new Router();

listsRouter
  .route('/addUser/:listId')
  .all(passport.authenticate('jwt', { session: false }))
  .put(updateListUsers);

listsRouter
  .route('/book/:listId')
  .all(passport.authenticate('jwt', { session: false }))
  .put(updateBooksFromList);

listsRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getLists)
  .post(createList);

listsRouter
  .route('/:listId')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getListById)
  .delete(deleteListById)
  .put(updateListById);

module.exports = listsRouter;

const { Router } = require('express');
const passport = require('passport');
const {
  getUsers,
  getOneUserById,
  deleteOneUserById,
  updateOneUserById,
  updateUserBooks,
  addUserFollowing,
  deleteUserFollowing
} = require('../controllers/users.controller');

const usersRouter = new Router();

usersRouter
  .route('/following/:userId')
  .all(passport.authenticate('jwt', { session: false }))
  .post(addUserFollowing)
  .delete(deleteUserFollowing);

usersRouter
  .route('/books/:userId')
  .all(passport.authenticate('jwt', { session: false }))
  .put(updateUserBooks);

usersRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getUsers);

usersRouter
  .route('/:userId')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getOneUserById)
  .delete(deleteOneUserById)
  .put(updateOneUserById);

module.exports = usersRouter;

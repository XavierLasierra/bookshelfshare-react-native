const { Router } = require('express');
const passport = require('passport');
const {
  getUsers
} = require('../controllers/users.controller');

const booksRouter = new Router();

booksRouter
  .route('/')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getUsers);

module.exports = booksRouter;

const { Router } = require('express');
const passport = require('passport');
const {
  getBooks
} = require('../controllers/books.controller');

const booksRouter = new Router();

booksRouter
  .route('/search')
  .all(passport.authenticate('jwt', { session: false }))
  .get(getBooks);

module.exports = booksRouter;

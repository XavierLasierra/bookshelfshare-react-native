const { Router } = require("express");
const passport = require("passport");
const {
  getBooks,
  getBookRating,
  addUpdateBookRating,
  getBookDataFromIsbn,
} = require("../controllers/books.controller");

const booksRouter = new Router();

booksRouter
  .route("/search")
  .all(passport.authenticate("jwt", { session: false }))
  .get(getBooks);

booksRouter
  .route("/rating/:bookIsbn")
  .all(passport.authenticate("jwt", { session: false }))
  .get(getBookRating)
  .post(addUpdateBookRating);

booksRouter
  .route("/getData")
  .all(passport.authenticate("jwt", { session: false }))
  .post(getBookDataFromIsbn);

module.exports = booksRouter;

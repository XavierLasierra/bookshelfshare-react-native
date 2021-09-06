const axios = require('axios');
const BookClass = require('../classes/book.class');
const Book = require('../models/book.model');

function createGoogleSearchUrl(query) {
  const queryEntries = Object.entries(query);
  const url = queryEntries
    .reduce((acc, queryElement, index) => `${acc}${queryElement[0]}:${queryElement[1]}${index < queryEntries.length - 1 ? '+' : ''}`, process.env.GOOGLE_API_URL);
  return `${url}&key=${process.env.GOOGLE_API_KEY}`;
}

async function getBooks({ query }, res) {
  try {
    const url = createGoogleSearchUrl(query);
    const { data: { items } } = await axios.get(url);

    const foundBooks = items.map((book) => new BookClass(book));

    res.json(foundBooks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getBookRating({ params: { bookIsbn } }, res) {
  try {
    const foundBook = await Book.findOne({ bookIsbn });
    if (!foundBook) return res.json({ ratings: [] });

    return res.json(foundBook);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}
async function addBookRating({ params: { bookIsbn }, body }, res) {
  try {
    let foundBook = await Book.findOne({ bookIsbn });

    if (!foundBook) {
      foundBook = await Book.create({ bookIsbn });
    }

    foundBook.ratings.push({
      user: body.user,
      rating: body.rating,
      review: body.review
    });

    foundBook.save();

    res.json(foundBook);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function updateBookRating({ params: { bookIsbn }, body }, res) {
  try {
    const foundBook = await Book.findOne({ bookIsbn });

    if (!foundBook) return res.sendStatus(404);

    foundBook.ratings = foundBook.ratings.map((rating) => (`${rating.user}` === body.user
      ? {
        user: body.user,
        rating: body.rating,
        review: body.review
      }
      : rating));

    foundBook.save();

    return res.json(foundBook);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}

module.exports = {
  getBooks,
  createGoogleSearchUrl,
  getBookRating,
  addBookRating,
  updateBookRating
};

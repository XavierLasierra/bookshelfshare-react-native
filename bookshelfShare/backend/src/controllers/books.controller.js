const axios = require('axios');
const BookClass = require('../classes/book.class');
const Book = require('../models/book.model');
const { getBooksDataFromArray } = require('../services/bookDataGetter');

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
    const foundBook = await Book.findOne({ bookIsbn }).populate({ path: 'ratings.user', select: 'username' });
    if (!foundBook) return res.json({ ratings: [] });

    return res.json(foundBook);
  } catch (error) {
    res.status(500);
    return res.send(error);
  }
}
async function addUpdateBookRating({ params: { bookIsbn }, body }, res) {
  try {
    let foundBook = await Book.findOne({ bookIsbn });

    if (!foundBook) {
      foundBook = await Book.create({ bookIsbn });
    }

    const foundRating = foundBook.ratings.find((rating) => `${rating.user}` === body.user);
    if (foundRating) {
      foundRating.user = body.user;
      foundRating.rating = body.rating;
      foundRating.review = body.review;
    } else {
      foundBook.ratings.push({
        user: body.user,
        rating: body.rating,
        review: body.review
      });
    }
    const updatedBook = await foundBook.save();
    await updatedBook.populate({ path: 'ratings.user', select: 'username' });
    res.json(updatedBook);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

async function getBookDataFromIsbn({ body }, res) {
  try {
    const bookData = await getBooksDataFromArray(body);
    res.json(bookData);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = {
  getBooks,
  createGoogleSearchUrl,
  getBookRating,
  addUpdateBookRating,
  getBookDataFromIsbn
};

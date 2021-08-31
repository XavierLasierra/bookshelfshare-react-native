const axios = require('axios');
const Book = require('../classes/book.class');
const defaultBook = require('../constants/defaultBook');

function cleanBookData({ value }) {
  if (value.status !== 200 || value.data.totalItems === 0) {
    return defaultBook;
  }
  const book = new Book(value.data.items[0]);
  return book;
}

async function getBooksDataFromList(bookList) {
  try {
    const booksISBNPromises = bookList.books.map(({ bookISBN }) => axios.get(`${process.env.GOOGLE_API_URL}isbn:${bookISBN}&key=${process.env.GOOGLE_API_KEY}`));

    const booksData = await Promise.allSettled(booksISBNPromises);
    const treatedBookData = booksData.map((book) => cleanBookData(book));
    return {
      ...bookList,
      books: bookList.books.map((book, index) => ({
        ...book,
        bookData: treatedBookData[index]
      }))
    };
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getBooksDataFromList
};

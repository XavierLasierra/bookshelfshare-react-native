const axios = require('axios');
const Book = require('../classes/book.class');

function cleanBookData({ value }) {
  if (value?.status !== 200 || value?.data?.totalItems === 0) {
    return new Book();
  }
  return new Book(value?.data?.items[0]);
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

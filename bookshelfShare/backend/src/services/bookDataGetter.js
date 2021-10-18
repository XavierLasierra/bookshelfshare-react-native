const axios = require("axios");
const Book = require("../classes/book.class");

function cleanBookData({ value }) {
  if (value.status !== 200 || !value?.data?.items) {
    return new Book({ volumeInfo: {} });
  }
  return new Book(value.data.items[0]);
}

async function getBooksDataFromList(bookList) {
  try {
    const booksISBNPromises = bookList.books.map(({ bookIsbn }) =>
      axios.get(
        `${process.env.GOOGLE_API_URL}isbn:${bookIsbn}&key=${process.env.GOOGLE_API_KEY}`
      )
    );

    const booksData = await Promise.allSettled(booksISBNPromises);
    const treatedBookData = booksData.map((book) => cleanBookData(book));
    return {
      ...bookList,
      books: bookList.books.map((book, index) => ({
        ...book,
        bookData: treatedBookData[index],
      })),
    };
  } catch (error) {
    return error;
  }
}

async function getBooksDataFromArray(bookIsbnArray) {
  try {
    const booksISBNPromises = bookIsbnArray.map((bookISBN) =>
      axios.get(
        `${process.env.GOOGLE_API_URL}isbn:${bookISBN}&key=${process.env.GOOGLE_API_KEY}`
      )
    );
    const booksData = await Promise.allSettled(booksISBNPromises);
    return booksData.map((book) => cleanBookData(book));
  } catch (error) {
    return error;
  }
}

module.exports = {
  getBooksDataFromList,
  getBooksDataFromArray,
};

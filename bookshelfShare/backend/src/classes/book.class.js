const defaultBook = require('../constants/defaultBook');

class Book {
  constructor({ volumeInfo }) {
    this.title = volumeInfo.title || defaultBook.title;
    this.subtitle = volumeInfo.subtitle || defaultBook.subtitle;
    this.authors = volumeInfo.authors || defaultBook.authors;
    this.publisher = volumeInfo.publisher || defaultBook.publisher;
    this.publishedDate = volumeInfo.publishedDate || defaultBook.publishedDate;
    this.language = volumeInfo.language || defaultBook.language;
    this.description = volumeInfo.description || defaultBook.description;
    this.isbn = {
      ISBN13: volumeInfo.industryIdentifiers.reduce((acc, isbn) => (isbn.type === 'ISBN_13' ? isbn.identifier : acc), '') || defaultBook.isbn.ISBN13,
      ISBN10: volumeInfo.industryIdentifiers.reduce((acc, isbn) => (isbn.type === 'ISBN_10' ? isbn.identifier : acc), '') || defaultBook.isbn.ISBN10
    };
    this.pageCount = volumeInfo.pageCount || defaultBook.pageCount;
    this.format = volumeInfo.printType || defaultBook.format;
    this.categories = volumeInfo.categories || defaultBook.categories;
    this.images = {
      thumbnail: volumeInfo.imageLinks?.thumbnail,
      smallThumbnail: volumeInfo.imageLinks?.smallThumbnail || defaultBook.images.smallThumbnail
    };
  }
}

module.exports = Book;

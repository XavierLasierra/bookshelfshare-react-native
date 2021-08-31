class Book {
  constructor({ volumeInfo }) {
    this.title = volumeInfo.title;
    this.subtitle = volumeInfo.subtitle;
    this.authors = volumeInfo.authors;
    this.publisher = volumeInfo.publisher || 'No publisher data';
    this.publishedDate = volumeInfo.publishedDate;
    this.language = volumeInfo.language;
    this.description = volumeInfo.description;
    this.isbn = volumeInfo.industryIdentifiers;
    this.pageCount = volumeInfo.pageCount;
    this.format = volumeInfo.printType;
    this.categories = volumeInfo.categories;
    this.images = volumeInfo.imageLinks;
  }
}

module.exports = Book;

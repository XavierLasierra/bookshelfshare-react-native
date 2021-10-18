import bookDetailsMock from '../mocks/bookDetails.mock';
import {bookFilter, bookShelfListFilter} from './bookFilter';

describe('Given a bookFilter function', () => {
  describe('When it is triggered', () => {
    describe('And you search Debolsillo', () => {
      test('Then should return booksDetailMock[1]', () => {
        const result = bookFilter('Debolsillo', bookDetailsMock);
        expect(result).toEqual([bookDetailsMock[1]]);
      });
    });
    describe('And you search 1984', () => {
      test('Then should return booksDetailMock[0]', () => {
        const result = bookFilter('1984', bookDetailsMock);
        expect(result).toEqual([bookDetailsMock[0]]);
      });
    });
    describe('And you search 9780451524935', () => {
      test('Then should return booksDetailMock[0]', () => {
        const result = bookFilter('9780451524935', bookDetailsMock);
        expect(result).toEqual([bookDetailsMock[0]]);
      });
    });
    describe('And you search 0123456789', () => {
      test('Then should return booksDetailMock[1]', () => {
        const result = bookFilter('0123456789', bookDetailsMock);
        expect(result).toEqual([bookDetailsMock[1]]);
      });
    });
    describe('And you search Orwell', () => {
      test('Then should return booksDetailMock', () => {
        const result = bookFilter('Orwell', bookDetailsMock);
        expect(result).toEqual(bookDetailsMock);
      });
    });
  });
});

describe('Given a bookShelfListFilter function', () => {
  describe('When it is triggered', () => {
    const bookshelfBooks = [
      {bookData: bookDetailsMock[0]},
      {bookData: bookDetailsMock[1]},
    ];
    describe('And you search Debolsillo', () => {
      test('Then should return booksDetailMock[1]', () => {
        const result = bookShelfListFilter('Debolsillo', bookshelfBooks);
        expect(result).toEqual([{bookData: bookDetailsMock[1]}]);
      });
    });
    describe('And you search 1984', () => {
      test('Then should return booksDetailMock[0]', () => {
        const result = bookShelfListFilter('1984', bookshelfBooks);
        expect(result).toEqual([{bookData: bookDetailsMock[0]}]);
      });
    });
    describe('And you search 9780451524935', () => {
      test('Then should return booksDetailMock[0]', () => {
        const result = bookShelfListFilter('9780451524935', bookshelfBooks);
        expect(result).toEqual([{bookData: bookDetailsMock[0]}]);
      });
    });
    describe('And you search 0123456789', () => {
      test('Then should return booksDetailMock[1]', () => {
        const result = bookShelfListFilter('0123456789', bookshelfBooks);
        expect(result).toEqual([{bookData: bookDetailsMock[1]}]);
      });
    });
    describe('And you search Orwell', () => {
      test('Then should return booksDetailMock', () => {
        const result = bookShelfListFilter('Orwell', bookshelfBooks);
        expect(result).toEqual(bookshelfBooks);
      });
    });
  });
});

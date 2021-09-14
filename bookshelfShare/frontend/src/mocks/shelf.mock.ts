import bookDetailsMock from './bookDetails.mock';

export default {
  _id: '1',
  name: 'Shelf',
  shelf: [2, 2],
  books: [
    {
      bookIsbn: '1',
      bookData: bookDetailsMock[0],
      customInformation: {
        location: [0, 0]
      }
    }
  ]
};

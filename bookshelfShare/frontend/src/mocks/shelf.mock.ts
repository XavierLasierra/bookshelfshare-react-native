import bookDetailsMock from './bookDetails.mock';

export default {
  _id: '1',
  users: [
    {
      _id: '1',
      photo: 'photo'
    }, {
      _id: '2',
      photo: 'photo'
    }, {
      _id: '3',
      photo: 'photo'
    }, {
      _id: '4',
      photo: 'photo'
    }
  ],
  name: 'Shelf',
  shelf: [2, 2],
  books: [
    {
      bookIsbn: '1',
      bookData: bookDetailsMock[0],
      customInformation: {
        location: [0, 0]
      }
    },
    {
      bookIsbn: '2',
      bookData: bookDetailsMock[1],
      customInformation: {
        location: [0, 0]
      }
    }
  ]
};

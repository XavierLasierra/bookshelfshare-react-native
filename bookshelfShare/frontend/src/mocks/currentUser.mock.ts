export default [
  {
    results: true,
    user: {
      _id: '2',
      username: 'User1',
      email: 'user1@gmail.com',
      photo: 'photo',
      followers: [],
      following: [],
      books: {
        read: [],
        reading: [],
        toRead: [],
        wishlist: []
      }
    }
  },
  {
    results: true,
    user: {
      _id: '3',
      username: 'User2',
      email: 'user2@gmail.com',
      photo: 'photo',
      followers: [{
        _id: '1'
      }],
      following: [{
        _id: '1'
      }],
      books: {
        read: [],
        reading: [],
        toRead: [],
        wishlist: []
      }
    }
  }
];

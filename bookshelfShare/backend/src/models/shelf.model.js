const mongoose = require('mongoose');

const shelfSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  shelf: [Number],
  books: [
    {
      bookIsbn: String,
      customInformation: {
        notes: String,
        location: [Number]
      }
    }
  ]
});

module.exports = mongoose.model('Shelf', shelfSchema);

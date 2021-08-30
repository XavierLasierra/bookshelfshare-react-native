const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  books: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      customInformation: {
        notes: String
      }
    }
  ]
});

module.exports = mongoose.model('List', listSchema);

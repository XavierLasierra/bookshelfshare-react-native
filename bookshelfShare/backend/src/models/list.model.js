const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  books: [
    {
      bookISBN: String,
      customInformation: {
        notes: String
      }
    }
  ]
});

module.exports = mongoose.model('List', listSchema);

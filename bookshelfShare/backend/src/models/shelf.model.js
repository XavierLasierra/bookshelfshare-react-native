const mongoose = require('mongoose');

const shelfSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shelf: {
    columns: Number,
    rows: Number
  },
  books: [
    {
      bookISBN: String,
      customInformation: {
        notes: String,
        column: Number,
        row: Number
      }
    }
  ]
});

module.exports = mongoose.model('Shelf', shelfSchema);

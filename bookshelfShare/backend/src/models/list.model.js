const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  shelf: [Number],
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

module.exports = mongoose.model('List', listSchema);

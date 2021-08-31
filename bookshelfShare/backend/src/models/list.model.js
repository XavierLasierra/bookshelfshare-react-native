const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: String,
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

const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: String,
  subtitle: String,
  author: [String],
  publisher: String,
  publishedDate: Date,
  description: String,
  ISBN: {
    ISBN10: String,
    ISBN13: String
  },
  pageCount: Number,
  format: String,
  categories: [String],
  images: {
    smallThumbnail: String,
    thumbnail: String
  },
  rating: [
    {
      rate: Number,
      review: String,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ]
});

module.exports = mongoose.model('Book', bookSchema);

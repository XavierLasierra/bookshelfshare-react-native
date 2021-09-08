const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const defaultPhoto = require('../constants/defaultProfileImage');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  photo: { type: String, default: defaultPhoto },
  activity: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      title: String,
      rating: Number,
      description: String
    }
  ],
  books: {
    read: [String],
    pending: [String],
    whishlist: [String],
    current: [String]
  }
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

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
    wishlist: [String],
    reading: [String]
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

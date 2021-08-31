const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  activity: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      title: String,
      rating: Number,
      description: String
    }
  ]
});

userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

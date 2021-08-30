const mongoose = require('mongoose');

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
  return password === this.password;
};

module.exports = mongoose.model('User', userSchema);

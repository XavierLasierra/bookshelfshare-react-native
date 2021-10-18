const mongoose = require("mongoose");
const defaultPhoto = require("../constants/defaultProfileImage");
const { isValidPassword } = require("../utils/isValidPassword");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  photo: { type: String, default: defaultPhoto },
  activity: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      rating: Number,
      description: String,
    },
  ],
  books: {
    read: [String],
    toRead: [String],
    wishlist: [String],
    reading: [String],
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

userSchema.methods.isValidPassword = isValidPassword;

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookIsbn: String,
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      review: String,
    },
  ],
});

module.exports = mongoose.model("Book", bookSchema);

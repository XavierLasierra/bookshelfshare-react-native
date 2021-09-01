const axios = require('axios');
const Book = require('../classes/book.class');

function createGoogleSearchUrl(query) {
  const queryEntries = Object.entries(query);
  const url = queryEntries
    .reduce((acc, queryElement, index) => `${acc}${queryElement[0]}:${queryElement[1]}${index < queryEntries.length - 1 ? '+' : ''}`, process.env.GOOGLE_API_URL);
  return `${url}&key=${process.env.GOOGLE_API_KEY}`;
}

async function getBooks({ query }, res) {
  try {
    const url = createGoogleSearchUrl(query);
    const { data: { items } } = await axios.get(url);

    const foundBooks = items.map((book) => new Book(book));

    res.json(foundBooks);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}

module.exports = {
  getBooks,
  createGoogleSearchUrl
};

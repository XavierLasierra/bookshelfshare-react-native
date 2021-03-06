export default [
  {
    _id: '1',
    title: '1984',
    subtitle: 'A Novel',
    authors: ['George Orwell'],
    publisher: 'No publisher found',
    publishedDate: '2009',
    language: 'en',
    description:
      'Winston Smith is a worker at the Ministry of Truth, where he falsifies records for the party. Secretly subversive, he and his colleague Julia try to free themselves from political slavery but the price of freedom is betrayal.',
    isbn: {
      ISBN13: '9780451524935',
      ISBN10: '0451524934',
    },
    pageCount: 190,
    format: 'BOOK',
    categories: ['London (England)'],
    images: {
      thumbnail: 'thumbnail1',
      smallThumbnail: 'smallThumbnail1',
    },
  },
  {
    _id: '2',
    title: 'Title',
    subtitle: 'Subtitle',
    authors: ['Orwell', 'Another author', 'Last author'],
    publisher: 'Debolsillo',
    publishedDate: 'date',
    language: 'en',
    description:
      'Winston Smith is a worker at the Ministry of Truth, where he falsifies records for the party. Secretly subversive, he and his colleague Julia try to free themselves from political slavery but the price of freedom is betrayal.',
    isbn: {
      ISBN13: '4567765432123',
      ISBN10: '0123456789',
    },
    pageCount: 190,
    format: 'BOOK',
    categories: ['London (England)', 'Fiction', 'Another'],
    images: {
      smallThumbnail: 'smallThumbnail2',
    },
  },
];

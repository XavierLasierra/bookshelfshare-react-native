export function bookFilter(text: string, books: any) {
  return books.reduce((acc: any, book: any) => {
    if (book.title.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.publisher.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.isbn.ISBN13.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.isbn.ISBN10.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.authors.some((author: string) => author.toLowerCase()
      .includes(text.toLowerCase()))) return [...acc, book];

    return acc;
  }, []);
}

export function bookShelfListFilter(text: string, books: any) {
  return books.reduce((acc: any, book: any) => {
    if (book.bookData.title.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.bookData.publisher.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.bookData.isbn.ISBN13.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.bookData.isbn.ISBN10.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
    if (book.bookData.authors.some((author: string) => author.toLowerCase()
      .includes(text.toLowerCase()))) return [...acc, book];

    return acc;
  }, []);
}

export function bookShelfLocationFilter(filterLocation: number[], books: any) {
  return books.filter(({ customInformation: { location } }: any) => JSON.stringify(location)
  === JSON.stringify(filterLocation));
}

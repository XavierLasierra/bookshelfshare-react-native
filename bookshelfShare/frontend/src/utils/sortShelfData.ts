export default function sortShelfData(shelf: any) {
  return shelf?.books.reduce((acc: any, book: any) => {
    const foundShelfBox = acc.find(({ location }: any) => JSON.stringify(location)
         === JSON.stringify(book?.customInformation?.location));
    if (foundShelfBox) {
      foundShelfBox.books.push(book.bookData);
    } else {
      acc.push({
        location: book?.customInformation?.location,
        books: [book.bookData]
      });
    }
    return acc;
  }, []);
}

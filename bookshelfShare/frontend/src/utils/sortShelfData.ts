export default function sortShelfData(shelf: any) {
  return shelf?.books.reduce((acc: any, bookData: any) => {
    const foundShelfBox = acc.find(({ location }: any) => JSON.stringify(location)
         === JSON.stringify(bookData?.customInformation?.location));
    if (foundShelfBox) {
      foundShelfBox.books.push(bookData.bookIsbn);
    } else {
      acc.push({
        location: bookData?.customInformation?.location,
        books: [bookData.bookIsbn]
      });
    }
    return acc;
  }, []);
}

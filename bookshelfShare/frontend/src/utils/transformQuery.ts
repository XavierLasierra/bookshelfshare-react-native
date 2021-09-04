interface Query {
    isbn?: string,
    inauthor?: string,
    intitle?: string,
    inpublisher?: string
}

export default function transformQuery(query: Query):string {
  const queryEntries = Object.entries(query);
  return queryEntries
    .reduce((acc, queryElement, index) => (queryElement[1].length > 0
      ? `${acc}${queryElement[0]}=${queryElement[1]}${index < queryEntries.length - 1 ? '+' : ''}`
      : acc), '');
}

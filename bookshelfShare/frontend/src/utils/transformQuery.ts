interface Query {
    isbn?: string,
    inauthor?: string,
    intitle?: string,
    inpublisher?: string
}

export default function transformQuery(query: Query):string {
  const queryEntries = Object.entries(query);
  const url = queryEntries
    .reduce((acc, queryElement, index) => `${acc}${queryElement[0]}=${queryElement[1]}${index < queryEntries.length - 1 ? '+' : ''}`, '');
  return `${url}&key=${process.env.GOOGLE_API_KEY}`;
}

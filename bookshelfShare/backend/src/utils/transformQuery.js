function transformQuery(query) {
  let transformedQuery = {};
  const entries = Object.entries(query);
  if (entries.length > 0) {
    entries.forEach(([property, filter]) => {
      if (property.includes('_')) {
        const [propertyName, symbol] = property.split('_');
        transformedQuery = { ...transformedQuery, [propertyName]: { [`$${symbol}`]: filter } };
      } else {
        transformedQuery = { ...transformedQuery, [property]: { $regex: filter, $options: 'i' } };
      }
    });
  }
  return transformedQuery;
}

module.exports = { transformQuery };

function transformQuery(query) {
  const entries = Object.entries(query);
  return entries.reduce((acc, [property, filter]) => [...acc, { [property]: { $regex: filter, $options: 'i' } }],
    []);
}

module.exports = { transformQuery };

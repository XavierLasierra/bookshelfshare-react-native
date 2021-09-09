import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import styles from './bookListFilter.styles';

export default function BookListFilter({ listName, books, setFilteredBooks }: any) {
  const [filter, setFilter] = useState('');

  function handleFilter(text: string) {
    const filteredBooks = books.reduce((acc: any, book: any) => {
      if (book.title.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
      if (book.publisher.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
      if (book.isbn.ISBN13.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
      if (book.isbn.ISBN10.toLowerCase().includes(text.toLowerCase())) return [...acc, book];
      if (book.authors.some((author: string) => author.toLowerCase()
        .includes(text.toLowerCase()))) return [...acc, book];

      return acc;
    }, []);
    console.log(text);
    setFilteredBooks(filteredBooks);
    setFilter(text);
  }

  return (
    <View style={styles.bookListFilterContainer}>
      <Text style={styles.listTitle}>{listName.toUpperCase()}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Filter by title/author/publisher/isbn"
          value={filter}
          onChangeText={handleFilter}
        />
      </View>
    </View>
  );
}

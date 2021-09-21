import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { IBookListFilterProps } from '../../types/interfaces';

import { bookFilter } from '../../utils/bookFilter';

import styles from './bookListFilter.styles';

export default function BookListFilter({
  listName,
  books,
  setFilteredBooks
}: IBookListFilterProps) {
  const [filter, setFilter] = useState('');

  function handleFilter(text: string) {
    setFilteredBooks(bookFilter(text, books));
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
          maxLength={25}
          testID="filterInput"
        />
      </View>
    </View>
  );
}

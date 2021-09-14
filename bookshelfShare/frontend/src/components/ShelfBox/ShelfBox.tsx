import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import styles from './shelfBox.styles';

export default function ShelfBox({
  width, clickCallback, row, column, activeShelf, numberOfBooks
}: any) {
  return (
    <View style={[styles.shelfBoxOutline, { width }]}>
      <TouchableOpacity
        style={[
          styles.shelfInside,
          JSON.stringify(activeShelf) === JSON.stringify([row, column]) && styles.activeShelf]}
        onPress={() => clickCallback([row, column])}
        testID={`shelf-${row}-${column}`}
      >
        <Text style={styles.numberOfBooksText}>{numberOfBooks}</Text>
        <Text style={styles.numberOfBooksText}>
          {numberOfBooks === 1
            ? 'book'
            : 'books'}

        </Text>
      </TouchableOpacity>
    </View>
  );
}

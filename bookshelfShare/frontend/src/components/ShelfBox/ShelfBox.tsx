import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './shelfBox.styles';

export default function ShelfBox({
  width, clickCallback, row, column, activeShelf
}: any) {
  return (
    <View style={[styles.shelfBoxOutline, { width }]}>
      <TouchableOpacity
        style={[
          styles.shelfInside,
          JSON.stringify(activeShelf) === JSON.stringify([row, column]) && styles.activeShelf]}
        onPress={() => clickCallback([row, column])}
      />
    </View>
  );
}

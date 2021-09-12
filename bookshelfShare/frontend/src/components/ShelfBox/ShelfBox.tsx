import React from 'react';
import { View } from 'react-native';

import styles from './shelfBox.styles';

export default function ShelfBox({ width }: any) {
  return (
    <View style={[styles.shelfBoxOutline, { width }]}>
      <View style={styles.shelfInside} />
    </View>
  );
}

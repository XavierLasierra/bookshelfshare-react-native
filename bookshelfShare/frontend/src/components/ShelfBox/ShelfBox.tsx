import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './shelfBox.styles';

export default function ShelfBox({ width }: any) {
  return (
    <View style={[styles.shelfBoxOutline, { width }]}>
      <TouchableOpacity style={styles.shelfInside} />
    </View>
  );
}

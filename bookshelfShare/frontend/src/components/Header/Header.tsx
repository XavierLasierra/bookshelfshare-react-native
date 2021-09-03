import React from 'react';
import { View } from 'react-native';
import styles from './header.styles';

export default function Header({ Logo }:any) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Logo width={45} height={45} />
      </View>
      <View style={styles.tailContainer}>
        <View style={styles.tailBack}>
          <View style={styles.tailFront} />
        </View>
      </View>

    </View>
  );
}

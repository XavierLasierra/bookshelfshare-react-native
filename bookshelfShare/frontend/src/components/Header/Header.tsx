import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import ArrowIcon from '../../assets/arrowIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './header.styles';

export default function Header({ Logo, BackButton, navigation }:any) {
  return (
    <>
      {BackButton && (
      <TouchableOpacity
        style={globalStyles.backButtonTop}
        onPress={() => navigation.pop()}
      >
        <ArrowIcon width={30} height={30} style={globalStyles.backButtonIcon} />
      </TouchableOpacity>
      )}
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
    </>
  );
}

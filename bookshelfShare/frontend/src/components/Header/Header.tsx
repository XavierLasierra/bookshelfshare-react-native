import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {IHeaderProps} from '../../types/interfaces';

import ArrowIcon from '../../assets/arrowIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './header.styles';

export default function Header({Logo, BackButton, navigation}: IHeaderProps) {
  return (
    <>
      {BackButton && (
        <TouchableOpacity
          testID="backButton"
          style={globalStyles.backButtonTop}
          onPress={() => navigation && navigation.pop()}>
          <ArrowIcon
            width={30}
            height={30}
            style={globalStyles.backButtonIcon}
          />
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

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';

import styles from './initialLoading.styles';

import BookIcon from '../../assets/bookIcon.svg';

export default function InitialLoading({
  navigation
}: any) {
  function handlePageChange() {
    navigation.push('Login');
  }

  useEffect(() => {
    setTimeout(handlePageChange, 0);
  }, []);

  return (
    <SafeAreaView
      style={styles.initialPage}
    >
      <TouchableOpacity
        onPress={() => handlePageChange()}
        style={styles.titleContainer}
        activeOpacity={1}
      >
        <SharedElement id="mainIcon">
          <BookIcon
            width={60}
            height={60}
          />
        </SharedElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

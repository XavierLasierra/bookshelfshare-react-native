import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
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
    setTimeout(handlePageChange, 2000);
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => handlePageChange()}
        style={styles.titleContainer}
        activeOpacity={1}
      >
        <Text style={styles.title}>bookshelfShare</Text>
        <SharedElement id="mainIcon">
          <BookIcon
            width={50}
            height={50}
          />
        </SharedElement>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

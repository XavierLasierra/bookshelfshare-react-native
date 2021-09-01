import React from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';

import styles from './authenticationPage.styles';

import BookIcon from '../../assets/bookIcon.svg';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>bookshelfShare</Text>
        <BookIcon width={50} height={50} />
      </View>
    </SafeAreaView>
  );
}

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';
import {
  SharedElement
} from 'react-navigation-shared-element';

import styles from './initialLoading.styles';

import BookIcon from '../../assets/bookIcon.svg';

export default function InitialLoading({
  navigation
}: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.push('AuthenticationNavigator');
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>bookshelfShare</Text>
        <SharedElement id="mainIcon">
          <BookIcon
            width={50}
            height={50}
          />
        </SharedElement>
      </View>
    </SafeAreaView>
  );
}

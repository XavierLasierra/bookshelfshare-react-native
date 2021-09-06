import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../Header/Header';
import BookIcon from '../../assets/bookIcon.svg';
import styles from './bookDetail.styles';

export default function BookDetail({
  navigation,
  route: {
    params: {
      bookData
    }
  }
}: any) {
  return (
    <SafeAreaView style={styles.bookDetailPageContainer}>
      <Header Logo={BookIcon} BackButton navigation={navigation} />
      <View style={styles.bookDetailContainer}>
        <View>
          <Image
            source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
            style={styles.bookImage}
          />
          <Text>Book detail works</Text>
          <Text>{bookData.title}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

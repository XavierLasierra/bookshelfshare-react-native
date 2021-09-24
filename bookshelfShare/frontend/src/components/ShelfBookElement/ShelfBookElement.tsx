import React from 'react';
import {
  Text, TouchableOpacity, Image, View
} from 'react-native';
import { IShelfBookElement } from '../../types/interfaces';

import styles from './shelfBookElement.styles';

export default function ShelfBookElement({
  bookData, logo, navigation, location, shelfName
}: IShelfBookElement) {
  function handleBookDetailPage() {
    navigation.push('BookDetail',
      {
        bookData,
        logo
      });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleBookDetailPage}
      testID="bookDetailButton"
      style={styles.container}
    >
      <Text style={styles.shelfLocation}>
        Row:
        {' '}
        {location[0] + 1}
        {' '}
        Column:
        {' '}
        {location[1] + 1}
        {' '}
        -
        {' '}
        {shelfName}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.bookImage}
          source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
        />
        <View style={styles.informationContainer}>
          <View>
            <Text style={styles.bookTitle}>{bookData?.title}</Text>
            {bookData?.authors.map((author: string, index: number) => (index < 2
        && <Text key={`${author}-${bookData?.title}`}>{author}</Text>))}
            {bookData?.authors.length >= 3 && <Text>...</Text>}
            <Text>{bookData?.publisher}</Text>
          </View>
          <Text>
            ISBN13 -
            {' '}
            {bookData?.isbn?.ISBN13}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

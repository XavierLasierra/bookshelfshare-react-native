import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';

import styles from './bookElementSearch.styles';

export default function BookElementSearch({ bookData, navigation, logo }: any) {
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
      style={styles.container}
      onPress={handleBookDetailPage}
      testID="bookDetailButton"
    >
      <Image
        source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
        style={styles.bookImage}
      />
      <View style={styles.informationContainer}>
        <View>
          <View style={styles.titleLanguageContainer}>
            <Text style={styles.bookTitle}>{bookData?.title}</Text>
            <Text>{bookData?.language.toUpperCase()}</Text>
          </View>
          {bookData?.authors.map((author: string, index: number) => (index < 2
            && <Text key={author} style={styles.bookAuthor}>{author}</Text>))}
          {bookData?.authors.length >= 3 && <Text style={styles.bookAuthor}>...</Text>}
          <Text style={styles.bookPublisher}>{bookData?.publisher}</Text>
        </View>
        <View>
          <Text style={styles.bookIsbn}>
            ISBN13 -
            {' '}
            {bookData?.isbn?.ISBN13}
          </Text>
          <Text style={styles.bookIsbn}>
            ISBN10 -
            {' '}
            {bookData?.isbn?.ISBN10}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

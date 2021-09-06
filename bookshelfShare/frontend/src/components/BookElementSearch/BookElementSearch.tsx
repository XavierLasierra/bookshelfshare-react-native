import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';

import styles from './bookResults.styles';

export default function BookElementSearch({ bookData }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
    >
      <Image
        source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
        style={styles.bookImage}
      />
      <View style={styles.informationContainer}>
        <View style={styles.topContainer}>
          <View style={styles.titleLanguageContainer}>
            <Text style={styles.bookTitle}>{bookData?.title}</Text>
            <Text>{bookData?.language.toUpperCase()}</Text>
          </View>
          {bookData?.authors.map((author: string, index: number) => (index < 2
            && <Text style={styles.bookAuthor}>{author}</Text>))}
          {bookData?.authors.length >= 3 && <Text style={styles.bookAuthor}>...</Text>}
          <Text style={styles.bookPublisher}>{bookData?.publisher}</Text>
        </View>
        <View style={styles.bottomContainer}>
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

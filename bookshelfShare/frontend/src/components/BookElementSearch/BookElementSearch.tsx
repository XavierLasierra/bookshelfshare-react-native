import React from 'react';
import {
  View, Text, Image, TouchableOpacity
} from 'react-native';

import styles from './bookResults.styles';

export default function BookElementSearch({ bookData }: any) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: bookData?.images?.thumbnail || bookData?.images?.smallThumbnail }}
        style={styles.bookImage}
      />
      <View>
        <View>
          <View>
            <Text>{bookData?.title}</Text>
            <Text>{bookData?.language}</Text>
          </View>
          <Text>{bookData?.author}</Text>
          <Text>{bookData?.publisher}</Text>
        </View>
        <View>
          <Text>
            ISBN13 -
            {bookData?.isbn[0]?.identifier}
          </Text>
          <Text>
            ISBN10 -
            {bookData?.isbn[1]?.identifier}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

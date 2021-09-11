import React from 'react';
import {
  View, Text, TouchableOpacity, Image
} from 'react-native';
import ShelfIcon from '../../assets/shelfIcon.svg';

import styles from './shelfListElement.styles';

export default function ShelfListElement({ shelf, loggedUserId }: any) {
  const filteredUserList = shelf.users.filter(({ _id }: any) => _id !== loggedUserId);

  return (
    <TouchableOpacity style={styles.shelfContainer}>
      <ShelfIcon width={35} height={35} />
      <View style={styles.topContainer}>
        <Text style={styles.shelfName}>{shelf.name}</Text>

      </View>
      <View>
        <View style={styles.photosContainer}>
          <Image
            source={{ uri: filteredUserList[0]?.photo }}
            style={styles.sharedUserPhoto}
          />
          {filteredUserList.length > 2 && (
          <Text style={styles.sharedUserNumber}>
            {' '}
            +
              {filteredUserList.length - 1 }
          </Text>
          )}
        </View>
        <Text style={styles.bookCounter}>
          {shelf.books.length}
          {' '}
          {shelf.books.length === 1 ? 'book' : 'books'}
        </Text>

      </View>
    </TouchableOpacity>
  );
}

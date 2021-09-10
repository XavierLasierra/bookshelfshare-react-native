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
      <Text style={styles.shelfName}>{shelf.name}</Text>
      <View>
        <View style={styles.photoCounterContainer}>
          <Text style={styles.bookCounter}>
            {shelf.books.length}
            {' '}
            {shelf.books.length === 1 ? 'book' : 'books'}
          </Text>
          <View style={styles.photosContainer}>
            {filteredUserList.map(({ photo, _id }: any, index: number) => index < 2 && (
              <Image
                key={`shared-${_id}`}
                source={{ uri: photo }}
                style={styles.sharedUserPhoto}
              />
            )) }

            {filteredUserList.length > 2 && (
            <Text>
              {' '}
              +
              {filteredUserList.length - 2 }
              {' '}
            </Text>
            )}

          </View>
        </View>

      </View>

    </TouchableOpacity>
  );
}

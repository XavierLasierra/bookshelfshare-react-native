import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import BookStackIcon from '../../assets/bookStackIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import styles from './profileDetail.styles';

export default function ProfileDetail({ handleBookResultsPage, userBooks, shelves }: any) {
  return (
    <>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => handleBookResultsPage('currently reading', userBooks.reading)}
      >
        <BookStackIcon width={40} height={40} />
        <Text style={styles.buttonText}>
          {userBooks.reading.length}
          {' '}
          {userBooks.reading.length === 1 ? 'book' : 'books'}
          {' '}
          currently reading
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => handleBookResultsPage('read', userBooks.read)}
      >
        <BookStackIcon width={40} height={40} />
        <Text style={styles.buttonText}>
          {userBooks.read.length}
          {' '}
          {userBooks.read.length === 1 ? 'book' : 'books'}
          {' '}
          read
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => handleBookResultsPage('to read', userBooks.toRead)}
      >
        <BookStackIcon width={40} height={40} />
        <Text style={styles.buttonText}>
          {userBooks.toRead.length}
          {' '}
          {userBooks.toRead.length === 1 ? 'book' : 'books'}
          {' '}
          to read
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => handleBookResultsPage('whislist', userBooks.wishlist)}
      >
        <BookStackIcon width={40} height={40} />
        <Text style={styles.buttonText}>
          {userBooks.wishlist.length}
          {' '}
          {userBooks.wishlist.length === 1 ? 'book' : 'books'}
          {' '}
          on wishlist
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton}>
        <ShelfIcon width={40} height={35} />
        <Text style={styles.buttonText}>
          {shelves.length}
          {' '}
          {shelves.length === 1 ? 'shelf' : 'shelves'}
        </Text>
      </TouchableOpacity>
    </>
  );
}

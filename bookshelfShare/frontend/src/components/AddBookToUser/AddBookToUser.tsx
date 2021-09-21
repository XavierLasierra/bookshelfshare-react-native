import React from 'react';
import { View, Text } from 'react-native';
import { AddBookToUserProps } from '../../types/interfaces';

import ListMenu from '../ListMenu/ListMenu';
import ShelfMenu from '../ShelfMenu/ShelfMenu';

import styles from './addBookToUser.styles';

export default function AddBookToUser({
  bookIsbn, token, refreshToken, userId, navigation, logo
}: AddBookToUserProps) {
  const menus = (
    <>
      <ListMenu
        bookIsbn={bookIsbn}
        userId={userId}
        token={token}
        refreshToken={refreshToken}
      />
      <ShelfMenu
        navigation={navigation}
        logo={logo}
        bookIsbn={bookIsbn}
        token={token}
        refreshToken={refreshToken}
      />
    </>
  );

  return (
    <View style={styles.addBookToUserContainer}>
      {bookIsbn !== 'Not found'
        ? menus
        : <Text style={styles.canNotSaveText}>Cannot save a book without isbn</Text>}
    </View>
  );
}

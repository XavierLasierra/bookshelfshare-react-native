import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  Menu, MenuOptions, MenuTrigger, MenuOption, renderers
} from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBooks } from '../../redux/actions/loggedUser.creator';
import stylesConstants from '../../styles/styles.constants';

import styles from './addBookToUser.styles';

export default function AddBookToUser({
  bookIsbn, token, refreshToken, userId
}: any) {
  const dispatch = useDispatch();
  const books = useSelector((store: any) => store.userBooks);
  const [markListName, setMarkListName] = useState('Mark as');
  const [deleteFrom, setDeleteFrom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function findInUserBooks() {
    if (books.read.includes(bookIsbn)) {
      setDeleteFrom('read');
      return 'Read';
    }
    if (books.reading.includes(bookIsbn)) {
      setDeleteFrom('reading');
      return 'Reading';
    }
    if (books.wishlist.includes(bookIsbn)) {
      setDeleteFrom('wishlist');
      return 'Wishlist';
    }
    return 'Mark as';
  }

  useEffect(() => {
    setMarkListName(findInUserBooks());
    setIsLoading(false);
  }, [books]);

  function handleCategorySelect(value: string) {
    setIsLoading(true);
    dispatch(updateUserBooks(
      userId, {
        bookIsbn,
        deleteFrom,
        addTo: value
      },
      token,
      refreshToken
    ));
  }

  const menus = (
    <>
      <Menu
        onSelect={handleCategorySelect}
        renderer={renderers.NotAnimatedContextMenu}
      >
        <MenuTrigger>
          {isLoading
            ? (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="small" color={stylesConstants.colors.dark} />
              </View>
            )
            : <Text style={styles.markButton}>{markListName}</Text>}
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            value="read"
            text="Read"
            style={styles.menuOption}
          />
          <MenuOption
            value="reading"
            text="Reading"
            style={styles.menuOption}
          />
          <MenuOption
            value="wishlist"
            text="Wishlist"
            style={styles.menuOption}
          />
          <MenuOption
            value=""
            text="Delete"
            style={styles.menuOption}
          />
        </MenuOptions>
      </Menu>
      <Menu
        onSelect={handleCategorySelect}
        renderer={renderers.NotAnimatedContextMenu}
      >
        <MenuTrigger>
          <Text style={styles.markButton}>Add to shelf</Text>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            value="read"
            text="Read"
          />
          <MenuOption
            value="current"
            text="Reading"
          />
          <MenuOption
            value="wishlist"
            text="Wishlist"
          />
        </MenuOptions>
      </Menu>
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

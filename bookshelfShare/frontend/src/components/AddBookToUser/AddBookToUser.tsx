import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  Menu, MenuOptions, MenuTrigger, MenuOption, renderers
} from 'react-native-popup-menu';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBooks } from '../../redux/actions/loggedUser.creator';
import { addToShelf } from '../../redux/actions/userShelves.creator';
import stylesConstants from '../../styles/styles.constants';

import styles from './addBookToUser.styles';

export default function AddBookToUser({
  bookIsbn, token, refreshToken, userId, navigation, logo
}: any) {
  const dispatch = useDispatch();
  const books = useSelector((store: any) => store.userBooks);
  const shelves = useSelector((store: any) => store.userShelves);
  const [markListName, setMarkListName] = useState('Mark as');
  const [markShelfName, setMarkShelfName] = useState('Add to shelf');
  const [deleteFrom, setDeleteFrom] = useState('');
  const [deleteFromShelf, setDeleteFromShelf] = useState('');
  const [shelfLocation, setShelfLocation] = useState(null);
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
    if (books.toRead.includes(bookIsbn)) {
      setDeleteFrom('toRead');
      return 'To Read';
    }
    return 'Mark as';
  }

  function findInUserShelves() {
    let name = 'Add to shelf';
    setDeleteFromShelf('');
    setShelfLocation(null);
    shelves.forEach((shelf: any) => {
      const foundBook = shelf.books
        .find(({ bookIsbn: shelfBookIsbn }: any) => shelfBookIsbn === bookIsbn);
      if (foundBook) {
        // eslint-disable-next-line no-underscore-dangle
        setDeleteFromShelf(shelf._id);
        setShelfLocation(foundBook.customInformation?.location);
        name = shelf.name;
      }
    });
    return name;
  }

  useEffect(() => {
    setMarkListName(findInUserBooks());
    setIsLoading(false);
  }, [books]);

  useEffect(() => {
    setMarkShelfName(findInUserShelves());
  }, [shelves]);

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

  function handleShelfSelect(value: string) {
    if (value === 'delete') {
      dispatch(addToShelf(
        deleteFromShelf,
        // eslint-disable-next-line no-underscore-dangle
        '',
        bookIsbn,
        '',
        token,
        refreshToken
      ));
    } else {
      navigation.push('AddToShelf',
        {
          shelf: shelves.find(({ _id }: any) => _id === value),
          deleteFromShelf,
          bookIsbn,
          logo
        });
    }
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
            value="toRead"
            text="To Read"
            style={styles.menuOption}
          />
          <MenuOption
            value=""
            text="Unmark"
            style={styles.menuOption}
          />
        </MenuOptions>
      </Menu>
      <View>
        <Menu
          onSelect={handleShelfSelect}
          renderer={renderers.NotAnimatedContextMenu}
        >
          <MenuTrigger>
            <Text style={styles.markButton}>{markShelfName}</Text>
          </MenuTrigger>
          <MenuOptions>
            {shelves.map(({ _id, name }: any) => (
              <MenuOption
                key={_id}
                value={_id}
                text={name}
                style={styles.menuOption}
              />
            ))}
            <MenuOption
              value="delete"
              text="Delete from shelf"
              style={styles.menuOption}
            />
          </MenuOptions>
        </Menu>
        {shelfLocation
      && (
      <View style={styles.shelfLocationContainer}>
        <Text style={styles.shelfLocationText}>
          Row:
          {shelfLocation[0] + 1}
        </Text>
        <Text style={styles.shelfLocationText}>
          Col:
          {shelfLocation[1] + 1}
        </Text>
      </View>
      )}
      </View>
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

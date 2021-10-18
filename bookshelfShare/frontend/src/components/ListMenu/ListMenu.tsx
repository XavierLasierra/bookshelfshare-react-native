import React, {useEffect, useState} from 'react';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
  renderers,
} from 'react-native-popup-menu';
import {View, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IListMenuProps, IStore} from '../../types/interfaces';

import {updateUserBooks} from '../../redux/actions/loggedUser.creator';

import stylesConstants from '../../styles/styles.constants';
import styles from './listMenu.styles';
import globalStyles from '../../styles/global.styles';

export default function ListMenu({
  bookIsbn,
  userId,
  token,
  refreshToken,
}: IListMenuProps) {
  const dispatch = useDispatch();
  const books = useSelector((store: IStore) => store.userBooks);

  const [isLoading, setIsLoading] = useState(false);
  const [markListName, setMarkListName] = useState('Mark as');
  const [deleteFrom, setDeleteFrom] = useState('');

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

  useEffect(() => {
    setMarkListName(findInUserBooks());
    setIsLoading(false);
  }, [books]);

  function handleCategorySelect(value: string) {
    setIsLoading(true);
    dispatch(
      updateUserBooks(
        userId,
        {
          bookIsbn,
          deleteFrom,
          addTo: value,
        },
        token,
        refreshToken,
      ),
    );
  }

  return (
    <Menu
      onSelect={handleCategorySelect}
      renderer={renderers.NotAnimatedContextMenu}>
      <MenuTrigger>
        {isLoading ? (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              size="small"
              color={stylesConstants.colors.dark}
            />
          </View>
        ) : (
          <Text style={globalStyles.markButton}>{markListName}</Text>
        )}
      </MenuTrigger>
      <MenuOptions>
        <MenuOption value="read" text="Read" style={globalStyles.menuOption} />
        <MenuOption
          value="reading"
          text="Reading"
          style={globalStyles.menuOption}
        />
        <MenuOption
          value="wishlist"
          text="Wishlist"
          style={globalStyles.menuOption}
        />
        <MenuOption
          value="toRead"
          text="To Read"
          style={globalStyles.menuOption}
        />
        <MenuOption value="" text="Unmark" style={globalStyles.menuOption} />
      </MenuOptions>
    </Menu>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Menu, MenuOptions, MenuTrigger, MenuOption, renderers
} from 'react-native-popup-menu';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { addToShelf } from '../../redux/actions/userShelves.creator';

import styles from './shelfMenu.styles';
import globalStyles from '../../styles/global.styles';

export default function ShelfMenu({
  navigation, logo, bookIsbn, token, refreshToken
}: any) {
  const dispatch = useDispatch();
  const shelves = useSelector((store: any) => store.userShelves);
  const [markShelfName, setMarkShelfName] = useState('Add to shelf');
  const [deleteFromShelf, setDeleteFromShelf] = useState('');
  const [shelfLocation, setShelfLocation] = useState(null);

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
    setMarkShelfName(findInUserShelves());
  }, [shelves]);

  function handleShelfSelect(value: string) {
    return value === 'delete'
      ? dispatch(addToShelf(
        deleteFromShelf,
        // eslint-disable-next-line no-underscore-dangle
        '',
        bookIsbn,
        '',
        token,
        refreshToken
      ))
      : navigation.push('AddToShelf',
        {
          shelf: shelves.find(({ _id }: any) => _id === value),
          deleteFromShelf,
          bookIsbn,
          logo
        });
  }

  return (
    <View>
      <Menu
        onSelect={handleShelfSelect}
        renderer={renderers.NotAnimatedContextMenu}
      >
        <MenuTrigger>
          <Text style={globalStyles.markButton}>{markShelfName}</Text>
        </MenuTrigger>
        <MenuOptions>
          {shelves.map(({ _id, name }: any) => (
            <MenuOption
              key={_id}
              value={_id}
              text={name}
              style={globalStyles.menuOption}
            />
          ))}
          <MenuOption
            value="delete"
            text="Delete from shelf"
            style={globalStyles.menuOption}
          />
        </MenuOptions>
      </Menu>
      {shelfLocation && (
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
  );
}

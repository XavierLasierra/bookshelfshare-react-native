import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ShelfIcon from '../../assets/shelfIcon.svg';
import {loadCurrentShelf} from '../../redux/actions/currentShelf.creator';

import styles from './shelfListElement.styles';

export default function ShelfListElement({
  shelf,
  loggedUserId,
  navigation,
  logo,
}: any) {
  const dispatch = useDispatch();
  const {token, refreshToken} = useSelector((store: any) => store.tokens);
  const filteredUserList = shelf.users.filter(
    ({_id}: any) => _id !== loggedUserId,
  );

  function handleShelfDetailPage() {
    // eslint-disable-next-line no-underscore-dangle
    dispatch(loadCurrentShelf(shelf._id, token, refreshToken));
    navigation.push('ShelfDetail', {
      logo,
    });
  }

  return (
    <TouchableOpacity
      style={styles.shelfContainer}
      onPress={handleShelfDetailPage}
      testID="shelfDetailPageButton">
      <ShelfIcon width={35} height={35} />
      <Text style={styles.shelfName}>{shelf.name}</Text>
      <View style={styles.photoBooksContainer}>
        <View style={styles.photosContainer}>
          <Image
            source={{uri: filteredUserList[0]?.photo}}
            style={styles.sharedUserPhoto}
          />
          {filteredUserList.length > 2 && (
            <Text style={styles.sharedUserNumber}>
              {' '}
              +{filteredUserList.length - 1}
            </Text>
          )}
        </View>
        <Text style={styles.bookCounter}>
          {shelf.books.length} {shelf.books.length === 1 ? 'book' : 'books'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

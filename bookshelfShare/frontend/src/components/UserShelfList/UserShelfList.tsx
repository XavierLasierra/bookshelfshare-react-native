import React from 'react';
import {
  FlatList,
  SafeAreaView, TextInput, TouchableOpacity, View, Text
} from 'react-native';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import ShelfListElement from '../ShelfListElement/ShelfListElement';

import SearchIcon from '../../assets/searchIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './userShelfList.styles';

export default function UserShelfList({ navigation }: any) {
  const userShelves = useSelector((store:any) => store.userShelves);
  const { userData: { _id: loggedUserId } } = useSelector((store: any) => store.loggedUser);

  function handleNewShelfPage() {
    navigation.push('NewShelf');
  }

  function renderShelves({ item }: any) {
    return (
      <ShelfListElement shelf={item} loggedUserId={loggedUserId} />
    );
  }

  const newShelf = (
    <TouchableOpacity
      style={styles.addShelfButton}
      onPress={handleNewShelfPage}
    >
      <View style={[globalStyles.circularButton, styles.addShelfCircle]}>
        <Text style={styles.addShelfCircleText}>+</Text>
      </View>
      <Text style={styles.addShelfButtonText}>Create new bookshelf</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={ShelfIcon} />
      <View style={styles.userShelfListContainer}>
        <View style={globalStyles.thinInputContainer}>
          <TextInput
            style={globalStyles.thinInput}
            placeholder="Search in all your shelves"
          />
          <TouchableOpacity>
            <SearchIcon width={35} height={35} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userShelves}
          renderItem={renderShelves}
          keyExtractor={(item, index) => `shelf-${index}`}
          ListFooterComponent={newShelf}
        />
        <View style={styles.marginBottom} />
      </View>
    </SafeAreaView>
  );
}

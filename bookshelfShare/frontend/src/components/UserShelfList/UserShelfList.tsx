import React from 'react';
import {
  FlatList,
  SafeAreaView, TextInput, TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import ShelfListElement from '../ShelfListElement/ShelfListElement';

import SearchIcon from '../../assets/searchIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './userShelfList.styles';

export default function UserShelfList() {
  const userShelves = useSelector((store:any) => store.userShelves);
  const { userData: { _id: loggedUserId } } = useSelector((store: any) => store.loggedUser);

  function renderShelves({ item }: any) {
    return (
      <ShelfListElement shelf={item} loggedUserId={loggedUserId} />
    );
  }

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
        />
        <View style={styles.marginBottom} />
      </View>
    </SafeAreaView>
  );
}

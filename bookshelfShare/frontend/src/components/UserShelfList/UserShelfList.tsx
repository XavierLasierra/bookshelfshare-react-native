import React from 'react';
import {
  SafeAreaView, TextInput, TouchableOpacity, View
} from 'react-native';
import Header from '../Header/Header';

import SearchIcon from '../../assets/searchIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './userShelfList.styles';

export default function UserShelfList() {
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

      </View>

    </SafeAreaView>
  );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import BookIcon from '../../assets/bookIcon.svg';
import FollowingIcon from '../../assets/followingIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import ProfileIcon from '../../assets/profileIcon.svg';
import styles from './customTabBar.styles';
import AddPopUp from '../AddPopUp/AddPopUp';

export default function CustomTabBar({ state, navigation }: any) {
  function onPress(key: string, isFocused: boolean, name: string) {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({
        name,
        merge: true
      });
    }
  }

  function onLongPress(key: string) {
    navigation.emit({
      type: 'tabLongPress',
      target: key
    });
  }

  return (
    <View style={styles.tabBarContainer}>
      <TouchableOpacity
        onPress={() => onPress(state.routes[0].key, state.index === 0, state.routes[0].name)}
        onLongPress={() => onLongPress(state.routes[0].key)}
        activeOpacity={0.8}
        style={[styles.tabOption, state.index === 0 && styles.tabOptionFocused]}
        testID="homeButton"
      >
        <BookIcon width={30} height={30} />
        <Text style={styles.tabText}>home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(state.routes[1].key, state.index === 1, state.routes[1].name)}
        onLongPress={() => onLongPress(state.routes[1].key)}
        activeOpacity={0.8}
        style={[styles.tabOption, state.index === 1 && styles.tabOptionFocused]}
        testID="followingButton"
      >
        <FollowingIcon width={30} height={30} />
        <Text style={styles.tabText}>following</Text>
      </TouchableOpacity>
      <AddPopUp navigation={navigation} />
      <TouchableOpacity
        onPress={() => onPress(state.routes[2].key, state.index === 2, state.routes[2].name)}
        onLongPress={() => onLongPress(state.routes[2].key)}
        activeOpacity={0.8}
        style={[styles.tabOption, state.index === 2 && styles.tabOptionFocused]}
        testID="shelfButton"
      >
        <ShelfIcon width={30} height={30} />
        <Text style={styles.tabText}>shelf</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress(state.routes[3].key, state.index === 3, state.routes[3].name)}
        onLongPress={() => onLongPress(state.routes[3].key)}
        activeOpacity={0.8}
        style={[styles.tabOption, state.index === 3 && styles.tabOptionFocused]}
        testID="profileButton"
      >
        <ProfileIcon width={30} height={30} />
        <Text style={styles.tabText}>profile</Text>
      </TouchableOpacity>
    </View>
  );
}

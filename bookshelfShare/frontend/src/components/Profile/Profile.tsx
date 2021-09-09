import React from 'react';
import {
  SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header';

import ProfileIcon from '../../assets/profileIcon.svg';
import BookStackIcon from '../../assets/bookStackIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import styles from './profile.styles';
import globalStyles from '../../styles/global.styles';
import { logoutUser } from '../../redux/actions/loggedUser.creator';
import { getBooksData } from '../../redux/actions/books.creator';

export default function Profile({ navigation }: any) {
  const dispatch = useDispatch();
  const { userData } = useSelector((store: any) => store.loggedUser);
  const userBooks = useSelector((store: any) => store.userBooks);
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const shelves = useSelector((store: any) => store.shelves);

  function handleLogout() {
    dispatch(logoutUser(refreshToken));
  }

  function handleBookResultsPage(listName: string, bookArray: string[]) {
    dispatch(getBooksData(bookArray, token, refreshToken));
    navigation.push('BookResults',
      {
        listName,
        logo: 'ProfileIcon'
      });
  }

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView>
        <Header Logo={ProfileIcon} />
        <View style={styles.profileContainer}>
          <View style={styles.topContainer}>
            <Image
              source={{ uri: userData.photo }}
              style={styles.userPhoto}
            />
            <View style={styles.userInformationContainer}>
              <Text style={styles.userUsername}>{userData.username}</Text>
              <Text style={styles.userEmail}>{userData.email}</Text>
            </View>

          </View>
          <View style={styles.actionsContainer}>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.profileButton, styles.socialButton]}>
                <ProfileIcon width={25} height={25} />
                <Text style={styles.buttonText}>
                  {userData.followers.length}
                  {' '}
                  {userData.followers.length === 1 ? 'follower' : 'followers'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.profileButton, styles.socialButton]}>
                <ProfileIcon width={25} height={25} />
                <Text style={styles.buttonText}>
                  {userData.following.length}
                  {' '}
                  following
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.profileButton, styles.booksButton]}
              onPress={() => handleBookResultsPage('currently reading', userBooks.reading)}
            >
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userBooks.reading.length}
                {' '}
                {userBooks.reading.length === 1 ? 'book' : 'books'}
                {' '}
                currently reading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.profileButton, styles.booksButton]}
              onPress={() => handleBookResultsPage('read', userBooks.read)}
            >
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userBooks.read.length}
                {' '}
                {userBooks.read.length === 1 ? 'book' : 'books'}
                {' '}
                read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.profileButton, styles.booksButton]}
              onPress={() => handleBookResultsPage('whislist', userBooks.wishlist)}
            >
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userBooks.wishlist.length}
                {' '}
                {userBooks.wishlist.length === 1 ? 'book' : 'books'}
                {' '}
                on wishlist
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.profileButton, styles.booksButton]}>
              <ShelfIcon width={40} height={35} />
              <Text style={styles.buttonText}>
                {shelves.length}
                {' '}
                {shelves.length === 1 ? 'shelf' : 'shelves'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[globalStyles.button, styles.logoutButton]}
            onPress={handleLogout}
            testID="logoutButton"
          >
            <Text style={globalStyles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

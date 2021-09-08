import React from 'react';
import {
  SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

import ProfileIcon from '../../assets/profileIcon.svg';
import BookStackIcon from '../../assets/bookStackIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import styles from './profile.styles';
import globalStyles from '../../styles/global.styles';

export default function Profile() {
  const { userData } = useSelector((store: any) => store.loggedUser);
  const shelves = useSelector((store: any) => store.shelves);

  function handleLogout() {

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
            <TouchableOpacity style={[styles.profileButton, styles.booksButton]}>
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userData.books.current.length}
                {' '}
                {userData.books.current.length === 1 ? 'book' : 'books'}
                {' '}
                currently reading
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.profileButton, styles.booksButton]}>
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userData.books.read.length}
                {' '}
                {userData.books.read.length === 1 ? 'book' : 'books'}
                {' '}
                read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.profileButton, styles.booksButton]}>
              <BookStackIcon width={40} height={40} />
              <Text style={styles.buttonText}>
                {userData.books.wishlist.length}
                {' '}
                {userData.books.wishlist.length === 1 ? 'book' : 'books'}
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

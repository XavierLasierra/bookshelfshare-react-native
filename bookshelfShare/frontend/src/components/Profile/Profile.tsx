import React from 'react';
import {
  SafeAreaView, View, Image, Text, TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

import ProfileIcon from '../../assets/profileIcon.svg';
import BookStackIcon from '../../assets/bookStackIcon.svg';
import styles from './profile.styles';

export default function Profile() {
  const { userData } = useSelector((store: any) => store.loggedUser);
  const shelves = useSelector((store: any) => store.shelves);
  return (
    <SafeAreaView>
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
        <View>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {userData.books.current.length}
              {' '}
              {userData.books.current.length === 1 ? 'book' : 'books'}
              {' '}
              currently reading
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {userData.books.read.length}
              {' '}
              {userData.books.read.length === 1 ? 'book' : 'books'}
              {' '}
              read
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {userData.books.wishlist.length}
              {' '}
              {userData.books.wishlist.length === 1 ? 'book' : 'books'}
              {' '}
              on wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {userData.followers.length}
              {' '}
              {userData.followers.length === 1 ? 'follower' : 'followers'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {userData.following.length}
              {' '}
              {userData.following.length === 1 ? 'user' : 'users'}
              {' '}
              following
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <BookStackIcon width={40} height={40} />
            <Text>
              {shelves.length}
              {' '}
              {shelves.length === 1 ? 'shelf' : 'shelves'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

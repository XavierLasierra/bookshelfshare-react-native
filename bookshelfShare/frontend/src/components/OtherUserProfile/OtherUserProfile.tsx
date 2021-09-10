/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';

import { addUserFollowing, deleteUserFollowing } from '../../redux/actions/loggedUser.creator';
import { getBooksData } from '../../redux/actions/books.creator';

import RedProfileIcon from '../../assets/redProfileIcon.svg';
import AddUserIcon from '../../assets/addUserIcon.svg';
import BookStackIcon from '../../assets/bookStackIcon.svg';
import ShelfIcon from '../../assets/shelfIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './otherUserProfile.styles';
import stylesConstants from '../../styles/styles.constants';
import { clearCurrentUser } from '../../redux/actions/currentUser.creator';
import logoSelector from '../../utils/logoSelector';

export default function ProfileDetail({ navigation, route: { params: { logo } } }: any) {
  const dispatch = useDispatch();
  const { userData: { _id: loggedUserId } } = useSelector((store: any) => store.loggedUser);
  const { following } = useSelector((store: any) => store.userSocials);
  const { token, refreshToken } = useSelector((store: any) => store.tokens);
  const { user, results } = useSelector((store: any) => store.currentUser);
  const [isDisabled, setIsDisabled] = useState(false);

  const isFollowed = following.some((followedUser: any) => followedUser._id === user._id);
  const isFollower = user?.following
  && user.following.some(({ _id: followingId }: any) => followingId === loggedUserId);

  useEffect(() => {
    setIsDisabled(false);
  }, [following]);

  useEffect(() => () => {
    dispatch(clearCurrentUser());
  }, []);

  function handleBookResultsPage(listName: string, bookArray: string[]) {
    dispatch(getBooksData(bookArray, token, refreshToken));
    navigation.push('BookResults',
      {
        listName,
        logo
      });
  }

  function handleAddFollowing() {
    dispatch(addUserFollowing(user._id, loggedUserId, token, refreshToken));
    setIsDisabled(true);
  }

  function handleDeleteFollowing() {
    dispatch(deleteUserFollowing(user._id, loggedUserId, token, refreshToken));
    setIsDisabled(true);
  }

  const currentUserDetail = (
    <View style={styles.profileContainer}>
      <View style={styles.topContainer}>
        <Image
          source={{ uri: user?.photo }}
          style={styles.userPhoto}
        />
        <View style={styles.userInformationContainer}>
          <Text style={styles.userUsername}>{user?.username}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          {isFollower && <Text style={styles.follower}>Follows you</Text>}
        </View>
      </View>
      <View>
        <View style={styles.socialContainer}>
          {isFollowed
            ? (
              <TouchableOpacity
                onPress={handleDeleteFollowing}
                disabled={isDisabled}
              >
                <RedProfileIcon width={35} height={35} />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                onPress={handleAddFollowing}
                disabled={isDisabled}
              >
                <AddUserIcon width={35} height={35} />
              </TouchableOpacity>
            )}
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => handleBookResultsPage(`${user.username}'s\ncurrently reading`, user?.books?.reading)}
        >
          <BookStackIcon width={40} height={40} />
          <Text style={styles.buttonText}>
            {user?.books?.reading.length}
            {' '}
            {user?.books?.reading.length === 1 ? 'book' : 'books'}
            {' '}
            currently reading
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => handleBookResultsPage(`${user.username}'s\nread`, user?.books?.read)}
        >
          <BookStackIcon width={40} height={40} />
          <Text style={styles.buttonText}>
            {user?.books?.read.length}
            {' '}
            {user?.books?.read.length === 1 ? 'book' : 'books'}
            {' '}
            read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => handleBookResultsPage(`${user.username}'s\nto read`, user?.books?.toRead)}
        >
          <BookStackIcon width={40} height={40} />
          <Text style={styles.buttonText}>
            {user?.books?.toRead.length}
            {' '}
            {user?.books?.toRead.length === 1 ? 'book' : 'books'}
            {' '}
            to read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => handleBookResultsPage(`${user.username}'s\nwhislist`, user?.books?.wishlist)}
        >
          <BookStackIcon width={40} height={40} />
          <Text style={styles.buttonText}>
            {user?.books?.wishlist.length}
            {' '}
            {user?.books?.wishlist.length === 1 ? 'book' : 'books'}
            {' '}
            on wishlist
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileButton}>
          <ShelfIcon width={40} height={35} />
          <Text style={styles.buttonText}>
            X shelves
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Header Logo={logoSelector(logo)} BackButton navigation={navigation} />
      <ScrollView>
        {results
          ? currentUserDetail
          : <ActivityIndicator size="large" color={stylesConstants.colors.dark} style={styles.activityIndicator} />}
      </ScrollView>
    </SafeAreaView>
  );
}

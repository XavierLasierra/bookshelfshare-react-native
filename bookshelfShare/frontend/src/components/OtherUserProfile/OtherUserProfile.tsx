/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header/Header';
import ProfileDetail from '../ProfileDetail/ProfileDetail';

import { addUserFollowing, deleteUserFollowing } from '../../redux/actions/loggedUser.creator';
import { getBooksData } from '../../redux/actions/books.creator';
import { clearCurrentUser } from '../../redux/actions/currentUser.creator';
import logoSelector from '../../utils/logoSelector';

import RedProfileIcon from '../../assets/redProfileIcon.svg';
import AddUserIcon from '../../assets/addUserIcon.svg';
import globalStyles from '../../styles/global.styles';
import styles from './otherUserProfile.styles';
import stylesConstants from '../../styles/styles.constants';

export default function OtherUserProfile({ navigation, route: { params: { logo } } }: any) {
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
        listName: `${user.username}'s\n${listName}`,
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
    <View style={globalStyles.profileContainer}>
      <View style={globalStyles.topContainer}>
        <Image
          source={{ uri: user?.photo }}
          style={globalStyles.userPhoto}
        />
        <View style={globalStyles.userInformationContainer}>
          <Text style={globalStyles.userUsername}>{user?.username}</Text>
          <Text style={globalStyles.userEmail}>{user?.email}</Text>
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
                testID="deleteFollowingButton"
              >
                <RedProfileIcon width={35} height={35} />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                onPress={handleAddFollowing}
                disabled={isDisabled}
                testID="addFollowingButton"
              >
                <AddUserIcon width={35} height={35} />
              </TouchableOpacity>
            )}
        </View>
        <ProfileDetail
          handleBookResultsPage={handleBookResultsPage}
          userBooks={user.books}
          shelves={[]}
        />
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

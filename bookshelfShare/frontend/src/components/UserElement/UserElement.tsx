/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Image, Text, View, TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addUserFollowing, deleteUserFollowing } from '../../redux/actions/loggedUser.creator';
import { loadCurrentUser } from '../../redux/actions/currentUser.creator';

import RedProfileIcon from '../../assets/redProfileIcon.svg';
import AddUserIcon from '../../assets/addUserIcon.svg';
import styles from './userElement.styles';

export default function UserElement({
  navigation, user, following, loggedUserId, token, refreshToken, logo
}: any) {
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const isFollowed = following.some((followedUser: any) => followedUser._id === user._id);

  useEffect(() => {
    setIsDisabled(false);
  }, [following]);

  function handleUserDetail() {
    dispatch(loadCurrentUser(user._id, token, refreshToken));
    navigation.push('OtherUserProfile',
      {
        logo
      });
  }

  function handleAddFollowing(followingUserId: string) {
    dispatch(addUserFollowing(followingUserId, loggedUserId, token, refreshToken));
    setIsDisabled(true);
  }

  function handleDeleteFollowing(followingUserId: string) {
    dispatch(deleteUserFollowing(followingUserId, loggedUserId, token, refreshToken));
    setIsDisabled(true);
  }

  return (
    <>
      {user._id !== loggedUserId && (
      <TouchableOpacity
        style={[styles.userElementContainer, isFollowed && styles.userElementFollowedContainer]}
        onPress={handleUserDetail}
      >
        <Image
          source={{ uri: user.photo }}
          style={styles.userPhoto}
        />
        <View style={styles.nameFollowContainer}>
          <View style={styles.userInformationContainer}>
            <Text style={styles.userName}>{user.username}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          {isFollowed
            ? (
              <TouchableOpacity
                onPress={() => handleDeleteFollowing(user._id)}
                disabled={isDisabled}
              >
                <RedProfileIcon width={30} height={30} />
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                onPress={() => handleAddFollowing(user._id)}
                disabled={isDisabled}
              >
                <AddUserIcon width={30} height={30} />
              </TouchableOpacity>
            )}
        </View>
      </TouchableOpacity>
      )}
    </>
  );
}

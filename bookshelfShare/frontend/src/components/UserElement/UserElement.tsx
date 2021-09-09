/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Image, Text, View, TouchableOpacity
} from 'react-native';
import RedProfileIcon from '../../assets/redProfileIcon.svg';
import AddUserIcon from '../../assets/addUserIcon.svg';

import styles from './userElement.styles';

export default function UserElement({
  navigation, user, following, loggedUserId
}: any) {
  const isFollowed = following.some((followedUser: any) => followedUser._id === user._id);

  function handleUserDetail() {
    navigation.push();
  }

  return (
    <>
      {user._id !== loggedUserId && (
      <TouchableOpacity
        style={[styles.userElementContainer, isFollowed && styles.userElementFollowedContainer]}
      >
        <Image
          source={{ uri: user.photo }}
          style={styles.userPhoto}
        />
        <View style={styles.userInformationContainer}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        {isFollowed
          ? (
            <TouchableOpacity>
              <RedProfileIcon width={30} height={30} />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity>
              <AddUserIcon width={30} height={30} />
            </TouchableOpacity>
          )}

      </TouchableOpacity>
      )}
    </>
  );
}
